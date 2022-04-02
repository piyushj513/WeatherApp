const app =document.querySelector('.weather-app');
const temp =document.querySelector('.temp');
const dateOutput =document.querySelector('.date');
const timeOutput =document.querySelector('.time');
const conditionOutput =document.querySelector('.condition');
const nameOutput =document.querySelector('.name');
const cloudOutput=document.querySelector('.cloud');
const humidityOutput=document.querySelector('.humidity');
const windOutput=document.querySelector('.wind');
const pressureOutput=document.querySelector('.pressure');
const form = document.getElementById('locationInput');
const search=document.querySelector('.search');
const visibilityOutput=document.querySelector('.vis');
const countryOutput=document.querySelector('.country');
let cityInput="bangalore";
form.addEventListener('submit',(e)=>{
    if(search.value.length==0){
        alert('Enter Valid City Name');
    }
    else{
        cityInput=search.value;
        fetchWeatherdata();
        app.style.opacity="1";
    }
    e.preventDefault();
});

function dayofweek(day,month,year){

    const weekday=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    return weekday[new Date(`${day}/${month}/${year}`).getDay()];
};

function fetchWeatherdata(){
    fetch(`http://api.weatherapi.com/v1/current.json?key=YOURAPIKEY=${cityInput}`)
    .then(response=>response.json())
    .then(data=>{
        console.log(data);
        temp.innerHTML=data.current.temp_c+"&#176;";
        conditionOutput.innerHTML=data.current.condition.text;
        const date=data.location.localtime;
        const y=parseInt(date.substr(0,4));
        const d=parseInt(date.substr(5,2));
        const m=parseInt(date.substr(8,2))
        const time=date.substr(11);

        dateOutput.innerHTML=`${dayofweek(d,m,y)} ${d}/${m}/${y}`;
        timeOutput.innerHTML=time;
        nameOutput.innerHTML=data.location.name;
        cloudOutput.innerHTML=`${data.current.cloud} %`;
        humidityOutput.innerHTML=`${data.current.humidity} %`;
        windOutput.innerHTML=`${data.current.wind_kph} km/h`;
        pressureOutput.innerHTML=`${data.current.pressure_mb} mbar`;
        visibilityOutput.innerHTML=`${data.current.vis_km} km`;
        countryOutput.innerHTML=`${data.location.country}`;
    })
.catch(()=>{
    alert('city not found');
});
}
fetchWeatherdata();