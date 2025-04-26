const axios = require("axios");

const API_KEY = "6d9586dc598cb3f5153a"; // Ensure this is in quotes
const API_SECRET = "2f21e0a0ac00e68453481da7037030c1d737ae1b61cece8eba761b591786cf1e"; // Ensure this is in quotes
const CID = "6d9586dc598cb3f5153a"; // Replace with the actual CID of your file

const pinCID = async () => {
    try {
        const response = await axios.post(
            "https://api.pinata.cloud/pinning/pinByHash",
            { hashToPin: CID },
            { headers: { pinata_api_key: API_KEY, pinata_secret_api_key: API_SECRET } }
        );
        console.log("✅ Pinned Successfully:", response.data);
    } catch (error) {
        console.error("❌ Error:", error.response.data);
    }
};

pinCID();
