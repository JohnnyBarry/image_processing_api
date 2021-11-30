import express from 'express';
import path from 'path';
import imagesMiddleware from '../middleware/images';
import imageUtility from '../../utilities/image';
import fileUtility from '../../utilities/file';

const images = express.Router();
const __images_dirname = path.join(path.resolve(), '/assets/images/');
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
      const rootPath = path.join(__images_dirname, filename);
      const origImgFilePath = path.join(
        rootPath,
        `${filename}${__image_format}`
      );
      fileUtility
        .hasReadAccess(origImgFilePath)
        .then(() => {
          if (width && height) {
            const processedImgFileName = `${filename}_${width}W_${height}H${__image_format}`;
            const processedImgFilePath = path.join(
              rootPath,
              processedImgFileName
            );

            fileUtility
              .hasReadAccess(processedImgFilePath)
              .then(() => {
                const options = {
                  root: rootPath
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
                  .resize(origImgFilePath, parseInt(width), parseInt(height))
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
              root: rootPath
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
