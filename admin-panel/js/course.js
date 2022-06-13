//GLOBAL VARIABLES ACADEMIC COURSE = GVAC
//Current number of rows
var GVACdefaultRow = 0;
//CurrentIndexPage global
var GVACIndexPage = 0;

//Get the total length of table
var GVACAccLength = 0;

//JSON global results variable
var GVACResults = {};

//JSON global result sorted variable
var GVACResultsSorted = {};

//Check if already sorted
var GVACIsSorted = false;
//Default number of row global
var GVACNumRows = 0;

//If the default row is less than 10
var GVACLessThanRow = 0;

//Get desired number of row per page
var GVACRowPerPage = 0;

//NextPage Call
const nextpageCall = function nextPageCall(){

    if(((GVACAccLength - GVACdefaultRow) < 10) && GVACLessThanRow === 0){
      console.log("LOL")
        GVACLessThanRow = GVACAccLength - GVACdefaultRow;
        GVACdefaultRow += GVACLessThanRow;
        bindAllDataIntoTable();
    }
    console.log("LMAo")
    console.log("next page GVACdefaultRow: "+GVACdefaultRow +" GVACAccLength:"+GVACAccLength+" GVACIndexPage:" +GVACIndexPage +" <= GVACRowPerPage:"+GVACRowPerPage);
    if(GVACdefaultRow < GVACAccLength ){
       
        GVACdefaultRow += GVACRowPerPage;
        console.log("next page GVACdefaultRow:"+GVACdefaultRow)
        GVACIndexPage +=GVACRowPerPage;
        bindAllDataIntoTable();
    }
}



//PrevPage Call
const prevpageCall = function nextPageCall(){
  
    // console.log('Less than row'+GVACLessThanRow);
    if(GVACLessThanRow !== 0){
    
        GVACdefaultRow = GVACdefaultRow - GVACLessThanRow;
        GVACLessThanRow = 0;
    }
    if(GVACIndexPage >= GVACRowPerPage){
        GVACdefaultRow -= GVACRowPerPage;
        GVACIndexPage -=GVACRowPerPage;
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
    fetch('../controller/course-table.php').then((res) => res.json())
    .then(response => {

        GVACResults = response;//Store the responseJSON into GVACResults global var
       
        GVACAccLength = response.length;//getThe totalLength
        GVACNumRows = 0;//Set Number of rows default
        
        let selectHolder = '';
        if(GVACAccLength >= 100){
           
            selectHolder += `
            <option value="5" selected>5</option>
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="ALL">All</option>`;
        }else if (GVACAccLength >= 50){
           
            selectHolder += `
            <option value="5" selected>5</option>
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="ALL">All</option>`;
        }else if(GVACAccLength >= 15){
            
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
            GVACNumRows = 5;
            GVACRowPerPage = 5;
            GVACdefaultRow = 5;
        }else if (selectPage.value === '10'){
            GVACNumRows = 10;
            GVACRowPerPage = 10
            GVACdefaultRow = 10;
        }else if (selectPage.value === '25'){
            GVACNumRows = 25;
            GVACRowPerPage = 25;
            GVACdefaultRow = 25;
        }else{
            GVACNumRows = GVACAccLength;
            GVACRowPerPage = GVACAccLength;
            GVACdefaultRow = GVACAccLength;
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
    for(let i =0 ; i< GVACdefaultRow;i++ ){
        if(GVACResults[i].id == id){
            console.log("true")
            output += `<img src = "../../uploads/${GVACResults[i].profile_url} " alt="Profile" style="max-width:350px; max-height:350px;" "/>
            `;
            
            break;
        }
    }
    document.querySelector('#changePicModalBody').innerHTML = output;
}


const bindAllDataIntoTable = function (){   
    let output ='';

for(let i = GVACIndexPage; i<GVACdefaultRow; i++){
 console.log("GVACIndexPage: "+GVACIndexPage+"< GVACDefaultRow:" +GVACdefaultRow)
    output += `<tr>
    <td>${GVACResults[i].course_name}</td>
    <td>${GVACResults[i].course_faculty}</td>
    <td>${GVACResults[i].credits}</td>`;
    if(GVACResults[i].status == 'active'){
        output += `
        <td><h5><span class="badge rounded-pill bg-success">${GVACResults[i].status}</td></span></h5>
        <th scope="col" class="table-info">
        <div class = "pt-2">
    <a href="#" class ="btn btn-info btn-sm" title = "View" data-bs-toggle="modal" data-bs-target="#editusermodal" onclick ="editUserSorted(${GVACResults[i].id});return false;"><i class="bx bx-edit"></i></a>

    <a href="#" class ="btn btn-danger btn-sm" title = "Archived"  data-bs-toggle="modal" data-bs-target="#archivedModal" onclick ="moveToArchive('${GVACResults[i].id}', '${GVACResults[i].course_name}');return false;"><i class="ri-inbox-archive-line"></i></a>
    
    </div>
        </th>
        </tr>`;
    }
 
    if(GVACResults[i].status == 'inactive'){
        output += `
        <td><h5><span class="badge rounded-pill bg-danger">${GVACResults[i].status}</span></h5></td>
        <th scope="col" class="table-info">
        <div class = "pt-2">
    <a href="#" class ="btn btn-info btn-sm" title = "View" data-bs-toggle="modal" data-bs-target="#editusermodal" onclick ="editUserSorted(${GVACResults[i].id});return false;"><i class="bx bx-edit"></i></a>

    <a href="#" class ="btn btn-danger btn-sm" title = "Archived"  data-bs-toggle="modal" data-bs-target="#archivedModal" onclick ="moveToUnArchive('${GVACResults[i].id}', '${GVACResults[i].course_name}');return false;"><i class="ri-inbox-unarchive-line"></i></a>
    
    </div>
        </th>
        </tr>`;
    }
    
}

let numberOfPages = '';
numberOfPages += `<h8>Showing `+GVACdefaultRow+` out of `+GVACAccLength+` results</h8>`;
document.querySelector('#tbody-user-accounts').innerHTML = output;//print the data into the tbody
document.querySelector('#showNumberOfPage').innerHTML = numberOfPages;
}






//Sort the table
const sortCurrentTable = (headerTitle) =>{


    for(let i = 0; i<GVACNumRows; i++){
        GVACResultsSorted[i] = GVACResults[GVACIndexPage+i];
    }//Fill the GVACResultsSorted with GVACResults only needed

if(GVACIsSorted){
 
    for(let i = 0; i<GVACNumRows-1; i++){
        for(let j = 0; j<GVACNumRows-1; j++){
         if(GVACResultsSorted[j][headerTitle]> GVACResultsSorted[j+1][headerTitle]){
             // console.log("a = "+GVACResultsSorted[j].id+" > "+" b = "+GVACResultsSorted[j+1].id);
             let temp = GVACResultsSorted[j];
             GVACResultsSorted[j] = GVACResultsSorted[j+1];
             GVACResultsSorted[j+1] = temp;
      }
     }
   }
   GVACIsSorted = false;//after sorted then reverse sort
}else{
  
    for(let i = 0; i<GVACNumRows-1; i++){
        for(let j = 0; j<GVACNumRows-1; j++){
         if(GVACResultsSorted[j][headerTitle] < GVACResultsSorted[j+1][headerTitle]){
             // console.log("a = "+GVACResultsSorted[j].id+" > "+" b = "+GVACResultsSorted[j+1].id);
             let temp = GVACResultsSorted[j];
             GVACResultsSorted[j] = GVACResultsSorted[j+1];
             GVACResultsSorted[j+1] = temp;
      }
     }
   }
   GVACIsSorted = true;//after sorted then reverse sort
}
   

  
    bindAllDataIntoTableSorted();
}//Sort by id





//Bind the sorted table
const bindAllDataIntoTableSorted = function (){
    
    let output ='';
    
    for(let i = 0; i<GVACNumRows; i++){
        output += `<tr>
        <td>${GVACResultsSorted[i].course_name}</td>
        <td>${GVACResultsSorted[i].course_faculty}</td>
        <td>${GVACResultsSorted[i].credits}</td>`;

        if(GVACResultsSorted[i].status == 'active'){
            output += `
            <td><h5><span class="badge rounded-pill bg-success">${GVACResultsSorted[i].status}</td></span></h5>
            <th scope="col" class="table-info">
            <div class = "pt-2">
        <a href="#" class ="btn btn-info btn-sm" title = "View" data-bs-toggle="modal" data-bs-target="#editusermodal" onclick ="editUserSorted(${GVACResultsSorted[i].id});return false;"><i class="bx bx-edit"></i></a>
    
        <a href="#" class ="btn btn-danger btn-sm" title = "Archived"  data-bs-toggle="modal" data-bs-target="#archivedModal" onclick ="moveToArchive('${GVACResultsSorted[i].id}', '${GVACResultsSorted[i].course_name}');return false;"><i class="ri-inbox-archive-line"></i></a>
        
        </div>
            </th>
            </tr>`;
        }
     
        if(GVACResultsSorted[i].status == 'inactive'){
            output += `
            <td><h5><span class="badge rounded-pill bg-danger">${GVACResultsSorted[i].status}</span></h5></td>
            <th scope="col" class="table-info">
            <div class = "pt-2">
        <a href="#" class ="btn btn-info btn-sm" title = "View" data-bs-toggle="modal" data-bs-target="#editusermodal" onclick ="editUserSorted(${GVACResultsSorted[i].id});return false;"><i class="bx bx-edit"></i></a>
    
        <a href="#" class ="btn btn-danger btn-sm" title = "Archived"  data-bs-toggle="modal" data-bs-target="#archivedModal" onclick ="moveToUnArchive('${GVACResultsSorted[i].id}', '${GVACResultsSorted[i].course_name}');return false;"><i class="ri-inbox-unarchive-line"></i></a>
        
        </div>
            </th>
            </tr>`;
        }


    }
   
    let numberOfPages = '';
    numberOfPages += `<h8>Showing `+GVACdefaultRow+` out of `+GVACAccLength+` results</h8>`;
    document.querySelector('#tbody-user-accounts').innerHTML = output;//print the data into the tbody
    document.querySelector('#showNumberOfPage').innerHTML = numberOfPages;
}//Sorted Bind Table

//Unarchive
const moveToUnArchive = async (...params) => {
    let output = '';
    output += `Are you sure you want to unarchive `+params[1]+` ?!`;
    let showButtons ='';
    showButtons += ` <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
    <button type="button" class="btn btn-danger"data-bs-dismiss="modal" onclick= "UnarchiveCourse(`+params[0]+`)">Remove</button>`;
    document.querySelector('#modal-footer-button').innerHTML = showButtons;//show the buttons modal archive
    document.querySelector('#archive-modal-title').innerHTML = output;//change the title of modal archive
    }
    
    //RemoveUserAccount when confirmed
    const UnarchiveCourse = async (id) =>{
        let message = '';// message alert
     //get current date where removing was done
     const removedDate = 'active';   
    
    formData = new FormData()
    formData.append('UserID', id);
    formData.append('Status', removedDate);
    
    try{
        const fetchRemove = await fetch("../controller/course-remove.php",{
              method: "POST",
              body: formData,
          });
      
          const fetchResponse = await fetchRemove.json();
          if(fetchResponse.statusCode === 200){     
                alertShowSuccess.removeAttribute("hidden");
                alertShowSuccess.classList.add('show');
                message += ` Unarchive Succesfully!`
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


//Archived prompt ! are you sure you want to archive?
const moveToArchive = async (...params) => {
let output = '';
output += `Are you sure you want to archive `+params[1]+` ?!`;
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
 const removedDate = 'inactive';   

formData = new FormData()
formData.append('UserID', id);
formData.append('Status', removedDate);

try{
    const fetchRemove = await fetch("../controller/course-remove.php",{
          method: "POST",
          body: formData,
      });
  
      const fetchResponse = await fetchRemove.json();
      if(fetchResponse.statusCode === 200){     
            alertShowSuccess.removeAttribute("hidden");
            alertShowSuccess.classList.add('show');
            message += ` Archive Succesfully!`
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
    GVACIsSorted = false;//Default the not sorted
    if(selectPage.value === '5'){
        GVACIndexPage = 0;
        GVACNumRows = 5;
        GVACRowPerPage = 5;
        GVACdefaultRow = 5;
    }else if(selectPage.value === '10'){
        console.log("10")
        GVACNumRows = 10;
        GVACIndexPage = 0;
        GVACRowPerPage = 10;
        GVACdefaultRow = 10;
    }else if(selectPage.value === '25'){
        console.log("25")
        GVACNumRows = 25;
        GVACIndexPage = 0;
        GVACRowPerPage = 25;
        GVACdefaultRow = 25;
    }else{

        GVACIndexPage = 0;
        GVACNumRows = GVACAccLength;
        GVACRowPerPage = GVACAccLength;
        GVACdefaultRow = GVACAccLength;
    }
    bindAllDataIntoTable();
}

//Search bar function
const userSearchKey = () =>{
let userSearch = userSearchBar.value;
console.log(userSearch !== "");
if(userSearch !== ""){
    let results = [];//Temporary JSON

    for(let i = 0; i<GVACResults.length;i++){
        for( key in GVACResults[i]){
            if(GVACResults[i][key].indexOf(userSearch) != -1){
                results.push(GVACResults[i]);
                break;
            }
        }
    }//Put all match results in results obj
    
    GVACNumRows = results.length;//set the value of numrows
    GVACResultsSorted = results;
    bindAllDataIntoTableSorted();
}else{
    bindAllDataIntoTable();
}

}




const btnEditUsers = document.getElementById('btnEditUsers');

const resetFields = () =>{
    let Cname = document.getElementById('newCourseName').value = "";

    let Faculty = document.getElementById('newFaculty').value = "";
   
    let Credits = document.getElementById('newCredits').value = "";

  
     btnCreateUsers.removeAttribute("hidden");
}//Reset all the fields

//Call it to refresh the table
 refreshTable = () =>{
     GVACIndexPage = 0;
    resetFields();
    getAllDataAPI();
}


//Check all of the fields
const checkAllFields = () =>{
    let Cname = document.getElementById('newCourseName').value;

    let Faculty = document.getElementById('newFaculty').value;
   
    let Credits = document.getElementById('newCredits').value;

 

    if(Cname !== "" && Faculty !== "" && Credits !== ""){
        if(isNaN(Credits) || Credits.length > 11 || Credits < 1){
            alertShowError.classList.add('show');
            alertShowError.removeAttribute("hidden");
            btnCreateUsers.style.display = "none";
            let output = '';
            output += ` Invalid Credits!`
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
    btnCreateUsers.removeAttribute("hidden");
    btnCreateUsers.style.display = "inline-block";
    btnEditUsers.style.display = "inline-block";
    }
    setTimeout(delayedStopLoading, 1000);
    }
   
}




//Create User
const createUserAccount = (e) =>{
    
    
   
    let Cname = document.getElementById('newCourseName').value;

    let Faculty = document.getElementById('newFaculty').value;
   
    let Credits = document.getElementById('newCredits').value;
formData = new FormData();
formData.append('Cname', Cname);
formData.append('Faculty', Faculty);
formData.append('Credits', Credits);

for (var pair of formData.entries()) {
    console.log(pair[0]+ ' - ' + pair[1]); 
 }


    fetch("../controller/course-create.php",{
        method: "POST",
        body:formData,
    })
    
    .then((res) => res.json())
        .then(response =>{
            console.log(response.statusCode)
            let message = '';
            IsLoadingTrue(true)//Start the loading button
          if(response.statusCode === 200){
            $('#addusermodal').modal('hide');
            resetFields();
            refreshTable();
         message += ` Created Succesfully!`
            document.querySelector('#alertSuccessMessage').innerHTML = message;
                btnCreateUsers.setAttribute("hidden", "hidden");
                alertShowSuccess.removeAttribute("hidden");
                alertShowSuccess.classList.add('show');
            delayedRemoveAlert = () =>{   
                btnCreateUsers.removeAttribute("hidden")
                alertShowSuccess.classList.remove('show');  
                alertShowSuccess.setAttribute("hidden", "hidden");
            }
            setTimeout(delayedRemoveAlert, 3000);
          }

          if(response.statusCode === 201){
            alertShowError.classList.add('show');
            alertShowError.removeAttribute("hidden");
            btnCreateUsers.style.display = "none";
            let output = '';
            output += ` Course Already Exist!`
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
    for(let i =0 ; i< GVACResults.length;i++ ){
        if(GVACResults[i].id == a){
           
         let UserId = document.getElementById('editId').value =  GVACResults[i].id;    

         let Cname = document.getElementById('editCname').value =  GVACResults[i].course_name;
        
         let Faculty = document.getElementById('editFaculty').value =  GVACResults[i].course_faculty;
        
         let Credits = document.getElementById('editCredits').value =  GVACResults[i].credits;
     
         break;
     }
    }
 }
 



//Edit User Data sorted

const editUserSorted = (a) =>{
    
    for(let i =0 ; i< GVACNumRows;i++ ){
        if(GVACResultsSorted[i].id == a){

         let UserId = document.getElementById('editId').value =  GVACResultsSorted[i].id;   
     
         let Cname = document.getElementById('editCname').value =  GVACResultsSorted[i].course_name;
 
         let Faculty = document.getElementById('editFaculty').value =  GVACResultsSorted[i].course_faculty;
        
         let Credits = document.getElementById('editCredits').value =  GVACResultsSorted[i].credits;
     
         break;
     }
    }
 }
 
 const checkEditFields = () =>{
     
    let UserId = document.getElementById('editId').value; 

    let Cname = document.getElementById('editCname').value  
 
    let Faculty = document.getElementById('editFaculty').value  
   
    let Credits = document.getElementById('editCredits').value  


    if(UserId !== "" && Cname !== "" && Faculty !== "" && Credits !==""){
       if(isNaN(Credits) || Credits.length > 11 || Credits < 1){
        alertShowError.classList.add('show');
        alertShowError.removeAttribute("hidden");
        btnCreateUsers.style.display = "none";
        let output = '';
        output += ` Invalid Credits!`
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

    let UserId = document.getElementById('editId').value;

    let Cname = document.getElementById('editCname').value  
 
    let Faculty = document.getElementById('editFaculty').value  
   
    let Credits = document.getElementById('editCredits').value  


    formData = new FormData();
formData.append('UserId', UserId);   
formData.append('Cname', Cname);
formData.append('Faculty', Faculty);
formData.append('Credits', Credits);

for (var pair of formData.entries()) {
    console.log(pair[0]+ ' - ' + pair[1]); 
 }

try{
  const fetchEdit = await fetch("../controller/course-edit.php",{
        method: "POST",
        body: formData,
    });


    //Javascript edit account admin
// const btnEditError = document.getElementById('btnEditError');//Error button disabled
// const btnEditSuccess = document.getElementById('btnEditSuccess');//Succes button
// const btnIsUpdating = document.getElementById('btnIsUpdating');//updating button
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
            output += ` Course Already Exist!`
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