
const express = require('express');
const multer = require ('multer');
const storage = multer.memoryStorage();
const upload = multer({storage})
const app = express();
const bodyparser = require('body-parser');
const fileRoute = require('./routes/files.js');

app.use(bodyparser.urlencoded({extended: true}));


app.use('/files', fileRoute);
    
app.use(upload.array('files'));

app.use(express.static('./static'));


app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/index.html')
})

app.post("/post",(req,res)=>{
    console.log(req.body);
    res.send('done');
})



app.listen(5000,console.log("started"));