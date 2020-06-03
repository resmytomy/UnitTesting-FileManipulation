const express = require('express');
const bodyParser = require('body-parser')
const app = express();

const fileController = require('./controller/file-editorController.js');
const controller=new fileController();
console.log("Example app listening at http://%s:%s")
app.get('/', controller.readFileController);

app.post('/edit', controller.writeFileController);


module.exports = app;