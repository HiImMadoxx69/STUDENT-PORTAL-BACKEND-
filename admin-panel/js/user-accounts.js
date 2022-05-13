fetch('../controller/user-table.php').then((res) => res.json())
.then(response => {
console.log(response);


let output ='';

for(let i in response){
    output += `<tr>
    <td>${response[i].id}</td>
    <td><img src = "../../uploads/${response[i].profile_url} " alt="Profile" height = "100px" width = "100px"/></td>
    <td>${response[i].username}</td>
    <td>${response[i].firstname}</td>
    <td>${response[i].lastname}</td>
    <td>${response[i].email}</td>
    <td>${response[i].password}</td>
    <td>${response[i].position}</td>
    <td>${response[i].address}</td>
    <td>${response[i].contact}</td>
    <td>${response[i].about}</td>
    <td>${response[i].twitterprofile}</td>
    <td>${response[i].facebookprofile}</td>
    <td>${response[i].instagramprofile}</td>
    <td>${response[i].linkedinprofile}</td>
    <td>${response[i].added_at}</td>
    </tr>`
}

document.querySelector('#tbody-user-accounts').innerHTML = output;
}).catch(error => console.log(error));