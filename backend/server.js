const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const crypto = require("crypto");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Confidentiality: Decode Base64
app.post("/decode", (req, res) => {
    const { encodedText } = req.body;
    try {
        const decodedText = Buffer.from(encodedText, "base64").toString("utf8");
        res.status(200).json({ decodedText });
    } catch (err) {
        res.status(400).json({ error: "Invalid Base64 input" });
    }
});

// Integrity: Generate and Verify Hash
app.post("/hash", (req, res) => {
    const { text } = req.body;
    if (!text) return res.status(400).json({ error: "Text is required" });
    const hash = crypto.createHash("sha256").update(text).digest("hex");
    res.status(200).json({ hash });
});

// Availability: Request Limit Simulation
let requestCount = 0;
app.post("/dos", (req, res) => {
    requestCount++;
    if (requestCount > 5) {
        return res.status(429).json({ error: "Too many requests. Try again later." });
    }
    res.status(200).json({ message: "Request successful", requestCount });
});

// Start Server
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
