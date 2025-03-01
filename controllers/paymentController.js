const Razorpay = require('razorpay');
const crypto = require('crypto');

// Initialize Razorpay instance with your key and secret
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Create a new order
exports.createOrder = async (req, res) => {
  try {
    const { amount, currency } = req.body;

    const options = {
      amount: amount * 100, // Amount in paise (multiply by 100 to convert to the smallest unit of the currency)
      currency: currency || 'INR', // Default to INR if not provided
      receipt: `receipt_order_${Math.floor(Math.random() * 1000000)}`, // Unique receipt id for tracking
      payment_capture: 1, // Auto capture the payment
    };

    const order = await razorpay.orders.create(options);

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
    });
  }
};

// Verify the payment signature from Razorpay
exports.verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;

    // Create a hash using the razorpay_order_id and razorpay_payment_id
    const body = razorpay_order_id + '|' + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest('hex');

    if (expectedSignature === razorpay_signature) {
      res.status(200).json({
        success: true,
        message: 'Payment has been verified',
      });
    } else {
      res.status(400).json({
        success: false,
        message: 'Invalid payment signature',
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
    });
  }
};
