//GLOBAL VARIABLES MISCELLANEOUS FEE = GVMF
//Current number of rows
var GVMFdefaultRow = 0;
//CurrentIndexPage global
var GVMFIndexPage = 0;

//Get the total length of table
var GVMFAccLength = 0;

//JSON global results variable
var GVMFResults = {};

//JSON global result sorted variable
var GVMFResultsSorted = {};

//Check if already sorted
var GVMFIsSorted = false;
//Default number of row global
var GVMFNumRows = 0;

//If the default row is less than 10
var GVMFLessThanRow = 0;

//Get desired number of row per page
var GVMFRowPerPage = 0;

//NextPage Call
const nextpageCall = function nextPageCall(){

    if(((GVMFAccLength - GVMFdefaultRow) < 10) && GVMFLessThanRow === 0){
      console.log("LOL")
        GVMFLessThanRow = GVMFAccLength - GVMFdefaultRow;
        GVMFdefaultRow += GVMFLessThanRow;
        bindAllDataIntoTable();
    }
    console.log("LMAo")
    console.log("next page GVMFdefaultRow: "+GVMFdefaultRow +" GVMFAccLength:"+GVMFAccLength+" GVMFIndexPage:" +GVMFIndexPage +" <= GVMFRowPerPage:"+GVMFRowPerPage);
    if(GVMFdefaultRow < GVMFAccLength ){
       
        GVMFdefaultRow += GVMFRowPerPage;
        console.log("next page GVMFdefaultRow:"+GVMFdefaultRow)
        GVMFIndexPage +=GVMFRowPerPage;
        bindAllDataIntoTable();
    }
}



//PrevPage Call
const prevpageCall = function nextPageCall(){
  
    // console.log('Less than row'+GVMFLessThanRow);
    if(GVMFLessThanRow !== 0){
    
        GVMFdefaultRow = GVMFdefaultRow - GVMFLessThanRow;
        GVMFLessThanRow = 0;
    }
    if(GVMFIndexPage >= GVMFRowPerPage){
        GVMFdefaultRow -= GVMFRowPerPage;
        GVMFIndexPage -=GVMFRowPerPage;
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
    fetch('../controller/miscellaneous-fee-table.php').then((res) => res.json())
    .then(response => {

        GVMFResults = response;//Store the responseJSON into GVMFResults global var
       
        GVMFAccLength = response.length;//getThe totalLength
        GVMFNumRows = 0;//Set Number of rows default
        
        let selectHolder = '';
        if(GVMFAccLength >= 75){
           
            selectHolder += `
            <option value="5" selected>5</option>
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="ALL">All</option>`;
        }else if (GVMFAccLength >= 50){
           
            selectHolder += `
            <option value="5" selected>5</option>
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="ALL">All</option>`;
        }else if(GVMFAccLength >= 15){
            
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
            GVMFNumRows = 5;
            GVMFRowPerPage = 5;
            GVMFdefaultRow = 5;
        }else if (selectPage.value === '10'){
            GVMFNumRows = 10;
            GVMFRowPerPage = 10
            GVMFdefaultRow = 10;
        }else if (selectPage.value === '25'){
            GVMFNumRows = 25;
            GVMFRowPerPage = 25;
            GVMFdefaultRow = 25;
        }else{
            GVMFNumRows = GVMFAccLength;
            GVMFRowPerPage = GVMFAccLength;
            GVMFdefaultRow = GVMFAccLength;
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
    for(let i =0 ; i< GVMFdefaultRow;i++ ){
        if(GVMFResults[i].id == id){
            console.log("true")
            output += `<img src = "../../uploads/${GVMFResults[i].profile_url} " alt="Profile" style="max-width:350px; max-height:350px;" "/>
            `;
            
            break;
        }
    }
    document.querySelector('#changePicModalBody').innerHTML = output;
}


const bindAllDataIntoTable = function (){   
    let output ='';

for(let i = GVMFIndexPage; i<GVMFdefaultRow; i++){
 console.log("GVMFIndexPage: "+GVMFIndexPage+"< GVMFDefaultRow:" +GVMFdefaultRow)
    output += `<tr>
    <td>${GVMFResults[i].name}</td>
    <td>${GVMFResults[i].amount}</td>
    <td>${GVMFResults[i].added_at}</td>
    <th scope="col" class="table-info">
    <div class = "pt-2">
    <a href="#" class ="btn btn-info btn-sm" title = "View" data-bs-toggle="modal" data-bs-target="#editusermodal" onclick ="editUserNotSorted(${GVMFResults[i].id});return false;" ><i class="bi bi-eye"></i></a>

    <a href="#" class ="btn btn-danger btn-sm" title = "Archived" data-bs-toggle="modal" data-bs-target="#archivedModal" onclick ="moveToArchive('${GVMFResults[i].id}', '${GVMFResults[i].name}');return false;"><i class="bi bi-trash"></i></a>
    
    </div>
    </th>
    </tr>`;
    
}

let numberOfPages = '';
numberOfPages += `<h8>Showing `+GVMFdefaultRow+` out of `+GVMFAccLength+` results</h8>`;
document.querySelector('#tbody-user-accounts').innerHTML = output;//print the data into the tbody
document.querySelector('#showNumberOfPage').innerHTML = numberOfPages;
}






//Sort the table
const sortCurrentTable = (headerTitle) =>{


    for(let i = 0; i<GVMFNumRows; i++){
        GVMFResultsSorted[i] = GVMFResults[GVMFIndexPage+i];
    }//Fill the GVMFResultsSorted with GVMFResults only needed

if(GVMFIsSorted){
 
    for(let i = 0; i<GVMFNumRows-1; i++){
        for(let j = 0; j<GVMFNumRows-1; j++){
         if(GVMFResultsSorted[j][headerTitle]> GVMFResultsSorted[j+1][headerTitle]){
             // console.log("a = "+GVMFResultsSorted[j].id+" > "+" b = "+GVMFResultsSorted[j+1].id);
             let temp = GVMFResultsSorted[j];
             GVMFResultsSorted[j] = GVMFResultsSorted[j+1];
             GVMFResultsSorted[j+1] = temp;
      }
     }
   }
   GVMFIsSorted = false;//after sorted then reverse sort
}else{
  
    for(let i = 0; i<GVMFNumRows-1; i++){
        for(let j = 0; j<GVMFNumRows-1; j++){
         if(GVMFResultsSorted[j][headerTitle] < GVMFResultsSorted[j+1][headerTitle]){
             // console.log("a = "+GVMFResultsSorted[j].id+" > "+" b = "+GVMFResultsSorted[j+1].id);
             let temp = GVMFResultsSorted[j];
             GVMFResultsSorted[j] = GVMFResultsSorted[j+1];
             GVMFResultsSorted[j+1] = temp;
      }
     }
   }
   GVMFIsSorted = true;//after sorted then reverse sort
}
   

  
    bindAllDataIntoTableSorted();
}//Sort by id





//Bind the sorted table
const bindAllDataIntoTableSorted = function (){
    
    let output ='';
    
    for(let i = 0; i<GVMFNumRows; i++){
        output += `<tr>
        <td>${GVMFResultsSorted[i].name}</td>
        <td>${GVMFResultsSorted[i].amount}</td>
        <td>${GVMFResultsSorted[i].added_at}</td>
        <th scope="col" class="table-info">
        <div class = "pt-2">
    <a href="#" class ="btn btn-info btn-sm" title = "View" data-bs-toggle="modal" data-bs-target="#editusermodal" onclick ="editUserSorted(${GVMFResultsSorted[i].id});return false;"><i class="bi bi-eye"></i></a>

    <a href="#" class ="btn btn-danger btn-sm" title = "Archived"  data-bs-toggle="modal" data-bs-target="#archivedModal" onclick ="moveToArchive('${GVMFResultsSorted[i].id}', '${GVMFResultsSorted[i].name}');return false;"><i class="bi bi-trash"></i></a>
    
    </div>
        </th>
        </tr>`;
    }
   
    let numberOfPages = '';
    numberOfPages += `<h8>Showing `+GVMFdefaultRow+` out of `+GVMFAccLength+` results</h8>`;
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
    const fetchRemove = await fetch("../controller/miscellaneous-fee-remove.php",{
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
    GVMFIsSorted = false;//Default the not sorted
    if(selectPage.value === '5'){
        GVMFIndexPage = 0;
        GVMFNumRows = 5;
        GVMFRowPerPage = 5;
        GVMFdefaultRow = 5;
    }else if(selectPage.value === '10'){
        console.log("10")
        GVMFNumRows = 10;
        GVMFIndexPage = 0;
        GVMFRowPerPage = 10;
        GVMFdefaultRow = 10;
    }else if(selectPage.value === '25'){
        console.log("25")
        GVMFNumRows = 25;
        GVMFIndexPage = 0;
        GVMFRowPerPage = 25;
        GVMFdefaultRow = 25;
    }else{

        GVMFIndexPage = 0;
        GVMFNumRows = GVMFAccLength;
        GVMFRowPerPage = GVMFAccLength;
        GVMFdefaultRow = GVMFAccLength;
    }
    bindAllDataIntoTable();
}

//Search bar function
const userSearchKey = () =>{
let userSearch = userSearchBar.value;
console.log(userSearch !== "");
if(userSearch !== ""){
    let results = [];//Temporary JSON

    for(let i = 0; i<GVMFResults.length;i++){
        for( key in GVMFResults[i]){
            if(GVMFResults[i][key].indexOf(userSearch) != -1){
                results.push(GVMFResults[i]);
                break;
            }
        }
    }//Put all match results in results obj
    
    GVMFNumRows = results.length;//set the value of numrows
    GVMFResultsSorted = results;
    bindAllDataIntoTableSorted();
}else{
    bindAllDataIntoTable();
}

}




const btnEditUsers = document.getElementById('btnEditUsers');

const resetFields = () =>{
    let Id = document.getElementById('editId').value ="";
    let Name = document.getElementById('editName').value ="";
    let Amount = document.getElementById('newAmount').value ="";
    btnCreateUsers.setAttribute("hidden", "hidden");
    btnSuccess.removeAttribute("hidden");
}//Reset all the fields

//Call it to refresh the table
 refreshTable = () =>{
     GVMFIndexPage = 0;
    resetFields();
    getAllDataAPI();
}


//Check all of the fields
const checkAllFields = () =>{
    let Name = document.getElementById('newName').value;

    let Amount = document.getElementById('newAmount').value;
   
    if(Name !== "" && Amount !==""){
        if(isNaN(Amount) || Amount < 0){
            alertShowError.classList.add('show');
            alertShowError.removeAttribute("hidden");
            btnCreateUsers.style.display = "none";
            let output = '';
            output += ` Invalid Amount!`;
            document.querySelector('#alertErrorMessage').innerHTML = output;
            delayedAlert = () =>{
                alertShowError.classList.remove('show');
                alertShowError.setAttribute("hidden", "hidden");

                btnCreateUsers.style.display = "inline-block";
            }
            setTimeout(delayedAlert, 1000);
        }else{
            createUserAccount();
        }
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
    setTimeout(delayedStopLoading, 1000);
    }
   
}




//Create User
const createUserAccount = (e) =>{
    
    IsLoadingTrue(true)//Start the loading button

    let Name= document.getElementById('newName').value;

    let Amount = document.getElementById('newAmount').value;

formData = new FormData();
formData.append('Name', Name);
formData.append('Amount', Amount);
for (var pair of formData.entries()) {
    console.log(pair[0]+ ' - ' + pair[1]); 
 }


    fetch("../controller/miscellaneous-fee-create.php",{
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
 
                btnCreateUsers.setAttribute("hidden", "hidden");
                alertShowSuccess.removeAttribute("hidden");
                alertShowSuccess.classList.add('show');
                
        
    
            delayedRemoveAlert = () =>{   
                btnSuccess.removeAttribute("hidden");
                alertShowSuccess.classList.remove('show');  
                alertShowSuccess.setAttribute("hidden", "hidden");
            }
            setTimeout(delayedRemoveAlert, 1000);
          }

          if(response.statusCode === 201){
            alertShowError.classList.add('show');
            alertShowError.removeAttribute("hidden");
            btnCreateUsers.style.display = "none";
            let output = '';
            output += ` Miscellaneous Fee Already Exist!`
            document.querySelector('#alertErrorMessage').innerHTML = output;
            delayedAlert = () =>{
                alertShowError.classList.remove('show');
                alertShowError.setAttribute("hidden", "hidden");

                btnCreateUsers.style.display = "inline-block";
            }
            setTimeout(delayedAlert, 1000);
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
    for(let i =0 ; i< GVMFResults.length;i++ ){
        if(GVMFResults[i].id == a){
            let Id = document.getElementById('editId').value = GVMFResults[i].id;
            let Name = document.getElementById('editName').value =  GVMFResults[i].name; 
            let Amount = document.getElementById('editAmount').value = GVMFResults[i].amount;
         break;
     }
    }
 }
 



//Edit User Data sorted

const editUserSorted = (a) =>{
    
    for(let i =0 ; i< GVMFNumRows;i++ ){
        if(GVMFResultsSorted[i].id == a){
            let Id = document.getElementById('editId').value = GVMFResultsSorted[i].id;
            let Name = document.getElementById('editName').value =  GVMFResultsSorted[i].name; 
            let Amount = document.getElementById('editAmount').value = GVMFResultsSorted[i].amount;
         break;
     }
    }
 }
 
 const checkEditFields = () =>{
    let Id = document.getElementById('editId').value;
   let Name = document.getElementById('editName').value;

    let Amount = document.getElementById('editAmount').value;

    if(Amount !== ""){

        if(isNaN(Amount) || Amount < 1){
            alertShowError.classList.add('show');
            alertShowError.removeAttribute("hidden");
            btnCreateUsers.style.display = "none";
            let output = '';
            output += ` Invalid Amount!`
            document.querySelector('#alertErrorMessage').innerHTML = output;
            delayedAlert = () =>{
                alertShowError.classList.remove('show');
                alertShowError.setAttribute("hidden", "hidden");
                btnCreateUsers.style.display = "inline-block";
            }
            setTimeout(delayedAlert, 1000);
        }else{
            updateUser();
        }
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

    let Name = document.getElementById('editName').value;

    let Amount = document.getElementById('editAmount').value;
   
    formData = new FormData();
formData.append('SubjectId', SubjectId);   
formData.append('Name', Name);
formData.append('Amount', Amount);

for (var pair of formData.entries()) {
    console.log(pair[0]+ ' - ' + pair[1]); 
 }

try{
  const fetchEdit = await fetch("../controller/miscellaneous-fee-edit.php",{
        method: "POST",
        body: formData,
    });


    const fetchResponse = await fetchEdit.json();
    
    const showAnimation = await function(){
let message = '';
        if(fetchResponse.statusCode === 200){
            console.log(fetchResponse)
 
                message += ` Updated Succesfully!`
                document.querySelector('#alertSuccessMessage').innerHTML = message;
                alertShowSuccess.removeAttribute("hidden");
                alertShowSuccess.classList.add('show');
                
            delayedRemoveAlert = () =>{   
                alertShowSuccess.classList.remove('show');  
                alertShowSuccess.setAttribute("hidden", "hidden");
            }
            setTimeout(delayedRemoveAlert, 1000);
          }
        } 
            
        if(fetchResponse.statusCode === 201){
            alertShowError.classList.add('show');
            alertShowError.removeAttribute("hidden");
            btnCreateUsers.style.display = "none";
            let output = '';
            output += ` Subject Already Exist!`
            document.querySelector('#alertErrorMessage').innerHTML = output;
            delayedAlert = () =>{
                alertShowError.classList.remove('show');
                alertShowError.setAttribute("hidden", "hidden");
                btnCreateUsers.style.display = "inline-block";
            }
            setTimeout(delayedAlert, 1000);
        }   
        showAnimation();
}catch (e){
    console.log(e)
}

}