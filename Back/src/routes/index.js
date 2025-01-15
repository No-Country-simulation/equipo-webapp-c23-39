const express = require("express");
const router = express.Router();

const userRoutes = require("./userRoutes");
const chatRoutes = require("./chatRoutes");
const preferenceRoutes = require("./preferenceRoutes");
const chatBotRoutes = require("./chatBotRoutes");

router.use("/user", userRoutes);
router.use("/chat", chatRoutes);
router.use("/preference", preferenceRoutes);
router.use("/chatBot", chatBotRoutes);


module.exports = router;

