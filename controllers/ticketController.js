const Ticket = require('../models/Ticket');
const Event = require('../models/Event');

// Purchase a ticket
exports.purchaseTicket = async (req, res) => {
  const { eventId, ticketType } = req.body;

  try {
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    const ticket = await Ticket.create({
      user: req.user.id,
      event: eventId,
      type: ticketType,
    });

    res.status(201).json(ticket);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get tickets for an event
exports.getTicketsForEvent = async (req, res) => {
  try {
    const tickets = await Ticket.find({ event: req.params.eventId });
    res.json(tickets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
