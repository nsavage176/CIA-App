import React from "react";
import CyberSecurityDemo from "./CyberSecurityDemo";

export default function App() {
    return (
        <>

            {/* Header */}
            <header className="w3-container w3-red w3-center" style={{ padding: "128px 200px" }}>
                <h1 className="w3-margin w3-jumbo">Cybersecurity Principles Demo</h1>
                <p className="w3-xlarge">Learn Confidentiality, Integrity, and Availability!</p>
            </header>

            {/* Main Content */}
            <div className="w3-container w3-padding-64">
                <CyberSecurityDemo />
            </div>


        </>
    );
}