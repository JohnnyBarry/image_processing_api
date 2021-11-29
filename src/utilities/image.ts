import sharp from 'sharp';

const resize = async (inputfilePath: string, width: number, height: number) => {
  return await sharp(inputfilePath)
    .resize(width, height, { fit: 'cover' })
    .toBuffer();
};

export default { resize };
