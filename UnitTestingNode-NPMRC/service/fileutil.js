

class FileUtil{
  constructor(){}

write(fileName,req){
  const fs = require("fs");
// const fileContent=require('./fileContents')

// const bodyParser = require('body-parser')
var finalcontent='';
var fcontent=[];
  console.log('inside post!');
  console.log(req.body.data)
  fcontent  = req.body.data;
  fcontent.forEach(content => {
    console.log(content.name);
    var line =content.name+'='+content.value;
    finalcontent=finalcontent+line+'\r\n';
  });
  console.log(finalcontent)
  return new Promise((resolve, reject) => {

    fs.writeFile(fileName,finalcontent, (err, data) => {

      if (err) {

        reject (err)  // calling `reject` will cause the promise to fail with or without the error passed as an argument

        return        // and we don't want to go any further

      }

      console.log(data);

      resolve(finalcontent)

    })

  })
}

getFile (fileName) {
  const fs = require("fs");
  const bodyParser = require('body-parser')

  return new Promise((resolve, reject) => {

    fs.readFile(fileName,'UTF-8', (err, data) => {

      if (err) {

        reject (err)  // calling `reject` will cause the promise to fail with or without the error passed as an argument

        return        // and we don't want to go any further

      }

      console.log(data);

      resolve(data)

    })

  })

}



}

module.exports=FileUtil;

