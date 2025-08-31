const axios = require("axios");

module.exports = async (req, res) => {
    const links = process.env.API_LINKS
        ? process.env.API_LINKS.split(",").map(l => l.trim())
        : [];

    if (links.length === 0) {
        return res.json({ status: "no links found" });
    }

    const results = [];

    for (const link of links) {
        try {
            const resp = await axios.get(link);
            results.push({ link, status: resp.status });
        } catch (err) {
            results.push({ link, error: err.message });
        }
    }

    return res.json({ time: new Date().toISOString(), results });
};
