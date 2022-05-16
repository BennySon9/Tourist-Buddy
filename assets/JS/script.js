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

   
    $.ajax({
        type:"GET",
        url:"https://app.ticketmaster.com/discovery/v2/events.json?city=" + JSON.parse(destination) + "&apikey=J5c4RhQvGVlW2JcXGoyA62yfl9i1K8iA",
        async:true,
        dataType: "json",
        success: function(json) {


            var event0Name = json._embedded.events[0].name
            $('.event-0-p').empty().append(event0Name)

            var event0Img = json._embedded.events[0].images[1].url
            $(".event-icon-0").attr("src", event0Img)

            var event1Name = json._embedded.events[1].name
            $('.event-1-p').empty().append(event1Name)

            var event1Img = json._embedded.events[1].images[1].url
            $(".event-icon-1").attr("src", event1Img)

            var event2Name = json._embedded.events[2].name
            $('.event-2-p').empty().append(event2Name)

            var event2Img = json._embedded.events[2].images[1].url
            $(".event-icon-2").attr("src", event2Img)

            var event3Name = json._embedded.events[3].name
            $('.event-3-p').empty().append(event3Name)

            var event3Img = json._embedded.events[3].images[1].url
            $(".event-icon-3").attr("src", event3Img)

            var event4Name = json._embedded.events[4].name
            $('.event-4-p').empty().append(event4Name)

            var event4Img = json._embedded.events[4].images[1].url
            $(".event-icon-4").attr("src", event4Img)
        
            console.log(json)
            
            // Parse the response.
            // Do other things.
         },
error: function(xhr, status, err) {
            // This time, we do not end up here!
         }
});
    
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
