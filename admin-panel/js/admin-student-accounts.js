//GLOBAL VARIABLES STUNDENT_ACC = GVSA
//Current number of rows
var GVSAdefaultRow = 0;
//CurrentIndexPage global
var GVSAIndexPage = 0;

//Get the total length of table
var GVSAAccLength = 0;

//JSON global results variable
var GVSAResults = {};

//JSON global result sorted variable
var GVSAResultsSorted = {};

//Check if already sorted
var GVSAIsSorted = false;
//Default number of row global
var GVSANumRows = 0;

//If the default row is less than 10
var GVSALessThanRow = 0;

//Get desired number of row per page
var GVSARowPerPage = 0;

//NextPage Call
const nextpageCall = function nextPageCall(){
    if(((GVSAAccLength - GVSAdefaultRow) < 10) && GVSALessThanRow === 0){
        
        GVSALessThanRow = GVSAAccLength - GVSAdefaultRow;
        GVSAdefaultRow += GVSALessThanRow;
        bindAllDataIntoTable();
    }
    if(GVSAdefaultRow < GVSAAccLength &&GVSAIndexPage <= GVSARowPerPage ){
        GVSAdefaultRow += GVSARowPerPage;
        GVSAIndexPage +=GVSARowPerPage;
        bindAllDataIntoTable();
    }
}



//PrevPage Call
const prevpageCall = function nextPageCall(){
  
    // console.log('Less than row'+GVSALessThanRow);
    if(GVSALessThanRow !== 0){
    
        GVSAdefaultRow = GVSAdefaultRow - GVSALessThanRow;
        GVSALessThanRow = 0;
    }
    if(GVSAIndexPage >= GVSARowPerPage){
        GVSAdefaultRow -= GVSARowPerPage;
        GVSAIndexPage -=GVSARowPerPage;
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
    fetch('../controller/admin-student-accounts.php').then((res) => res.json())
    .then(response => {

        GVSAResults = response;//Store the responseJSON into GVSAResults global var
        GVSAAccLength = response.length;//getThe totalLength
        GVSANumRows = 5;//Set Number of rows default
        
        let selectHolder = '';
        if(GVSAAccLength >= 500){
           
            selectHolder += `
            <option value="5" selected>5</option>
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="ALL">All</option>`;
        }else if (GVSAAccLength >= 300){
           
            selectHolder += `
            <option value="5" selected>5</option>
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="ALL">All</option>`;
        }else if(GVSAAccLength >= 25){
            
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
            GVSARowPerPage = 5;
            GVSAdefaultRow = 5;
        }else if (selectPage.value === '10'){
            GVSARowPerPage = 10
            GVSAdefaultRow = 10;
        }else if (selectPage.value === '25'){
            GVSARowPerPage = 25;
            GVSAdefaultRow = 25;
        }else{
            GVSARowPerPage = 50;
            GVSAdefaultRow = 50;
        }// rows condition

        bindAllDataIntoTable();//Bind the data into table once fetch successfull
    }).catch(error => console.log(error));//end of get user accounts
}//end of function getAllDataAPI




const bindAllDataIntoTable = function (){   
    let output ='';

for(let i = GVSAIndexPage; i<GVSAdefaultRow; i++){
 
    output += `<tr>
    <td>${GVSAResults[i].id}</td>
    <td><img src = "../../uploads/${GVSAResults[i].profile_url} " alt="Profile" height = "100px" width = "100px"/></td>
    <td>${GVSAResults[i].studentnumber}</td>
    <td>${GVSAResults[i].firstname}</td>
    <td>${GVSAResults[i].middlename}</td>
    <td>${GVSAResults[i].lastname}</td>
    <td>${GVSAResults[i].email}</td>
    <td>${GVSAResults[i].password}</td>
    <td>${GVSAResults[i].course}</td>
    <td>${GVSAResults[i].section}</td>
    <td>${GVSAResults[i].birthday}</td>
    <td>${GVSAResults[i].contact}</td>
    <td>${GVSAResults[i].gaurdian}</td>
    <td>${GVSAResults[i].gaurdian_contact}</td>
    <td>${GVSAResults[i].added_at}</td>
    <th scope="col" class="table-info">
    <div class = "pt-2">
    <a href="#" class ="btn btn-primary btn-sm" title = "Profile"><i class="bi bi-upload"></i></a>

    <a href="#" class ="btn btn-danger btn-sm" title = "Archived"><i class="bi bi-trash"></i></a>
    
    </div>
    </th>
    </tr>`;
}

let numberOfPages = '';
numberOfPages += `<h8>Showing `+GVSAdefaultRow+` out of `+GVSAAccLength+` results</h8>`;
document.querySelector('#tbody-admin-student-accounts').innerHTML = output;//print the data into the tbody
document.querySelector('#showNumberOfPage').innerHTML = numberOfPages;
}





//Sort the table
const sortCurrentTable = (headerTitle) =>{


    for(let i = 0; i<GVSANumRows; i++){
        GVSAResultsSorted[i] = GVSAResults[GVSAIndexPage+i];
    }//Fill the GVSAResultsSorted with GVSAResults only needed

if(GVSAIsSorted){
 
    for(let i = 0; i<GVSANumRows-1; i++){
        for(let j = 0; j<GVSANumRows-1; j++){
         if(GVSAResultsSorted[j][headerTitle]> GVSAResultsSorted[j+1][headerTitle]){
             // console.log("a = "+GVSAResultsSorted[j].id+" > "+" b = "+GVSAResultsSorted[j+1].id);
             let temp = GVSAResultsSorted[j];
             GVSAResultsSorted[j] = GVSAResultsSorted[j+1];
             GVSAResultsSorted[j+1] = temp;
      }
     }
   }
   GVSAIsSorted = false;//after sorted then reverse sort
}else{
  
    for(let i = 0; i<GVSANumRows-1; i++){
        for(let j = 0; j<GVSANumRows-1; j++){
         if(GVSAResultsSorted[j][headerTitle] < GVSAResultsSorted[j+1][headerTitle]){
             // console.log("a = "+GVSAResultsSorted[j].id+" > "+" b = "+GVSAResultsSorted[j+1].id);
             let temp = GVSAResultsSorted[j];
             GVSAResultsSorted[j] = GVSAResultsSorted[j+1];
             GVSAResultsSorted[j+1] = temp;
      }
     }
   }
   GVSAIsSorted = true;//after sorted then reverse sort
}
   

  
    bindAllDataIntoTableSorted();
}//Sort by id





//Bind the sorted table
const bindAllDataIntoTableSorted = function (){
    
    let output ='';
    
    for(let i = 0; i<GVSANumRows; i++){
        output += `<tr>
        <td>${GVSAResultsSorted[i].id}</td>
        <td><img src = "../../uploads/${GVSAResultsSorted[i].profile_url} " alt="Profile" height = "100px" width = "100px"/></td>
        <td>${GVSAResults[i].studentnumber}</td>
        <td>${GVSAResults[i].firstname}</td>
        <td>${GVSAResults[i].middlename}</td>
        <td>${GVSAResults[i].lastname}</td>
        <td>${GVSAResults[i].email}</td>
        <td>${GVSAResults[i].password}</td>
        <td>${GVSAResults[i].course}</td>
        <td>${GVSAResults[i].section}</td>
        <td>${GVSAResults[i].birthday}</td>
        <td>${GVSAResults[i].contact}</td>
        <td>${GVSAResults[i].gaurdian}</td>
        <td>${GVSAResults[i].gaurdian_contact}</td>
        <td>${GVSAResultsSorted[i].added_at}</td>
        <th scope="col" class="table-info">
        <div class = "pt-2">
    <a href="#" class ="btn btn-primary btn-sm" title = "Profile"><i class="bi bi-upload"></i></a>

    <a href="#" class ="btn btn-danger btn-sm" title = "Archived"><i class="bi bi-trash"></i></a>
    
    </div>
        </th>
        </tr>`;
    }
   
    let numberOfPages = '';
    numberOfPages += `<h8>Showing `+GVSAdefaultRow+` out of `+GVSAAccLength+` results</h8>`;
    document.querySelector('#tbody-admin-student-accounts').innerHTML = output;//print the data into the tbody
    document.querySelector('#showNumberOfPage').innerHTML = numberOfPages;
}//Sorted Bind Table


//Select bind data

const selectNumPage = function(){
    
    GVSAIsSorted = false;//Default the not sorted
    if(selectPage.value === '5'){
        GVSANumRows = 5;
        GVSARowPerPage = 5;
        GVSAdefaultRow = 5;
    }else if (selectPage.value === '10'){
        GVSANumRows = 10;
        GVSARowPerPage = 10
        GVSAdefaultRow = 10;
    }else if (selectPage.value === '25'){
        GVSANumRows = 25;
        GVSARowPerPage = 25;
        GVSAdefaultRow = 25;
    }else{
        GVSANumRows = GVSAAccLength;
        GVSARowPerPage = GVSAAccLength;
        GVSAdefaultRow = GVSAAccLength;
    }
    bindAllDataIntoTable();
}

//Search bar function
const userSearchKey = () =>{
let userSearch = userSearchBar.value;


let results = [];//Temporary JSON

for(let i = 0; i<GVSAResults.length;i++){
    for( key in GVSAResults[i]){
        if(GVSAResults[i][key].indexOf(userSearch) != -1){
            results.push(GVSAResults[i]);
            break;
        }
    }
}//Put all match results in results obj

GVSANumRows = results.length;//set the value of numrows
GVSAResultsSorted = results;

bindAllDataIntoTableSorted();
}


