import * as dotenv from 'dotenv';

dotenv.config();
export const environment = {
   production: false,
   apiUrl: process.env['apiUrl'],
   storageUrl: process.env['storageUrl']
};
