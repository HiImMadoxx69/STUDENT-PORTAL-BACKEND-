//JavaScript create account admin
const btnCreateUsers = document.getElementById('btnCreateUsers');
const frmCreateUsers = document.getElementById('frmCreateUsers');//form create account
const createUserAccount = () =>{
   
    let Fname = document.getElementById('newFname').value;
   
    let Lname = document.getElementById('newLname').value;

    let Email = document.getElementById('newEmail').value;
 
    let Username = document.getElementById('newUsername').value;

    let Password = document.getElementById('newPassword').value;
    
    let Job = document.getElementById('newJob').value;
 
    let Contact = document.getElementById('newContact').value;

    let Address = document.getElementById('newAddress').value;
 
    let About = document.getElementById('newAbout').value;

    let Twitter = document.getElementById('newtwitterprofileURL').value;

    let Facebook = document.getElementById('newfacebookprofileURL').value;
 
    let Instagram = document.getElementById('newinstagramprofileURL').value;

    let Linkedin = document.getElementById('newlinkedinprofileURL').value;

formData = new FormData();
formData.append('Fname', Fname);
formData.append('Lname', Lname);
formData.append('Email', Email);
formData.append('Username', Username);
formData.append('Password', Password);
formData.append('Job', Job);
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
//convert to json

    fetch("../controller/user-create-account.php",{
        method: "POST",
        body:formData,
    })
    .then((res) => res.json())
    .then(response =>{
        console.log(response);
    })
    .catch(err => console.log(err))

}