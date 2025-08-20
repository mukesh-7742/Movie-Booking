import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

// Setup storage
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "movies", // folder name in Cloudinary
    allowed_formats: ["jpg", "png", "jpeg"],
  },
});

const upload = multer({ storage });

export default upload;
