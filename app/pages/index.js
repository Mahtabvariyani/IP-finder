"use client";

import { useState } from "react";

export default function Home() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchIPInfo = async () => {
        setLoading(true);
        try {
            // Fetch the IP of the client from a client-side service
            const ipRes = await fetch("https://api64.ipify.org?format=json");
            const { ip } = await ipRes.json();

            // Now fetch the location info using the client's IP
            const locationRes = await fetch(`https://ipwho.is/${ip}`);
            const locationData = await locationRes.json();

            setData({
                ip: locationData.ip,
                country: locationData.country || "Unknown",
                city: locationData.city || "Unknown",
            });
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
                className="text-blue-700 text-lg rounded-md  transition"
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
