const cors = require('cors')
const app = require("./app");
app.use(cors);
var server = app.listen(8080, function () {

  var host = server.address().address

  var port = server.address().port
  console.log("Example app listening at http://%s:%s", host, port)

})
module.exports = server;
