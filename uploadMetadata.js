const AWS = require('aws-sdk');
const fs = require('fs');
const path = require('path');

// Configure AWS SDK with YOUR Filebase credentials
const s3 = new AWS.S3({
    endpoint: "https://s3.filebase.com",
    accessKeyId: "5A1ADB3CB2508B4DACB9", // Your actual Filebase access key
    secretAccessKey: "Fs2I2Q7gN1CQZ9A3Nf1NDP16CO4iFxpgdiglPFic", // Your actual Filebase secret key
    signatureVersion: "v4",
    region: "us-east-1",
});

// Your Filebase bucket name and paths
const bucketName = "mobrahtombucket1"; // Your bucket
const metadataFilePath = path.join(__dirname, 'metadata', 'metadata.json'); // Path to your metadata.json
const filebaseKey = "metadata.json"; // Name in Filebase

async function uploadMetadata() {
    try {
        // Read the metadata file
        const fileContent = fs.readFileSync(metadataFilePath);

        // Upload to Filebase
        const params = {
            Bucket: bucketName,
            Key: filebaseKey,
            Body: fileContent,
            ContentType: "application/json", // Critical for proper rendering
        };

        const data = await s3.upload(params).promise();
        console.log("✅ Metadata uploaded to Filebase!");
        console.log("🔗 URL:", data.Location);
        
        // Get CID from Filebase Web UI (script may not return it)
        console.log("\n⚠️  If CID isn't shown below, get it manually:");
        console.log("1. Go to https://console.filebase.com/");
        console.log("2. Navigate to bucket 'mobrahtombucket1'");
        console.log("3. Find 'metadata.json' → Click 'View IPFS CID'");
        
        if (data.Metadata?.cid) {
            console.log("\n🆔 IPFS CID:", data.Metadata.cid);
            console.log("💡 Use this in your contract:");
            console.log(`ipfs://${data.Metadata.cid}/metadata.json`);
        }
    } catch (error) {
        console.error("❌ Upload failed:", error.message);
        console.log("💡 Check:");
        console.log("- Is 'metadata.json' in the 'metadata' folder?");
        console.log("- Are your Filebase keys/bucket name correct?");
    }
}

// Run the upload
uploadMetadata();