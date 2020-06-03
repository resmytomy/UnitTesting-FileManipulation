const FileUtil = require('../service/fileutil')
const futil = new FileUtil();
class fileEditorController {
  writeFileController(req, res) {
    futil.write('npmrc', req)
      .then(data => res.send(data))
      .catch(err => res.send(err))

  }
  readFileController = (req, res) => {
    futil.getFile('npmrc')
      .then(data => res.send(data))

      .catch(err => res.send(err))

  }


}
module.exports = fileEditorController;