(async () => {
let api = '';
async function getConstants() {
    try {
        const a = await fetch('./config.json');
        const { key } = await a.json();
        return key;
    } catch(e) {
        console.error(e)
    }

    return '';
}
api = await getConstants();

count=0;
const container=document.querySelector('#container');
//const api='OOe2zKB3kTo7W86r2X4b4IstCcUq1pHp';

    var api_url='https://api.giphy.com/v1/gifs/trending?api_key='+api+'&offset='+count;
    search="";
         async function getGif(api_url){
            const response=await fetch(api_url);
            const data=await response.json();
            
                data.data.forEach(element => {
                        count++;
                        const img = document.createElement('img');
                        img.src=element.images.preview_gif.url;
                        img.width=300;
                        container.appendChild(img);
                 });           
         }
         getGif(api_url); 
         document.addEventListener('scroll',()=>{
            let a=document.documentElement.scrollHeight-window.innerHeight;
            
                if (a==window.scrollY){
                    if(search=='')
                    {
                        api_url='https://api.giphy.com/v1/gifs/trending?api_key='+api+'&offset='+count;
                    }
                    else{
                        api_url='https://api.giphy.com/v1/gifs/search?q='+search+'&api_key='+api+'&offset='+count;
                    }
                    getGif(api_url); 
                }
            });
            
        function display(){
            search=document.getElementById('input').value;
            container.innerHTML='';
            if(search=='')
                    {
                        api_url='https://api.giphy.com/v1/gifs/trending?api_key='+api+'&offset='+count;
                    }
                    else{
                        api_url='https://api.giphy.com/v1/gifs/search?q='+search+'&api_key='+api+'&offset='+count;
                    }          
            getGif(api_url);
        }
})()
