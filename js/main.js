getLocation()
async function city(city) {
    let response = await (await fetch(`https://api.weatherapi.com/v1/forecast.json?key=94ca54375e1c4d7cb8e204718241412&q=${city}&days=3`)).json()
    console.log(response);
    displayData(response)
    displayDataNext(response.forecast.forecastday)
}
let x =document.getElementById("inputS")
function get(){
    let text =x.value;
    console.log(text);
city(text )
}

let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
function displayData(allData){
    let container="";
let newDate = new Date(allData.current.last_updated)
container+=`
    <div  class="col-md-4 main-color p-0 mt-3 rounded-2 ">
<div>
    <div class="d-flex justify-content-between rounded-1 card-header p-1  bg-secondary ">
        <span>${days[newDate.getDay()]}</span>
        <span>${newDate.getDate()} ${monthNames[newDate.getMonth()]}</span>
    </div>
    <div class="my-card-body  ">
<span class="ms-4 d-inline-block py-3">${allData.location.name}</span>
<div class=" text-center my-font-size fw-bolder">  ${allData.current.temp_c}
<sup>o</sup>
c
</div>
<img src="${allData.current.condition.icon}" alt="" class="w-25 ms-4">
<span class="d-block text-info ms-4">${allData.current.condition.text}</span>
<div class="icons fs-6 d-flex justify-content-around my-4 " >
<i class="fa-solid fa-umbrella">${allData.current.humidity}%</i>
<i class="fa-solid fa-wind">${allData.current.wind_kph}Km/h</i>
<i class="fa-regular fa-compass">${allData.current.wind_dir}</i>
</div>
    </div>
</div>
    </div>
`
    document.getElementById("data").innerHTML=container
}
function displayDataNext(allData) {
    let containerTwo = "";
    for (let i = 1; i < allData.length; i++) {
        let dayDate = new Date(allData[i].date);

        let customBackground = i % 2 == 0 ? "main-color" : "bg-secondary";
        let customBackgroundTwo = i % 2 == 0 ? "bg-secondary" : "main-color";

        containerTwo += `
        <div style="min-height: 400px;" class="col-md-4 ${customBackground} p-0  rounded-2 mt-3">
          <div class="inner">
    <div class="d-flex justify-content-center align-items-center rounded-1 card-header p-1 ${customBackgroundTwo}">
        <span>${days[dayDate.getDay()]}</span>
    </div>
    <div class="my-card-body  d-flex flex-column justify-align-align-content-between align-items-center  h-100">
        <img src="${allData[i].day.condition.icon}" alt="" class="w-25">
        <div class="fs-1">${allData[i].day.maxtemp_c}<sup>o</sup>c</div>
        <div class="fs-6">${allData[i].day.mintemp_c}<sup>o</sup></div>
        <span class="d-block text-info">${allData[i].day.condition.text}</span>
        <div class="icons fs-6 d-flex gap-5 my-4" >
<i class="fa-solid fa-umbrella">${allData[i].day.avghumidity}%</i>
<i class="fa-solid fa-wind">${allData[i].day.maxwind_kph} Km/h</i>
<i class="fa-regular fa-compass">${allData[i].day.avgvis_km} </i>
</div>
    </div>
</div>
       </div>
        `;
    }
    document.getElementById("data").innerHTML += containerTwo;
}
async function getLocationData(lat , lon) {
    try {
      let response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=94ca54375e1c4d7cb8e204718241412&q=${lat},${lon}&days=3`);
      if(response.ok){
        let data = await response.json();
        displayData(data)
        displayDataNext(data.forecast.forecastday)
      }
    } catch (error) {
      console.log(error);
    }
  }
  
function getLocation(){

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
  
        function (position) {
  
          let lat = position.coords.latitude;
          let lon = position.coords.longitude;
  
          getLocationData(lat , lon);
        },
        function (error) {
          console.log( error);
  
          city("cairo");
          
         
        }
      );
    }
  
  }
  