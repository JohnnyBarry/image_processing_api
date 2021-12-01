import FileUtility from '../../utilities/file';
import path from 'path';
const __full_images_dirname = path.join(path.resolve(), '/assets/images/full/');
const __tests_dirname = path.join(path.resolve(), '/test_data/fileSpec/');

describe('File Utility Tests', () => {
  describe('writeData Tests', () => {
    it('WriteData returns a resolved promise', async () => {
      const filePath = path.join(__tests_dirname, 'writeData.txt');
      await expectAsync(
        FileUtility.writeData(filePath, 'Testing')
      ).toBeResolved();
    });

    it('WriteData returns a rejected promise', async () => {
      const filePath = path.join(__tests_dirname, 'reject', 'writeData.txt');
      await expectAsync(
        FileUtility.writeData(filePath, 'Testing')
      ).toBeRejected();
    });
  });

  describe('hasReadAccess Tests', () => {
    it('Have Read Access To Image File fjord.jpg', async () => {
      const filePath = path.join(__full_images_dirname, 'fjord.jpg');
      await expectAsync(FileUtility.hasReadAccess(filePath)).toBeResolved();
    });

    it("Don't Have Read Access To Image File test/test.jpg", async () => {
      const filePath = path.join(__full_images_dirname, 'test.jpg');
      await expectAsync(FileUtility.hasReadAccess(filePath)).toBeRejected();
    });
  });
});
