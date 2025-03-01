const express = require('express');
const {
  purchaseTicket,
  getTicketsForEvent,
} = require('../controllers/ticketController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', protect, purchaseTicket);
router.get('/:eventId', getTicketsForEvent);

module.exports = router;
