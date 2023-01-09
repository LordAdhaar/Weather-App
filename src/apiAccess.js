
export async function getCoordinates(){

    try{
        const searchBar = document.getElementById("searchBar");
        let cityName = searchBar.value;

        if(cityName === ""){
            cityName="Dwarka";
        }
        

        let response =  await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=977abd9866a33361f1633cf4f895d67e`);
        let data = await response.json();

        return data;
        
    }
    catch(err){
        alert(err);
    }
    
}

export async function getForecast(lon,lat,units){

    let response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,alerts&units=${units}&appid=20f7632ffc2c022654e4093c6947b4f4`);
    let data = await response.json();
    console.log(data.daily[0].temp);
    return data 
}

export async function getAirQuality(lon,lat,startDT,endDT){
    let response = await fetch(`http://api.openweathermap.org/data/2.5/air_pollution/history?lat=${lat}&lon=${lon}&start=${startDT}&end=${endDT}&appid=977abd9866a33361f1633cf4f895d67e`)
    let data = await response.json();

    return data.list[0].main.aqi
}   

export function timeConverter(UNIX_timestamp){
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = date + ' ' + month + ' ' + year ;
    return time;
  }