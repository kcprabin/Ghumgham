import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config({
  path: "./.env",
});

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME as string,
  api_key: process.env.CLOUDINARY_API_KEY as string,
  api_secret: process.env.CLOUDINARY_API_SECRET as string,
});

const uploadVideoToCloudinary = async (data: any) => {
  try {
    const result = await cloudinary.uploader.upload(data.filePath, {
      resource_type: "auto",
      notification_url: "https://mysite.com/notify_endpoint",
      use_filename: true,
      unique_filename: false,
    });
    return result.url;
  } catch (error: any) {
    console.log("Error uploading video to Cloudinary:", error);
  }
};

export { uploadVideoToCloudinary };
