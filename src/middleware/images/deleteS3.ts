import s3 from '../../libs/s3Client';
import { DeleteObjectCommand } from '@aws-sdk/client-s3';
import { Error } from 'mongoose';
import { RequestHandler } from 'express';
import ProductDao from '../../modules/products/dao/ProductDao';
import ProductModel from '../../modules/products/model/ProductModel';

export const deleteImagesFromBucket = async (images: string[]) => {
  try {
    const results = await Promise.all(
      images.map(async (key: string) => {
        return await s3.send(
          new DeleteObjectCommand({
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: key,
          }),
        );
      }),
    );

    // Check for any unsuccessful delete operations
    const failedDeletes = results.filter(
      (result) => result.$metadata.httpStatusCode !== 204,
    );
    if (failedDeletes.length > 0) {
      throw new Error(
        `Failed to delete some images: ${JSON.stringify(failedDeletes)}`,
      );
    }

    console.log('Success. All images deleted.');
    return results;
  } catch (error: any) {
    throw new Error(`Error deleting images: ${error.message}`);
  }
};

const deleteImages: RequestHandler = async (req, res, next) => {
  try {
    const productDao = new ProductDao(ProductModel);
    const oldProductData = await productDao.findProductById(req.params.id);

    await deleteImagesFromBucket(oldProductData?.images || []);
    next();
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Error deleting images', error: error });
  }
};

export default deleteImages;
