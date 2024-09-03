const questionsList =[
    {
        question: "Who is current President of India?",
        answers:[
            {text: "Narendra Modi", correct: false},
            {text: "Droupadi Murmu", correct: true},
            {text: "Ram Nath Kovind", correct: false},
            {text: "Amit Shah", correct: false}
        ]
    } ,

    {
        question: "Who is Pappu?",
        answers:[
            {text: "Arvind Kejriwal", correct: false},
            {text: "Amit Shah", correct: false},
            {text: "Narendra Modi", correct: false},
            {text: "Rahul Gandhi", correct: true}
        ]
    } ,

    {
        question: "What is the capital of USA?" ,
        answers: [
            {text:"New York", correct: false},
            {text:"Canada", correct: false},
            {text:"Washington, D.C.", correct: true},
            {text:"California", correct: false},
            
        ]
    },

    {
        question: "What is the capital of Gujarat?" ,
        answers: [
            {text:"Ahmedabad", correct: false},
            {text:"Surat", correct: false},
            {text:"Gandhinagar", correct: true},
            {text:"Rajkot", correct: false},
        ]

    },

    {
        question: "What is the capital of India?" ,
        answers: [
            {text:"Mumbai", correct: false},
            {text:"Delhi", correct: true},
            {text:"Kolkata", correct: false},
            {text:"Chennai", correct: false},
        ]

    }
]

const ques = document.querySelector(".Question") ;
const options = document.querySelector(".options") ;
const btn = document.querySelector(".btn") ;

let currIndex = 0 ;
let score = 0 ;

function startQuiz(){
    currIndex =  0;
    score = 0 ;
    btn.innerText  = "Next" ;
    console.log("quiz started") ;
    showQues() ;

}

function showQues(){
    removePrevQues() ;
    btn.innerText = "Next" ;
    let currentQues = questionsList[currIndex] ;
    let index = currIndex + 1 ;
    ques.innerText = index+ ". " + currentQues.question ;

    currentQues.answers.forEach(answer =>{
        const optn = document.createElement('div') ;
        optn.classList.add("option") ;
        optn.innerText = answer.text ;
        options.appendChild(optn) ;
        
        // options.addEventListener('click',()=>{
        //     if(answer.correct === true){
        //         optn.classList.add("active_correct") ;
        //         optn.classList.remove("active_incorrect") ;
        //     }
        //     else{
        //         optn.classList.remove("active_correct") ;
        //         optn.classList.add("active_incorrect") ;
        //     }
        // }); 

        if(answer.correct === true){
            optn.dataset.correct = answer.correct ;
        }
        optn.addEventListener("click",selectOption);
        
    })
}

function selectOption(event){
    const selectedOptn = event.target ;
    const isCorrect = selectedOptn.dataset.correct === 'true' ;
    if(isCorrect){
        selectedOptn.classList.add("active_correct") ;
        score++ ;
        console.log(score) ;
        
    }
    else{
        selectedOptn.classList.add("active_incorrect") ;
    }

    Array.from(options.children).forEach(optn=>{
        if(optn.dataset.correct === "true"){
            optn.classList.add("active_correct") ;
        }
        else{
            optn.classList.add("disable") ;
        }
        
    });
}

function nextQues(){
    currIndex ++ ;
    showQues() ;
}

function removePrevQues(){
    btn.classList.remove("active") ;
    while(options.firstChild){
        options.removeChild(options.firstChild) ;
    }
}

startQuiz() ;


btn.addEventListener("click", ()=>{
    if(currIndex < questionsList.length){
        handleNextBtn() ;
    }
    else {
        currIndex = 0 ;
        showResult() ;
    }
});

function showResult(){
    removePrevQues();
    ques.innerText = `Your Score is ${score} out of ${questionsList.length}.`;
    btn.innerText  = "Play Again" ;
    score = 0 ;
    currIndex--;
}

function handleNextBtn(){
    // currIndex++ ;
    // if(currIndex<questionsList.length){
        console.log(currIndex);
        showQues() ;
    // }
}

