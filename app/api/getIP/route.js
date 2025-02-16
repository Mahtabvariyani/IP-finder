export async function GET() {
    try {
        // Get the user's IP address (supports IPv6)
        const ipRes = await fetch("https://api64.ipify.org?format=json");
        const { ip } = await ipRes.json();

        // Fetch location data using ipwho.is (no API key required)
        const locationRes = await fetch(`https://ipwho.is/${ip}`);
        const locationData = await locationRes.json();

        return Response.json({
            ip,
            country: locationData.country || "Unknown",
            city: locationData.city || "Unknown",
        });
    } catch (error) {
        return Response.json({ error: "Failed to fetch IP info" }, { status: 500 });
    }
}
