var destinationEL = document.getElementById("destination");
var departureDateEL = document.getElementById("departure-date");
var returnDateEL = document.getElementById("return-date");
var searchEL = document.getElementById("search");

var destinationWeatherEl = document.getElementById("destinationWeather");

document.getElementById("search").onclick = function () {
  var hotelimg0 = document.getElementById("hotel-img0");
  hotelimg0.classList.remove("hidden");

  var hotelimg1 = document.getElementById("hotel-img1");
  hotelimg1.classList.remove("hidden");

  var hotelimg2 = document.getElementById("hotel-img2");
  hotelimg2.classList.remove("hidden");

  let destination = JSON.stringify(destinationEL.value);
  localStorage.setItem("destination", destination);
  JSON.parse(localStorage.getItem(destinationEL));

  let departureDate = JSON.stringify(departureDateEL.value);
  localStorage.setItem("departure", JSON.stringify(departureDate));
  JSON.parse(localStorage.getItem(departureDateEL));

  let returnDate = JSON.stringify(returnDateEL.value);
  localStorage.setItem("return", JSON.stringify(returnDate));
  JSON.parse(localStorage.getItem(returnDateEL));

  $.ajax({
    type: "GET",
    url:
      "https://app.ticketmaster.com/discovery/v2/events.json?city=" +
      JSON.parse(destination) +
      "&apikey=J5c4RhQvGVlW2JcXGoyA62yfl9i1K8iA",
    async: true,
    dataType: "json",
    success: function (json) {
      var event0Name = json._embedded.events[0].name;
      $(".event-0-p").empty().append(event0Name);

      var event0Img = json._embedded.events[0].images[1].url;
      $(".event-icon-0").attr("src", event0Img);

      var event1Name = json._embedded.events[1].name;
      $(".event-1-p").empty().append(event1Name);

      var event1Img = json._embedded.events[1].images[1].url;
      $(".event-icon-1").attr("src", event1Img);

      var event2Name = json._embedded.events[2].name;
      $(".event-2-p").empty().append(event2Name);

      var event2Img = json._embedded.events[2].images[1].url;
      $(".event-icon-2").attr("src", event2Img);

      var event3Name = json._embedded.events[3].name;
      $(".event-3-p").empty().append(event3Name);

      var event3Img = json._embedded.events[3].images[1].url;
      $(".event-icon-3").attr("src", event3Img);

      var event4Name = json._embedded.events[4].name;
      $(".event-4-p").empty().append(event4Name);

      var event4Img = json._embedded.events[4].images[1].url;
      $(".event-icon-4").attr("src", event4Img);
    },
    error: function (xhr, status, err) {},
  });

  getWeather();
  getHotel();

  function getHotel() {
    const settings = {
      async: true,
      crossDomain: true,
      url:
        "https://hotels4.p.rapidapi.com/locations/v2/search?query=" +
        JSON.parse(destination) +
        "&locale=en_US&currency=USD",
      method: "GET",
      headers: {
        "X-RapidAPI-Host": "hotels4.p.rapidapi.com",
        "X-RapidAPI-Key": "43e3cea897mshaf5e8ec447a1b95p1e808ejsnd737bd0023d6",
      },
    };

    $.ajax(settings).done(function (response) {
      console.log(response);
      const hotelsGroup = response.suggestions.filter(
        (suggestion) => suggestion.group == "HOTEL_GROUP"
      );
      const hotels = hotelsGroup[0].entities;
      let htmlString = "";
      let index = 0;
      for (const hotel of hotels) {
        if (index > 4) {
          break;
        }
        htmlString += `<div class="max-w-sm rounded bg-white overflow-hidden shadow-lg">
        <img class="w-full" id="hotel-img0" src="./assets/IMG/hotel-room.jpeg">
        <div class="px-6 py-4">
          <div class="font-bold text-xl mb-2"></div>
          <p class="text-gray-700 text-base hotel-name-${index}">
          ${hotel.name}
          </p>
          <p class="text-gray-700 text-base hotel-airport-0">
          </p>
          <p class="text-gray-700 text-base hotel-landmark-0">
          </p>
      </div>`;
        index++;
      }
      document.getElementById("hotels").innerHTML = htmlString;

      const landMarkGroup = response.suggestions.filter(
        (suggestion) => suggestion.group == "LANDMARK_GROUP"
      );
      const landMarks = landMarkGroup[0].entities;
      htmlString = "";
      index = 0;

      for (const landMark of landMarks) {
        if (index > 2) {
          break;
        }
      }

      //   var transportGroup = response.suggestions.filter(
      //     (suggestion) => suggestion.group == "TRANSPORT_GROUP"
      //   );
      //   var transportGroup = transportGroup[0].entities;
      //   htmlString = "";
      //   index = 0;

      //   for (var transport of transport) {
      //     if (index > 2) {
      //       break;
      //     }
      //   }

      // This is where you'll append the fetched API data to the HTML. Use the code for the events API and the weather API as reference.
      // There are three data points in the HTML; the hotel name, hotel location, and attractions near the hotel (this is named "landmark" in the returned data from the API).
      // You can add more if you'd like, but these three can be a basis for the information in the card.
      // When a location is input into the webpage, the API results will be logged. Use that as a reference for when you're appending data to the HTML.
    });
  }

  function getWeather() {
    var requestUrl =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      destinationEL.value +
      "&appid=6e946ccd39b3086fbf89b034cf7a8b3e";

    fetch(requestUrl).then(function (response) {
      response.json().then(function (data) {
        var forecastUrl =
          "https://api.openweathermap.org/data/2.5/onecall?lat=" +
          data.coord.lat +
          "&lon=" +
          data.coord.lon +
          "&exclude=current,hourly,minutely,alerts&appid=6e946ccd39b3086fbf89b034cf7a8b3e";

        fetch(forecastUrl).then(function (response) {
          response.json().then(function (data) {
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
              forecastDateEl.innerHTML =
                forecastMonth + "/" + forecastDay + "/" + forecastYear;
              forecastEls[i].append(forecastDateEl);

              var forecastWeatherEl = document.createElement("img");
              forecastWeatherEl.setAttribute(
                "src",
                "https://openweathermap.org/img/wn/" +
                  data.daily[i].weather[0].icon +
                  "@2x.png"
              );
              forecastWeatherEl.setAttribute(
                "alt",
                data.daily[i].weather[0].description
              );
              forecastEls[i].append(forecastWeatherEl);

              var forecastTempEl = document.createElement("p");
              forecastTempEl.innerHTML =
                "Temp: " + k2f(data.daily[i].temp.day) + "°";
              forecastEls[i].append(forecastTempEl);

              var forecastHumidityEl = document.createElement("p");
              forecastHumidityEl.innerHTML =
                "Humidity: " + data.daily[i].humidity + "%";
              forecastEls[i].append(forecastHumidityEl);
            }
          });
        });
      });
    });
  }

  function k2f(K) {
    return Math.floor((K - 273.15) * 1.8 + 32);
  }
};