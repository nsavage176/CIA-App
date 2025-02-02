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


            <Card>
                <CardContent>
                    <div className="w3-twothird">
                        <h1 className="text-lg font-semibold">Confidentiality</h1>
                        <h5 className="w3-padding-32">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                            nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</h5>
                    </div>
                    <div className="w3-third w3-center w3-padding-64 w3-text-red">

                        <Input value={text} onChange={(e) => setText(e.target.value)} placeholder="Enter text"/>
                        <Button onClick={handleEncode}>Encode</Button>
                        <p>Encoded: {encoded}</p>
                        <Button onClick={handleDecode}>Decode</Button>
                        <p>Decoded: {decoded}</p></div>



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
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                                            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                                            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                                            commodo consequat.
                                        </h5>
                                    </div>
                                </div>
                            </div>

                        </CardContent>
                    </Card>

            <Card>
                <CardContent>
                    <div className="w3-twothird">
                        <h1 className="text-lg font-semibold">Availibility</h1>
                        <h5 className="w3-padding-32">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                            nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</h5>
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
