import AWS from 'aws-sdk';

// Configure AWS SDK with Filebase
const s3 = new AWS.S3({
    endpoint: "https://s3.filebase.com",
    accessKeyId: "5A1ADB3CB2508B4DACB9", // Replace with your Filebase access key
    secretAccessKey: "Fs2I2Q7gN1CQZ9A3Nf1NDP16CO4iFxpgdiglPFic", // Replace with your Filebase secret key
    signatureVersion: "v4",
    region: "us-east-1", // Filebase requires a region
});

// Function to get CID of a file
async function getCID(bucketName, fileKey) {
    try {
        const params = {
            Bucket: bucketName,
            Key: fileKey,
        };

        // Get object metadata
        const data = await s3.headObject(params).promise();
        console.log("File Metadata:", data);

        // Extract CID from metadata
        const cid = data.Metadata["cid"];
        if (cid) {
            console.log("CID of the file:", cid);
        } else {
            console.error("CID not found in metadata.");
        }
    } catch (error) {
        console.error("Error retrieving CID:", error);
    }
}

// Replace with your bucket name and file key
getCID("mobrahtombucket1", "tokenMusic.mp4");