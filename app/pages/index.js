"use client";

import { useState } from "react";

export default function Home() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchIPInfo = async () => {
        setLoading(true);
        try {
            const response = await fetch("/api/getIP");
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const result = await response.json();
            setData(result);
        } catch (error) {
            console.error("Error fetching IP info:", error);
            setData({ error: "Failed to fetch data" });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center">
            <h1 className="text-2xl font-bold mb-4">Get Your IP & Location</h1>
            <button
    onClick={fetchIPInfo}
    className=" rounded-md text-lg text-blue-800 transition flex items-center justify-center"
>
    {loading ? (
        <img
            src="/loading.svg"
            alt="Loading..."
            className="w-8 h-8 animate-spin"
        />
    ) : (
        "Get Info"
    )}
</button>

            {data && (
                <div className="mt-4 p-4 shadow-md rounded-md">
                    {data.error ? (
                        <p className="text-red-500">{data.error}</p>
                    ) : (
                        <>
                            <p><strong>IP Address:</strong> {data.ip}</p>
                            <p><strong>Country:</strong> {data.country}</p>
                            <p><strong>City:</strong> {data.city}</p>
                        </>
                    )}
                </div>
            )}
        </div>
    );
}
