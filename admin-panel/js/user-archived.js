window.onload = function(){
    getAllArchiveUser();
}//Onload page


//get all archived user accounts
const getAllArchiveUser = async () =>{
let totalUserArchives = document.getElementById('totalUserArchives');
try{
const getUserArchives = await fetch('../controller/user-archived-table.php');

const response = await getUserArchives.json();

totalUserArchives = response.length;

let output = '';

output += ``+response.length+``;

document.querySelector('#totalUserArchives').innerHTML = output;// print the total number of user archives
console.log(totalUserArchives)

}catch(error){
console.log(error)
}

}

