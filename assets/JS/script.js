


function getWeatherData(data) {
    var openWeatherApiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&exclude=alerts,hourly,minutely,current&appid=6e946ccd39b3086fbf89b034cf7a8b3e"
    fetch(openWeatherApiUrl)
        .then(function(response) {
            return response.json();
        })
        console.log(response);
}
