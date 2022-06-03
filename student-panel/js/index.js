
window.onload = function() {
    getAllResults();
    getAllBills();
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
    let myTable = '';
    let count = 0;
    let MyAverage = 0;
for(let i =0; i<getResponse.length;i++){
    if(getResponse[i].grade == 0){
        getResponse[i].grade = "No Grade";
    }
    output +=`<tr>
    <td>`+getResponse[i].subject_code+`</td>
    <td>`+getResponse[i].subject_name+`</td>
    <td>`+getResponse[i].units+`</td>
    <td>`+getResponse[i].grade+`</td>
    </tr>`;
    if(getResponse[i].grade > 0){
        MyAverage = parseFloat(MyAverage) + parseFloat(getResponse[i].grade);
        count++; 
     }
}
console.log(MyAverage)
MyAverage = parseFloat(MyAverage) / parseFloat(count);
MyAverage = MyAverage.toFixed(2)
output +=`<tr>
<td>Average</td>
<td>-</td>
<td>-</td>
<td>`+MyAverage+`<td></tr>`;

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


//Get All Bills

const getAllBills = async() =>{
    let studentNumber = document.getElementById('studentNumber').value;
    console.log(studentNumber)
        formData = new FormData();
        formData.append('studentNumber', studentNumber);
        const fetchResponse = await fetch("../controller/student-fee-table.php",{
            method: "POST",
            body:formData,
        });
        const getResponse = await fetchResponse.json();
        console.log(getResponse)
        
        let output = '';
        let miscFee = '';
        let count = 0;
        let balance = 0;
for(let i = 0; i<getResponse.length;i++){
    if(getResponse[i].type ==='Subject'){
        output += `<tr>
        <td>`+getResponse[i].billcode+`</td>
        <td></td>
        <td>`+getResponse[i].amount+`</td>
        </tr>`;
    }
    if(getResponse[i].type === 'Miscellaneous Fee'){
        miscFee += `<tr>
        <td>`+getResponse[i].billcode+`</td>
        <td></td>
        <td>`+getResponse[i].amount+`</td>
        </tr>`;
      }
      balance += parseFloat(getResponse[i].amount); 
}
     
miscFee += `<tr>
<td style="background-color:#0dff98">Total</td>
<td style="background-color:#0dff98"></td>
<td style="background-color:#0dff98">`+balance+`</td>
</tr style="background-color:#0dff98">`;

 document.querySelector('#subject-fee-table-body').innerHTML = output;
 document.querySelector('#misc-fee-table-body').innerHTML = miscFee;

 
}