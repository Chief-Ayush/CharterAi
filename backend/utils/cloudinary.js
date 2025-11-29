const cloudinary = require("cloudinary").v2;

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Upload PDF file buffer to Cloudinary
 * @param {Buffer} fileBuffer - The PDF file buffer
 * @returns {Promise<{url: string, publicId: string}>} - Secure URL and public ID
 */
const uploadPDF = async (fileBuffer) => {
  try {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          resource_type: "raw",
          folder: "charter-ai-documents",
          format: "pdf",
        },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve({
              url: result.secure_url,
              publicId: result.public_id,
            });
          }
        }
      );
      uploadStream.end(fileBuffer);
    });
  } catch (error) {
    throw new Error(`Cloudinary upload failed: ${error.message}`);
  }
};

/**
 * Delete file from Cloudinary by public ID
 * @param {string} publicId - The public ID of the file to delete
 * @returns {Promise<Object>} - Deletion result
 */
const deleteFile = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: "raw",
    });
    return result;
  } catch (error) {
    throw new Error(`Cloudinary deletion failed: ${error.message}`);
  }
};

module.exports = {
  uploadPDF,
  deleteFile,
};
