const express = require('express');
const { User } = require('./models');  // User 모델 import
const app = express();

// 사용자 도토리 개수 가져오기 API
app.get('/acorn-count/:userId', async (req, res) => {
    const userId = req.params.userId;  // 클라이언트가 요청한 사용자 ID

    try {
        // 데이터베이스에서 해당 사용자의 도토리 개수 조회
        const user = await User.findByPk(userId, {
            attributes: ['dotory']  // dotory(도토리 개수)만 조회
        });

        if (user) {
            res.json({ acornCount: user.dotory });  // 도토리 개수 응답
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ error: 'Database error' });
    }
});

module.exports = router;