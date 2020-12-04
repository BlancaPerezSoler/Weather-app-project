function showWeather(response){
    console.log(response.data);
    let cityElement= document.querySelector(".city");
    let dateElement=document.querySelector("#date");
    let descriptionElement=document.querySelector(".description-weather");
    let emojiElement=document.querySelector("#icon");
    let windSpeed=document.querySelector("#windSpeed");
    let humidity=document.querySelector("#humidity");
    let temperatureElement=document.querySelector(".currentTemperature")
    let code=response.data.weather[0].icon;
    
    cityElement.innerHTML=response.data.name;
    dateElement.innerHTML=formatDate(response.data.dt*1000); 
    descriptionElement.innerHTML=response.data.weather[0].description;
    windSpeed.innerHTML=Math.round(response.data.wind.speed);
    humidity.innerHTML=response.data.main.humidity;
    temperatureElement.innerHTML=Math.round(response.data.main.temp);
    emojiElement.getAttribute("src",`https://openweathermap.org/img/wn/${code}@2x.png`);

}

function formatDate(timestrap){
    let date= new Date(timestrap);
    let hours=date.getHours();
    if(hours<10){
        hours=`0${hours}`;
    }
    
    let minutes=date.getMinutes();
    if (minutes<10){
        minutes=`0${minutes}`;
    }
    let days=["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
     day=days[date.getDay()]; 
    return `${day} ${hours} : ${minutes}`
   
}


let apiKey= "bf3b0a962c0f2c5a4bea4daa33ad2c1d"
let city="Amsterdam"
let apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(showWeather);
