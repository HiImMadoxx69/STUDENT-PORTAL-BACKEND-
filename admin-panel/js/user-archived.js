
//get all archived user accounts

window.onload = function(){
    getAllArchiveUser();
}//Onload page

const getAllArchiveUser = async () =>{

try{
const getUserArchives = await fetch('../controller/user-archived-table.php');

const response = await getUserArchives.json();

console.log(response)

let output = '';

output += ``+response.length+``;

document.querySelector('#totalUserArchives').innerHTML = output;// print the total number of user archives

}catch(error){
console.log(error)
}

}