const express = require("express")
const router = express.Router()
const { auth } = require("../middleware/auth")
const messageController = require("../controllers/messageController")
// routes for chat app
router.post("/send/:id", auth, messageController.sendMessage)
router.get("/:id", auth, messageController.getMessage);


module.exports = router
