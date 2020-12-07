function showWeather(response){
    let cityElement= document.querySelector(".city");
    let dateElement=document.querySelector("#date");
    let descriptionElement=document.querySelector(".description-weather");
    let emojiElement=document.querySelector("#icon");
    let windSpeed=document.querySelector("#windSpeed");
    let humidity=document.querySelector("#humidity");
    let temperatureElement=document.querySelector(".currentTemperature")
    let code=response.data.weather[0].icon;

    celciusTemperature=response.data.main.temp;
    
    cityElement.innerHTML=response.data.name;
    dateElement.innerHTML=formatDate(response.data.dt*1000); 
    descriptionElement.innerHTML=response.data.weather[0].description;
    windSpeed.innerHTML=Math.round(response.data.wind.speed);
    humidity.innerHTML=response.data.main.humidity;
    temperatureElement.innerHTML=Math.round(response.data.main.temp);
    emojiElement.setAttribute("src",`https://openweathermap.org/img/wn/${code}@2x.png`);

}

function formatDate(timestamp){
    let date= new Date(timestamp);
    
    let days=["Sunday","Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
     day=days[date.getDay()]; 
    return `${day} ${formatHours(timestamp)}`;
   
}

function formatHours(timestamp){
    let date= new Date(timestamp);
    let hours=date.getHours();
    if(hours<10){
        hours=`0${hours}`;
    }
    
    let minutes=date.getMinutes();
    if (minutes<10){
        minutes=`0${minutes}`;
    }
    return `${hours} : ${minutes}`;

}

function showForecast(response){
console.log(response.data);
let forecastElement=document.querySelector(".weather-forecast");
forecastElement.innerHTML=null;
let forecast= null;

for (let index = 0; index <= 5; index++) {
    forecast=response.data.list[index];
    forecastElement.innerHTML +=`
       <div class="col-4 hours">${formatHours(forecast.dt*1000)}</div>
        <div class="col-4 emoji-per-hour"> 
        <img 
        src="https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png" width="80" alt="">
        </div>
        <div class="col-4 temperature-max-min"> ${Math.round(forecast.main.temp_max)}ºC/${Math.round(forecast.main.temp_min)}ºC </div>`

}
}


function searchCity(city){

let apiKey= "bf3b0a962c0f2c5a4bea4daa33ad2c1d"
let apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(showWeather);

apiUrl=`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(showForecast);
}


function displayNewCity(event){
    event.preventDefault();
    let cityElement= document.querySelector("#city-element");
    let newCity= document.querySelector("#city-new");
    cityElement.innerHTML=newCity.value;
    
    searchCity(newCity.value);
}


let cityInput= document.querySelector("#city-input");
cityInput.addEventListener("submit", displayNewCity);


function convertToFahrenheid(event){
    event.preventDefault();
    let fahrenheidTemperature=  (celciusTemperature*9/5)+32;
    let temperatureElement= document.querySelector(".currentTemperature");
    temperatureElement.innerHTML= Math.round(fahrenheidTemperature);   
    celciusUnits.classList.remove("active");
    fahrenheidUnits.classList.add("active");
}

function convertToCelcius(event){
    event.preventDefault();
    let temperatureElement= document.querySelector(".currentTemperature");
    temperatureElement.innerHTML= Math.round(celciusTemperature);
    fahrenheidUnits.classList.remove("active");
    celciusUnits.classList.add("active");
}

let fahrenheidUnits=document.querySelector("#fahrenheidUnits");
fahrenheidUnits.addEventListener("click", convertToFahrenheid);

let celciusUnits=document.querySelector("#celciusUnits");
celciusUnits.addEventListener("click", convertToCelcius);

let celciusTemperature=null;

searchCity("Amsterdam");