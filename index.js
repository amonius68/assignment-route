let myHttp = new XMLHttpRequest();
weatherApi('cairo')

document.getElementById('search').addEventListener('input', function(){
  weatherApi(this.value)
});

function weatherApi(weather){
  myHttp.open("GET", `https://api.weatherapi.com/v1/forecast.json?key=cb90132a4ca54686b35161551240512&q=${weather}&days=3`);
  myHttp.responseType = 'json';
  myHttp.send();

myHttp.addEventListener('load', function () {
    if (myHttp.status >= 200 && myHttp.status < 300) {
        displayData(myHttp.response);
    }
});
}

function displayData(data) {
  let forecastDays = data.forecast.forecastday;
  boxData = ""; 
  let weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  for (var i = 0; i < forecastDays.length; i++) {

    var day = forecastDays[i];
      var date = day.date;
      var weekday = weekdays[new Date(date).getDay()];

      boxData += `
      <div class="col-md-4 p-0">
          <div class="card bg-dark text-light">
              <div class="card-body rounded-3">
                  <div class="card-header p-0 d-flex justify-content-between">
                      <h5 class="card-title text-secondary">${weekday}</h5>
                      <h6 class="card-subtitle mb-2 text-secondary">${date}</h6>
                  </div>
                  <h4 class='mt-4'>${data.location.name}</h4>
                  <h2 class="my-3">${day.day.avgtemp_c}°C</h2>
                  <img src="${day.day.condition.icon}" alt="${day.day.condition.text}" width="50" />
                  <p class="mt-3 text-info">${day.day.condition.text}</p>
                  ${ i === 0 ? `<div class="d-flex flex-wrap gap-3 mt-3">
                      <p class="d-flex align-items-center m-0"><i class="bi bi-droplet me-1"></i> ${day.day.avghumidity}%</p>
                      <p class="d-flex align-items-center m-0"><i class="bi bi-wind me-1"></i> ${day.day.maxwind_kph} km/h</p> </div>
                      ` : ""
                    }
              </div>
          </div>
      </div>`;
  }
  document.getElementById("rowData").innerHTML = boxData;
}