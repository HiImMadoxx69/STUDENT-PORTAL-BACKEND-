//GLOBAL VARIABLES USER = GVU
//Current number of rows
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
//Default number of row global
var GVUNumRows = 10;

//If the default row is less than 10
var GVULessThanRow = 0;

//Get desired number of row per page
var GVURowPerPage = 0;

//NextPage Call
const nextpageCall = function nextPageCall(){
    if(((GVUAccLength - GVUdefaultRow) < 10) && GVULessThanRow === 0){
        
        GVULessThanRow = GVUAccLength - GVUdefaultRow;
        GVUdefaultRow += GVULessThanRow;
        bindAllDataIntoTable();
    }
    if(GVUdefaultRow < GVUAccLength &&GVUIndexPage <= GVURowPerPage ){
        GVUdefaultRow += GVURowPerPage;
        GVUIndexPage +=GVURowPerPage;
        bindAllDataIntoTable();
    }
}



//PrevPage Call
const prevpageCall = function nextPageCall(){
  
    // console.log('Less than row'+GVULessThanRow);
    if(GVULessThanRow !== 0){
    
        GVUdefaultRow = GVUdefaultRow - GVULessThanRow;
        GVULessThanRow = 0;
    }
    if(GVUIndexPage >= GVURowPerPage){
        GVUdefaultRow -= GVURowPerPage;
        GVUIndexPage -=GVURowPerPage;
        bindAllDataIntoTable();
    }
   
}


//Pagination buttons
nextPage = document.getElementById('nextPage');
prevPage = document.getElementById('prevPage');
page1 = document.getElementById('page1');
page2 = document.getElementById('page2');
page3 = document.getElementById('page3');
showNumberOfPage = document.getElementById('showNumberOfPage');

//Select option
selectPage = document.getElementById('selectPage');

//Eventlistener for paginatio Buttons
nextPage.addEventListener('click', nextpageCall);
prevPage.addEventListener('click', prevpageCall);
// page1.addEventListener('click', getAllData());
// page2.addEventListener('click', getAllData());
// page3.addEventListener('click', getAllData());

//Search bar
userSearchBar = document.getElementById('userSearchBar');

window.onload = function(){
    getAllDataAPI();
    selectNumPage();
}//Onload page

//getAllData Function
function getAllDataAPI(){
    //get user accounts
    fetch('../controller/user-table.php').then((res) => res.json())
    .then(response => {

        GVUResults = response;//Store the responseJSON into GVUResults global var
        GVUAccLength = response.length;//getThe totalLength

        
        let selectHolder = '';
        if(GVUAccLength >= 500){
            selectHolder += `
            <option value="5" selected>5</option>
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="ALL">All</option>`;
        }else if (GVUAccLength >= 300){
            selectHolder += `
            <option value="5" selected>5</option>
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="ALL">All</option>`;
        }else if(GVUAccLength >= 25){
            selectHolder += `
            <option value="5" selected>5</option>
            <option value="10" selected>10</option>
            <option value="ALL">All</option>`;
        }else{
            selectHolder += `
            <option value="5" selected>5</option>
            <option value="ALL">All</option>`;
        }
        document.querySelector('#selectPage').innerHTML = selectHolder;// set the rows per page

        if(selectPage.value === '5'){
            GVURowPerPage = 5;
            GVUdefaultRow = 5;
        }else if (selectPage.value === '10'){
            GVURowPerPage = 10
            GVUdefaultRow = 10;
        }else if (selectPage.value === '25'){
            GVURowPerPage = 25;
            GVUdefaultRow = 25;
        }else{
            GVURowPerPage = 50;
            GVUdefaultRow = 50;
        }// rows condition

        bindAllDataIntoTable();//Bind the data into table once fetch successfull
    }).catch(error => console.log(error));//end of get user accounts
}//end of function getAllDataAPI




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
    <th scope="col" class="table-info">
    <div class = "pt-2">
    <a href="#" class ="btn btn-primary btn-sm" title = "Profile"><i class="bi bi-upload"></i></a>

    <a href="#" class ="btn btn-danger btn-sm" title = "Archived"><i class="bi bi-trash"></i></a>
    
    </div>
    </th>
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
         if(GVUResultsSorted[j][headerTitle]> GVUResultsSorted[j+1][headerTitle]){
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
         if(GVUResultsSorted[j][headerTitle] < GVUResultsSorted[j+1][headerTitle]){
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
        <th scope="col" class="table-info">
        <div class = "pt-2">
    <a href="#" class ="btn btn-primary btn-sm" title = "Profile"><i class="bi bi-upload"></i></a>

    <a href="#" class ="btn btn-danger btn-sm" title = "Archived"><i class="bi bi-trash"></i></a>
    
    </div>
        </th>
        </tr>`;
    }
   
    let numberOfPages = '';
    numberOfPages += `<h8>Showing `+GVUdefaultRow+` out of `+GVUAccLength+` results</h8>`;
    document.querySelector('#tbody-user-accounts').innerHTML = output;//print the data into the tbody
    document.querySelector('#showNumberOfPage').innerHTML = numberOfPages;
}//Sorted Bind Table


//Select bind data

const selectNumPage = function(){
    

    if(selectPage.value === '5'){
        GVURowPerPage = 5;
        GVUdefaultRow = 5;
    }else if (selectPage.value === '10'){
        GVURowPerPage = 10
        GVUdefaultRow = 10;
    }else if (selectPage.value === '25'){
        GVURowPerPage = 25;
        GVUdefaultRow = 25;
    }else{
        GVURowPerPage = GVUAccLength;
        GVUdefaultRow = GVUAccLength;
    }
    bindAllDataIntoTable();
}
//JSON global results variable
// var GVUResults = {};
//JSON global result sorted variable
// var GVUResultsSorted = {};
//Search bar
// userSearchBar = document.getElementById('userSearchBar');
//Get the total length of table
// var GVUAccLength = 0;
const userSearchKey = () =>{
let userSearch = userSearchBar.value;
// let result = Object.keys(GVUResults);

let results = [];

for(let i = 0; i<GVUResults.length;i++){
    for( key in GVUResults[i]){
        if(GVUResults[i][key].indexOf(userSearch) != -1){
            results.push(GVUResults[i]);
            break;
        }
    }
}

console.log(results);
GVUNumRows = results.length;
GVUResultsSorted = results;
bindAllDataIntoTableSorted();
}


