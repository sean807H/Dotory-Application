const express = require('express');
const router = express.Router();
const { User } = require('../models');

router.get('/:id/dotory', async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id, {
      attributes: ['dotory']
    });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ dotory: user.dotory });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching dotory' });
  }
});

module.exports = router;
