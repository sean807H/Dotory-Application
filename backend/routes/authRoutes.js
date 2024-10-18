const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// 회원가입 API 라우트 (POST 요청 허용)
router.post('/register', authController.register);

module.exports = router;
