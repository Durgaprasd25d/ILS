const env = import.meta.env.VITE_NODE_ENV || "development";

export const API_URL =
  env === "production"
    ? import.meta.env.VITE_API_URL_PROD
    : import.meta.env.VITE_API_URL_DEV;

export const IMAGE_BASE_URL =
  env === "production"
    ? import.meta.env.VITE_IMAGE_BASE_URL_PROD
    : import.meta.env.VITE_IMAGE_BASE_URL_DEV;

console.log(`[Admin Config] Operating in ${env} mode`);
console.log(`[Admin Config] API URL: ${API_URL}`);

/**
 * Constructs a fully qualified image URL.
 * Handles both local paths and absolute Cloudinary URLs.
 * @param {string} path - The image path or absolute URL.
 * @param {object} options - Optional Cloudinary transformations.
 * @returns {string} - The processed image URL.
 */
export const getImageUrl = (path, options = {}) => {
  if (!path) return "";

  // If it's already an absolute URL (Cloudinary)
  if (path.startsWith("http")) {
    // Inject optimization parameters for Cloudinary if not present
    if (path.includes("cloudinary.com") && !path.includes("/q_auto")) {
      const parts = path.split("/upload/");
      if (parts.length === 2) {
        // High clarity (q_auto), auto format (f_auto), with a reasonable width if provided
        const transform = `q_auto,f_auto${options.width ? `,w_${options.width}` : ""}`;
        return `${parts[0]}/upload/${transform}/${parts[1]}`;
      }
    }
    return path;
  }

  // Local path
  return `${IMAGE_BASE_URL}${path}`;
};
