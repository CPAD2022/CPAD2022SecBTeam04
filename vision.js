const fs = require('fs');
const moment = require('moment');

async function recognize(path) {
  // Imports the Google Cloud client library
  const vision = require('@google-cloud/vision');

  // Creates a client
  const client = new vision.ImageAnnotatorClient({
    keyFilename: "./crossplatform-369812-6c68c2c44e0c.json"
  });

  // Performs label detection on the image file
// const [result] = await client.textDetection('./uploadedImages/img2.jpeg');
  const [result] = await client.textDetection(path);
const detections = result.textAnnotations;
const regEx1 = /^([0-2][0-9]|(3)[0-1])(\/|.)(((0)[0-9])|((1)[0-2]))(\/|.)\d{4}$/;
const regEx2 = /^([0-2][0-9]|(3)[0-1])(\/|.)(((0)[0-9])|((1)[0-2]))(\/|.)\d{2}$/;
var expiryDate = [];
var returnDate;
  
  detections.forEach(text => {
    var date1 = JSON.stringify(text.description).trim().replaceAll("\"","").match(regEx1);
    var date2 = JSON.stringify(text.description).trim().replaceAll("\"","").match(regEx2);
    if (date1) {
      expiryDate.push(date1[0]);
    }
    else if (date2) {
      expiryDate.push(date2[0]);
    }
});
  var momentDate = [];
  for (let i = 0; i < expiryDate.length ; i++) {
    if (expiryDate[i].length == 10) {
      if (expiryDate[i].includes('/')) {
        var a = moment(expiryDate[i], "DD/MM/YYYY");
        momentDate.push(a);
      } else if (expiryDate[i].includes('.')) {
        var a = moment(expiryDate[i], "DD.MM.YYYY");
        momentDate.push(a);
      } else if (expiryDate[i].includes('-')) {
        var a = moment(expiryDate[i], "DD-MM-YYYY");
        momentDate.push(a);
      }
    } else if (expiryDate[i].length == 8) {
      if (expiryDate[i].includes('/')) {
        var a = moment(expiryDate[i], "DD/MM/YY");
        momentDate.push(a);
      } else if (expiryDate[i].includes('.')) {
        var a = moment(expiryDate[i], "DD.MM.YY");
        momentDate.push(a);
      } else if (expiryDate[i].includes('-')) {
        var a = moment(expiryDate[i], "DD-MM-YY");
        momentDate.push(a);
      }
    }
  }
  const now = moment();
  momentDate.forEach(expiry => {
    if (expiry.isAfter(now)) {
      returnDate = expiry;
    }
  });
  
  return returnDate;

}
module.exports = recognize;