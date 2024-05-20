const { Storage } = require("@google-cloud/storage");

const storage = new Storage();

const bucketName = 'new-buckets-mlgc';
const filePath = './image/dicoding-header-logo.png';

async function getOrCreateBucket(bucketName) {
    const bucket = storage.bucket(bucketName);
    try {
        // Mendapatkan informasi jika ada.
        const [metadata] = await bucket.getMetadata();
        console.log(`Bucket ${metadata.name} sudah tersedia!`);
        return bucket;
    } catch (error) {
        const optionsCreateBukcet = {
                location: 'ASIA-SOUTHEAST2'

            }
            // Create Bukcet

        await storage.createBucket(bucketName, optionsCreateBukcet);
        console.log(`${bucketName} bucket created successfully`);
        return bucket;
    }
}

async function upload(bucket) {
    try {
        const customMetadata = {
            contentType: 'image/jpeg',
            metadata: {
                type: "header-logo"
            }
        };

        const optionsUploadObject = {
            destination: 'dicoding-header-logo.png',
            metadata: customMetadata
        };

        await storage.bucket(bucketName).upload(filePath, optionsUploadObject);
        console.log(`${filePath} uploaded to ${bucketName} bucket`);
    } catch (uploadError) {
        console.log(`Gagal mengupload ${filePath}:`, uploadError.message);
    }
}

getOrCreateBucket(bucketName).then((bucket) => upload(bucket)).catch(console.error)