var  array = {};

let list=[];
let mdiv=document.querySelector('.mdiv');
let name1=document.querySelector('#name');
let Description1=document.querySelector("#des");
let image1=document.querySelector("#image");
let h1 = document.querySelector('#h1');
let h2 = document.querySelector('#h2');
name1.addEventListener('input', ()=>{
    h1.innerHTML= name1.value.length;
    setTimeout(function() { h1.innerHTML=''; }, 2000);

});
Description1.addEventListener('input', ()=>{
    h2.innerHTML= Description1.value.length;
    setTimeout(function() { h2.innerHTML=''; }, 2000);

});

 
let count=0;
function add()
        {
            var val=count;
            count++;
            var name=name1.value;
            var Description=Description1.value;
            var image=image1.value;
            var img= image.replace("C:\\fakepath\\","");
            var element="";
            var content= {};
            content["name"]=name;
            content["Description"]=Description;
            content["image"]=image;
            // array.push(content)
            array[val]=content;
            
            if (name.length>=20 ){
                alert("U r name must be too long");
            }
            else if(Description.length>=200){
                alert("description is too high");
            }
           else if (name.length<=1 || Description.length<=1){
                alert("must be filled the contents")
            }
            else{
                element=
                `<div class="divs" id="`+val+`">
                        <div>
                            <img id =img src="`+img+`">
                        </div>
                        <div id= sub-cont>
                            <h2>`+content.name+`</h2>
                            <p>`+content.description+`</p>
                        </div>
                        <div>
                        <button type="button" onclick="close1('`+val+`')" class="button2">Close</button>
                        </div>
                </div>`
            }	
           console.log(array);
           var post=document.getElementsByClassName("mdiv");
           var satheesh=post[0];
           satheesh.insertAdjacentHTML("afterbegin",element);
        }

        function close1(str)
            {
            var x = document.getElementById(str);
            mdiv.removeChild(x);
            // array.splice(parseInt(str) , 1);
            delete array[str];
            console.log(array);
            }
