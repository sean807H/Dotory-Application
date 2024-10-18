const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// JSON 파싱을 위한 미들웨어 추가
app.use(express.json());

const cors = require('cors');
app.use(cors());

// 기본 라우터 설정
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// 라우터 설정
const homeRoutes = require('./backend/routes/homeRoutes');
const questRoutes = require('./backend/routes/questRoutes');
//const authRoutes = require('./backend/routes/authRoutes');

//app.use('/api', authRoutes);  // 로그인 및 인증 라우터 사용
app.use('/home', homeRoutes);  // 홈 라우터 사용
app.use('/quest', questRoutes);  // 퀘스트 라우터 사용

// 서버 시작
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
