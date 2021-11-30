import FileUtility from '../../utilities/file';
import path from 'path';
const __images_dirname = path.join(path.resolve(), '/assets/images/');

describe('File Utility Tests', () => {
  it('Have Read Access To Image File fjord/fjord.jpg', async () => {
    const filePath = path.join(__images_dirname, 'fjord', 'fjord.jpg');
    await expectAsync(FileUtility.hasReadAccess(filePath)).toBeResolved();
  });

  it("Don't Have Read Access To Image File test/test.jpg", async () => {
    const filePath = path.join(__images_dirname, 'test', 'test.jpg');
    await expectAsync(FileUtility.hasReadAccess(filePath)).toBeRejected();
  });
});
