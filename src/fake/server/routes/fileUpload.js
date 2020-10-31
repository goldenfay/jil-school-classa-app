const router = require('express').Router()
const fs=require('fs')
const path=require('path')
const crypto = require('crypto')


// Upload courseFile
router.post('/coursefile', (req, res) => {
  console.log(req);
  if (req.files === null) {
    return res.status(400).json({ message: 'Aucun fichier chargé' });
  }
  
  const file = req.files.file;
  // Check if file extension validity
  const fileExtension=path.extname(file.name)
  if(['.png','.jpg','.jpeg'].indexOf(fileExtension.toLowerCase())===-1){
    
    return res.status(400).json({message: 'Type de fichier invalide'}).status(400);
    
  }
    // Hash the filename with SHA1 encryption
  const shasum = crypto.createHash('sha1')
shasum.update(`${path.basename(file.name).replace(fileExtension,'')}_${new Date().getTime()}`)
const fileName=shasum.digest('hex')

  const filePath=`${path.dirname(__dirname)}/public/uploads/${fileName}.${fileExtension}`;
    // Check if file exists (basically due to naming conflicts)
  if(fs.existsSync(filePath)){
    return res.status(400).json({message: 'Fichier existe déja'});

  }
    // Move (put) the file in the corresponding path
  file.mv(filePath, err => {
    if (err) {
      console.error(err);
      return res.status(500).send({...err,message: `Une erreur serveur s'est produite`});
    }

    res.status(200).json({ fileName: fileName });
  });
});

module.exports=router