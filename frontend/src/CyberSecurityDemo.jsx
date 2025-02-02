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
            setRequestCount(response.data.requestCount); //  Update UI with request count
            setErrorMessage("");
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


            <Card>
                <CardContent>
                    <div className="w3-twothird">
                        <h1 className="text-lg font-semibold">Confidentiality</h1>
                        <h5 className="w3-padding-32"> Ensuring that information is accessible only to those authorized
                            to see it.
                            It involves protecting data from unauthorized access or disclosure.</h5>
                        <p className="w3-text-grey">The app demonstrates confidentiality through Base64 encoding/decoding.
                            When you encode a piece of text (e.g., "HelloWorld"), it gets transformed into a string like SGVsbG8gV29ybGQ=. While Base64 is not encryption (it's easily reversible), it simulates the process of obfuscating data to protect its content.
                            Purpose: This shows how data can be encoded to restrict visibility to unauthorized users unless they have the means to decode it.</p>
                    </div>
                    <div className="w3-third w3-center w3-padding-64 w3-text-red">

                        <Input value={text} onChange={(e) => setText(e.target.value)} placeholder="Enter text"/>
                        <Button onClick={handleEncode}>Encode</Button>
                        <p>Encoded: {encoded}</p>
                        <Button onClick={handleDecode}>Decode</Button>
                        <p>Decoded: {decoded}</p>

                    </div>
                    <div className="w3-container w3-padding-64"></div>


                </CardContent>
            </Card>


            <Card>
                    <CardContent>
                        <div className="w3-row-padding w3-light-grey w3-padding-64 w3-container">
                            <div className="w3-content">
                                <div className="w3-third">
                                    <div className="w3-padding-64 w3-text-red w3-margin-right">
                                        <Button onClick={handleHash}>Generate Hash</Button>
                                        {/* The hash-text class is added here */}
                                        <div>
                                            <p className="w3-wrap hash-text">Hash: {hash}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="w3-twothird">
                                    <h1>Integrity</h1>
                                    <h5 className="w3-padding-32">
                                        Ensuring that data is accurate, consistent, and has not been altered or tampered
                                        with during transmission or storage.
                                    </h5>
                                    <p className="w3-text-grey">The app demonstrates integrity by using SHA-256 hashing.
                                        When you hash a text input (e.g., "HelloWorld"), the app generates a fixed-length hash (e.g., fc5e038d38a57032085441e7fe7010b0d7d6d65d332c6c4b589e1f51e07256d4).
                                        Even a single small change to the text (e.g., "Helloworld" instead of "HelloWorld") produces a completely different hash.
                                        This illustrates how data integrity can be verified. If the hash of the original data and the hash of the received data don't match, it means the data has been tampered with.</p>


                                </div>
                            </div>

                        </div>

                    </CardContent>
            </Card>

            <Card>
                <CardContent>
                    <div className="w3-container w3-padding-32"></div>
                    <div className="w3-twothird">
                        <h1 className="text-lg font-semibold">Availibility</h1>
                        <h5 className="w3-padding-32">Ensuring that data and systems are accessible to authorized users
                            whenever needed.
                            It involves protecting systems from disruptions such as denial-of-service (DoS)
                            attacks.</h5>
                        <p className="w3-text-grey">The app demonstrates availability by simulating a DoS
                            (Denial-of-Service) attack.
                            A DoS attack involves overwhelming a server with too many requests, making it unavailable to
                            legitimate users.
                            The app restricts excessive requests to the /dos endpoint (e.g., no more than 20 requests in
                            5 seconds) to simulate how availability can be protected in a real-world scenario.
                            This shows how limiting requests ensures a system remains functional and accessible even
                            under heavy traffic.
                        </p>
                    </div>
                    <div className="w3-third w3-center  w3-padding-64 w3-text-red">
                        <Button onClick={handleDoSRequest}>Send Request</Button>
                        <p>Requests Sent: {requestCount}</p>
                        {errorMessage && <p className="text-red-500">{errorMessage}</p>}

                    </div>


                </CardContent>
            </Card>
        </div>
    );
            }
