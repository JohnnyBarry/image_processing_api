import sharp from 'sharp';

/**
 * @function : resize
 * @description: Resizes an image file at a given path to the width and height entered.
 *       
 * @param: filePath: The Path of the file.
 * @param: data: Data to be written to the file.
 * @param: width: The new width of the image.
 * @param: height: The new height of the image.
 * @returns: Promise object
 */
const resize = async (filePath: string, width: number, height: number): Promise<Buffer> => {
  return await sharp(filePath)
    .resize(width, height, { fit: 'cover' })
    .toBuffer();
};

export default { resize };
