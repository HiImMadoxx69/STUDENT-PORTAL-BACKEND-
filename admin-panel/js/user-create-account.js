//JavaScript create account admin
const btnCreateUsers = document.getElementById('btnCreateUsers');
const frmCreateUsers = document.getElementById('frmCreateUsers');//form create account
const btnIsLoading = document.getElementById('btnIsLoading');//LoadingButton

    
const resetFields = () =>{
     let Fname = document.getElementById('newFname').value = "";
   
    let Lname = document.getElementById('newLname').value = "";

    let Email = document.getElementById('newEmail').value = "";
 
    let Username = document.getElementById('newUsername').value = "";

    let Password = document.getElementById('newPassword').value = "";
    
    let Job = document.getElementById('newJob').value = "";
 
    let Contact = document.getElementById('newContact').value = "";

    let Address = document.getElementById('newAddress').value = "";
 
    let About = document.getElementById('newAbout').value = "";

    let Twitter = document.getElementById('newtwitterprofileURL').value = "";

    let Facebook = document.getElementById('newfacebookprofileURL').value = "";
 
    let Instagram = document.getElementById('newinstagramprofileURL').value = "";

    let Linkedin = document.getElementById('newlinkedinprofileURL').value = "";

}

//Loading function for button
const isLoadingTrue =(formStatus) =>{
    if(formStatus === true){
    btnIsLoading.removeAttribute("hidden");//Is loading true
    btnCreateUsers.style.display = "none";
    }else{
    delayedStopLoading =() =>{
    btnIsLoading.setAttribute("hidden", "hidden");
    btnCreateUsers.style.display = "inline-block";
    }
    setTimeout(delayedStopLoading, 1000);
    }
}

const createUserAccount = (e) =>{
    
    isLoadingTrue(true)//Start the loading button
   
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

    Twitter = "https://twitter.com/" + Twitter;
    Facebook = "https://Facebook.com/" + Facebook;
    Instagram = "https://Instagram.com/" + Instagram;
    Linkedin = "https://Linked.com/" + Linkedin;
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


    fetch("../controller/user-create-account.php",{
        method: "POST",
        body:formData,
    })
    
    .then((res) => res.json())
        .then(response =>{
            console.log(response)
            isLoadingTrue(false)//Start the loading button
        })
    .catch(err => console.log(err))

}