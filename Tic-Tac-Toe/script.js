// THIS PROJECT WILL STRENGHTEN DOM MANIPULATION
const boxes = document.querySelectorAll('.box');
const gameInfo = document.querySelector('.game-info') ;
const newGameBtn = document.querySelector('.btn') ;

let currentPlayer;
let gameGrid ;

const winningPosition=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],

];

//let's create a function to initialize the game
/*initializing conditions
    1. Current player is X initially
    2. grid is empty
    3. New Game button is hidden

*/
function initGame(){
    currentPlayer = "X" ;
    gameGrid = ["","","","","","","","",""] ;

    //UI ko bhi empty kro
    boxes.forEach((box,index)=>{
        box.innerText = "" ;

       //wapas se curson:pointer banao
        boxes[index].style.pointerEvents = "all" ;
        
        // //one more thing is missing, initialise box with css properties aqäln
        box.classList = `box box${index+1}` ;


    });

    newGameBtn.classList.remove("active") ;
    gameInfo.innerText = `Current Player - ${currentPlayer}` ;
}   

initGame() ;

boxes.forEach( (box,index) =>{
    box.addEventListener("click", ()=>{
        handleClick(index) ;
    }) ;
}) ;


function handleClick(index){
    if(gameGrid[index] == "") {
        boxes[index].innerText = currentPlayer ; // ye ui me changes karega
        gameGrid[index] = currentPlayer ; // ye hamare code me data hai usme changes karega

        // remove cursor pointer for already filled box...
        boxes[index].style.pointerEvents = "none" ;

        swapTurn() ;
        checkGameOver() ;
    }

}

function swapTurn(){
    if(currentPlayer === "X"){
        currentPlayer = "O" ;
    }
    else{
        currentPlayer = "X" ; 
    }
    
    //update UI
    gameInfo.innerText = `Current Player - ${currentPlayer}` ;
}

newGameBtn.addEventListener('click',initGame)

function checkGameOver(){
    let answer = "";

    winningPosition.forEach((position) => {
        if(gameGrid[position[0]]!== "" || gameGrid[position[1]]!== "" || gameGrid[position[2]]!== "") {
            if(( gameGrid[position[0]] === gameGrid[position[1]] ) && (gameGrid[position[2]] === gameGrid[position[1]]) 
            && (gameGrid[position[2]] === gameGrid[position[0]])){
                if(gameGrid[position[0]] === 'X'){
                    answer="X";
                }
                else{
                    answer = "O" ; 
                }

                boxes.forEach((box)=>{
                    box.style.pointerEvents = "none" ;
                })

                // now as we know the winner lets color them green
                boxes[position[0]].classList.add("win") ;
                boxes[position[1]].classList.add("win") ;
                boxes[position[2]].classList.add("win") ;
            }
        }
    });

    if(answer !== ""){
        gameInfo.innerText = `Winner Player - ${answer}` ;
        newGameBtn.classList.add("active") ;
        return;
    }

    //TIE CASE

    let fillCount = 0 ;
    gameGrid.forEach((box)=>{
        if(box != ""){
            fillCount++ ;
        }
    })
    
    if(fillCount === 9){
        gameInfo.innerText = 'Game Tied !' ;
        newGameBtn.classList.add("active") ;
    }

};

// newGameBtn.classList.add("active") ;
// newGameBtn.addEventListener('click',initGame);

