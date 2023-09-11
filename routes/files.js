const express = require('express');
const multer = require('multer')
const fs = require('fs/promises')
const router = express.Router();



const storage = multer.diskStorage({destination: (req, file, cb)=>{
   
     
    cb(null,'upload/')},
  
    filename: (req ,file ,cb)=>{
      
      const filename1 = file.originalname;
      
        cb(null, filename1);

  }});
 

const upload = multer({ storage });

const arr= [];
dirn = __dirname;
dirn = dirn.slice(0,-7);

router.get('/fetchList', (req,res)=>{
    current={};

    arr.forEach((value)=>{
        current[value.originalname] = value.size;
    })
    res.type('json').send(JSON.stringify(current));
    res.end;
    

})

router.delete('/clear',(req,res)=>{
    arr.forEach((val)=>{
        console.log('deleting ' + val.filename)
        fs.unlink(dirn+'/upload/'+val.filename,(error)=>{
            console.log(error)
            
        })
    })
    
    res.end('cleared');


})

router.get('/download', (req,res)=>{
    console.log(req.query.name);
    const filepath = dirn +'/upload/'+req.query.name;
    console.log(filepath);
    res.download(filepath,(err)=>{
        console.log(err)
    })
    
    
})

router.post('/upload',upload.array('files'),async (req,res)=>{
    const files = req.files;
    
    for(const file of files){
        arr.push(file);
    }

    
    //console.log(arr)
    res.end('done');
})





module.exports = router;