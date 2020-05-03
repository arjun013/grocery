
let bt=document.getElementsByClassName("bton");
var tab=[];
var insert=`<option value="">-select-</option>`;//for a dropdown menu if anything purchased
let replace=document.getElementsByClassName("container");
var content="";//read json file
var obj=[];// parsed json file
var product;//
var purchaseHistory="";//storing purchase history

bt[0].addEventListener("click",load);//loading table format data into container

//loading json objects
var xhttp= new XMLHttpRequest();
    xhttp.onreadystatechange=function(){
        if (this.readyState==4&&this.status==200) {
             content=this.responseText;
             obj=JSON.parse(content)
             
        }
    };
    xhttp.open("GET","objects.json",true);
    xhttp.send();

// load();
function load(){
    var tableLoad= new XMLHttpRequest();
    tableLoad.onreadystatechange=function(){
        if (this.readyState==4&&this.status==200) {
            replace[0].innerHTML=this.responseText;
            writeTable();//write object data inside table
            loadDB();
        }
    };
    tableLoad.open("GET","table.txt",true);
    tableLoad.send();
    
    
}

function loadDB(){
var db=new XMLHttpRequest();
db.onreadystatechange=function(){
        if (this.readyState==4&&this.status==200) {
            replace[1].innerHTML=this.responseText;
            for (let index = 0; index < obj.length; index++) {//updating dropdown to check if purchased anything
                insert=insert+`<option value="${obj[index].name}">${obj[index].name}</option>`; 
            }
            document.getElementById("drops").innerHTML=insert;
        }
    }
    db.open("GET","db.txt",true);
    db.send();
}


function writeTable(){
    
     tab=document.getElementsByClassName("tables");
  for (let index = 0; index < obj.length; index++) {
    var row = tab[1].insertRow();
    var cell=[];
      for (let j = 0; j < 5; j++) {
       cell[j]=row.insertCell();    
      }
      cell[0].innerHTML=obj[index].sno;
      cell[1].innerHTML=obj[index].name;
      cell[2].innerHTML=obj[index].quantity+" "+obj[index].unit;
      cell[3].innerHTML=obj[index].department;
      cell[4].innerHTML=obj[index].notes;
      
  }


}

var min;
function amountUpdate(){//change amount selection dropdown on select product
    document.getElementById("amount").removeAttribute("hidden","true")
    product=document.getElementById("drops").value;
    var j;
    for (let index = 0; index < obj.length; index++) {
        if (product==obj[index].name) {
            min=index;
            j=`out of ${obj[index].quantity} ${obj[index].unit}`
            document.getElementById("unit").innerHTML=j;
            break;
        }

    }
}
var cells;


function updation(){//data updation if something already buyed
    
    let weight=parseFloat(document.getElementById("buyed").value);
    if(document.getElementById("buyed").value!=""&&document.getElementById("drops").value!=""&&!isNaN(weight)){ 
        document.getElementById("history").removeAttribute("hidden");
        var tRow=document.getElementsByTagName("tr");
        obj[min].quantity=obj[min].quantity-weight;
        cells=tRow[min+1].deleteCell(2);    
        cells=tRow[min+1].insertCell(2); 
        cells.innerHTML=obj[min].quantity+" "+obj[min].unit;
        document.getElementById("buyed").value ;
        purchaseHistory=purchaseHistory+`<li><b> Purchased ${weight} ${obj[min].unit} of ${obj[min].name.toLowerCase()}</b> </li><hr>`;
        document.getElementById("listing").innerHTML=purchaseHistory;
        document.getElementById("buyed").value='';
        document.getElementById("drops").value="";
        document.getElementById("amount").setAttribute("hidden","true");
    }
}
    