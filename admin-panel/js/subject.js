//GLOBAL VARIABLES SUBJECT = GVS
//Current number of rows
var GVSdefaultRow = 0;
//CurrentIndexPage global
var GVSIndexPage = 0;

//Get the total length of table
var GVSAccLength = 0;

//JSON global results variable
var GVSResults = {};

//JSON global result sorted variable
var GVSResultsSorted = {};

//Check if already sorted
var GVSIsSorted = false;
//Default number of row global
var GVSNumRows = 0;

//If the default row is less than 10
var GVSLessThanRow = 0;

//Get desired number of row per page
var GVSRowPerPage = 0;

//NextPage Call
const nextpageCall = function nextPageCall(){

    if(((GVSAccLength - GVSdefaultRow) < 10) && GVSLessThanRow === 0){
      console.log("LOL")
        GVSLessThanRow = GVSAccLength - GVSdefaultRow;
        GVSdefaultRow += GVSLessThanRow;
        bindAllDataIntoTable();
    }
    console.log("LMAo")
    console.log("next page GVSdefaultRow: "+GVSdefaultRow +" GVSAccLength:"+GVSAccLength+" GVSIndexPage:" +GVSIndexPage +" <= GVSRowPerPage:"+GVSRowPerPage);
    if(GVSdefaultRow < GVSAccLength ){
       
        GVSdefaultRow += GVSRowPerPage;
        console.log("next page GVSdefaultRow:"+GVSdefaultRow)
        GVSIndexPage +=GVSRowPerPage;
        bindAllDataIntoTable();
    }
}



//PrevPage Call
const prevpageCall = function nextPageCall(){
  
    // console.log('Less than row'+GVSLessThanRow);
    if(GVSLessThanRow !== 0){
    
        GVSdefaultRow = GVSdefaultRow - GVSLessThanRow;
        GVSLessThanRow = 0;
    }
    if(GVSIndexPage >= GVSRowPerPage){
        GVSdefaultRow -= GVSRowPerPage;
        GVSIndexPage -=GVSRowPerPage;
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


//JavaScript create account admin
const btnCreateUsers = document.getElementById('btnCreateUsers');
const frmCreateUsers = document.getElementById('frmCreateUsers');//form create account
const btnIsLoading = document.getElementById('btnIsLoading');//LoadingButton
const alertShowError = document.getElementById('alertError');//AlertError
const alertShowSuccess = document.getElementById('alertSuccess');//Alert Success
const btnError = document.getElementById('btnError');//Error button disabled
const btnSuccess = document.getElementById('btnSuccess');//Succes button

//Javascript edit account admin
const btnEditError = document.getElementById('btnEditError');//Error button disabled
const btnEditSuccess = document.getElementById('btnEditSuccess');//Succes button
const btnIsUpdating = document.getElementById('btnIsUpdating');//updating button


window.onload = function(){
    getAllDataAPI();
    selectNumPage();
}//Onload page

//getAllData Function
function getAllDataAPI(){
    //get user accounts
    fetch('../controller/subject-table.php').then((res) => res.json())
    .then(response => {

        GVSResults = response;//Store the responseJSON into GVSResults global var
       
        GVSAccLength = response.length;//getThe totalLength
        GVSNumRows = 0;//Set Number of rows default
        
        let selectHolder = '';
        if(GVSAccLength >= 75){
           
            selectHolder += `
            <option value="5" selected>5</option>
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="ALL">All</option>`;
        }else if (GVSAccLength >= 50){
           
            selectHolder += `
            <option value="5" selected>5</option>
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="ALL">All</option>`;
        }else if(GVSAccLength >= 15){
            
            selectHolder += `
            <option value="5" selected>5</option>
            <option value="10" selected>10</option>
            <option value="ALL">All</option>`;
        }else{
            //if lower than 5 rows
            selectHolder += `
            <option value="ALL" selected>All</option>`;
        }
        document.querySelector('#selectPage').innerHTML = selectHolder;// set the rows per page

        if(selectPage.value === '5'){
            GVSNumRows = 5;
            GVSRowPerPage = 5;
            GVSdefaultRow = 5;
        }else if (selectPage.value === '10'){
            GVSNumRows = 10;
            GVSRowPerPage = 10
            GVSdefaultRow = 10;
        }else if (selectPage.value === '25'){
            GVSNumRows = 25;
            GVSRowPerPage = 25;
            GVSdefaultRow = 25;
        }else{
            GVSNumRows = GVSAccLength;
            GVSRowPerPage = GVSAccLength;
            GVSdefaultRow = GVSAccLength;
        }// rows condition

        bindAllDataIntoTable();//Bind the data into table once fetch successfull
    }).catch(error => console.log(error));//end of get user accounts
}//end of function getAllDataAPI

const editProfilePic = async () =>{
    let value = document.getElementById('changePicUserID').value
    let fileupload = document.getElementById('editUserPic');// fileupload


    // Picking up files from the input .  .  .
    let files = fileupload.files;
   
    // Uploading only one file; multiple uploads are not allowed.
     let imageFile = files[0]; 
   
      // Create a FormData object.
     formData = new FormData();
   
     // Add the file to the request.
     formData.append('profileEdit', imageFile, imageFile.name);
     formData.append('userId', value);
   try{
   
   const fetchResponse = await fetch("../controller/move-only-image.php",{
       method: "POST",
       body:formData,
   });
   
   const receivedStatus = await fetchResponse.json();
   
   

   console.log(receivedStatus.statusCode)
   if(receivedStatus.statusCode === 200){
    let output = ''; 
    output += `<img src="../../uploads/${receivedStatus.image}" alt="Profile"style ="max-width:350px; max-height:350px;"/>
    `;
    document.querySelector('#changePicModalBody').innerHTML = output;
    
    let showBtn = '';
    showBtn += `<button type="button" id ="btnChangePic" class="btn btn-primary" onclick="saveChanges('`+value+`', '${receivedStatus.image}')">Save changes</button>
    <script>
    
    </script>
    `;
   document.querySelector('#showSave').innerHTML = showBtn;
   }
    

  
 
   
   }catch (e){
   console.log(e)
   }
  
}

const saveChanges = async (...params) =>{
    let btnChangePic = document.getElementById('btnChangePic');
        // Create a FormData object.
    imageformData = new FormData();
   
    imageformData.append('userId', params[0]);
    imageformData.append('Image_Url', params[1]);
    let message = '';
    try{
       const fetchResponse = await fetch("../controller/user-edit-pic.php",{
           method: "POST",
           body:imageformData,
       });
       const receivedStatus = await fetchResponse.json();
       console.log(receivedStatus)
       if(receivedStatus.statusCode === 200){
         alertShowSuccess.removeAttribute("hidden");
         btnChangePic.setAttribute("disabled", "disabled");
          alertShowSuccess.classList.add('show');
          message += ` Updated Succesfully!`
        
        delayedRemoveAlert = () =>{   
            alertShowSuccess.classList.remove('show');  
            alertShowSuccess.setAttribute("hidden", "hidden");
        }
        setTimeout(delayedRemoveAlert, 3000);
      }
      document.querySelector('#alertSuccessMessage').innerHTML = message;
    }catch(e){
       console.log(e);
    }
  }

//Change Profile Picture Modal
const changePicModal =  (id) =>{
    let changePicUserID = document.getElementById('changePicUserID').value = id;
    console.log(id)
    let output = '';
    for(let i =0 ; i< GVSdefaultRow;i++ ){
        if(GVSResults[i].id == id){
            console.log("true")
            output += `<img src = "../../uploads/${GVSResults[i].profile_url} " alt="Profile" style="max-width:350px; max-height:350px;" "/>
            `;
            
            break;
        }
    }
    document.querySelector('#changePicModalBody').innerHTML = output;
}


const bindAllDataIntoTable = function (){   
    let output ='';

for(let i = GVSIndexPage; i<GVSdefaultRow; i++){
 console.log("GVSIndexPage: "+GVSIndexPage+"< GVSDefaultRow:" +GVSdefaultRow)
    output += `<tr>
    <td>${GVSResults[i].id}</td>
    <td>${GVSResults[i].subject_code}</td>
    <td>${GVSResults[i].subject_name}</td>
    <td>${GVSResults[i].units}</td>
    <td>${GVSResults[i].added_at}</td>
    <th scope="col" class="table-info">
    <div class = "pt-2">
    <a href="#" class ="btn btn-primary btn-sm" title = "View" data-bs-toggle="modal" data-bs-target="#editusermodal" onclick ="editUserNotSorted(${GVSResults[i].id});return false;" ><i class="bi bi-eye"></i></a>

    <a href="#" class ="btn btn-danger btn-sm" title = "Archived" data-bs-toggle="modal" data-bs-target="#archivedModal" onclick ="moveToArchive('${GVSResults[i].id}', '${GVSResults[i].subject_code}');return false;"><i class="bi bi-trash"></i></a>
    
    </div>
    </th>
    </tr>`;
    
}

let numberOfPages = '';
numberOfPages += `<h8>Showing `+GVSdefaultRow+` out of `+GVSAccLength+` results</h8>`;
document.querySelector('#tbody-user-accounts').innerHTML = output;//print the data into the tbody
document.querySelector('#showNumberOfPage').innerHTML = numberOfPages;
}






//Sort the table
const sortCurrentTable = (headerTitle) =>{


    for(let i = 0; i<GVSNumRows; i++){
        GVSResultsSorted[i] = GVSResults[GVSIndexPage+i];
    }//Fill the GVSResultsSorted with GVSResults only needed

if(GVSIsSorted){
 
    for(let i = 0; i<GVSNumRows-1; i++){
        for(let j = 0; j<GVSNumRows-1; j++){
         if(GVSResultsSorted[j][headerTitle]> GVSResultsSorted[j+1][headerTitle]){
             // console.log("a = "+GVSResultsSorted[j].id+" > "+" b = "+GVSResultsSorted[j+1].id);
             let temp = GVSResultsSorted[j];
             GVSResultsSorted[j] = GVSResultsSorted[j+1];
             GVSResultsSorted[j+1] = temp;
      }
     }
   }
   GVSIsSorted = false;//after sorted then reverse sort
}else{
  
    for(let i = 0; i<GVSNumRows-1; i++){
        for(let j = 0; j<GVSNumRows-1; j++){
         if(GVSResultsSorted[j][headerTitle] < GVSResultsSorted[j+1][headerTitle]){
             // console.log("a = "+GVSResultsSorted[j].id+" > "+" b = "+GVSResultsSorted[j+1].id);
             let temp = GVSResultsSorted[j];
             GVSResultsSorted[j] = GVSResultsSorted[j+1];
             GVSResultsSorted[j+1] = temp;
      }
     }
   }
   GVSIsSorted = true;//after sorted then reverse sort
}
   

  
    bindAllDataIntoTableSorted();
}//Sort by id





//Bind the sorted table
const bindAllDataIntoTableSorted = function (){
    
    let output ='';
    
    for(let i = 0; i<GVSNumRows; i++){
        output += `<tr>
        <td>${GVSResultsSorted[i].id}</td>
        <td>${GVSResultsSorted[i].subject_code}</td>
        <td>${GVSResultsSorted[i].subject_name}</td>
        <td>${GVSResultsSorted[i].units}</td>
        <td>${GVSResultsSorted[i].added_at}</td>
        <th scope="col" class="table-info">
        <div class = "pt-2">
    <a href="#" class ="btn btn-primary btn-sm" title = "View" data-bs-toggle="modal" data-bs-target="#editusermodal" onclick ="editUserSorted(${GVSResultsSorted[i].id});return false;"><i class="bi bi-eye"></i></a>

    <a href="#" class ="btn btn-danger btn-sm" title = "Archived"  data-bs-toggle="modal" data-bs-target="#archivedModal" onclick ="moveToArchive('${GVSResultsSorted[i].id}', '${GVSResultsSorted[i].subject_code}');return false;"><i class="bi bi-trash"></i></a>
    
    </div>
        </th>
        </tr>`;
    }
   
    let numberOfPages = '';
    numberOfPages += `<h8>Showing `+GVSdefaultRow+` out of `+GVSAccLength+` results</h8>`;
    document.querySelector('#tbody-user-accounts').innerHTML = output;//print the data into the tbody
    document.querySelector('#showNumberOfPage').innerHTML = numberOfPages;
}//Sorted Bind Table

//Archived prompt ! are you sure you want to archive?
const moveToArchive = async (...params) => {
let output = '';
output += `Are you sure you want to remove `+params[1]+` ?!`;
let showButtons ='';
showButtons += ` <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
<button type="button" class="btn btn-danger"data-bs-dismiss="modal" onclick= "removeUserAccount(`+params[0]+`)">Remove</button>`;
document.querySelector('#modal-footer-button').innerHTML = showButtons;//show the buttons modal archive
document.querySelector('#archive-modal-title').innerHTML = output;//change the title of modal archive
}

//RemoveUserAccount when confirmed
const removeUserAccount = async (id) =>{
    let message = '';// message alert
 //get current date where removing was done
 const removedDate = new Date();   

formData = new FormData()
formData.append('UserID', id);
formData.append('Status', removedDate);

try{
    const fetchRemove = await fetch("../controller/subject-remove.php",{
          method: "POST",
          body: formData,
      });
  
      const fetchResponse = await fetchRemove.json();
      if(fetchResponse.statusCode === 200){     
            alertShowSuccess.removeAttribute("hidden");
            alertShowSuccess.classList.add('show');
            message += ` Removed Succesfully!`
            refreshTable(); 
        delayedRemoveAlert = () =>{   
            alertShowSuccess.classList.remove('show');  
            alertShowSuccess.setAttribute("hidden", "hidden");
        }
        setTimeout(delayedRemoveAlert, 3000);
      }// end of if fetch === 200

    document.querySelector('#alertSuccessMessage').innerHTML = message;
       
  }catch (e){
      console.log(e)
  }
}

//Select bind data

const selectNumPage = function(){
    GVSIsSorted = false;//Default the not sorted
    if(selectPage.value === '5'){
        GVSIndexPage = 0;
        GVSNumRows = 5;
        GVSRowPerPage = 5;
        GVSdefaultRow = 5;
    }else if(selectPage.value === '10'){
        console.log("10")
        GVSNumRows = 10;
        GVSIndexPage = 0;
        GVSRowPerPage = 10;
        GVSdefaultRow = 10;
    }else if(selectPage.value === '25'){
        console.log("25")
        GVSNumRows = 25;
        GVSIndexPage = 0;
        GVSRowPerPage = 25;
        GVSdefaultRow = 25;
    }else{

        GVSIndexPage = 0;
        GVSNumRows = GVSAccLength;
        GVSRowPerPage = GVSAccLength;
        GVSdefaultRow = GVSAccLength;
    }
    bindAllDataIntoTable();
}

//Search bar function
const userSearchKey = () =>{
let userSearch = userSearchBar.value;
console.log(userSearch !== "");
if(userSearch !== ""){
    let results = [];//Temporary JSON

    for(let i = 0; i<GVSResults.length;i++){
        for( key in GVSResults[i]){
            if(GVSResults[i][key].indexOf(userSearch) != -1){
                results.push(GVSResults[i]);
                break;
            }
        }
    }//Put all match results in results obj
    
    GVSNumRows = results.length;//set the value of numrows
    GVSResultsSorted = results;
    bindAllDataIntoTableSorted();
}else{
    bindAllDataIntoTable();
}

}




const btnEditUsers = document.getElementById('btnEditUsers');

const resetFields = () =>{
    let Subject_Code = document.getElementById('newScode').value = "";

    let Subject_Name= document.getElementById('newSname').value ="";
   
    let Units = document.getElementById('newUnits').value = "";
    btnSuccess.setAttribute("hidden", "hidden");//Is loading true
    btnCreateUsers.removeAttribute("hidden");
}//Reset all the fields

//Call it to refresh the table
 refreshTable = () =>{
     GVSIndexPage = 0;
    resetFields();
    getAllDataAPI();
}


//Check all of the fields
const checkAllFields = () =>{
    let Subject_Code = document.getElementById('newScode').value;

    let Subject_Name= document.getElementById('newSname').value;
   
    let Units = document.getElementById('newUnits').value;
    if(Subject_Code !== "" && Subject_Name !== "" && Units !== ""){
        createUserAccount();
    }else{
        alertShowError.classList.add('show');
        alertShowError.removeAttribute("hidden");
        btnError.removeAttribute("hidden");
        btnCreateUsers.style.display = "none";
        delayedAlert = () =>{
            alertShowError.classList.remove('show');
            alertShowError.setAttribute("hidden", "hidden");
            btnError.setAttribute("hidden", "hidden");//Is loading true
            btnCreateUsers.style.display = "inline-block";
        }
        setTimeout(delayedAlert, 3000);
    }
}



//Loading function for button
const IsLoadingTrue =(formStatus) =>{
    if(formStatus === true){
        IsLoadingTrue(false)//Start the loading button
    btnIsLoading.removeAttribute("hidden");//Is loading true
    btnIsUpdating.removeAttribute("hidden");//Is Updating true
    btnCreateUsers.style.display = "none";
    btnEditUsers.style.display = "none";
    }else{
    delayedStopLoading =() =>{
    btnIsLoading.setAttribute("hidden", "hidden");
    btnIsUpdating.setAttribute("hidden", "hidden");
    btnCreateUsers.style.display = "inline-block";
    btnEditUsers.style.display = "inline-block";
    }
    setTimeout(delayedStopLoading, 3000);
    }
   
}




//Create User
const createUserAccount = (e) =>{
    
    IsLoadingTrue(true)//Start the loading button
   
    let Subject_Code = document.getElementById('newScode').value;

    let Subject_Name= document.getElementById('newSname').value;
   
    let Units = document.getElementById('newUnits').value;

formData = new FormData();
formData.append('Subject_Code', Subject_Code);
formData.append('Subject_Name', Subject_Name);
formData.append('Units', Units);
for (var pair of formData.entries()) {
    console.log(pair[0]+ ' - ' + pair[1]); 
 }


    fetch("../controller/subject-create.php",{
        method: "POST",
        body:formData,
    })
    
    .then((res) => res.json())
        .then(response =>{
            console.log(response.statusCode)
            let message = '';
          if(response.statusCode === 200){
         message += ` Created Succesfully!`
            document.querySelector('#alertSuccessMessage').innerHTML = message;
            delayedShowAlert = () =>{
                btnCreateUsers.setAttribute("hidden", "hidden");
                alertShowSuccess.removeAttribute("hidden");
                alertShowSuccess.classList.add('show');
                btnSuccess.removeAttribute("hidden");
            }
            setTimeout(delayedShowAlert, 3000)
            delayedRemoveAlert = () =>{   
                
                alertShowSuccess.classList.remove('show');  
                alertShowSuccess.setAttribute("hidden", "hidden");
            }
            setTimeout(delayedRemoveAlert, 6000);
          }
            
        })
    .catch(err => console.log(err))

}

//Show picture
const showPicture = () =>{
let Image_Url = document.getElementById('editImage_Url').value;
let Photo = document.getElementById('currentPhoto').src = Image_Url;
}


//Edit User Data Not sorted
const editUserNotSorted = (a) =>{
    for(let i =0 ; i< GVSResults.length;i++ ){
        if(GVSResults[i].id == a){
           
            let SubjectId = document.getElementById('editId').value = GVSResults[i].id;

            let Subject_Code = document.getElementById('editScode').value = GVSResults[i].subject_code; 
         
            let Subject_Name = document.getElementById('editSname').value = GVSResults[i].name;
        
            let Units = document.getElementById('editUnits').value = GVSResults[i].units;
         break;
     }
    }
 }
 



//Edit User Data sorted

const editUserSorted = (a) =>{
    
    for(let i =0 ; i< GVSNumRows;i++ ){
        if(GVSResultsSorted[i].id == a){

            let SubjectId = document.getElementById('editId').value = GVSResultsSorted[i].id;

            let Subject_Code = document.getElementById('editScode').value = GVSResultsSorted[i].subject_code; 
         
            let Subject_Name = document.getElementById('editSname').value = GVSResultsSorted[i].name;
        
            let Units = document.getElementById('editUnits').value = GVSResultsSorted[i].units;
         break;
     }
    }
 }
 
 const checkEditFields = () =>{
     
    let SubjectId = document.getElementById('editId').value;

    let Subject_Code = document.getElementById('editScode').value  
 
    let Subject_Name = document.getElementById('editSname').value

    let Units = document.getElementById('editUnits').value;

    if(SubjectId !== "" && Subject_Code !== "" && Subject_Name !== "" && Units !== ""){
       
        updateUser();

    }else{
        alertShowError.classList.add('show');
        alertShowError.removeAttribute("hidden");
        btnEditError.removeAttribute("hidden");
        btnEditUsers.style.display = "none";
        delayedAlert = () =>{
            alertShowError.classList.remove('show');
            alertShowError.setAttribute("hidden", "hidden");
            btnEditError.setAttribute("hidden", "hidden");//Is loading true
            btnEditUsers.style.display = "inline-block";
        }
        setTimeout(delayedAlert, 3000);
    }
    
 }


const updateUser = async () =>{

    IsLoadingTrue(true)//Start the loading button

    let SubjectId = document.getElementById('editId').value;

    let Subject_Code = document.getElementById('editScode').value  
 
    let Subject_Name = document.getElementById('editSname').value  
     
    let Units = document.getElementById('editUnits').value;
   
   
    formData = new FormData();
formData.append('SubjectId', SubjectId);   
formData.append('Subject_Code', Subject_Code);   
formData.append('Subject_Name', Subject_Name); 
formData.append('Units', Units);  

for (var pair of formData.entries()) {
    console.log(pair[0]+ ' - ' + pair[1]); 
 }

try{
  const fetchEdit = await fetch("../controller/subject-edit.php",{
        method: "POST",
        body: formData,
    });


    const fetchResponse = await fetchEdit.json();
    
    const showAnimation = await function(){
let message = '';
        if(fetchResponse.statusCode === 200){
            console.log(fetchResponse)
            delayedShowAlert = () =>{
                message += ` Updated Succesfully!`
                document.querySelector('#alertSuccessMessage').innerHTML = message;
                alertShowSuccess.removeAttribute("hidden");
                alertShowSuccess.classList.add('show');
                
            }
            setTimeout(delayedShowAlert, 3000)
            delayedRemoveAlert = () =>{   
                alertShowSuccess.classList.remove('show');  
                alertShowSuccess.setAttribute("hidden", "hidden");
            }
            setTimeout(delayedRemoveAlert, 6000);
          }
        }
    
        showAnimation();
     
}catch (e){
    console.log(e)
}

}