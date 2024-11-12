const questions = [
    {
        question: "What is your age range?",
        answers: [
            {text: '18-30', need: ['Vitamin D', 'B12', 'Iron'], chosen: false},
            {text: '31-50', need: ['Calcium', 'Vitamin D', 'B12'], chosen: false},
            {text: '51+', need: ['Vitamin D', 'Calcium', 'B12', 'Magnesium'], chosen: false}
        ]
    },
    {
        question: "Do you have history of the following. (Select all that apply from bottom to up)",
        answers: [
            {text: 'Osteoporosis', need: ['Calcium', 'Vitamin D', 'Magnesium'], chosen: false},
            {text: 'Anemia', need: ['Iron', 'B12', 'Folate'], chosen: false},
            {text: 'Thyroid issues', need: ['Iodine', 'Selenium', 'Zinc'], chosen: false},
            {text: 'None of the above', need: [], chosen: false}
        ]
    },
    {
        question: "What is you skin type?",
        answers:[
            {text: 'Dry', need: ['Vitamin E', 'Omega-3s'], chosen: false},
            {text: 'Oily', need: ['Zinc', 'Vitamin A'], chosen: false},
            {text: 'Sensitive', need: ['Vitamin C', 'Vitamin E', 'Biotin'], chosen: false},
            {text: 'Normal', need: ['Vitamin A', 'Vitamin B', 'Vitamin C'], chosen: false}
        ]
    },
    {
        question: "What is your body type?",
        answers: [
            {text: 'Ectomorph', need: ['Protien', 'Vitamin B'], chosen: false},
            {text: 'Mesomorph', need: ['Protien', 'Vitamin D', 'Magnesium'], chosen: false},
            {text: 'Endomorph', need: ['Fiber', 'Vitamin D', 'Omega-3'], chosen: false}
        ]
    },
    {
        question: "What is your gender?",
        answers:[
            {text: 'Male', need: ['Zinc', 'Vitamin D', 'Magnesium'], chosen: false},
            {text: 'Female', need: ['Iron', 'Calcium', 'Folic Acid'], chosen: false}
        ]
    },
    {
        question: "Are you looking to gain muscles or prevent muscle loss?",
        answers: [
            {text: 'Gain muscles', need: ['Protien', 'BCAA', 'Vitamin D'], chosen: false},
            {text: 'Prevent muscle', need: ['Protien', 'Vitamin D', 'Magnesium'], chosen: false},
        ]
    },
    {
        question: "Do you experience any of these symptoms? (Select all that apply from bottom to up).",
        answers: [
            {text: 'Fatigue', need: ['B12', 'Iron'], chosen: false},
            {text: 'Hair loss', need: ['Biotin', 'Zinc', 'Vitamin D'], chosen: false},
            {text: 'Weak Nails', need: ['Calcium', 'Biotin'], chosen: false},
            {text: 'Muscle Cramps', need: ['Magnesium', 'Potassium'], chosen: false},
            {text: 'Frequent illness', need: ['Vitamin C', 'Vitamin D', 'Zinc'], chosen: false}

        ]
    },
    
]

//fetching html elements
let question = document.querySelector('.question');
let option = document.querySelector('.mcq');
let quiz = document.querySelector('.quiz');

//js vars
let currentIndex = 0;
let currentQuestion;
let n;
let len = questions.length;

let collect = [];

//STARTING THE QUESTIONNARE
function start(){
    currentIndex = 0;
    showQuestions();
}

//THE WORKING OF THE QUESTIONNARE
function showQuestions(){
    //resetting the question and options
    resetState();

    //variables
    currentQuestion = questions[currentIndex];
    n = currentQuestion.answers.length;
    let final = new Set();
    
    //showing quesitons and answers
    if(currentIndex<len){
        //question
        question.innerText = 'Q' + (currentIndex+1) + '. ' + currentQuestion.question;
        
        //options
        for(i = 0; i<n; i++){
            let button = document.createElement('button');
            button.innerText = currentQuestion.answers[i].text;
            button.classList.add('option');
            option.appendChild(button);
            button.addEventListener('click', chosen);
        }
    }

    //choosing option and creating next button
    function chosen(e){
        const element = e.target;
    
        //chosen option
        element.classList.add('chosen');
        
        //creating next button
        let nexto = document.querySelector('.next');
    
        if(nexto == null && currentIndex != len-1){
            let next = document.createElement('button');
            next.innerText = "NEXT";
            next.classList.add('next');
            option.appendChild(next);    
            next.addEventListener('click', nextQuestion);
        }else if(nexto == null && currentIndex == len-1){
            let submit = document.createElement('button');
            submit.innerText = "SUBMIT";
            submit.classList.add('next');
            option.appendChild(submit);
            submit.addEventListener('click', showStatistics);
        }

        //change chosen option to true for selected answers   
        if(currentIndex<len){    
            for(i = 0; i<option.childNodes.length; i++){
                let ans = option.childNodes[i];
                let att = ans.getAttribute('class');
        
                if(att == 'option chosen'){
                    for(j = 0; j<n; j++){
                        let curr = currentQuestion.answers[j];
                        if(curr.text == ans.innerText && curr.chosen == false){
                            curr.chosen = true;
                        }
                    }
                }
            }
        }
    }

    //show next question
    function nextQuestion(){
        
        if(currentIndex<len){
            for(i = 0; i<option.childNodes.length; i++){
                let ans = option.childNodes[i];
                let att = ans.getAttribute('class');

                if(att == 'option chosen'){
                    for(j=0; j<n; j++){
                        let curr = currentQuestion.answers[j];
                        if(curr.chosen==true){
                            collect.push(currentQuestion.answers[j].need);
                        }
                    }
                }
            }
        }

        
        //incrementing
        currentIndex++;
        //showing questions
        showQuestions();

    }

    function showStatistics(){
        //removed question and answer boxes
        question.remove();
        option.remove();

        if(currentIndex == len-1){
            console.log(collect[3].length);
            for(i = 0; i<collect.length; i++){
                for(j = 0; j<collect[i].length; j++){
                    final.add(collect[i][j]);
                }
            }
        }

        //creating new stats box
        stats = document.createElement('p');
        stats.innerText = 'The nutrients you need are: ' + Array.from(final).join(', ');
        stats.classList.add('mcq');
        stats.style.fontSize = '0.9rem';
        quiz.appendChild(stats);
    }

}

//RESETTING THE QUESTION AND OPTIONS BEFORE DISPLAYING THE NEXT ONE
function resetState(){
    question.innerText = '';
    while(option.firstChild){
        option.removeChild(option.firstChild);
    }
}

//EXECUTING FUNCTIONS
start();





