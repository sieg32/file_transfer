

const dropArea = document.getElementById('drop-area');
const fileInput = document.getElementById('fileInput');
const fileList = document.getElementById('file-list');
const filebox = document.querySelector('.received-box');


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
  let data;
    axios.get('/files/fetchList').then(
        (response)=>{
            data = response.data;
          console.log(response);
        }

    );
   
   setTimeout(() => {
    for(const key in data){
        const elem = document.createElement('div');
        const textbox = document.createElement('p');
        textbox.textContent= key +"    :     " + data[key];
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
   
    
   }, 500);
        
    
});

fetchFile = function(filename){

    window.open('/files/download?name='+filename)
 

}



clearing = function(){
    axios.delete('/files/clear').then((response)=>{
        console.log(response)
    })
}