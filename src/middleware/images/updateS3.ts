import { RequestHandler } from 'express';
import ProductDao from '../../modules/products/dao/ProductDao';
import ProductModel from '../../modules/products/model/ProductModel';
import { deleteImagesFromBucket } from './deleteS3';
import upload from './multer';

const updateS3: RequestHandler = async (req, res, next) => {
  try {
    upload(req, res, async (err: any) => {
      if (err) {
        return res.status(500).json({ error: 'Error uploading images' });
      }

      const productDao = new ProductDao(ProductModel);
      const oldProductData = await productDao.findProductById(req.params.id);

      if (!oldProductData) {
        return res.status(404).json({ message: 'Product not found' });
      }

      let fileKeys: string[] = [];
      if (req.files && req.files.length !== 0) {
        const newFiles = req.files as Express.MulterS3.File[];
        fileKeys = newFiles?.map((file) => file.key) || [];
      }
      const newProductData = JSON.parse(req.body.data);
      // Compare old image keys to the new ones and delete the ones that are not in the new list
      const deletedImages = oldProductData?.images.filter(
        (image: string) => !newProductData.images.includes(image),
      );

      if (deletedImages && deletedImages.length > 0) {
        await deleteImagesFromBucket(deletedImages);
      }

      // Attach new image keys to the request body
      newProductData.images = [...newProductData.images, ...fileKeys];
      req.body.data = JSON.stringify(newProductData);

      next();
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Error updating images', error: error });
  }
};

export default updateS3;
