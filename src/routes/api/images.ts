import express from 'express';
import path from 'path';
import imagesMiddleware from '../middleware/images';
import imageUtility from '../../utilities/image';
import fileUtility from '../../utilities/file';

const images = express.Router();
const __full_images_dirname = path.join(path.resolve(), '/assets/images/full/');
const __thumb_images_dirname = path.join(
  path.resolve(),
  '/assets/images/thumbnail/'
);
const __image_format = '.jpg';

/**
 * @description: Api endpoint 'images/' Request handler.
 * It will return the original image if only the filename parameter is passed in and the file is available.
 * If width and height parmeters are also passed in,
 * It first checks if the file exists in cache. If so, it'll be returned in the response.
 * If it's not in cache it's resized and sent back in the response. The file is stored in cache for future use.
 *
 */

images.get(
  '/',
  imagesMiddleware.validateParams,
  (req: express.Request, res: express.Response) => {
    const filename = req.query.filename as string;
    const width = req.query.width as string;
    const height = req.query.height as string;
    if (filename) {
      const fullImgFilePath = path.join(
        __full_images_dirname,
        `${filename}${__image_format}`
      );
      fileUtility
        .hasReadAccess(fullImgFilePath)
        .then(() => {
          if (width && height) {
            const processedImgFileName = `${filename}_${width}W_${height}H${__image_format}`;
            const processedImgFilePath = path.join(
              __thumb_images_dirname,
              processedImgFileName
            );

            fileUtility
              .hasReadAccess(processedImgFilePath)
              .then(() => {
                const options = {
                  root: __thumb_images_dirname
                };
                res.sendFile(processedImgFileName, options, (err: Error) => {
                  if (err) {
                    res
                      .status(404)
                      .send({ error: 'Processed Image Could Not Be Sent!' });
                  }
                });
              })
              .catch(() => {
                imageUtility
                  .resize(fullImgFilePath, parseInt(width), parseInt(height))
                  .then((buffer) => {
                    res.type(`image/jpeg`);
                    res.send(buffer);
                    fileUtility.writeData(processedImgFilePath, buffer);
                  })
                  .catch(() => {
                    res.status(500).send({ error: 'Error Resizing Image!' });
                  });
              });
          } else {
            const options = {
              root: __full_images_dirname
            };
            res.sendFile(
              `${filename}${__image_format}`,
              options,
              (err: Error) => {
                if (err) {
                  res
                    .status(404)
                    .send({ error: 'Full Image Could Not Be Sent!' });
                }
              }
            );
          }
        })
        .catch(() => {
          res.status(404).send({ error: 'Full Image Not Found!' });
        });
    }
  }
);

export default images;
