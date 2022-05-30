//GLOBAL VARIABLES ARCHIVED COURSE = GVACOU
//Current number of rows
var GVACOUBdefaultRow = 0;
//CurrentIndexPage global
var GVACOUBIndexPage = 0;

//Get the total length of table
var GVACOUBAccLength = 0;

//JSON global results variable
var GVACOUBResults = {};

//JSON global result sorted variable
var GVACOUBResultsSorted = {};

//Check if already sorted
var GVACOUBIsSorted = false;
//Default number of row global
var GVACOUBNumRows = 0;

//If the default row is less than 10
var GVACOUBLessThanRow = 0;

//Get desired number of row per page
var GVACOUBRowPerPage = 0;

//NextPage Call
const nextpageCall = function nextPageCall(){

    if(((GVACOUBAccLength - GVACOUBdefaultRow) < 10) && GVACOUBLessThanRow === 0){
      console.log("LOL")
        GVACOUBLessThanRow = GVACOUBAccLength - GVACOUBdefaultRow;
        GVACOUBdefaultRow += GVACOUBLessThanRow;
        bindAllDataIntoTable();
    }

    console.log("next page GVACOUBdefaultRow: "+GVACOUBdefaultRow +" GVACOUBAccLength:"+GVACOUBAccLength+" GVACOUBIndexPage:" +GVACOUBIndexPage +" <= GVACOUBRowPerPage:"+GVACOUBRowPerPage);
    if(GVACOUBdefaultRow < GVACOUBAccLength ){
       
        GVACOUBdefaultRow += GVACOUBRowPerPage;
        console.log("next page GVACOUBdefaultRow:"+GVACOUBdefaultRow)
        GVACOUBIndexPage +=GVACOUBRowPerPage;
        bindAllDataIntoTable();
    }
}



//PrevPage Call
const prevpageCall = function nextPageCall(){
  
    // console.log('Less than row'+GVACOUBLessThanRow);
    if(GVACOUBLessThanRow !== 0){
    
        GVACOUBdefaultRow = GVACOUBdefaultRow - GVACOUBLessThanRow;
        GVACOUBLessThanRow = 0;
    }
    if(GVACOUBIndexPage >= GVACOUBRowPerPage){
        GVACOUBdefaultRow -= GVACOUBRowPerPage;
        GVACOUBIndexPage -=GVACOUBRowPerPage;
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
    fetch('../controller/course-archived-table.php').then((res) => res.json())
    .then(response => {

        GVACOUBResults = response;//Store the responseJSON into GVACOUBResults global var
       
        GVACOUBAccLength = response.length;//getThe totalLength
        GVACOUBNumRows = 0;//Set Number of rows default
        
        let selectHolder = '';
        if(GVACOUBAccLength >= 200){
           
            selectHolder += `
            <option value="5" selected>5</option>
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="ALL">All</option>`;
        }else if (GVACOUBAccLength >= 100){
           
            selectHolder += `
            <option value="5" selected>5</option>
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="ALL">All</option>`;
        }else if(GVACOUBAccLength >= 25){
            
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
            GVACOUBNumRows = 5;
            GVACOUBRowPerPage = 5;
            GVACOUBdefaultRow = 5;
        }else if (selectPage.value === '10'){
            GVACOUBNumRows = 10;
            GVACOUBRowPerPage = 10
            GVACOUBdefaultRow = 10;
        }else if (selectPage.value === '25'){
            GVACOUBNumRows = 25;
            GVACOUBRowPerPage = 25;
            GVACOUBdefaultRow = 25;
        }else{
            GVACOUBNumRows = GVACOUBAccLength;
            GVACOUBRowPerPage = GVACOUBAccLength;
            GVACOUBdefaultRow = GVACOUBAccLength;
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
        delayedRemoveAlert = () =>{   
            alertShowSuccess.classList.remove('show');  
            alertShowSuccess.setAttribute("hidden", "hidden");
        }
        setTimeout(delayedRemoveAlert, 3000);
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
    for(let i =0 ; i< GVACOUBdefaultRow;i++ ){
        if(GVACOUBResults[i].id == id){
            console.log("true")
            output += `<img src = "../../uploads/${GVACOUBResults[i].profile_url} " alt="Profile" style="max-width:350px; max-height:350px;" "/>
            `;
            
            break;
        }
    }
    document.querySelector('#changePicModalBody').innerHTML = output;
}


const bindAllDataIntoTable = function (){   
    let output ='';

for(let i = GVACOUBIndexPage; i<GVACOUBdefaultRow; i++){
 console.log("GVACOUBIndexPage: "+GVACOUBIndexPage+"< GVACOUBDefaultRow:" +GVACOUBdefaultRow)
    output += `<tr>
     <td>${GVACOUBResults[i].course_name}</td>
     <td>${GVACOUBResults[i].course_faculty}</td>
     <td>${GVACOUBResults[i].credits}</td>
    <td>${GVACOUBResults[i].status}</td>
    <th scope="col" class="table-info">
    <div class = "pt-1">
    <a href="#" class ="btn btn-secondary btn-sm" title = "Unarchived" data-bs-toggle="modal" data-bs-target="#archivedModal" onclick ="moveToArchive('${GVACOUBResults[i].id}', '${GVACOUBResults[i].subject_code}');return false;"><i class="ri-inbox-unarchive-line"></i></a>
    </div>
    </th>
    </tr>`;
    
}

let numberOfPages = '';
numberOfPages += `<h8>Showing `+GVACOUBdefaultRow+` out of `+GVACOUBAccLength+` results</h8>`;
document.querySelector('#tbody-user-accounts').innerHTML = output;//print the data into the tbody
document.querySelector('#showNumberOfPage').innerHTML = numberOfPages;
}






//Sort the table
const sortCurrentTable = (headerTitle) =>{


    for(let i = 0; i<GVACOUBNumRows; i++){
        GVACOUBResultsSorted[i] = GVACOUBResults[GVACOUBIndexPage+i];
    }//Fill the GVACOUBResultsSorted with GVACOUBResults only needed

if(GVACOUBIsSorted){
 
    for(let i = 0; i<GVACOUBNumRows-1; i++){
        for(let j = 0; j<GVACOUBNumRows-1; j++){
         if(GVACOUBResultsSorted[j][headerTitle]> GVACOUBResultsSorted[j+1][headerTitle]){
             // console.log("a = "+GVACOUBResultsSorted[j].id+" > "+" b = "+GVACOUBResultsSorted[j+1].id);
             let temp = GVACOUBResultsSorted[j];
             GVACOUBResultsSorted[j] = GVACOUBResultsSorted[j+1];
             GVACOUBResultsSorted[j+1] = temp;
      }
     }
   }
   GVACOUBIsSorted = false;//after sorted then reverse sort
}else{
  
    for(let i = 0; i<GVACOUBNumRows-1; i++){
        for(let j = 0; j<GVACOUBNumRows-1; j++){
         if(GVACOUBResultsSorted[j][headerTitle] < GVACOUBResultsSorted[j+1][headerTitle]){
             // console.log("a = "+GVACOUBResultsSorted[j].id+" > "+" b = "+GVACOUBResultsSorted[j+1].id);
             let temp = GVACOUBResultsSorted[j];
             GVACOUBResultsSorted[j] = GVACOUBResultsSorted[j+1];
             GVACOUBResultsSorted[j+1] = temp;
      }
     }
   }
   GVACOUBIsSorted = true;//after sorted then reverse sort
}
   

  
    bindAllDataIntoTableSorted();
}//Sort by id





//Bind the sorted table
const bindAllDataIntoTableSorted = function (){
    
    let output ='';
    
    for(let i = 0; i<GVACOUBNumRows; i++){
        output += `<tr>
        <td>${GVACOUBResultsSorted[i].course_name}</td>
        <td>${GVACOUBResultsSorted[i].course_faculty}</td>
        <td>${GVACOUBResultsSorted[i].credits}</td>
        <td>${GVACOUBResultsSorted[i].status}</td>
        <th scope="col" class="table-info">
        <div class = "pt-1">
    <a href="#" class ="btn btn-secondary btn-sm" title = "Unarchived"  data-bs-toggle="modal" data-bs-target="#archivedModal" onclick ="moveToArchive('${GVACOUBResultsSorted[i].id}', '${GVACOUBResultsSorted[i].subject_code}');return false;"><i class="ri-inbox-unarchive-line"></i></a>
    </div>
        </th>
        </tr>`;
    }
   
    let numberOfPages = '';
    numberOfPages += `<h8>Showing `+GVACOUBdefaultRow+` out of `+GVACOUBAccLength+` results</h8>`;
    document.querySelector('#tbody-user-accounts').innerHTML = output;//print the data into the tbody
    document.querySelector('#showNumberOfPage').innerHTML = numberOfPages;
}//Sorted Bind Table

//Archived prompt ! are you sure you want to archive?
const moveToArchive = async (...params) => {
let output = '';
output += `Are you sure you want to unarchived  `+params[1]+` ?!`;
let showButtons ='';
showButtons += ` <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
<button type="button" class="btn btn-danger" data-bs-dismiss="modal"onclick= "unarchivedUser(`+params[0]+`)">Unarchive</button>`;
document.querySelector('#modal-footer-button').innerHTML = showButtons;//show the buttons modal archive
document.querySelector('#archive-modal-title').innerHTML = output;//change the title of modal archive
}

//unarchivedUser when confirmed
const unarchivedUser = async (id) =>{
    let message = '';// message alert
 //get current date where removing was done
const status = 'active';   

formData = new FormData()
formData.append('UserID', id);
formData.append('Status', status);

try{
    const fetchRemove = await fetch("../controller/course-unarchive.php",{
          method: "POST",
          body: formData,
      });
  
      const fetchResponse = await fetchRemove.json();
      if(fetchResponse.statusCode === 200){     
            alertShowSuccess.removeAttribute("hidden");
            alertShowSuccess.classList.add('show');
            message += ` Unarchived Succesfully!`
            document.querySelector('#alertSuccessMessage').innerHTML = message;
            refreshTable(); 
        delayedRemoveAlert = () =>{   
            alertShowSuccess.classList.remove('show');  
            alertShowSuccess.setAttribute("hidden", "hidden");
        }
        setTimeout(delayedRemoveAlert, 3000);
        
      }// end of if fetch === 200

      
    
  }catch (e){
      console.log(e)
  }
}

//Select bind data

const selectNumPage = function(){
    GVACOUBIsSorted = false;//Default the not sorted
    if(selectPage.value === '5'){
        GVACOUBIndexPage = 0;
        GVACOUBNumRows = 5;
        GVACOUBRowPerPage = 5;
        GVACOUBdefaultRow = 5;
    }else if(selectPage.value === '10'){
        console.log("10")
        GVACOUBNumRows = 10;
        GVACOUBIndexPage = 0;
        GVACOUBRowPerPage = 10;
        GVACOUBdefaultRow = 10;
    }else if(selectPage.value === '25'){
        console.log("25")
        GVACOUBNumRows = 25;
        GVACOUBIndexPage = 0;
        GVACOUBRowPerPage = 25;
        GVACOUBdefaultRow = 25;
    }else{

        GVACOUBIndexPage = 0;
        GVACOUBNumRows = GVACOUBAccLength;
        GVACOUBRowPerPage = GVACOUBAccLength;
        GVACOUBdefaultRow = GVACOUBAccLength;
    }
    bindAllDataIntoTable();
}

//Search bar function
const userSearchKey = () =>{
let userSearch = userSearchBar.value;
console.log(userSearch !== "");
if(userSearch !== ""){
    let results = [];//Temporary JSON

    for(let i = 0; i<GVACOUBResults.length;i++){
        for( key in GVACOUBResults[i]){
            if(GVACOUBResults[i][key].indexOf(userSearch) != -1){
                results.push(GVACOUBResults[i]);
                break;
            }
        }
    }//Put all match results in results obj
    
    GVACOUBNumRows = results.length;//set the value of numrows
    GVACOUBResultsSorted = results;
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
     GVACOUBIndexPage = 0;
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
    for(let i =0 ; i< GVACOUBResults.length;i++ ){
        if(GVACOUBResults[i].id == a){
           
         let UserId = document.getElementById('editId').value =  GVACOUBResults[i].id;    

         let Fname = document.getElementById('editFname').value =  GVACOUBResults[i].firstname;
        
         let Mname = document.getElementById('editMname').value =  GVACOUBResults[i].middlename;
        
         let Lname = document.getElementById('editLname').value =  GVACOUBResults[i].lastname;
     
         let Email = document.getElementById('editEmail').value=   GVACOUBResults[i].email ;
      
         let Username = document.getElementById('editUsername').value =  GVACOUBResults[i].username;
     
         let Password = document.getElementById('editPassword').value =  GVACOUBResults[i].password;
         
         let Job = document.getElementById('editJob').value =    GVACOUBResults[i].position;
     
         let Birthday = document.getElementById('editBirthday').value =  GVACOUBResults[i].birthday;
         
         let Sex = GVACOUBResults[i].sex;
      
         if(Sex === "Male"){
             document.getElementById('editmaleCheck').checked = true;
         }
         if(Sex === "Female"){
             document.getElementById('editfemaleCheck').checked = true;
         }
         let Contact = document.getElementById('editContact').value =    GVACOUBResults[i].contact;
     
         let Address = document.getElementById('editAddress').value =    GVACOUBResults[i].address;
      
         let About = document.getElementById('editAbout').value =    GVACOUBResults[i].about;
      
         let Twitter = document.getElementById('edittwitterprofileURL').value =  GVACOUBResults[i].twitterprofile;
     
         let Facebook = document.getElementById('editfacebookprofileURL').value =    GVACOUBResults[i].facebookprofile;
      
         let Instagram = document.getElementById('editinstagramprofileURL').value =  GVACOUBResults[i].instagramprofile;
     
         let Linkedin = document.getElementById('editlinkedinprofileURL').value =    GVACOUBResults[i].linkedinprofile;
         break;
     }
    }
 }
 



//Edit User Data sorted

const editUserSorted = (a) =>{
    
    for(let i =0 ; i< GVACOUBNumRows;i++ ){
        if(GVACOUBResultsSorted[i].id == a){

         let UserId = document.getElementById('editId').value =  GVACOUBResultsSorted[i].id;   
     
         let Fname = document.getElementById('editFname').value =  GVACOUBResultsSorted[i].firstname;
 
         let Mname = document.getElementById('editMname').value =  GVACOUBResultsSorted[i].middlename;
        
         let Lname = document.getElementById('editLname').value =  GVACOUBResultsSorted[i].lastname;
     
         let Email = document.getElementById('editEmail').value =   GVACOUBResultsSorted[i].email ;
      
         let Username = document.getElementById('editUsername').value =  GVACOUBResultsSorted[i].username;
     
         let Password = document.getElementById('editPassword').value =  GVACOUBResultsSorted[i].password;
         
         let Job = document.getElementById('editJob').value =    GVACOUBResultsSorted[i].position;
     
         let Birthday = document.getElementById('editBirthday').value =  GVACOUBResultsSorted[i].birthday;
         
         let Sex = GVACOUBResultsSorted[i].sex;
         
         if(Sex === "Male"){
             document.getElementById('editmaleCheck').checked = true;
         }
         if(Sex === "Female"){
             document.getElementById('editfemaleCheck').checked = true;
         }
     
         let Contact = document.getElementById('editContact').value =    GVACOUBResultsSorted[i].contact;
     
         let Address = document.getElementById('editAddress').value =    GVACOUBResultsSorted[i].address;
      
         let About = document.getElementById('editAbout').value =    GVACOUBResultsSorted[i].about;
      
         let Twitter = document.getElementById('edittwitterprofileURL').value =  GVACOUBResultsSorted[i].twitterprofile;
     
         let Facebook = document.getElementById('editfacebookprofileURL').value =    GVACOUBResultsSorted[i].facebookprofile;
      
         let Instagram = document.getElementById('editinstagramprofileURL').value =  GVACOUBResultsSorted[i].instagramprofile;
     
         let Linkedin = document.getElementById('editlinkedinprofileURL').value =    GVACOUBResultsSorted[i].linkedinprofile;
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