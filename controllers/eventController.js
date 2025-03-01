const Event = require('../models/Event');

// Create an event
exports.createEvent = async (req, res) => {
  const { title, description, date, time, location, price, imageUrl } =
    req.body;

  try {
    const event = await Event.create({
      title,
      description,
      date,
      time,
      location,
      price,
      imageUrl,
      user: req.user.id, // logged-in user is the event organizer
    });

    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all events
exports.getEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single event
exports.getEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
