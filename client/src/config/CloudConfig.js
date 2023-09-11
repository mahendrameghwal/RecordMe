import cloudinary from 'cloudinary-core';

const cloudinaryConfig = cloudinary.Cloudinary.new({
  cloud_name: import.meta.env.VITE_CLOUD_NAME,
  api_key: import.meta.env.VITE_API_LEY,
  api_secret:  import.meta.env.VITE_API_SECERET,
});

export default cloudinaryConfig;
