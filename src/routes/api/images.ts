import express from 'express';
import path from 'path';
import { RequestHandler } from 'express';
import validateUtility from '../../utilities/validate';
import imageUtility from '../../utilities/image';
import fileUtility from '../../utilities/file';

const images = express.Router();
const __images_dirname = path.join(path.resolve(), '/assets/images/');

// middleware function
const validateParams: RequestHandler = (req, res, next): void => {
  const filename = req.query.filename as string;
  const width = req.query.width as string;
  const height = req.query.height as string;

  if (!filename) {
    res.status(400).send({ error: 'filename is required!' });
    return;
  }

  if (width && !height) {
    res
      .status(400)
      .send({ error: 'Height Param Must Be Passed When Using Width' });
    return;
  }

  if (height && !width) {
    res
      .status(400)
      .send({ error: 'Width Param Must Be Passed When Using Height' });
    return;
  }

  if (width && !validateUtility.isNumeric(width)) {
    res.status(400).send({ error: 'Width Must Be A Number!' });
    return;
  }

  if (height && !validateUtility.isNumeric(height)) {
    res.status(400).send({ error: 'Height Must Be A Number!' });
    return;
  }

  next();
};

images.get(
  '/',
  validateParams,
  (req: express.Request, res: express.Response) => {
    const filename = req.query.filename as string;
    const width = req.query.width as string;
    const height = req.query.height as string;

    if (filename) {
      const rootPath = path.join(__images_dirname, filename);
      const fullFilePath = path.join(rootPath, `${filename}.jpg`);
      fileUtility
        .hasReadAccess(fullFilePath)
        .then(() => {
          if (width && height) {
            const processedFileName = `${filename}_${width}W_${height}H.jpg`;
            const processedFilePath = path.join(rootPath, processedFileName);

            fileUtility
              .hasReadAccess(processedFilePath)
              .then(() => {
                const options = {
                  root: rootPath
                };
                res.sendFile(processedFileName, options, (err: Error) => {
                  if (err) {
                    res
                      .status(404)
                      .send({ error: 'Processed Image Could Not Be Sent!' });
                  }
                });
              })
              .catch((err: Error) => {
                imageUtility
                  .resize(fullFilePath, parseInt(width), parseInt(height))
                  .then((buffer) => {
                    res.type(`image/jpeg`);
                    res.send(buffer);
                    // Save the file for future.
                    fileUtility
                      .writeData(processedFilePath, buffer)
                      .then(() => {});
                  })
                  .catch((err) => {
                    res.status(500).send({ error: 'Error Resizing Image!' });
                  });
              });
          } else {
            const options = {
              root: rootPath
            };
            res.sendFile(`${filename}.jpg`, options, (err: Error) => {
              if (err) {
                res
                  .status(404)
                  .send({ error: 'Full Image Could Not Be Sent!' });
              }
            });
          }
        })
        .catch((err: Error) => {
          console.log(err);          
          res.status(404).send({ error: 'Full Image Not Found!' });
        });
    }
  }
);

export default images;
