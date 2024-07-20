import {RequestHandler} from "express";
import imageUpload from "../image-upload/multer";
import config from '../../config/index';
import s3 from '../../libs/s3Client';
import {DeleteObjectCommand} from "@aws-sdk/client-s3";
import ProductDao from '../../modules/products/dao/ProductDao';
import ProductModel from "../../modules/products/model/ProductModel";

const deleteImages = async (images: string[]) => {
    return  await Promise.all(images.map(async (key: string) => {
        return await s3.send(new DeleteObjectCommand({
            Bucket: config.aws.aws_bucket_name,
            Key: key
        }));
    })
)};

const imageUpdateDelete: RequestHandler = async (req, res, next) => {
    const productDao = new ProductDao(ProductModel);
    const oldProductData = await productDao.findProductById(req.params.id);

    if(req.method === 'PUT') {
        console.log("Updating images");
        imageUpload(req, res, async (err: any) => {
            if (err) {
                return res.status(500).json({ error: 'Error uploading images' });
            }

            let fileKeys: string[] = []
            if(req.files && req.files.length != 0) {
                const newFiles = req.files as Express.MulterS3.File[];
                fileKeys = newFiles?.map(file => (file.key)) || [];
            }

            const newProductData = JSON.parse(req.body.data);
            // Compare old image keys to the new ones and delete the ones that are not in the new list
            const deletedImages = oldProductData?.images.filter((image: string) => !newProductData.images.includes(image));

            try {
                if (deletedImages && deletedImages.length > 0) {
                    const data = deleteImages(deletedImages);
                    console.log("Success. Object deleted.", data);
                }

                // Attach new image keys to the request body
                newProductData.images = [...newProductData.images, ...fileKeys];
                req.body.data = JSON.stringify(newProductData);

                next();
            } catch (error) {
                return res.status(500).json({ message:"error updating images", error: error });
            }

        });
    } else {
        try {
            console.log("Deleting images");
            const data = deleteImages(oldProductData?.images || []);
            console.log("Success. Object deleted.", data);
            next();
        } catch (error) {
            return res.status(500).json({ message:"error deleting images", error: error });
        }
    }

}

export default imageUpdateDelete;
