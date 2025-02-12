const express = require("express");
const { bookSeat, getBookings } = require("../controllers/bookingController");
const authenticate = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/book", authenticate, bookSeat);
router.get("/booking", authenticate, getBookings);

module.exports = router;
