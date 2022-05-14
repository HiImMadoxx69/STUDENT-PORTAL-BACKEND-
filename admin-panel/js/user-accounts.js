
//Default number of row global
var defaultRow = 5;
//CurrentIndexPage global
var curIndexPage = 0;

//Get the total length of table
var userAccountsLength = 0;

//NextPage Call
const nextpageCall = function nextPageCall(){
    if(curIndexPage <= userAccountsLength){
        defaultRow += 5;
        curIndexPage +=5;
        getAllData();
    }
}

//PrevPage Call
const prevpageCall = function nextPageCall(){
    if(curIndexPage >= 5){
        defaultRow -= 5;
        curIndexPage -=5;
        getAllData();
    }
}


//Pagination buttons
nextPage = document.getElementById('nextPage');
prevPage = document.getElementById('prevPage');
page1 = document.getElementById('page1');
page2 = document.getElementById('page2');
page3 = document.getElementById('page3');

//Eventlistener for paginatio Buttons
nextPage.addEventListener('click', nextpageCall);
prevPage.addEventListener('click', prevpageCall);
// page1.addEventListener('click', getAllData());
// page2.addEventListener('click', getAllData());
// page3.addEventListener('click', getAllData());


//getAllData Function
function getAllData(){

    //get user accounts
fetch('../controller/user-table.php').then((res) => res.json())
.then(response => {



let output ='';



for(let i = curIndexPage; i<defaultRow; i++){
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

userAccountsLength = response.length;
document.querySelector('#tbody-user-accounts').innerHTML = output;//print the data into the tbody
}).catch(error => console.log(error));//end of get user accounts
}//end of function getAllData



getAllData();//bind the table