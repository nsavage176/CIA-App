// src/CyberSecurityDemo.jsx
import React, { useState } from "react";
import { Button } from "./components/Button";
import { Input } from "./components/Input";
import { Card, CardContent } from "./components/Card";
import axios from "axios";

export default function CyberSecurityDemo() {
    const [text, setText] = useState("");
    const [encoded, setEncoded] = useState("");
    const [decoded, setDecoded] = useState("");
    const [hash, setHash] = useState("");
    const [tampered, setTampered] = useState(false);
    const [requestCount, setRequestCount] = useState(0);
    const [errorMessage, setErrorMessage] = useState(""); // ✅ Stores error messages

    const handleEncode = () => setEncoded(btoa(text));
    const handleDecode = async () => {
        const response = await axios.post("http://localhost:5000/decode", { encodedText: encoded });
        setDecoded(response.data.decodedText);
    };

    const handleHash = async () => {
        const response = await axios.post("http://localhost:5000/hash", { text });
        setHash(response.data.hash);
    };

    const handleDoSRequest = async () => {
        try {
            const response = await axios.post("http://localhost:5000/dos");
            setRequestCount(response.data.requestCount); // ✅ Update UI with request count
            setErrorMessage(""); // ✅ Clear previous errors
        } catch (error) {
            if (error.response && error.response.status === 429) {
                setErrorMessage("Too many requests! Try again in a few seconds.");
            } else {
                setErrorMessage("An error occurred. Please try again later.");
            }
        }
    };
    return (
        <div className="flex flex-col items-center p-6">
            <h1 className="text-2xl font-bold">Cybersecurity Principles Demo</h1>

            <Card>
                <CardContent>
                    <h2 className="text-lg font-semibold">Confidentiality</h2>
                    <Input value={text} onChange={(e) => setText(e.target.value)} placeholder="Enter text" />
                    <Button onClick={handleEncode}>Encode</Button>
                    <p>Encoded: {encoded}</p>
                    <Button onClick={handleDecode}>Decode</Button>
                    <p>Decoded: {decoded}</p>
                </CardContent>
            </Card>

            <Card>
                <CardContent>
                    <h2 className="text-lg font-semibold">Integrity</h2>
                    <Button onClick={handleHash}>Generate Hash</Button>
                    <p>Hash: {hash}</p>
                </CardContent>
            </Card>

            <Card>
                <CardContent>
                    <h2 className="text-lg font-semibold">Availability</h2>
                    <Button onClick={handleDoSRequest}>Send Request</Button>
                    <p>Requests Sent: {requestCount}</p>
                    {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                </CardContent>
            </Card>
        </div>
    );
}
