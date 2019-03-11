// https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/creating-and-calling-service-objects.html

const AWS = require('aws-sdk')
const fs = require('fs')
let outputFile = "pic.jpg"

let options = {apiVersion: '2006-03-01', accessKeyId: "", secretAccessKey: ""}

let s3 = new AWS.S3(options);
//console.log("S3:", s3)

let params = { list: {
  Bucket: "ecommerce-app",
  Delimiter: '/products',
  }, get: { Bucket: "ecommerce-app",
    Key: "products/images/000/000/003/original/volvic-bottle.jpg"}
};

s3.listObjects(params.list, function(err, data) {
  if (err) {
    console.log(err, err.stack); // an error occurred
  }
  else     console.log("contents", data)

})

s3.getObject(params.get, function(err, data) {
  if (err) {
    console.log(err, err.stack); // an error occurred
  }
  else{
    //let contents = Buffer.from(data["Body"])
    fs.writeFile(outputFile, data["Body"], function(err) {
      if(err) {
        return console.log(err);
      }
      console.log("The file was saved!", outputFile);
    });
/*
    let file = fs.createWriteStream('file.jpg');
    file.write(data["Body"])
    file.end
*/
  }

})
