const cloudinary = require('cloudinary').v2;

const initCloudinary = () => {
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
    });
}

const uploadImage = async (file) => {
    const image = file;
    const base64Image = Buffer.from(image.buffer).toString("base64");
    const dataURI = `data:${image.mimetype};base64,${base64Image}`;
    const { secure_url } = await cloudinary.uploader.upload(dataURI);

    return secure_url
}

module.exports = { uploadImage, initCloudinary };
