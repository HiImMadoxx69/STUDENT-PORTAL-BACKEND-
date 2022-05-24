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

//getAllData Function
function getAllDataAPI(){
    //get user accounts
    fetch('../controller/user-table.php').then((res) => res.json())
    .then(response => {

        GVUResults = response;//Store the responseJSON into GVUResults global var
       
        GVUAccLength = response.length;//getThe totalLength
        GVUNumRows = 5;//Set Number of rows default
        
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
    output += `<img src="../../uploads/${receivedStatus.image}" alt="Profile" max-height = "350px" max-width = "350px"/>
    `;
    document.querySelector('#changePicModalBody').innerHTML = output;
    
    let showBtn = '';
    showBtn += `<button type="button" class="btn btn-primary" onclick="saveChanges('`+value+`', '${receivedStatus.image}')">Save changes</button>
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
        // Create a FormData object.
    imageformData = new FormData();
   
    imageformData.append('userId', params[0]);
    imageformData.append('Image_Url', params[1]);
    try{
       const fetchResponse = await fetch("../controller/user-edit-pic.php",{
           method: "POST",
           body:imageformData,
       });
       const receivedStatus = await fetchResponse.json();
       if(receivedStatus.statusCode === 200){
        delayedShowAlert = () =>{
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
 console.log("GVUIndexPage: "+GVUIndexPage+"< GVUDefaultRow:" +GVUdefaultRow)
    output += `<tr>
    <td>${GVUResults[i].id}</td>
    <td><a href="#" onclick= "changePicModal(${GVUResults[i].id});return false;" data-bs-toggle="modal" data-bs-target="#changeProfileModal"><img src = "../../uploads/${GVUResults[i].profile_url}" alt="Profile" height = "100px" width = "100px"/></a></td>
    <td>${GVUResults[i].username}</td>
    <td>${GVUResults[i].firstname}</td>
    <td>${GVUResults[i].middlename}</td>
    <td>${GVUResults[i].lastname}</td>
    <td>${GVUResults[i].email}</td>
    <td>${GVUResults[i].birthday}</td>
    <td>${GVUResults[i].sex}</td>
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
    <a href="#" class ="btn btn-primary btn-sm" title = "View" data-bs-toggle="modal" data-bs-target="#editusermodal" onclick ="editUserNotSorted(${GVUResults[i].id});return false;" ><i class="bi bi-eye"></i></a>

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
        <td><a href =""><img src = "../../uploads/${GVUResultsSorted[i].profile_url} " alt="Profile" height = "100px" width = "100px"/></a></td>
        <td>${GVUResultsSorted[i].username}</td>
        <td>${GVUResultsSorted[i].firstname}</td>
        <td>${GVUResultsSorted[i].middlename}</td>
        <td>${GVUResultsSorted[i].lastname}</td>
        <td>${GVUResultsSorted[i].email}</td>
        <td>${GVUResultsSorted[i].birthday}</td>
        <td>${GVUResultsSorted[i].sex}</td>
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
    <a href="#" class ="btn btn-primary btn-sm" title = "View" data-bs-toggle="modal" data-bs-target="#editusermodal" onclick ="editUserSorted(${GVUResultsSorted[i].id});return false;"><i class="bi bi-eye"></i></a>

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
    GVUIsSorted = false;//Default the not sorted
    if(selectPage.value === '5'){
        console.log("TRAlSE")
        GVUIndexPage = 0;
        GVUNumRows = 5;
        GVURowPerPage = 5;
        GVUdefaultRow = 5;
    }else if (selectPage.value === '10'){
        console.log("10")
        GVUNumRows = 10;
        GVUIndexPage = 0;
        GVURowPerPage = 10;
        GVUdefaultRow = 10;
    }else if (selectPage.value === '25'){
        console.log("25")
        GVUNumRows = 25;
        GVUIndexPage = 0;
        GVURowPerPage = 25;
        GVUdefaultRow = 25;
    }else{
        console.log(GVUAccLength)
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
          if(response.statusCode === 200){
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
         
         if(Sex = "Male"){
             document.getElementById('editmaleCheck').checked = true;
         }
         if(Sex = "Female"){
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
         
         if(Sex = "Male"){
             document.getElementById('editmaleCheck').checked = true;
         }
         if(Sex = "Female"){
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


    //Javascript edit account admin
// const btnEditError = document.getElementById('btnEditError');//Error button disabled
// const btnEditSuccess = document.getElementById('btnEditSuccess');//Succes button
// const btnIsUpdating = document.getElementById('btnIsUpdating');//updating button
    const fetchResponse = await fetchEdit.json();
    
    const showAnimation = await function(){

        if(fetchResponse.statusCode === 200){
            console.log(fetchResponse)
            delayedShowAlert = () =>{
        
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