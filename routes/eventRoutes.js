const express = require('express');
const {
  createEvent,
  getEvents,
  getEvent,
} = require('../controllers/eventController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/').get(getEvents).post(protect, createEvent);

router.route('/:id').get(getEvent);

module.exports = router;
