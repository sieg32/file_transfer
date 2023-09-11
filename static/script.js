

const dropArea = document.getElementById('drop-area');
const fileInput = document.getElementById('fileInput');
const fileList = document.getElementById('file-list');
const filebox = document.querySelector('.received-box');
const clearBtn = document.querySelector('#clearBtn');
let filecount =0;
let storageUsage =0;
let refreshed = 0;


// Prevent default behavior for drag and drop events
dropArea.addEventListener('dragenter', (e) => {
    e.preventDefault();
    dropArea.classList.add('highlight');
});

dropArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropArea.classList.add('highlight');
});

dropArea.addEventListener('dragleave', () => {
    dropArea.classList.remove('highlight');
});

dropArea.addEventListener('drop', (e) => {
    e.preventDefault();
    dropArea.classList.remove('highlight');
    
    const files = e.dataTransfer.files;

   
});



fileInput.addEventListener('change', () => {
    const files = fileInput.files;
    const formData = new FormData();
    refreshed =0;
   
   for(const file of files){
        console.log(file.name)
        
        formData.append('files',file);
    }

    console.log(formData)
    
    const config = {
        headers: {
          'content-type': '',
        },
      };

    axios.post('/files/upload', formData, config )
    .then((response)=>{
        console.log(response,formData,"files send succesfully");
    }).catch((error)=>{
        console.log('error ==', error)
    });
   
   
   
});



const refreshBtn = document.getElementById('refresh');
refreshBtn.addEventListener('click', ()=>{

    refreshview();
}
);


refreshview = function(){

  let data;
  
  axios.get('/files/fetchList').then(
      (response)=>{
          data = response.data;
        console.log(response);
      }

  );
  filebox.innerHTML="";
 
 
 setTimeout(() => {
  for(const key in data){
      filecount++;
      storageUsage = storageUsage+ (+(data[key]));
      const elem = document.createElement('div');
      const textbox = document.createElement('p');
      textbox.textContent= key +": " + data[key]+ "MB" ;
      elem.appendChild(textbox);
      const dicon = document.createElement('i');
      dicon.classList.add("fa-solid");
      dicon.classList.add("fa-download");
      dicon.id = key;
      elem.appendChild(dicon);
      console.log(elem)
      filebox.appendChild(elem);
      dicon.addEventListener('click', (elem)=>{
              fetchFile(elem.target.id)
      })
  }
  if(refreshed===0){
      const infobox = document.querySelector('#info p');
      infobox.textContent = "there are "+ filecount+" files consuming " + storageUsage + "MB";
       
      
      clearBtn.classList.toggle('hidden');
      
     
      refreshed=1;

  }else{
      window.alert('already refreshed');
  }

  
 }, 500);
      
  
}



fetchFile = function(filename){

    window.open('/files/download?name='+filename)
 

}

clearBtn.addEventListener('click', (event)=>{
    console.log(clearing);
    clearing();
    filecount=0;
    storageUsage=0;
    refreshed = 0;
    refreshview();
});

clearing = function(){
    
    console.log('cleared')
    axios.delete('/files/clear').then((response)=>{
        console.log(response)
    })
}