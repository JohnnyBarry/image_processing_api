import { promises as fsPromises } from 'fs';

const writeData = async (filePath: string, data: string) => {
  return await fsPromises.writeFile(filePath, data);
};

export default { writeData };
