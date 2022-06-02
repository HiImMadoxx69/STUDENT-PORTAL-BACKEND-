window.onload = function(){
    getAllUser();
    getAllStudent();
    getAllSubject();
    getAllCourses();
    getRecentActivity();
}//Onload page


//get all archived user accounts
const getAllUser = async () =>{

try{
const getUser = await fetch('../controller/user-table.php');

const response = await getUser.json();

totalUser = response.length;

let output = '';

output += ``+response.length+``;

document.querySelector('#totalUserAccounts').innerHTML = output;// print the 
}catch(error){
console.log(error)
    }
}


//get all archived students accounts
const getAllStudent = async () =>{

    try{
    const getUser = await fetch('../controller/student-table.php');
    
    const response = await getUser.json();
    
    totalUser = response.length;
    
    let output = '';
    
    output += ``+response.length+``;
    
    document.querySelector('#totalStudentAccounts').innerHTML = output;// print the 
    }catch(error){
    console.log(error)
        }
    }
    
//get all archived Subject accounts
const getAllSubject = async () =>{

    try{
    const getUser = await fetch('../controller/subject-table.php');
    
    const response = await getUser.json();
    
    totalUser = response.length;
    
    let output = '';
    
    output += ``+response.length+``;
    
    document.querySelector('#totalSubjects').innerHTML = output;// print the 
    }catch(error){
    console.log(error)
        }
    }


 

       //get all archived courses
const getAllCourses = async () =>{

    try{
    const getUser = await fetch('../controller/course-table.php');
    
    const response = await getUser.json();
    
    totalUser = response.length;
    let output = '';
    
    output += ``+response.length+``;
    
    document.querySelector('#totalCourse').innerHTML = output;// print the 
    }catch(error){
    console.log(error)
        }
    }
    
    
    
    const getRecentActivity = async () =>{
        const twentyFourHrInMs = 24 * 60 * 60 * 1000;

        const twentyFourHoursAgo = Date.now() - twentyFourHrInMs;
        try{
    
        const fetchResponse = await fetch('../controller/audit-table.php');

        const getResponse = await fetchResponse.json();
        
        let output = '';

        for(let i = 0; i < getResponse.length; i++){
        if(i < 5){
            if(Date.parse(getResponse[i].added_at) > twentyFourHoursAgo){
                output += `<div class="activity-item d-flex">
                <div class="activite-label">`+getResponse[i].added_at+`</div>
                <i class='bi bi-circle-fill activity-badge text-info align-self-start'></i>
                <div class="activity-content">`+getResponse[i].action+`
                </div>
              </div>`;
              }
        }
        }
        document.querySelector('#activity-body-list').innerHTML = output;
    }catch(error){
        console.log(error)
    }
    }
    
    

