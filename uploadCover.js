const AWS = require('aws-sdk');

// Configure AWS SDK with Filebase
const s3 = new AWS.S3({
    endpoint: "https://s3.filebase.com",
    accessKeyId: "5A1ADB3CB2508B4DACB9", // Replace with your actual keys
    secretAccessKey: "Fs2I2Q7gN1CQZ9A3Nf1NDP16CO4iFxpgdiglPFic",
    signatureVersion: "v4",
    region: "us-east-1",
});

async function uploadFile(bucketName, fileKey, filePath) {
    const fs = require('fs');
    
    try {
        const fileContent = fs.readFileSync(filePath); // Throws error if file doesn't exist
        const params = {
            Bucket: bucketName,
            Key: fileKey,
            Body: fileContent,
        };

        const data = await s3.upload(params).promise();
        console.log(`✅ File uploaded to IPFS: ${data.Location}`);
        console.log(`📌 CID: ${data.Metadata?.cid}`); // Filebase returns the CID automatically
        return data.Metadata?.cid;
    } catch (error) {
        console.error("❌ Error:", error.message);
        console.log("💡 Tip: Check if the file path is correct and the file exists.");
    }
}

// Upload the cover image (adjust paths as needed)
uploadFile("mobrahtombucket1", "MoRe-min.PNG", "./MoRe-min.PNG");