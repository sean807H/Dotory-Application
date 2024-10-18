const express = require('express');
const router = express.Router();
const { Quest } = require('../models');

// POST /quest - 새로운 퀘스트 생성
router.post('/', async (req, res) => {
  const { quest_name, deadline_date, deadline_time } = req.body;

  try {
    const newQuest = await Quest.create({
      quest_name,
      deadline_date,
      deadline_time
    });
    console.log("tttt")
    res.status(201).json({ message: 'Quest created successfully', quest: newQuest });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while creating the quest' });
  }
});

module.exports = router;
