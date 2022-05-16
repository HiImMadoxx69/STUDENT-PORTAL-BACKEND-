//GLOBAL VARIABLES USER = GVU
//Default number of row global
var GVUdefaultRow = 10;
//CurrentIndexPage global
var GVUIndexPage = 0;

//Get the total length of table
var GVUAccLength = 0;

//JSON global results variable
var GVUResults = {};

//JSON global result sorted variable
var GVUResultsSorted = {};

//Check if already sorted
var GVUIsSorted = false;
//Current number of rows
var GVUNumRows = 10;

//NextPage Call
const nextpageCall = function nextPageCall(){
    if(GVUIndexPage <= GVUAccLength){
        GVUdefaultRow += 10;
        GVUIndexPage +=10;
        getAllDataAPI();
    }
}



//PrevPage Call
const prevpageCall = function nextPageCall(){
    if(GVUIndexPage >= 10){
        GVUdefaultRow -= 10;
        GVUIndexPage -=10;
        getAllDataAPI();
    }
}


//Pagination buttons
nextPage = document.getElementById('nextPage');
prevPage = document.getElementById('prevPage');
page1 = document.getElementById('page1');
page2 = document.getElementById('page2');
page3 = document.getElementById('page3');
showNumberOfPage = document.getElementById('showNumberOfPage');

//Eventlistener for paginatio Buttons
nextPage.addEventListener('click', nextpageCall);
prevPage.addEventListener('click', prevpageCall);
// page1.addEventListener('click', getAllData());
// page2.addEventListener('click', getAllData());
// page3.addEventListener('click', getAllData());





//getAllData Function
function getAllDataAPI(){
    //get user accounts
    fetch('../controller/user-table.php').then((res) => res.json())
    .then(response => {

        GVUResults = response;//Store the responseJSON into GVUResults global var
        GVUAccLength = response.length;//getThe totalLength

        bindAllDataIntoTable();//Bind the data into table once fetch successfull
    }).catch(error => console.log(error));//end of get user accounts
}//end of function getAllDataAPI

window.onload = function(){
    getAllDataAPI();
}//Onload page


const bindAllDataIntoTable = function (){
    let output ='';
    
for(let i = GVUIndexPage; i<GVUdefaultRow; i++){
    output += `<tr>
    <td>${GVUResults[i].id}</td>
    <td><img src = "../../uploads/${GVUResults[i].profile_url} " alt="Profile" height = "100px" width = "100px"/></td>
    <td>${GVUResults[i].username}</td>
    <td>${GVUResults[i].firstname}</td>
    <td>${GVUResults[i].lastname}</td>
    <td>${GVUResults[i].email}</td>
    <td>${GVUResults[i].password}</td>
    <td>${GVUResults[i].position}</td>
    <td>${GVUResults[i].address}</td>
    <td>${GVUResults[i].contact}</td>
    <td>${GVUResults[i].about}</td>
    <td>${GVUResults[i].twitterprofile}</td>
    <td>${GVUResults[i].facebookprofile}</td>
    <td>${GVUResults[i].instagramprofile}</td>
    <td>${GVUResults[i].linkedinprofile}</td>
    <td>${GVUResults[i].added_at}</td>
    <th scope="col" class="table-info">asdasd</th>
    </tr>`;
}

let numberOfPages = '';
numberOfPages += `<h8>Showing `+GVUdefaultRow+` out of `+GVUAccLength+` results</h8>`;
document.querySelector('#tbody-user-accounts').innerHTML = output;//print the data into the tbody
document.querySelector('#showNumberOfPage').innerHTML = numberOfPages;
}





//Sort the table
const sortCurrentTable = (headerTitle) =>{

  

    for(let i = 0; i<GVUNumRows; i++){
        GVUResultsSorted[i] = GVUResults[GVUIndexPage+i];
    }//Fill the GVUResultsSorted with GVUResults only needed

if(GVUIsSorted){
    for(let i = 0; i<GVUNumRows-1; i++){
        for(let j = 0; j<GVUNumRows-1; j++){
         if(GVUResultsSorted[j][headerTitle]< GVUResultsSorted[j+1][headerTitle]){
             // console.log("a = "+GVUResultsSorted[j].id+" > "+" b = "+GVUResultsSorted[j+1].id);
             let temp = GVUResultsSorted[j];
             GVUResultsSorted[j] = GVUResultsSorted[j+1];
             GVUResultsSorted[j+1] = temp;
      }
     }
   }
   GVUIsSorted = false;//after sorted then reverse sort
}else{
    for(let i = 0; i<GVUNumRows-1; i++){
        for(let j = 0; j<GVUNumRows-1; j++){
         if(GVUResultsSorted[j][headerTitle] > GVUResultsSorted[j+1][headerTitle]){
             // console.log("a = "+GVUResultsSorted[j].id+" > "+" b = "+GVUResultsSorted[j+1].id);
             let temp = GVUResultsSorted[j];
             GVUResultsSorted[j] = GVUResultsSorted[j+1];
             GVUResultsSorted[j+1] = temp;
      }
     }
   }
   GVUIsSorted = true;//after sorted then reverse sort
}
   

  
    bindAllDataIntoTableSorted();
}//Sort by id





//Bind the sorted table
const bindAllDataIntoTableSorted = function (){
    let output ='';
    
    for(let i = 0; i<GVUNumRows; i++){
        output += `<tr>
        <td>${GVUResultsSorted[i].id}</td>
        <td><img src = "../../uploads/${GVUResultsSorted[i].profile_url} " alt="Profile" height = "100px" width = "100px"/></td>
        <td>${GVUResultsSorted[i].username}</td>
        <td>${GVUResultsSorted[i].firstname}</td>
        <td>${GVUResultsSorted[i].lastname}</td>
        <td>${GVUResultsSorted[i].email}</td>
        <td>${GVUResultsSorted[i].password}</td>
        <td>${GVUResultsSorted[i].position}</td>
        <td>${GVUResultsSorted[i].address}</td>
        <td>${GVUResultsSorted[i].contact}</td>
        <td>${GVUResultsSorted[i].about}</td>
        <td>${GVUResultsSorted[i].twitterprofile}</td>
        <td>${GVUResultsSorted[i].facebookprofile}</td>
        <td>${GVUResultsSorted[i].instagramprofile}</td>
        <td>${GVUResultsSorted[i].linkedinprofile}</td>
        <td>${GVUResultsSorted[i].added_at}</td>
        <th scope="col" class="table-info">asdasd</th>
        </tr>`;
    }
    
    let numberOfPages = '';
    numberOfPages += `<h8>Showing `+GVUdefaultRow+` out of `+GVUAccLength+` results</h8>`;
    document.querySelector('#tbody-user-accounts').innerHTML = output;//print the data into the tbody
    document.querySelector('#showNumberOfPage').innerHTML = numberOfPages;
}//Sorted Bind Table
