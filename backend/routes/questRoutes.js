const express = require('express');
const router = express.Router();
const { Quest } = require('../models');

// 날짜와 시간 유효성 검사 함수
const isValidDate = (date) => /^\d{4}-\d{2}-\d{2}$/.test(date);
const isValidTime = (time) => /^\d{2}:\d{2}(:\d{2})?$/.test(time);

// POST /quest - 새로운 퀘스트 생성
router.post('/', async (req, res) => {
  const { quest_name, deadline_date, deadline_time } = req.body;

  console.log('Received data:', quest_name, deadline_date, deadline_time);  // 요청 데이터 확인

  // 유효성 검사
  if (!quest_name || !deadline_date || !deadline_time) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  // 날짜와 시간 형식 검사
  if (!isValidDate(deadline_date) || !isValidTime(deadline_time)) {
    return res.status(400).json({ error: 'Invalid date or time format' });
  }

  try {
    const newQuest = await Quest.create({
      quest_name,
      deadline_date,
      deadline_time
    });
    res.status(201).json({ message: 'Quest created successfully', quest: newQuest });
  } catch (error) {
    console.error('Error occurred while creating quest:', error);  // 에러 로그 출력
    res.status(500).json({ error: 'An error occurred while creating the quest' });
  }
});

module.exports = router;
 