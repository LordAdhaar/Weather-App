import { get, max, set } from "lodash";
import {getCoordinates,getForecast,getAirQuality, timeConverter} from "./apiAccess.js";

const description = document.getElementById("description");
const place = document.getElementById("place");
const date = document.getElementById("date");
const time = document.getElementById("time");
const currTemp = document.getElementById("currTemp");
const feelsLike = document.querySelector("div#feelsLike>h1");
const humidity = document.querySelector("div#humidity>h1");
const rain = document.querySelector("div#rain>h1");
const wind = document.querySelector("div#wind>h1");
const aqiData = document.querySelector("div#aqi>h1");
let tempUnit = "°C";
let windUnit = "km/h";
const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]

let units = "metric";

export async function setWeatherDetails(){

    try{    
        let data = await getCoordinates();
    
        console.log(data)
        
        if(this.id==="metric"){
            units = "metric";
            tempUnit = "°C";
            windUnit = "km/h";
        }
        else if(this.id==="imperial"){
            units="imperial";
            tempUnit = "°F";
            windUnit = "mph";
        }

        let foreCastData = await getForecast(data.coord.lon,data.coord.lat,units);
        let aqi = await getAirQuality(data.coord.lon,data.coord.lat,data.sys.sunrise,data.sys.sunset);
        console.log(foreCastData);
        console.log(foreCastData.daily[0].temp);

        setGeneralDetails(foreCastData,data,aqi);
        setDaily(foreCastData);
    }
    catch(err){
        alert(err);
        console.log(err);
    }
    
    
}

function setGeneralDetails(foreCastData,data,aqi){

    //get todayDate 
    let todayDate = new Date(timeConverter(data.dt));
    
    //set generalDescription
    description.textContent = foreCastData.current.weather[0].description;
    place.textContent = data.name;
    date.textContent = weekday[todayDate.getDay()] + ", " + timeConverter(data.dt);
    currTemp.textContent = Math.round(foreCastData.current.temp) +  " "+tempUnit ;

    //set specifics
    feelsLike.textContent = Math.round(foreCastData.current.feels_like)+ " " + tempUnit;
    humidity.textContent = foreCastData.current.humidity + " %"; 
    rain.textContent = foreCastData.daily[0].pop*100+" %";
    wind.textContent = Math.round(foreCastData.current.wind_speed * 10) / 10 + " " + windUnit;

    //set AQI
    if(aqi===1){
        aqiData.textContent = "Good";
    }
    else if(aqi===2){
        aqiData.textContent = "Fair";
    }
    else if(aqi===3){
        aqiData.textContent = "Moderate";
    }
    else if(aqi===4){
        aqiData.textContent = "Poor";

    }
    else{
        aqiData.textContent = "Very Poor";
    }

}

function setDaily(foreCastData){
    console.log(foreCastData);
    const daily = document.getElementById("daily");
    console.log(typeof daily)

    for(let i = 1 ; i<=7 ; i++){

        let dayHTML = document.getElementById(`${i}`);
        let dayNameHTML = dayHTML.children[0];
        let maxTempHTML = dayHTML.children[1];
        let minTempHTML = dayHTML.children[2];

        let dayOf = new Date(timeConverter(foreCastData.daily[i].dt))
        let dayName = weekday[dayOf.getDay()];

        dayNameHTML.textContent = dayName;
        maxTempHTML.textContent = foreCastData.daily[i].temp.max + " " + tempUnit;
        minTempHTML.textContent = foreCastData.daily[i].temp.min + " " + tempUnit;

        console.log(dayName);
        console.log(dayHTML);
    }

}
