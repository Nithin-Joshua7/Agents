import fs from 'fs';
import csv from 'csv-parser';

export const parseCSV = async (filePath) => {
  try {
    const results = [];
    await new Promise((resolve, reject) => {
      fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', () => resolve())
        .on('error', (err) => reject(err));
    });
    return results;
  } catch (err) {
    throw new Error(`Failed to parse CSV: ${err.message}`);
  }
};