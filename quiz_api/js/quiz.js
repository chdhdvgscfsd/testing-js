//global var for the correct answer
let correctAnswer,
    correctNumber = (localStorage.getItem('quiz_game_correct') ? localStorage.getItem('quiz_game_correct') : 0); 
    incorrectNumber = (localStorage.getItem('quiz_game_incorrect') ? localStorage.getItem('quiz_game_incorrect') : 0);

document.addEventListener('DOMContentLoaded', function(){
    loadQuestions();

    eventListener();
})

eventListener = ()=>{
    document.querySelector('#check-answer').addEventListener('click',validateAnswer);
    
    document.querySelector('#clear-storage').addEventListener('click',clearResults);
}


//function1=> load questions from the API
loadQuestions = ()=>{
    //url is from trivia opendb
    const url = 'https://opentdb.com/api.php?amount=1&category=18&difficulty=hard';     //loading one  question at a time
    fetch(url)      //json
    .then(data=> data.json())
    .then(result => displayQuestions(result.results));  //results is frm the object
}

//function2 => display the question from the API
displayQuestions = questions=>{
    let array1 = [1,2,3];
    let value1 = 4;
    //splice method => 0=adds last parameter while 1=removes the parameter.
    //make the random and insert 4 hence 2nd parameter is 0.
    array1.splice(Math.floor(Math.random() * 3),0, value1);     //just an illustration but never used
    console.log(array1);
    

    //create the HTML question
    const questionHTML = document.createElement('div');
    questionHTML.classList.add('col-12');

    questions.forEach(question => {
        //read the correct_answer which is same as value1 above but in string terms
        correctAnswer = question.correct_answer;    //var is was created above and is global
        console.log(correctAnswer);

        //read the incorrect_answers which is similar to array1 above
        let possibleAnswers = question.incorrect_answers;
        //add correct_answer in possible answers array and mix them to make it hard to find
        possibleAnswers.splice(Math.floor(Math.random() * 3),0, correctAnswer);

        //add the HTML question
        questionHTML.innerHTML = `
            <div class="row justify-content-between heading">
                    <p class="category">Category: ${question.category}</p>
                    <div class="totals">
                        <span class="badge badge-success">${correctNumber}</span>
                        <span class="badge badge-danger">${incorrectNumber}</span>
                    </div>
            </div>
            <h2 class="text-center">${question.question}</h2>
        `;

        //generate html for possible answers
        const answerDiv = document.createElement('div');
        answerDiv.classList.add('questions','row','justify-content-around', 'mt-4');
        possibleAnswers.forEach(answer =>{

            const answerHTML = document.createElement('li');
            answerHTML.classList.add('col-12','col-md-5');
            answerHTML.textContent = answer;

            //attach an event when the answer is clicked
            answerHTML.onclick = selectAnswer;

            //add to div
            answerDiv.appendChild(answerHTML);
        });
        //add all the answers to the HTML question
        questionHTML.appendChild(answerDiv);

        //render in the HTML
        document.querySelector('#app').appendChild(questionHTML);

        
    });
}

//when an answer is selected
selectAnswer = (e)=>{
    //removes the prev active for the answer
    const activeAnswer = document.querySelector('.active');
    if(activeAnswer){ 
        activeAnswer.classList.remove('active');
    }
    //adds the current answer
    e.target.classList.add('active');
}

//checks if the answer is correct and 1 answer is selected
validateAnswer = () =>{
   if(document.querySelector('.questions .active')){
       //everything is ok,check if answer is correct
       checkAnswer();
   }else{
       //print out error message
       const errorDiv = document.createElement('div');
       errorDiv.classList.add('alert','alert-danger','col-md-6');
       errorDiv.textContent = 'Please select 1 option';
        //select the question div to insert the alert
       const questionDiv = document.querySelector('.questions');
       questionDiv.appendChild(errorDiv);

       //remove the error
       setTimeout((e)=>{
            errorDiv.classList.remove('alert-danger'); 
            //  OR
            //document.querySelector('.alert-danger').remove();
       },3000)
   }
}

//check if answer is correct or not
checkAnswer = ()=>{
    const userAnswer = document.querySelector('.questions .active');
    //check if the active active answer(one selected) is = correct answer
    if(userAnswer.textContent === correctAnswer){
        correctNumber ++;
    }else{
        incorrectNumber ++;
    }
    //save to local Storage
    safeIntoStorage();

    //clear screen
    const app = document.querySelector('#app');
    while(app.firstChild){
        app.removeChild(app.firstChild);
    }
    //then load new questions
    loadQuestions();
    
}

//save both corect and incorrect into local storage
safeIntoStorage = ()=>{
    localStorage.setItem('quiz_game_correct',correctNumber);
    localStorage.setItem('quiz_game_incorrect',incorrectNumber);
}

clearResults = ()=>{
    localStorage.setItem('quiz_game_correct',0);
    localStorage.setItem('quiz_game_incorrect',0);
    setTimeout(()=>{
        window.location.reload();
    },500)
}