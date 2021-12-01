import { RequestHandler, NextFunction, Request, Response } from 'express';
import validateUtility from '../../utilities/validate';

/**
 * @function : validateParams
 * @description: Validates the requests input parameters
 * @param: req: Express Request object
 * @param: res: Express Response object
 * @param: next: Function called to pass control to the next middleware or the request handler.
 */
const validateParams: RequestHandler = (req: Request, res: Response, next: NextFunction): void => {
  const filename = req.query.filename as string;
  const width = req.query.width as string;
  const height = req.query.height as string;

  if (!filename) {
    res.status(400).send({ error: 'filename param is required!' });
    return;
  }

  if (width && !height) {
    res
      .status(400)
      .send({ error: 'Height Param Must Be Passed When Using Width!' });
    return;
  }

  if (height && !width) {
    res
      .status(400)
      .send({ error: 'Width Param Must Be Passed When Using Height!' });
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

export default { validateParams };
