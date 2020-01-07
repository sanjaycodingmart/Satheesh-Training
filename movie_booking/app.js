
function indexPage() {
    window.location.href = "index.html";
    }       
var details = [];
tickets=[];
function add(){
        var theater=document.getElementById('theater').value;
        var movie=document.getElementById('movie').value;
        var seats=document.getElementById('seats').value;
        if(theater==''||movie==''||seats==''){
          alert("Please Enter The Values!!!");
        }else{
          const data = {
            theater,movie,seats
          };
          if (localStorage.length != 0) {
            details = JSON.parse(localStorage.getItem("Theaterdetails"));
            details.push(data);
            localStorage.setItem("Theaterdetails", JSON.stringify(details));
          } else {
            details.push(data);
            localStorage.setItem("Theaterdetails", JSON.stringify(details));
          }
          console.log(data);
        }
        

indexPage();

}

function boo(){
    details = JSON.parse(localStorage.getItem("Theaterdetails"));
    var theaterNames = document.getElementById("theatername");
    for (let i = 0; i < details.length; i++) {
        theatername.innerHTML +=
          '<option value="' +
          details[i].theater+
          '">' +
          details[i].theater +
          "</option>";
      }
}
function Movie() {
    details = JSON.parse(localStorage.getItem("Theaterdetails"));
    var movieNames = document.getElementById("moviename");
    movieNames.innerHTML = "<option></option>";
    var theaterNames = document.getElementById("theatername").value;
    for (let i = 0; i < details.length; i++) {
      if (details[i].theater == theaterNames)
        movieNames.innerHTML +=
          '<option value="' +
          details[i].movie +
          '">' +
          details[i].movie +
          "</option>";
    }
  }


function ticket(){
    details = JSON.parse(localStorage.getItem("Theaterdetails"));
    var theaterNames = document.getElementById("theatername").value;
    var movieNames = document.getElementById("moviename").value;
    while (document.getElementById('create-table').hasChildNodes()){
        document.getElementById('create-table').removeChild(document.getElementById('create-table').firstChild);
    }
    for (let i = 0; i < details.length; i++) {
        if (details[i].theater == theaterNames && details[i].movie == movieNames) {
          no_seats = details[i].seats;
          movie_name = details[i].movie;
          the_name = details[i].theater;
        var table=document.createElement('table');
        table.id='table';
        table.style.border="1px solid black";
        table.style.borderCollapse="collapse";
        var tr=document.createElement('tr');
        for (let j = 1; j <= no_seats; j++) {
            var td=document.createElement('td');
            td.id='a'+(j);
            console.log('a'+(j))
            td.setAttribute('onclick','colorbook(this)');
            td.appendChild(document.createTextNode(j));
            tr.appendChild(td);
            td.style.border="1px solid black";
            td.style.padding="10px";
        }
        table.appendChild(tr);
        document.getElementById('create-table').appendChild(table);
        }
      }
      if (localStorage.getItem("book"+
      document.getElementById("theatername").value +
      document.getElementById("moviename").value)){
       var res= JSON.parse(localStorage.getItem("book"+
        document.getElementById("theatername").value +
        document.getElementById("moviename").value) );
        res.forEach(element => {
            document.getElementById(element).className='booked';
            document.getElementById(element).onclick='null';
        });
      }

}      
book=[];
function colorbook(a){
    //console.log(String(a.id).slice(0,1));
        if(String(a.id).slice(0,1)!='-'){
            document.getElementById(a.id).style.backgroundColor="green";
            book.push(a.id);
            a.id = '-'+a.id;
        }
        else{ 
            book.splice(book.indexOf(""+a.id*-1),1);
            document.getElementById(a.id).style.backgroundColor="white";
            a.id=String(a.id).slice(1,);
        }
    }
function finish(){
    res=[];
    details = JSON.parse(localStorage.getItem("Theaterdetails"));
    var theaterNames = document.getElementById("theatername").value;
    var movieNames = document.getElementById("moviename").value;
    localStorage.setItem(
        "book" +
          document.getElementById("theatername").value +
          document.getElementById("moviename").value,
        JSON.stringify(book)
      );
    var modal=document.getElementById('myModal');
    modal.style.display="block";
    var span = document.getElementsByClassName("close")[0];
    span.onclick=function(){
    modal.style.display="none";
    indexPage();
    }
}