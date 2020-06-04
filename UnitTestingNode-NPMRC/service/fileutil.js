const fs = require("fs");

class FileUtil {
  constructor(F) { }

  write(fileName, req) {
    var finalcontent = '';
    var fcontent = [];
    console.log('inside post!');
    console.log(req.body.data)
    fcontent = req.body.data;
    fcontent.forEach(content => {
      console.log(content.name);
      var line = content.name + '=' + content.value;
      finalcontent = finalcontent + line + '\r\n';
    });
    return new Promise((resolve, reject) => {

      fs.writeFile(fileName, finalcontent, (err, data) => {

        if (err) {

          reject(err)  
          return        

        }

        console.log(data);

        resolve(finalcontent)

      })

    })
  }

  getFile(fileName) {

    return new Promise((resolve, reject) => {

      fs.readFile(fileName, 'UTF-8', (err, data) => {

        if (err) {

          reject(err)  
          return      

        }

        resolve(data)

      })

    })

  }



}

module.exports = FileUtil;

