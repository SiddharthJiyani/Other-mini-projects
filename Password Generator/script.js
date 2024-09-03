const inputSlider = document.querySelector("[data-lengthSlider]")  //fetching using custom attribute
const lengthDisplay = document.querySelector("[data-lengthNumber]") ;
const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg]");
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numbersCheck = document.querySelector("#numbers");
const symbolsCheck = document.querySelector("#symbols");
const indicator = document.querySelector("[data-indicator]");
const generateBtn = document.querySelector(".generateBtn");
const allCheckBox = document.querySelectorAll("input[type=checkbox"); //All four check boxes are included here
const symbols = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/';

let password = "";
let passwordLength = 10;
let checkCount = 0 ;
handleSlider();

function handleSlider(){
    inputSlider.value = passwordLength ;
    lengthDisplay.innerText = passwordLength ;
    setIndicator("#ccc") ;
    const min = inputSlider.min;
    const max = inputSlider.max;
    inputSlider.style.backgroundSize =
      ((passwordLength - min) * 100) / (max - min) + "% 100%"; 
}

function setIndicator(color){
    indicator.style.background = color ;
    //also include shadow
    indicator.style.boxShadow = `0px 0px 10px 1px ${color}` ;
}

function getRandInterger(min,max){
   return (Math.floor(Math.random() * (max-min)) + min) ;
}

function generateaRandomNumber(){
    return getRandInterger(0,9) ;
}

function generateLowerCase(){
    // return String.fromCharCode(getRandInterger(97,123)) ;  //🔴🟥❗ interger to char -> to char code
    let int = getRandInterger(97,123) ;
    return String.fromCharCode(int) ;
}

function generateUpperCase(){
    // console.log(String.fromCharCode(getRandInterger(65,91))) ;
    return String.fromCharCode(getRandInterger(65,91)) ;
}

function generateSymbols(){
    const symbolArr = Array.from(symbols);
    let num = getRandInterger(0,symbolArr.length) ;
    return symbolArr[num] ;
}

function calcStrength() {
    let hasUpper = false;
    let hasLower = false;
    let hasNum = false;
    let hasSym = false;
    if (uppercaseCheck.checked) hasUpper = true;
    if (lowercaseCheck.checked) hasLower = true;
    if (numbersCheck.checked) hasNum = true;
    if (symbolsCheck.checked) hasSym = true;

    if (hasUpper && hasLower && (hasNum || hasSym) && passwordLength >= 8) {
        setIndicator("#0f0");
    } else if (
        (hasLower || hasUpper) &&
        (hasNum || hasSym) &&
        passwordLength >= 6
    ) {
        setIndicator("#ff0");
    } else {
        setIndicator("#f00");
    }
}

async function copyContent(){
    try{
        await navigator.clipboard.writeText(passwordDisplay.value) ;
        copyMsg.innerText = 'Copied' ;
    }
    catch(e){
        copyMsg.innerText = 'Failed' ;
    }

    //to make Copied visible
    console.log('displaying password length: '+passwordDisplay.value+'\nLENGTH:'+passwordDisplay.value.length)
    if(passwordDisplay.value.length != 0){
        copyMsg.classList.add("active") ;
    }
    
    setTimeout(() => {
        copyMsg.classList.remove("active") ; 
    }, 2000);
}


inputSlider.addEventListener('input', (e)=>{
    passwordLength = e.target.value;
    handleSlider() ;
})

copyBtn.addEventListener('click',()=>{
    if(passwordDisplay){
        copyContent() ;
    }
    else{
        alert("Generate a password first.");
    }
})

function handleCheckBoxChange(){
    checkCount = 0 ;
    allCheckBox.forEach((checkbox)=>{
        if(checkbox.checked){
            checkCount ++ ;
        }
    })

    //special condition

    if(passwordLength < checkCount){
        passwordLength = checkCount ;
        handleSlider() ;
    }
}

allCheckBox.forEach((checkbox)=>{
    checkbox.addEventListener('change',handleCheckBoxChange) ;
})


generateBtn.addEventListener("click", () => {
    // none of the checkboxes are selected

    if(checkCount<=0) return;

    if(passwordLength < checkCount){
        passwordLength = checkCount ;
        handleSlider() ;
    }

    //lets start the journey to generate password

    //remove password
    password = "" ;

    // if(uppercaseCheck.checked){
    //     password+= generateUpperCase() ;
    // }
    // if(lowercaseCheck.checked){
    //     password+= generateLowerCase() ;
    // }
    // if(numbersCheck.checked){
    //     password+= generateaRandomNumber() ;
    // }
    // if(symbolsCheck.checked){
    //     password+= symbols() ;
    // }

    let funcArr = [] ;

    if(uppercaseCheck.checked){
        funcArr.push(generateUpperCase);
    }
    if(lowercaseCheck.checked){
        funcArr.push(generateLowerCase);
    }
    if(numbersCheck.checked){
        funcArr.push(generateaRandomNumber);
    }
    if(symbolsCheck.checked){
        funcArr.push(generateSymbols);
    }
    
    //compulsary addition

    for(let i=0;i<funcArr.length;i++){
        password+=funcArr[i]() ;
    }

    //remaining password
        console.log(passwordLength-funcArr.length)
    for(let i=0;i<passwordLength-funcArr.length;i++){
        let randIndex = getRandInterger(0,funcArr.length) ;
        // console.log(randIndex);
        password += funcArr[randIndex] (); 
    }

    password = shufflePassword(Array.from(password)) ;

    passwordDisplay.value = password; 

    calcStrength()  ;
})

function shufflePassword(array){
//    Fisher Yates Method
    for (let i = array.length - 1; i > 0; i--) {
       //Get random j using random function 
        const j = Math.floor(Math.random() * (i + 1));

        //for the next three lines swap the indices( i and j )
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    let str = "";
    array.forEach((el) => (str += el));
    return str;   
}