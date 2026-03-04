const cloudinary = require("cloudinary").v2;
const config = require("../config/config");

// Configure Cloudinary
cloudinary.config({
  cloud_name: config.cloudinary.cloud_name,
  api_key: config.cloudinary.api_key,
  api_secret: config.cloudinary.api_secret,
});

/**
 * Uploads a file to Cloudinary with optimization
 * @param {Buffer} fileBuffer - The file buffer to upload
 * @param {String} folder - Cloudinary folder name
 * @returns {Promise} - Cloudinary upload result
 */
exports.uploadImage = (fileBuffer, folder = "interiq") => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: folder,
        resource_type: "auto",
        // Performance optimization:
        // q_auto: automated quality based on image content
        // f_auto: automated format (webp/avif where supported)
        transformation: [{ quality: "auto", fetch_format: "auto" }],
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      },
    );
    uploadStream.end(fileBuffer);
  });
};

/**
 * Deletes an image from Cloudinary
 * @param {String} publicId - The public_id of the image to delete
 * @returns {Promise} - Cloudinary deletion result
 */
exports.deleteImage = async (publicId) => {
  try {
    if (!publicId) return null;
    const result = await cloudinary.uploader.destroy(publicId);
    return result;
  } catch (error) {
    console.error("Cloudinary Delete Error:", error);
    throw error;
  }
};

/**
 * Extracts public_id from a Cloudinary URL
 * @param {String} url - The Cloudinary URL
 * @returns {String|null} - The public_id
 */
exports.getPublicIdFromUrl = (url) => {
  if (!url || !url.includes("cloudinary.com")) return null;
  const parts = url.split("/");
  const lastPart = parts[parts.length - 1];
  const folderPart = parts[parts.length - 2];
  const publicIdWithExtension = `${folderPart}/${lastPart}`;
  return publicIdWithExtension.split(".")[0];
};
