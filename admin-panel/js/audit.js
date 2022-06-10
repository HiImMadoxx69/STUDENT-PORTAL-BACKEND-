//GLOBAL VARIABLES AUDIT = GVAUD
//Current number of rows
var GVAUDdefaultRow = 0;
//CurrentIndexPage global
var GVAUDIndexPage = 0;

//Get the total length of table
var GVAUDAccLength = 0;

//JSON global results variable
var GVAUDResults = {};

//JSON global result sorted variable
var GVAUDResultsSorted = {};

//Check if already sorted
var GVAUDIsSorted = false;
//Default number of row global
var GVAUDNumRows = 0;

//If the default row is less than 10
var GVAUDLessThanRow = 0;

//Get desired number of row per page
var GVAUDRowPerPage = 0;

//Usernames
var GVAUDUsernames = {};

//NextPage Call
const nextpageCall = function nextPageCall(){

    if(((GVAUDAccLength - GVAUDdefaultRow) < 10) && GVAUDLessThanRow === 0){
      console.log("LOL")
        GVAUDLessThanRow = GVAUDAccLength - GVAUDdefaultRow;
        GVAUDdefaultRow += GVAUDLessThanRow;
        bindAllDataIntoTable();
    }
    console.log("LMAo")
    console.log("next page GVAUDdefaultRow: "+GVAUDdefaultRow +" GVAUDAccLength:"+GVAUDAccLength+" GVAUDIndexPage:" +GVAUDIndexPage +" <= GVAUDRowPerPage:"+GVAUDRowPerPage);
    if(GVAUDdefaultRow < GVAUDAccLength ){
       
        GVAUDdefaultRow += GVAUDRowPerPage;
        console.log("next page GVAUDdefaultRow:"+GVAUDdefaultRow)
        GVAUDIndexPage +=GVAUDRowPerPage;
        bindAllDataIntoTable();
    }
}



//PrevPage Call
const prevpageCall = function nextPageCall(){
  
    // console.log('Less than row'+GVAUDLessThanRow);
    if(GVAUDLessThanRow !== 0){
    
        GVAUDdefaultRow = GVAUDdefaultRow - GVAUDLessThanRow;
        GVAUDLessThanRow = 0;
    }
    if(GVAUDIndexPage >= GVAUDRowPerPage){
        GVAUDdefaultRow -= GVAUDRowPerPage;
        GVAUDIndexPage -=GVAUDRowPerPage;
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
    fetch('../controller/audit-table.php').then((res) => res.json())
    .then(response => {

        GVAUDResults = response;//Store the responseJSON into GVAUDResults global var
       
        GVAUDAccLength = response.length;//getThe totalLength
        GVAUDNumRows = 0;//Set Number of rows default
        
        let selectHolder = '';
        if(GVAUDAccLength >= 100){
           
            selectHolder += `
            <option value="5" selected>5</option>
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="ALL">All</option>`;
        }else if (GVAUDAccLength >= 50){
           
            selectHolder += `
            <option value="5" selected>5</option>
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="ALL">All</option>`;
        }else if(GVAUDAccLength >= 15){
            
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
            GVAUDNumRows = 5;
            GVAUDRowPerPage = 5;
            GVAUDdefaultRow = 5;
        }else if (selectPage.value === '10'){
            GVAUDNumRows = 10;
            GVAUDRowPerPage = 10
            GVAUDdefaultRow = 10;
        }else if (selectPage.value === '25'){
            GVAUDNumRows = 25;
            GVAUDRowPerPage = 25;
            GVAUDdefaultRow = 25;
        }else{
            GVAUDNumRows = GVAUDAccLength;
            GVAUDRowPerPage = GVAUDAccLength;
            GVAUDdefaultRow = GVAUDAccLength;
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
    for(let i =0 ; i< GVAUDdefaultRow;i++ ){
        if(GVAUDResults[i].id == id){
            console.log("true")
            output += `<img src = "../../uploads/${GVAUDResults[i].profile_url} " alt="Profile" style="max-width:350px; max-height:350px;" "/>
            `;
            
            break;
        }
    }
    document.querySelector('#changePicModalBody').innerHTML = output;
}


const bindAllDataIntoTable = function (){   
    let output ='';

for(let i = GVAUDIndexPage; i<GVAUDdefaultRow; i++){
 console.log("GVAUDIndexPage: "+GVAUDIndexPage+"< GVAUDDefaultRow:" +GVAUDdefaultRow)
    output += `<tr>
    <td>${GVAUDResults[i].action}</td>
    <td>${GVAUDResults[i].added_at}</td>
     </tr>`;
    
}

let numberOfPages = '';
numberOfPages += `<h8>Showing `+GVAUDdefaultRow+` out of `+GVAUDAccLength+` results</h8>`;
document.querySelector('#tbody-user-accounts').innerHTML = output;//print the data into the tbody
document.querySelector('#showNumberOfPage').innerHTML = numberOfPages;
}






//Sort the table
const sortCurrentTable = (headerTitle) =>{


    for(let i = 0; i<GVAUDNumRows; i++){
        GVAUDResultsSorted[i] = GVAUDResults[GVAUDIndexPage+i];
    }//Fill the GVAUDResultsSorted with GVAUDResults only needed

if(GVAUDIsSorted){
 
    for(let i = 0; i<GVAUDNumRows-1; i++){
        for(let j = 0; j<GVAUDNumRows-1; j++){
         if(GVAUDResultsSorted[j][headerTitle]> GVAUDResultsSorted[j+1][headerTitle]){
             // console.log("a = "+GVAUDResultsSorted[j].id+" > "+" b = "+GVAUDResultsSorted[j+1].id);
             let temp = GVAUDResultsSorted[j];
             GVAUDResultsSorted[j] = GVAUDResultsSorted[j+1];
             GVAUDResultsSorted[j+1] = temp;
      }
     }
   }
   GVAUDIsSorted = false;//after sorted then reverse sort
}else{
  
    for(let i = 0; i<GVAUDNumRows-1; i++){
        for(let j = 0; j<GVAUDNumRows-1; j++){
         if(GVAUDResultsSorted[j][headerTitle] < GVAUDResultsSorted[j+1][headerTitle]){
             // console.log("a = "+GVAUDResultsSorted[j].id+" > "+" b = "+GVAUDResultsSorted[j+1].id);
             let temp = GVAUDResultsSorted[j];
             GVAUDResultsSorted[j] = GVAUDResultsSorted[j+1];
             GVAUDResultsSorted[j+1] = temp;
      }
     }
   }
   GVAUDIsSorted = true;//after sorted then reverse sort
}
   

  
    bindAllDataIntoTableSorted();
}//Sort by id





//Bind the sorted table
const bindAllDataIntoTableSorted = function (){
    
    let output ='';
    
    for(let i = 0; i<GVAUDNumRows; i++){
        output += `<tr>
        <td>${GVAUDResultsSorted[i].action}</td>
        <td>${GVAUDResultsSorted[i].added_at}</td>
        </tr>`;
    }
   
    let numberOfPages = '';
    numberOfPages += `<h8>Showing `+GVAUDdefaultRow+` out of `+GVAUDAccLength+` results</h8>`;
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
    GVAUDIsSorted = false;//Default the not sorted
    if(selectPage.value === '5'){
        GVAUDIndexPage = 0;
        GVAUDNumRows = 5;
        GVAUDRowPerPage = 5;
        GVAUDdefaultRow = 5;
    }else if(selectPage.value === '10'){
        console.log("10")
        GVAUDNumRows = 10;
        GVAUDIndexPage = 0;
        GVAUDRowPerPage = 10;
        GVAUDdefaultRow = 10;
    }else if(selectPage.value === '25'){
        console.log("25")
        GVAUDNumRows = 25;
        GVAUDIndexPage = 0;
        GVAUDRowPerPage = 25;
        GVAUDdefaultRow = 25;
    }else{

        GVAUDIndexPage = 0;
        GVAUDNumRows = GVAUDAccLength;
        GVAUDRowPerPage = GVAUDAccLength;
        GVAUDdefaultRow = GVAUDAccLength;
    }
    bindAllDataIntoTable();
}

//Search bar function
const userSearchKey = () =>{
let userSearch = userSearchBar.value;
console.log(userSearch !== "");
if(userSearch !== ""){
    let results = [];//Temporary JSON

    for(let i = 0; i<GVAUDResults.length;i++){
        for( key in GVAUDResults[i]){
            if(GVAUDResults[i][key].indexOf(userSearch) != -1){
                results.push(GVAUDResults[i]);
                break;
            }
        }
    }//Put all match results in results obj
    
    GVAUDNumRows = results.length;//set the value of numrows
    GVAUDResultsSorted = results;
    bindAllDataIntoTableSorted();
}else{
    bindAllDataIntoTable();
}

}




const btnEditUsers = document.getElementById('btnEditUsers');

const resetFields = () =>{
    let Fname = document.getElementById('newFname').value = "";

    let Mname = document.getElementById('newMname').value = "";
   
    let Lname = document.getElementById('newLname').value = "";

    let Email = document.getElementById('newEmail').value = "";
 
    let Username = document.getElementById('newUsername').value = "";

    let Password = document.getElementById('newPassword').value = "";
    
    let Job = document.getElementById('newJob').value = "";

    let Birthday = document.getElementById('newBirthday').value = "";

    let SexMale = document.getElementById('maleCheck').checked = false;

    let SexFemale = document.getElementById('femaleCheck').checked = false;
 
    let Contact = document.getElementById('newContact').value = "";

    let Address = document.getElementById('newAddress').value = "";
 
    let About = document.getElementById('newAbout').value = "";

    let Twitter = document.getElementById('newtwitterprofileURL').value = "";

    let Facebook = document.getElementById('newfacebookprofileURL').value = "";
 
    let Instagram = document.getElementById('newinstagramprofileURL').value = "";

    let Linkedin = document.getElementById('newlinkedinprofileURL').value = "";
    btnSuccess.setAttribute("hidden", "hidden");//Is loading true
    btnCreateUsers.removeAttribute("hidden");
}//Reset all the fields

//Call it to refresh the table
 refreshTable = () =>{
     GVAUDIndexPage = 0;
    resetFields();
    getAllDataAPI();
}


//Check all of the fields
const checkAllFields = () =>{
    let Fname = document.getElementById('newFname').value;

    let Mname = document.getElementById('newMname').value;
   
    let Lname = document.getElementById('newLname').value;

    let Email = document.getElementById('newEmail').value;
 
    let Username = document.getElementById('newUsername').value;

    let Password = document.getElementById('newPassword').value;
    
    let Job = document.getElementById('newJob').value;

    let Birthday = document.getElementById('newBirthday').value;
    
    let Sex ="";

    
    if(document.getElementById('maleCheck').checked === true){
        Sex = "Male";
    }
    if(document.getElementById('femaleCheck').checked === true){
        Sex = "Female";
    }

    

    let Contact = document.getElementById('newContact').value;

    let Address = document.getElementById('newAddress').value;
 
    let About = document.getElementById('newAbout').value;

    let Twitter = document.getElementById('newtwitterprofileURL').value;

    let Facebook = document.getElementById('newfacebookprofileURL').value;
 
    let Instagram = document.getElementById('newinstagramprofileURL').value;

    let Linkedin = document.getElementById('newlinkedinprofileURL').value;

    if(Fname !== "" && Mname !=="" && Lname !== "" && Email !== "" && Username !== "" && Password !== "" && Job !== "..." && Contact !== "" && Address !== "" && About !== "" && Twitter !== "" && Facebook !== "" && Instagram !== "" && Linkedin !== ""){
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
   
    let Fname = document.getElementById('newFname').value;

    let Mname = document.getElementById('newMname').value;
   
    let Lname = document.getElementById('newLname').value;

    let Email = document.getElementById('newEmail').value;
 
    let Username = document.getElementById('newUsername').value;

    let Password = document.getElementById('newPassword').value;
    
    let Job = document.getElementById('newJob').value;

    let Birthday = document.getElementById('newBirthday').value;

    let Sex ="";
    
    if(document.getElementById('maleCheck').checked === true){
        Sex = "Male";
    }
    if(document.getElementById('femaleCheck').checked === true){
        Sex = "Female";
    }

    let Contact = document.getElementById('newContact').value;

    let Address = document.getElementById('newAddress').value;
 
    let About = document.getElementById('newAbout').value;

    let Twitter = document.getElementById('newtwitterprofileURL').value;

    let Facebook = document.getElementById('newfacebookprofileURL').value;
 
    let Instagram = document.getElementById('newinstagramprofileURL').value;

    let Linkedin = document.getElementById('newlinkedinprofileURL').value;

    Twitter = "https://twitter.com/" + Twitter;
    Facebook = "https://Facebook.com/" + Facebook;
    Instagram = "https://Instagram.com/" + Instagram;
    Linkedin = "https://Linked.com/" + Linkedin;
formData = new FormData();
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


    fetch("../controller/user-create-account.php",{
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

          if(response.statusCode === 201){
            alertShowError.classList.add('show');
            alertShowError.removeAttribute("hidden");
            btnError.removeAttribute("hidden");
            btnCreateUsers.style.display = "none";
            let output = '';
            output += ` Username Already Exist!`
            document.querySelector('#alertErrorMessage').innerHTML = output;
            delayedAlert = () =>{
                alertShowError.classList.remove('show');
                alertShowError.setAttribute("hidden", "hidden");
                btnError.setAttribute("hidden", "hidden");//Is loading true
                btnCreateUsers.style.display = "inline-block";
            }
            setTimeout(delayedAlert, 3000);

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
    for(let i =0 ; i< GVAUDResults.length;i++ ){
        if(GVAUDResults[i].id == a){
           
         let UserId = document.getElementById('editId').value =  GVAUDResults[i].id;    

         let Fname = document.getElementById('editFname').value =  GVAUDResults[i].firstname;
        
         let Mname = document.getElementById('editMname').value =  GVAUDResults[i].middlename;
        
         let Lname = document.getElementById('editLname').value =  GVAUDResults[i].lastname;
     
         let Email = document.getElementById('editEmail').value=   GVAUDResults[i].email ;
      
         let Username = document.getElementById('editUsername').value =  GVAUDResults[i].username;
     
         let Password = document.getElementById('editPassword').value =  GVAUDResults[i].password;
         
         let Job = document.getElementById('editJob').value =    GVAUDResults[i].position;
     
         let Birthday = document.getElementById('editBirthday').value =  GVAUDResults[i].birthday;
         
         let Sex = GVAUDResults[i].sex;
      
         if(Sex === "Male"){
             document.getElementById('editmaleCheck').checked = true;
         }
         if(Sex === "Female"){
             document.getElementById('editfemaleCheck').checked = true;
         }
         let Contact = document.getElementById('editContact').value =    GVAUDResults[i].contact;
     
         let Address = document.getElementById('editAddress').value =    GVAUDResults[i].address;
      
         let About = document.getElementById('editAbout').value =    GVAUDResults[i].about;
      
         let Twitter = document.getElementById('edittwitterprofileURL').value =  GVAUDResults[i].twitterprofile;
     
         let Facebook = document.getElementById('editfacebookprofileURL').value =    GVAUDResults[i].facebookprofile;
      
         let Instagram = document.getElementById('editinstagramprofileURL').value =  GVAUDResults[i].instagramprofile;
     
         let Linkedin = document.getElementById('editlinkedinprofileURL').value =    GVAUDResults[i].linkedinprofile;
         break;
     }
    }
 }
 



//Edit User Data sorted

const editUserSorted = (a) =>{
    
    for(let i =0 ; i< GVAUDNumRows;i++ ){
        if(GVAUDResultsSorted[i].id == a){

         let UserId = document.getElementById('editId').value =  GVAUDResultsSorted[i].id;   
     
         let Fname = document.getElementById('editFname').value =  GVAUDResultsSorted[i].firstname;
 
         let Mname = document.getElementById('editMname').value =  GVAUDResultsSorted[i].middlename;
        
         let Lname = document.getElementById('editLname').value =  GVAUDResultsSorted[i].lastname;
     
         let Email = document.getElementById('editEmail').value =   GVAUDResultsSorted[i].email ;
      
         let Username = document.getElementById('editUsername').value =  GVAUDResultsSorted[i].username;
     
         let Password = document.getElementById('editPassword').value =  GVAUDResultsSorted[i].password;
         
         let Job = document.getElementById('editJob').value =    GVAUDResultsSorted[i].position;
     
         let Birthday = document.getElementById('editBirthday').value =  GVAUDResultsSorted[i].birthday;
         
         let Sex = GVAUDResultsSorted[i].sex;
         
         if(Sex === "Male"){
             document.getElementById('editmaleCheck').checked = true;
         }
         if(Sex === "Female"){
             document.getElementById('editfemaleCheck').checked = true;
         }
     
         let Contact = document.getElementById('editContact').value =    GVAUDResultsSorted[i].contact;
     
         let Address = document.getElementById('editAddress').value =    GVAUDResultsSorted[i].address;
      
         let About = document.getElementById('editAbout').value =    GVAUDResultsSorted[i].about;
      
         let Twitter = document.getElementById('edittwitterprofileURL').value =  GVAUDResultsSorted[i].twitterprofile;
     
         let Facebook = document.getElementById('editfacebookprofileURL').value =    GVAUDResultsSorted[i].facebookprofile;
      
         let Instagram = document.getElementById('editinstagramprofileURL').value =  GVAUDResultsSorted[i].instagramprofile;
     
         let Linkedin = document.getElementById('editlinkedinprofileURL').value =    GVAUDResultsSorted[i].linkedinprofile;
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
            setTimeout(delayedRemoveAlert, 1000);
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