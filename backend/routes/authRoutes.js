const express = require('express');
const router = express.Router();
const { User } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// POST /login - 사용자 로그인
router.post('/login', async (req, res) => {
  const { nickname, member_pw } = req.body; // 'nickname'과 'member_pw' 사용

  try {
    // nickname으로 사용자 검색
    const user = await User.findOne({ where: { nickname } });
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // 비밀번호 검증 (bcrypt로 해시된 비밀번호와 비교)
    const isPasswordValid = await bcrypt.compare(member_pw, user.member_pw);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // JWT 토큰 생성
    const token = jwt.sign({ id: user.id, nickname: user.nickname }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred during login' });
  }
});

// GET /profile - JWT로 인증된 사용자 정보 조회
router.get('/profile', authenticateToken, async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: ['nickname', 'dotory']  // nickname과 dotory 필드만 가져오기
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching profile' });
  }
});

// JWT 토큰 인증 미들웨어
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Token required' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token' });
    }

    req.user = user;
    next();
  });
}

module.exports = router;
