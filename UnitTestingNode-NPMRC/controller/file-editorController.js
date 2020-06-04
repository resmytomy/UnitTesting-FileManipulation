class fileEditorController{ 
  constructor(){
    
  }

  writeFileController (req, res)  {
  const FileUtil=require('../service/fileutil')
  const futil=new FileUtil();

  console.log('inside write!');
  futil.write('npmrc',req)

.then(data =>res.json(data))

.catch(err => res.json(err))


  //res.send( futil.write('npmrc',req));
}
readFileController= (req, res) => {
  console.log('controllere..........123445')
  const FileUtil=require('../service/fileutil');
  const futil=new FileUtil();

  console.log('inside get');

futil.getFile('npmrc')

.then(data =>res.json(data))

.catch(err => res.json(err))

}


}
module.exports=fileEditorController;