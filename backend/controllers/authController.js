const User = require('../models/user');
const bcrypt = require('bcryptjs');

// 로그인 로직 처리
exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        // 데이터베이스에서 사용자 검색
        const user = await User.findOne({ where: { username } });
        if (!user) {
            return res.status(400).json({ message: '사용자가 존재하지 않습니다.' });
        }

        // 비밀번호 비교
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: '비밀번호가 일치하지 않습니다.' });
        }

        // 로그인 성공
        res.status(200).json({ message: '로그인에 성공했습니다.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: '로그인 처리 중 오류 발생' });
    }
};

// 회원가입 로직 처리
exports.register = async (req, res) => {
    const { username, password } = req.body;

    try {
        // 비밀번호 암호화
        const hashedPassword = await bcrypt.hash(password, 10);

        // 사용자 생성
        const newUser = await User.create({
            username: username,
            password: hashedPassword
        });

        res.status(201).json({ message: '회원가입에 성공했습니다.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: '회원가입 처리 중 오류 발생' });
    }
};
