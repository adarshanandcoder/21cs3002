const express = require("express");
const { addTrain, getTrains } = require("../controllers/trainController");
const adminAuth = require("../middleware/adminMiddleware");

const router = express.Router();

router.post("/add-train", adminAuth, addTrain);
router.get("/trains", getTrains);

module.exports = router;
