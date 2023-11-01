const request = require('request');
const fs = require('fs');
const args = process.argv.slice(2); // Get command line arguments

if (args.length !== 2) {
  console.log('Usage: node fetcher.js <URL> <localFilePath>');
  process.exit(1);
}

const url = args[0];
const localFilePath = args[1];

request(url, (error, response, body) => {
  if (error) {
    console.error('Error:', error.message);
  } else {
    fs.writeFile(localFilePath, body, (err) => {
      if (err) {
        console.error('Error writing to local file:', err.message);
      } else {
        const fileSize = body.length;
        console.log(`Downloaded and saved ${fileSize} bytes to ${localFilePath}`);
      }
    });
  }
});
