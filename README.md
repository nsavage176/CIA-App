
# Cybersecurity Principles Demo

## Overview

This project is a full-stack web application demonstrating three fundamental cybersecurity principles:

Confidentiality - Uses Base64 encoding/decoding to simulate encryption.

Integrity - Implements SHA-256 hashing for tamper detection.

Availability - Simulates a Denial-of-Service (DoS) attack by limiting requests.

The frontend is built using React (Vite), while the backend is powered by Node.js and Express.

## Features

Confidentiality: Encode and decode text using Base64.

Integrity: Hash text and detect tampering.

Availability: Limit requests to simulate DoS attacks (20 requests per 5 seconds).

## Tech Stack

Frontend:

React (Vite)

Axios

TailwindCSS (Optional for styling)

Backend:

Node.js

Express.js

Crypto.js (for hashing)

express-rate-limit (for DoS attack simulation)

## Installation & Setup

1. Clone the Repository

git clone https://github.com/your-repo/cybersecurity-demo.git
cd cybersecurity-demo

2. Backend Setup

cd backend
npm install
node server.js

The backend will start on http://localhost:5000.

3. Frontend Setup

cd frontend
npm install
npm run dev

The frontend will start on http://localhost:5173.

API Endpoints

1. Base64 Encoding/Decoding

POST /decode

Request: { "encodedText": "SGVsbG8=" }

Response: { "decodedText": "Hello" }

2. Hashing & Tamper Detection

POST /hash

Request: { "text": "Hello" }

Response: { "hash": "2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c" }

3. DoS Simulation

POST /dos

Allows 20 requests within a 5-second window.

Response: { "message": "Request successful", "requestCount": 15 }

If exceeded: { "error": "Too many requests. Try again later." }

## Usage Instructions

Navigate to http://localhost:5173 in your browser.

Use the UI to interact with encoding, hashing, and DoS attack simulation.

Observe responses and limits in real-time.

## Future Improvements

Implement user authentication.

Add a database for request tracking.

Enhance UI with animations.

## Contributors
 Nicole Savage - Developer

## License

This project is open-source and available under the MIT License.