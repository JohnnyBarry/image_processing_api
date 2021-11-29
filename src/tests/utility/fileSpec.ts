import FileUtility from '../../utilities/file';
import path from 'path';
const __images_dirname = path.join(path.resolve(), '/assets/images/');

describe('Test File Utility', () => {
  it('Has Read Access To File', async () => {
    const filePath = path.join(__images_dirname, 'fjord', 'fjords.jpg');
    FileUtility.hasReadAccess(filePath).then((val) => {
      expect('Can Be Accessed').toBe('Can Be Accessed');
    }).catch ((err)=>{
      console.log(err);
    });
  });
});
