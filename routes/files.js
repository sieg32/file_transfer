const express = require('express');
const multer = require('multer')
const fs = require('fs/promises')
const fs1 = require('fs')
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
    fs1.readdir('upload/',(error,files)=>{
        
        files.forEach((file)=>{
           const stat = fs1.statSync(dirn+'/upload/'+file);
          
            current[file] = (stat.size / (1024*1024)).toFixed(2);
            

        })
        res.setHeader('Content-Type','application/json');
            res.end(JSON.stringify(current));
    })
   
    
    

})

router.delete('/clear',(req,res)=>{
    fs1.readdir('upload/',(error,files)=>{
        files.forEach((file)=>{
            console.log('deleting =>'+file);
            fs.unlink(dirn+'/upload/'+file);
        })
    });
    
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
   
})





module.exports = router;