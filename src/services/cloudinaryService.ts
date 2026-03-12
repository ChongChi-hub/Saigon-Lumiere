import axios from 'axios';

const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

// Rest API endpoint for Cloudinary image uploads
const CLOUDINARY_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

export type CloudinaryFolder = 
  | 'SaigonLumiere/Categories' 
  | 'SaigonLumiere/MenuItems' 
  | 'SaigonLumiere/Users';

/**
 * Uploads an image file to Cloudinary directly from the browser (unsigned).
 * @param file The File object to upload
 * @param folder The target folder path in Cloudinary
 * @returns A Promise resolving to the secure URL (https) string of the uploaded image
 */
export const uploadImageToCloudinary = async (file: File, folder: CloudinaryFolder): Promise<string> => {
    if (!CLOUD_NAME || !UPLOAD_PRESET) {
        throw new Error("Missing Cloudinary configuration (Check .env file keys)");
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', UPLOAD_PRESET);
    formData.append('folder', folder);

    try {
        const response = await axios.post(CLOUDINARY_URL, formData, {
            headers: {
                // Cloudinary expects multipart/form-data for files
                'Content-Type': 'multipart/form-data',
            },
        });
        
        return response.data.secure_url;
    } catch (error) {
        console.error("Error uploading image to Cloudinary:", error);
        throw error;
    }
};

// Ready-to-use helpers for specific project structures
export const uploadCategoryPhoto = (file: File) => uploadImageToCloudinary(file, 'SaigonLumiere/Categories');
export const uploadMenuItemPhoto = (file: File) => uploadImageToCloudinary(file, 'SaigonLumiere/MenuItems');
export const uploadUserAvatarPhoto = (file: File) => uploadImageToCloudinary(file, 'SaigonLumiere/Users');
