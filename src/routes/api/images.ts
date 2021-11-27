import express from 'express';
import { RequestHandler } from 'express';
import ValidateUtility from '../../utilities/validateUtility';

const images = express.Router();

// middleware function
const validateParams: RequestHandler = (req, resp, next): void => {
  if (!req.query.filename) {
    resp.status(400).send({ error: 'filename is required!' });
  }

  if (
    req.query.width &&
    !ValidateUtility.isNumeric(req.query.width as string)
  ) {
    resp.status(400).send({ error: 'width must be a number!' });
  }

  if (
    req.query.height &&
    !ValidateUtility.isNumeric(req.query.height as string)
  ) {
    resp.status(400).send({ error: 'height must be a number!' });
  }

  next();
};

images.get(
  '/',
  validateParams,
  (req: express.Request, res: express.Response) => {
    try {
      res.send(`Image required : ${req.query.filename}`);
    } catch (error) {
      res.status(503).send({ error: 'Server Error' });
    }
  }
);

export default images;
