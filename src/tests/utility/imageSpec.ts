import imageUtility from '../../utilities/image';
import path from 'path';
const __images_dirname = path.join(path.resolve(), '/assets/images/full');

describe('Image Utility Tests', () => {
  describe('Resize Image Tests', () => {
    it('Resizing a valid image file returns a buffer of length > 0', async () => {
      const validImgFilePath = path.join(
        __images_dirname,
        'fjord.jpg'
      );

      imageUtility.resize(validImgFilePath, 300, 300).then((buffer) => {      
        expect(buffer.length).toBeGreaterThan(0);
      }).catch((err) => {
        fail(err);
      });
    });

    it('Resizing an invalid image file returns a rejected promise with error "Input file is missing"', async () => {
      const invalidImgFilePath = path.join(
        __images_dirname,
        'fjord',
        'fjord_test.jpg'
      );
      await expectAsync(
        imageUtility.resize(invalidImgFilePath, 300, 300)
      ).toBeRejectedWithError('Input file is missing');
    });
  });
});
