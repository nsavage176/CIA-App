// src/components/Input.jsx
import React from "react";

export function Input({ value, onChange, placeholder }) {
    return (
        <input
            className="p-2 border rounded w-full mb-2"
            value={value}
            onChange={onChange}
            placeholder={placeholder}
        />
    );
}
