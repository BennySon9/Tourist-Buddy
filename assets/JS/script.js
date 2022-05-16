var destinationEL = document.getElementById('destination')
var departureDateEL = document.getElementById('departure-date')
var returnDateEL = document.getElementById('return-date')
var searchEL = document.getElementById('search')

var destinationWeatherEl = document.getElementById("destinationWeather")

document.getElementById('search').onclick = function(){

    let destination = JSON.stringify(destinationEL.value)
    localStorage.setItem("destination", destination)
    JSON.parse(localStorage.getItem(destinationEL))

    let departureDate = JSON.stringify(departureDateEL.value)
    localStorage.setItem("departure", JSON.stringify(departureDate))
    JSON.parse(localStorage.getItem(departureDateEL))

    let returnDate = JSON.stringify(returnDateEL.value)
    localStorage.setItem("return", JSON.stringify(returnDate))
    JSON.parse(localStorage.getItem(returnDateEL))

    console.log(localStorage)
    
    getWeather();
}

function getWeather() {
    var requestUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + destinationEL.value + "&appid=6e946ccd39b3086fbf89b034cf7a8b3e";

    fetch(requestUrl).then(function(response) {
        response.json().then(function(data) {
        var forecastUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + data.coord.lat + "&lon=" + data.coord.lon + "&exclude=current,hourly,minutely,alerts&appid=6e946ccd39b3086fbf89b034cf7a8b3e";

        fetch(forecastUrl).then(function(response) {
            response.json().then(function(data) {
                var forecastEls = document.querySelectorAll(".forecast");
                for (i = 0; i < forecastEls.length; i++) {
                    forecastEls[i].innerHTML = "";
                    forecastEls[i].classList.add("border-2", "border-black");

                    var forecastDate = new Date(data.daily[i].dt * 1000);
                    var forecastDay = forecastDate.getDate();
                    var forecastMonth = forecastDate.getMonth() + 1;
                    var forecastYear = forecastDate.getFullYear();
                    var forecastDateEl = document.createElement("p");
                    forecastDateEl.setAttribute("class", "forecast-date");
                    forecastDateEl.innerHTML = forecastMonth + "/" + forecastDay + "/" + forecastYear;
                    forecastEls[i].append(forecastDateEl);

                    var forecastWeatherEl = document.createElement("img");
                    forecastWeatherEl.setAttribute("src", "https://openweathermap.org/img/wn/" + data.daily[i].weather[0].icon + "@2x.png");
                    forecastWeatherEl.setAttribute("alt", data.daily[i].weather[0].description);
                    forecastEls[i].append(forecastWeatherEl);

                    var forecastTempEl = document.createElement("p");
                    forecastTempEl.innerHTML = "Temp: " + k2f(data.daily[i].temp.day) + "°";
                    forecastEls[i].append(forecastTempEl);

                    var forecastHumidityEl = document.createElement("p");
                    forecastHumidityEl.innerHTML = "Humidity: " + data.daily[i].humidity + "%";
                    forecastEls[i].append(forecastHumidityEl);
                }
            });
            })
        });
    })
}

function k2f(K) {
    return Math.floor((K - 273.15) * 1.8 + 32);
}