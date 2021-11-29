import fs from 'fs';
import { promises as fsPromises } from 'fs';

const writeData = async (filePath: string, data: string | Buffer) => {
  return await fsPromises.writeFile(filePath, data);
};

const hasReadAccess = async (filePath: string) => {
  return await fsPromises.access(filePath, fs.constants.R_OK);
};

export default { writeData, hasReadAccess };
