//GLOBAL VARIABLES USER = GVU
//Current number of rows
var GVUdefaultRow = 0;
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
var GVUNumRows = 0;

//If the default row is less than 10
var GVULessThanRow = 0;

//Get desired number of row per page
var GVURowPerPage = 0;

//Usernames
var GVUUsernames = {};

//NextPage Call
const nextpageCall = function nextPageCall(){

    if(((GVUAccLength - GVUdefaultRow) < 10) && GVULessThanRow === 0){
      console.log("LOL")
        GVULessThanRow = GVUAccLength - GVUdefaultRow;
        GVUdefaultRow += GVULessThanRow;
        bindAllDataIntoTable();
    }
    console.log("LMAo")
    console.log("next page GVUdefaultRow: "+GVUdefaultRow +" GVUAccLength:"+GVUAccLength+" GVUIndexPage:" +GVUIndexPage +" <= GVURowPerPage:"+GVURowPerPage);
    if(GVUdefaultRow < GVUAccLength ){
       
        GVUdefaultRow += GVURowPerPage;
        console.log("next page GVUdefaultRow:"+GVUdefaultRow)
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

//Get All Username even status is not active

const getAllUserName = async () =>{

}

//getAllData Function
function getAllDataAPI(){
    //get user accounts
    fetch('../controller/announcement-table.php').then((res) => res.json())
    .then(response => {

        GVUResults = response;//Store the responseJSON into GVUResults global var
       
        GVUAccLength = response.length;//getThe totalLength
        GVUNumRows = 0;//Set Number of rows default
        
        let selectHolder = '';
        if(GVUAccLength >= 100){
           
            selectHolder += `
            <option value="5" selected>5</option>
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="ALL">All</option>`;
        }else if (GVUAccLength >= 50){
           
            selectHolder += `
            <option value="5" selected>5</option>
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="ALL">All</option>`;
        }else if(GVUAccLength >= 15){
            
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
            GVUNumRows = 5;
            GVURowPerPage = 5;
            GVUdefaultRow = 5;
        }else if (selectPage.value === '10'){
            GVUNumRows = 10;
            GVURowPerPage = 10
            GVUdefaultRow = 10;
        }else if (selectPage.value === '25'){
            GVUNumRows = 25;
            GVURowPerPage = 25;
            GVUdefaultRow = 25;
        }else{
            GVUNumRows = GVUAccLength;
            GVURowPerPage = GVUAccLength;
            GVUdefaultRow = GVUAccLength;
        }// rows condition

        bindAllDataIntoTable();//Bind the data into table once fetch successfull
    }).catch(error => console.log(error));//end of get user accounts
}//end of function getAllDataAPI

//check if valid image

const checkIfImage = () =>{

 
    
   let file = document.getElementById('editUserPic');// fileupload

            if(file.files[0].name.match(/.(jpg|jpeg|png|gif)$/i)) {
                 console.log('Image has width, I think it is real image');
                 editProfilePic();
                 //TODO: upload to backend
            }else{
                 console.log("Not a image")
                alertShowError.classList.add('show');
                alertShowError.removeAttribute("hidden");
                btnError.removeAttribute("hidden");
                btnCreateUsers.style.display = "none";
                let output = '';
                output += ` Not a valid image!`
                document.querySelector('#alertErrorMessage').innerHTML = output;
                delayedAlert = () =>{
                    alertShowError.classList.remove('show');
                    alertShowError.setAttribute("hidden", "hidden");
                    btnError.setAttribute("hidden", "hidden");//Is loading true
                    btnCreateUsers.style.display = "inline-block";
                }
                setTimeout(delayedAlert, 3000);
            }
}

//Move pic to server
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
    for(let i =0 ; i< GVUdefaultRow;i++ ){
        if(GVUResults[i].id == id){
            console.log("true")
            output += `<img src = "../../uploads/${GVUResults[i].profile_url} " alt="Profile" style="max-width:350px; max-height:350px;" "/>
            `;
            
            break;
        }
    }
    document.querySelector('#changePicModalBody').innerHTML = output;
}


const bindAllDataIntoTable = function (){   
    let output ='';

for(let i = GVUIndexPage; i<GVUdefaultRow; i++){
 if(GVUResults[i].category == "Info"){
    output += `<tr class ="table-info">
    <td>${GVUResults[i].editor}</td>
    <td>${GVUResults[i].message}</td>
    <td>${GVUResults[i].added_at}</td>
    </tr>`;
 }else if(GVUResults[i].category == "Success"){
    output += `<tr class ="table-success">
    <td>${GVUResults[i].editor}</td>
    <td>${GVUResults[i].message}</td>
    <td>${GVUResults[i].added_at}</td>
    </tr>`;
 }else if(GVUResults[i].category == "Warning"){
    output += `<tr class ="table-warning">
    <td>${GVUResults[i].editor}</td>
    <td>${GVUResults[i].message}</td>
    <td>${GVUResults[i].added_at}</td>
    </tr>`;
 }else{
    output += `<tr class ="table-danger">
    <td>${GVUResults[i].editor}</td>
    <td>${GVUResults[i].message}</td>
    <td>${GVUResults[i].added_at}</td>
    </tr>`;
 }
    
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
        if(GVUResults[i].category == "Info"){
            output += `<tr class ="table-info">
            <td>${GVUResults[i].editor}</td>
            <td>${GVUResults[i].message}</td>
            <td>${GVUResults[i].added_at}</td>
            </tr>`;
         }else if(GVUResults[i].category == "Success"){
            output += `<tr class ="table-success">
            <td>${GVUResults[i].editor}</td>
            <td>${GVUResults[i].message}</td>
            <td>${GVUResults[i].added_at}</td>
            </tr>`;
         }else if(GVUResults[i].category == "Warning"){
            output += `<tr class ="table-warning">
            <td>${GVUResults[i].editor}</td>
            <td>${GVUResults[i].message}</td>
            <td>${GVUResults[i].added_at}</td>
            </tr>`;
         }else{
            output += `<tr class ="table-danger">
            <td>${GVUResults[i].editor}</td>
            <td>${GVUResults[i].message}</td>
            <td>${GVUResults[i].added_at}</td>
            </tr>`;
         }
    }
   
    let numberOfPages = '';
    numberOfPages += `<h8>Showing `+GVUdefaultRow+` out of `+GVUAccLength+` results</h8>`;
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
    const fetchRemove = await fetch("../controller/user-remove.php",{
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
    GVUIsSorted = false;//Default the not sorted
    if(selectPage.value === '5'){
        GVUIndexPage = 0;
        GVUNumRows = 5;
        GVURowPerPage = 5;
        GVUdefaultRow = 5;
    }else if(selectPage.value === '10'){
        console.log("10")
        GVUNumRows = 10;
        GVUIndexPage = 0;
        GVURowPerPage = 10;
        GVUdefaultRow = 10;
    }else if(selectPage.value === '25'){
        console.log("25")
        GVUNumRows = 25;
        GVUIndexPage = 0;
        GVURowPerPage = 25;
        GVUdefaultRow = 25;
    }else{

        GVUIndexPage = 0;
        GVUNumRows = GVUAccLength;
        GVURowPerPage = GVUAccLength;
        GVUdefaultRow = GVUAccLength;
    }
    bindAllDataIntoTable();
}

//Search bar function
const userSearchKey = () =>{
let userSearch = userSearchBar.value;
console.log(userSearch !== "");
if(userSearch !== ""){
    let results = [];//Temporary JSON

    for(let i = 0; i<GVUResults.length;i++){
        for( key in GVUResults[i]){
            if(GVUResults[i][key].indexOf(userSearch) != -1){
                results.push(GVUResults[i]);
                break;
            }
        }
    }//Put all match results in results obj
    
    GVUNumRows = results.length;//set the value of numrows
    GVUResultsSorted = results;
    bindAllDataIntoTableSorted();
}else{
    bindAllDataIntoTable();
}

}




const btnEditUsers = document.getElementById('btnEditUsers');

const resetFields = () =>{
    let Target = document.getElementById('newAudience').value ="";
    let Category = document.getElementById('newCategory').value ="";
    let Message = document.getElementById('newMessage').value ="";

}//Reset all the fields

//Call it to refresh the table
 refreshTable = () =>{
     GVUIndexPage = 0;
    resetFields();
    getAllDataAPI();
}



//Validate Email
const validateEmail = (mail) =>{
    let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(mail.match(mailformat))
    {
    return true;
    }
}

//Check all of the fields
const checkAllFields = () =>{
    let Editor = document.getElementById('newEditor').value;
    let Category = document.getElementById('newEditor').value;
    let Message = document.getElementById('newEditor').value;

    if(Editor !== "" && Category !== "..." && Message !==""){
    let message ="";
        if(Message.length > 1000000){
        alertShowError.classList.add('show');
        alertShowError.removeAttribute("hidden");
        btnError.removeAttribute("hidden");
        btnCreateUsers.style.display = "none";
        let output = '';
        output += ` Message to large!`
        document.querySelector('#alertErrorMessage').innerHTML = output;
        delayedAlert = () =>{
            alertShowError.classList.remove('show');
            alertShowError.setAttribute("hidden", "hidden");
            btnError.setAttribute("hidden", "hidden");//Is loading true
            btnCreateUsers.style.display = "inline-block";
        }
        setTimeout(delayedAlert, 3000);
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
    setTimeout(delayedStopLoading, 3000);
    }
   
}




//Create User
const createUserAccount = (e) =>{
    
    IsLoadingTrue(true)//Start the loading button
    let Target = document.getElementById('newAudience').value;
    let Editor = document.getElementById('newEditor').value;
    let Category = document.getElementById('newCategory').value;
    let Message = document.getElementById('newMessage').value;
formData = new FormData();

formData.append('Target', Target);
formData.append('Editor', Editor);
formData.append('Category', Category);
formData.append('Message', Message);
for (var pair of formData.entries()) {
    console.log(pair[0]+ ' - ' + pair[1]); 
 }


    fetch("../controller/create-announcement.php",{
        method: "POST",
        body:formData,
    })
    
    .then((res) => res.json())
        .then(response =>{
            console.log(response.statusCode)
            let message = '';
          if(response.statusCode === 200){
            $('#addusermodal').modal('hide');
         resetFields();
         refreshTable();
         message += ` Created Succesfully!`;
            document.querySelector('#alertSuccessMessage').innerHTML = message;
                alertShowSuccess.removeAttribute("hidden");
                alertShowSuccess.classList.add('show');
            delayedRemoveAlert = () =>{   
                alertShowSuccess.classList.remove('show');  
                alertShowSuccess.setAttribute("hidden", "hidden");
            }
            setTimeout(delayedRemoveAlert, 2000);
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
    for(let i =0 ; i< GVUResults.length;i++ ){
        if(GVUResults[i].id == a){
           
         let UserId = document.getElementById('editId').value =  GVUResults[i].id;    

         let Fname = document.getElementById('editFname').value =  GVUResults[i].firstname;
        
         let Mname = document.getElementById('editMname').value =  GVUResults[i].middlename;
        
         let Lname = document.getElementById('editLname').value =  GVUResults[i].lastname;
     
         let Email = document.getElementById('editEmail').value=   GVUResults[i].email ;
      
         let Username = document.getElementById('editUsername').value =  GVUResults[i].username;
     
         let Password = document.getElementById('editPassword').value =  GVUResults[i].password;
         
         let Job = document.getElementById('editJob').value =    GVUResults[i].position;
     
         let Birthday = document.getElementById('editBirthday').value =  GVUResults[i].birthday;
         
         let Sex = GVUResults[i].sex;
      
         if(Sex === "Male"){
             document.getElementById('editmaleCheck').checked = true;
         }
         if(Sex === "Female"){
             document.getElementById('editfemaleCheck').checked = true;
         }
         let Contact = document.getElementById('editContact').value =    GVUResults[i].contact;
     
         let Address = document.getElementById('editAddress').value =    GVUResults[i].address;
      
         let About = document.getElementById('editAbout').value =    GVUResults[i].about;
      
         let Twitter = document.getElementById('edittwitterprofileURL').value =  GVUResults[i].twitterprofile;
     
         let Facebook = document.getElementById('editfacebookprofileURL').value =    GVUResults[i].facebookprofile;
      
         let Instagram = document.getElementById('editinstagramprofileURL').value =  GVUResults[i].instagramprofile;
     
         let Linkedin = document.getElementById('editlinkedinprofileURL').value =    GVUResults[i].linkedinprofile;
         break;
     }
    }
 }
 



//Edit User Data sorted

const editUserSorted = (a) =>{
    
    for(let i =0 ; i< GVUNumRows;i++ ){
        if(GVUResultsSorted[i].id == a){

         let UserId = document.getElementById('editId').value =  GVUResultsSorted[i].id;   
     
         let Fname = document.getElementById('editFname').value =  GVUResultsSorted[i].firstname;
 
         let Mname = document.getElementById('editMname').value =  GVUResultsSorted[i].middlename;
        
         let Lname = document.getElementById('editLname').value =  GVUResultsSorted[i].lastname;
     
         let Email = document.getElementById('editEmail').value =   GVUResultsSorted[i].email ;
      
         let Username = document.getElementById('editUsername').value =  GVUResultsSorted[i].username;
     
         let Password = document.getElementById('editPassword').value =  GVUResultsSorted[i].password;
         
         let Job = document.getElementById('editJob').value =    GVUResultsSorted[i].position;
     
         let Birthday = document.getElementById('editBirthday').value =  GVUResultsSorted[i].birthday;
         
         let Sex = GVUResultsSorted[i].sex;
         
         if(Sex === "Male"){
             document.getElementById('editmaleCheck').checked = true;
         }
         if(Sex === "Female"){
             document.getElementById('editfemaleCheck').checked = true;
         }
     
         let Contact = document.getElementById('editContact').value =    GVUResultsSorted[i].contact;
     
         let Address = document.getElementById('editAddress').value =    GVUResultsSorted[i].address;
      
         let About = document.getElementById('editAbout').value =    GVUResultsSorted[i].about;
      
         let Twitter = document.getElementById('edittwitterprofileURL').value =  GVUResultsSorted[i].twitterprofile;
     
         let Facebook = document.getElementById('editfacebookprofileURL').value =    GVUResultsSorted[i].facebookprofile;
      
         let Instagram = document.getElementById('editinstagramprofileURL').value =  GVUResultsSorted[i].instagramprofile;
     
         let Linkedin = document.getElementById('editlinkedinprofileURL').value =    GVUResultsSorted[i].linkedinprofile;
         break;
     }
    }
 }
 
 const checkEditFields = () =>{
     
    let UserId = document.getElementById('editId').value; 

    let Fname = document.getElementById('editFname').value  
 
    let Mname = document.getElementById('editMname').value  
   
    let Lname = document.getElementById('editLname').value  

    let Email = document.getElementById('editEmail').value  
 
    let Username = document.getElementById('editUsername').value    

    let Password = document.getElementById('editPassword').value    
    
    let Job = document.getElementById('editJob').value  

    let Birthday = document.getElementById('editBirthday').value    

    let Sex ="";

    if(document.getElementById('editmaleCheck').checked === true){
        Sex = "Male";
    }
    if(document.getElementById('editfemaleCheck').checked === true){
        Sex = "Female";
    }

    let Contact = document.getElementById('editContact').value

    let Address = document.getElementById('editAddress').value
 
    let About = document.getElementById('editAbout').value 

    let Twitter = document.getElementById('edittwitterprofileURL').value 

    let Facebook = document.getElementById('editfacebookprofileURL').value 
 
    let Instagram = document.getElementById('editinstagramprofileURL').value

    let Linkedin = document.getElementById('editlinkedinprofileURL').value 

    if(UserId !=="" && Fname !==  "" && Mname !==  "" && Lname !==  "" && Email !==  "" && Username !==  "" && Password !==  "" && Job !==  "" && Birthday !==  "" && Sex !==  "" && Contact !==  "" && Address !==  "" && About !==  "" && Twitter !==  "" && Facebook !==  "" && Instagram !==  "" &&Linkedin !==  "" ){
        let message ="";
        if(isNaN(Contact) || Contact.length > 11){
            alertShowError.classList.add('show');
            alertShowError.removeAttribute("hidden");
            btnError.removeAttribute("hidden");
            btnCreateUsers.style.display = "none";
            let output = '';
            output += ` Input a correct contact number!`
            document.querySelector('#alertErrorMessage').innerHTML = output;
            delayedAlert = () =>{
                alertShowError.classList.remove('show');
                alertShowError.setAttribute("hidden", "hidden");
                btnError.setAttribute("hidden", "hidden");//Is loading true
                btnCreateUsers.style.display = "inline-block";
            }
            setTimeout(delayedAlert, 3000);
         }else if(validateEmail(Email) !== true){
            console.log(validateEmail(Email))
         message += ` Please input a valid email!`
         document.querySelector('#alertErrorMessage').innerHTML = message;
    
             alertError.removeAttribute("hidden");
             alertError.classList.add('show');
          
    
    
         delayedRemoveAlert = () =>{   
             alertError.classList.remove('show');  
             alertError.setAttribute("hidden", "hidden");
         }
         setTimeout(delayedRemoveAlert, 1000);
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

    let Fname = document.getElementById('editFname').value  
 
    let Mname = document.getElementById('editMname').value  
   
    let Lname = document.getElementById('editLname').value  

    let Email = document.getElementById('editEmail').value  
 
    let Username = document.getElementById('editUsername').value    

    let Password = document.getElementById('editPassword').value    
    
    let Job = document.getElementById('editJob').value  

    let Birthday = document.getElementById('editBirthday').value    

    let Sex ="";

    if(document.getElementById('editmaleCheck').checked === true){
        Sex = "Male";
    }
    if(document.getElementById('editfemaleCheck').checked === true){
        Sex = "Female";
    }

    let Contact = document.getElementById('editContact').value

    let Address = document.getElementById('editAddress').value
 
    let About = document.getElementById('editAbout').value 

    let Twitter = document.getElementById('edittwitterprofileURL').value 

    let Facebook = document.getElementById('editfacebookprofileURL').value 
 
    let Instagram = document.getElementById('editinstagramprofileURL').value

    let Linkedin = document.getElementById('editlinkedinprofileURL').value 


    formData = new FormData();
formData.append('UserId', UserId);   
formData.append('Fname', Fname);
formData.append('Mname', Mname);
formData.append('Lname', Lname);
formData.append('Email', Email);
formData.append('Username', Username);
formData.append('Password', Password);
formData.append('Job', Job);
formData.append('Birthday', Birthday);
formData.append('Sex', Sex);
formData.append('Contact', Contact);
formData.append('Address', Address);
formData.append('About', About);
formData.append('Twitter', Twitter);
formData.append('Facebook', Facebook);
formData.append('Instagram', Instagram);
formData.append('Linkedin', Linkedin);
for (var pair of formData.entries()) {
    console.log(pair[0]+ ' - ' + pair[1]); 
 }

try{
  const fetchEdit = await fetch("../controller/user-edit.php",{
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
            setTimeout(delayedShowAlert, 1000)
            delayedRemoveAlert = () =>{   
                alertShowSuccess.classList.remove('show');  
                alertShowSuccess.setAttribute("hidden", "hidden");
            }
            setTimeout(delayedRemoveAlert, 3000);
          }
        }

        if(fetchResponse.statusCode === 201){
            delayedShowAlert = () =>{
            alertShowError.classList.add('show');
            alertShowError.removeAttribute("hidden");
            btnError.removeAttribute("hidden");
            btnCreateUsers.style.display = "none";
            let output = '';
            output += ` Username Already Exist!`
            document.querySelector('#alertErrorMessage').innerHTML = output;
            }
            setTimeout(delayedShowAlert, 1000);
            delayedUserExistAlert = () =>{
                alertShowError.classList.remove('show');
                alertShowError.setAttribute("hidden", "hidden");
                btnError.setAttribute("hidden", "hidden");//Is loading true
                btnCreateUsers.style.display = "inline-block";
            }
            setTimeout(delayedUserExistAlert, 3000);

          }
    
        showAnimation();
     
}catch (e){
    console.log(e)
}

}