const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();
const messagesPath = path.join(__dirname, "..", "data", "messages.json");

function readMessages() {
  if (!fs.existsSync(messagesPath)) return [];
  const raw = fs.readFileSync(messagesPath, "utf-8");
  return raw.trim() ? JSON.parse(raw) : [];
}

function writeMessages(messages) {
  fs.writeFileSync(messagesPath, JSON.stringify(messages, null, 2));
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// POST /api/contact
router.post("/", (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ success: false, message: "All fields are required." });
    }

    if (!emailRegex.test(email)) {
      return res.status(400).json({ success: false, message: "Please enter a valid email address." });
    }

    const messages = readMessages();

    const newMessage = {
      id: Date.now(),
      name: name.trim(),
      email: email.trim(),
      subject: subject.trim(),
      message: message.trim(),
      createdAt: new Date().toISOString(),
    };

    messages.push(newMessage);
    writeMessages(messages);

    // NOTE: To actually send an email notification when a message arrives,
    // add "nodemailer" and configure it here using values from your .env file.

    res.json({ success: true, message: "Thanks for reaching out! We'll get back to you soon." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Something went wrong. Please try again." });
  }
});

module.exports = router;
