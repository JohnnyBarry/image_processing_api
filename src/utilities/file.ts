import fs from 'fs';
import { promises as fsPromises } from 'fs';

/**
 * @function : writeData
 * @description: Writes data to a file located at a given file path. 
 *                If the file doesn't already exist it will be created. 
 * @param: filePath: The Path of the file.
 * @param: data: Data to be written to the file.
 * @returns: Promise object
 */
const writeData = async (filePath: string, data: string | Buffer): Promise<void> => {
  return await fsPromises.writeFile(filePath, data);
};

/**
 * @function : writeData
 * @description: Tests if the user has read access to a given file.
 * @param: filePath: The Path of the file.
 * @returns: Promise object
 */
const hasReadAccess = async (filePath: string): Promise<void> => {
  return await fsPromises.access(filePath, fs.constants.R_OK);
};

export default { writeData, hasReadAccess };
