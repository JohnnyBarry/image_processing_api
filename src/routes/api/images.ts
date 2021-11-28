import express from 'express';
import path from 'path';
import { RequestHandler } from 'express';
import ValidateUtility from '../../utilities/validateUtility';

const images = express.Router();
const __images_dirname =
  'C:/Training/udacity_js_nanodegree/image_api/image_processing_api/assets/images/';

// middleware function
const validateParams: RequestHandler = (req, res, next): void => {
  if (!req.query.filename) {
    res.status(400).send({ error: 'filename is required!' });
  }

  if (
    req.query.width &&
    !ValidateUtility.isNumeric(req.query.width as string)
  ) {
    res.status(400).send({ error: 'width must be a number!' });
  }

  if (
    req.query.height &&
    !ValidateUtility.isNumeric(req.query.height as string)
  ) {
    res.status(400).send({ error: 'height must be a number!' });
  }

  next();
};

images.get(
  '/',
  validateParams,
  (req: express.Request, res: express.Response) => {
    if (req.query.filename) {
      const filename = `${req.query.filename}.jpg`;
      const options = {
        root: path.join(__images_dirname, 'full'),
        headers: {
          'x-timestamp': Date.now(),
          'x-sent': true
        }
      };
      res.sendFile(filename, options, (err: Error) => {
        if (err) {
          res.status(404).send({ error: 'Image Not Found!' });
        }
      });
    }
  }
);

export default images;
