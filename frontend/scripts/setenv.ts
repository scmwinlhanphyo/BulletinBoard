const { writeFile } = require('fs');
const { argv } = require('yargs');
// read environment variables from .env file
require('dotenv').config();
// read the command line arguments passed with yargs
const environment = argv.environment;
const isProduction = environment === 'prod';
const targetPath = isProduction
   ? `./src/environments/environment.prod.ts`
   : `./src/environments/environment.ts`;

   if (!process.env['apiUrl'] || !process.env['storageUrl']) {
    process.exit(-1);
 }
// we have access to our environment variables
// in the process.env object thanks to dotenv
const environmentFileContent = `
export const environment = {
   production: ${isProduction},
   apiUrl: "${process.env['apiUrl']}",
   storageUrl: "${process.env['storageUrl']}"
};
`;
// write the content to the respective file
writeFile(targetPath, environmentFileContent, function (err:any) {
   if (err) {
   }
  });
