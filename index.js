const dotenv = require("dotenv");
const axios = require("axios");
const cron = require("node-cron");


dotenv.config();

// Load links from .env (comma separated)
function getApiLinks() {
    if (!process.env.API_LINKS) return [];
    return process.env.API_LINKS.split(",").map((link) => link.trim());
}

// Function to hit all links
async function hitApis() {
    const links = getApiLinks();

    if (links.length === 0) {
        console.log("⚠️ No API links found in .env");
        return;
    }

    console.log(`\n🔄 Hitting ${links.length} APIs at ${new Date().toLocaleTimeString()}`);

    for (const link of links) {
        try {
            const res = await axios.get(link);
            console.log(`✅ ${link} -> Status ${res.status}`);
        } catch (err) {
            console.error(`❌ ${link} ->`, err.message);
        }
    }
}

// Schedule every minute
cron.schedule("* * * * *", hitApis);

console.log("🚀 API Pinger started. Links from .env will be hit every minute.");
