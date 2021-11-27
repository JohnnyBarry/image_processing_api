import { promises as fsPromises } from 'fs';

const writeData = async (filePath: string, data: string) => {
  try {
    return await fsPromises.writeFile(filePath, data);
  } catch (error) {
    console.error(`Got an error trying to write to a file: ${error}`);
  }
};

export default { writeData };
