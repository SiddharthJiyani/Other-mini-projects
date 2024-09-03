const API_KEY = "466a79210e42bd837142a83f7aee4dbf" ;
let city ="goa";

//good practice to make this render funtion
function renderdData(data){
    let newPara = document.createElement('p') ;
    newPara.textContent =  `${data?.main?.temp.toFixed(2)} °C`;
    document.body.appendChild(newPara);
}

async function showWeather(){

    try{
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`) ;
        const data = await response.json() ;  //convert response from api info json format
        console.log(data) ;

        renderdData(data) ;
    }

    catch(e){
        alert('No data available!');
    }
}


// to access your current location we use geolocation


function getLocation(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showPosition);
    }
    else{
        alert('Geolocation is not supported by this browser.');
    }
}

function showPosition(position){
    console.log('Lat:',position.coords.latitude, '\nLongi:',position.coords.longitude ) ;
}