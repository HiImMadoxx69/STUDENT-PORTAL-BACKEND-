
//Default number of row global
var defaultRow = 10;
//CurrentIndexPage global
var curIndexPage = 0;

//Get the total length of table
var userAccountsLength = 0;

//NextPage Call
const nextpageCall = function nextPageCall(){
    if(curIndexPage <= userAccountsLength){
        defaultRow += 10;
        curIndexPage +=10;
        getAllData();
    }
}



//PrevPage Call
const prevpageCall = function nextPageCall(){
    if(curIndexPage >= 10){
        defaultRow -= 10;
        curIndexPage -=10;
        getAllData();
    }
}


//Pagination buttons
nextPage = document.getElementById('nextPage');
prevPage = document.getElementById('prevPage');
page1 = document.getElementById('page1');
page2 = document.getElementById('page2');
page3 = document.getElementById('page3');
showNumberOfPage = document.getElementById('showNumberOfPage');

//Eventlistener for paginatio Buttons
nextPage.addEventListener('click', nextpageCall);
prevPage.addEventListener('click', prevpageCall);
// page1.addEventListener('click', getAllData());
// page2.addEventListener('click', getAllData());
// page3.addEventListener('click', getAllData());

//Files json
var myResultJSON = {};

const sortMe = function(){
alert(myResultJSON.username);
}


//getAllData Function
function getAllData(){

    //get user accounts
fetch('../controller/user-table.php').then((res) => res.json())
.then(response => {



let output ='';
myResultJSON = response;
userAccountsLength = response.length;



for(let indexC = curIndexPage; indexC <defaultRow; indexC++){
    
    for(let j = indexC; j < defaultRow; j++){
        if(response[indexC].id > response[j].id){
            console.log(response[indexC].id+' > '+response[j].id);
            console.log('yes');
            let temp = response[indexC].id;
            response[indexC].id = response[j].id;
            response[indexC].id = temp;
       }
    }
}

console.log(response[0].id);
if(response[0].id === 1){
    console.log('wtf');
}

console.log(response[0].username.length);  
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
    <th scope="col" class="table-info">asdasd</th>
    </tr>`;
}

let numberOfPages = '';
numberOfPages += `<h8>Showing `+defaultRow+` out of `+userAccountsLength+` results</h8>`;

userAccountsLength = response.length;
document.querySelector('#tbody-user-accounts').innerHTML = output;//print the data into the tbody
document.querySelector('#showNumberOfPage').innerHTML = numberOfPages;
}).catch(error => console.log(error));//end of get user accounts
}//end of function getAllData

window.onload = function(){
    getAllData();
}//Onload page