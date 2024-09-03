const userTab = document.querySelector('[data-userWeather]');
const searchTab = document.querySelector('[data-searchWeather]');
const userContainer = document.querySelector('.weather-container');
const grantAccessContainer = document.querySelector('.grant-location-container')
const searchForm = document.querySelector('[data-searchForm]');
const loadingScreen = document.querySelector('.loading-container');
const userInfoContainer = document.querySelector('.user-info-container');



let currentTab = userTab;
const API_KEY = "466a79210e42bd837142a83f7aee4dbf" ;
currentTab.classList.add("current-tab");
getfromSessionStorage() ;

function switchTab(clickedTab){
    if(currentTab != clickedTab){
        currentTab.classList.remove("current-tab");
        currentTab = clickedTab;
        currentTab.classList.add("current-tab") ;
    

        if(!searchForm.classList.contains("active")){  // agar search form abhi screen pe visible(hidden hai) nhi hai to...
            userInfoContainer.classList.remove("active");
            grantAccessContainer.classList.remove("active");
            errorContainer.classList.remove("active");
            searchForm.classList.add("active");
        }
        else{  // you are already on searchform tab and now need to go in Your Weather tab

            searchForm.classList.remove("active");
            getfromSessionStorage() ;
            errorContainer.classList.remove("active");
            userInfoContainer.classList.remove("active") ;
            //ab main your weather tab me aagya hu, toh weather bhi display karna poadega, so let's check local storage first
            // for coordinates, if we haved saved them there.
        }
    }
}

userTab.addEventListener("click",()=>{
    //passes clicked tab as input parameter : jaha click kia waha chale jao
    switchTab(userTab);
})

searchTab.addEventListener("click",()=>{
    switchTab(searchTab) ;
});

//check if we have coordinates of user
function getfromSessionStorage(){
    const localCoordinates = sessionStorage.getItem("user-coordinates") ;
    console.log("local: "+localCoordinates);
    if( !localCoordinates ) { // iska matlab user ne apni location ka access nhi dia hai to grant location wali screen dikkani padegi.  
        // loadingScreen.classList.remove("active") ;
        grantAccessContainer.classList.add("active") ;
        // errorContainer.classList.remove("active");
    }
    else{
        const coordinates = JSON.parse(localCoordinates) ; //json.parse converts json string into json object. thats it
        console.log(coordinates);
        fetchUserWeatherInfo(coordinates) ;
    }
}


async function fetchUserWeatherInfo(coordinates) {
    const {lat,lon} = coordinates;
    // alert('Ye rahi coordinates ki value: ',coordinates+'\n aur ye rhe lat nd lon ki val: ',lat,lon) ;
    grantAccessContainer.classList.remove("active") ;
    loadingScreen.classList.add("active") ;
    
    //API CALL
    try{
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
            ) ;
        const data = await response.json();

        loadingScreen.classList.remove("active"); 
        errorContainer.classList.remove("active");
        userInfoContainer.classList.add("active") ;
        renderWeatherInfo(data);
    }
        
        catch(e){
            loadingScreen.classList.remove("active");
            alert("\n May be internal error\n Please try refreshing the page.") ;
        }
}
    
    
const errorContainer = document.querySelector(".Error");
function renderWeatherInfo(weatherInfo){
    const cityName = document.querySelector('[data-cityName]');
    const CountryIcon = document.querySelector('[data-countryIcon]') ;
    const desc  = document.querySelector('[data-weatehrDesc]') ;
    const weatherIcon = document.querySelector('[data-weatherIcon]') ;
    const temp = document.querySelector('[data-temp]') ;
    const humidity = document.querySelector('[data-humidity]');
    const windspeed = document.querySelector('[data-windspeed]');
    const cloudiness = document.querySelector('[data-cloudiness]');
    
    // fetch values from weatherInfo object and put it UI elements
    
    cityName.innerText =  weatherInfo?.name;
    CountryIcon.src = `https://flagcdn.com/144x108/${weatherInfo?.sys?.country.toLowerCase()}.png`;
    desc.innerText = `${weatherInfo?.weather?.[0]?.description}`;
    weatherIcon.src = `http://openweathermap.org/img/w/${weatherInfo?.weather?.[0]?.icon}.png`;
    temp.innerText = `${weatherInfo?.main?.temp.toFixed(2)} °C`;  //why toFixed(2) ?? 
    windspeed.innerText = `${weatherInfo?.wind?.speed.toFixed(2)}m/s`;
    humidity.innerText = `${weatherInfo?.main?.humidity}%`;
    cloudiness.innerText = `${weatherInfo?.clouds?.all}%`;

    if(cityName.innerText === 'undefined'){
        // alert("Error 404!");
        userInfoContainer.classList.remove("active") ;
        errorContainer.classList.add("active");
    }
    else
        errorContainer.classList.remove("active");

}


function getLocation(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showPosition);
    }
    else{
        alert('Geolocation is not supported by this browser.');
    }
}


function showPosition(position){
    const userCoordinates = {
        lat: position.coords.latitude,
        lon: position.coords.longitude,
    };
    console.log('longitute: '+position.coords.longitude, 'latitude:'+position.coords.latitude);
    sessionStorage.setItem("user-coordinates", JSON.stringify(userCoordinates));
    fetchUserWeatherInfo(userCoordinates) ;

}

const grantAccessButton = document.querySelector('[data-grantAccess]') ;
grantAccessButton.addEventListener("click", getLocation) ;


const searchInput = document.querySelector('[data-searchInput]') ;
searchForm.addEventListener("submit",(e)=>{
    e.preventDefault() ;
    if(searchInput.value === "") return ;
    else{
        fetchSearchWeatherInfo(searchInput.value) ;
    }

})

async function fetchSearchWeatherInfo(city){
    loadingScreen.classList.add("active"); 
    // errorContainer.classList.remove("active");
    userInfoContainer.classList.remove("active");
    grantAccessContainer.classList.remove("active") ;
    
    try{
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
            );
            const data = await response.json();
            loadingScreen.classList.remove("active");
            errorContainer.classList.remove("active");
            userInfoContainer.classList.add("active"); 
            renderWeatherInfo(data) ;

    }

    catch(e){
        alert("Error !!") ;
    }   

}

