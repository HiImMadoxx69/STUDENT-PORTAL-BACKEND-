
window.onload = function() {
    getAllResults();
}

//getAllResults
const getAllResults = async () =>{
    let studentNumber = document.getElementById('studentNumber').value;
console.log(studentNumber)
    formData = new FormData();
    formData.append('studentNumber', studentNumber);
    const fetchResponse = await fetch("../controller/student-grade-table.php",{
        method: "POST",
        body:formData,
    });
    const getResponse = await fetchResponse.json();
    console.log(getResponse)
    let output = '';
for(let i =0; i<getResponse.length;i++){
    if(getResponse[i].grade == 0){
        getResponse[i].grade = "No Grade";
    }
    output +=`<tr>
    <td>`+getResponse[i].subject_code+`</td>
    <td>`+getResponse[i].subject_name+`</td>
    <td>`+getResponse[i].grade+`</td>
    <td>`+getResponse[i].units+`</td>
    </tr>`;
}
  

let schedules ='';
    for(let i =0; i<getResponse.length;i++){
        if(getResponse[i].grade == 0){
            getResponse[i].grade = "No Grade";
        }
        schedules +=`<tr>
        <td>`+getResponse[i].subject_name+`</td>
        <td>`+getResponse[i].schedule+`</td>
        <td>`+getResponse[i].instructor+`</td>
        </tr>`;
    }
        document.querySelector('#grade-table-body').innerHTML = output;
        document.querySelector('#schedule-table-body').innerHTML = schedules;
}


