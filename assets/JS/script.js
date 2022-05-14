var destinationEL = document.getElementById('destination')
var departureDateEL = document.getElementById('departure-date')
var returnDateEL = document.getElementById('return-date')
var searchEL = document.getElementById('search')


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
   
    $.ajax({
        type:"GET",
        url:"https://app.ticketmaster.com/discovery/v2/events.json?city=" + JSON.parse(destination) + "&apikey=J5c4RhQvGVlW2JcXGoyA62yfl9i1K8iA",
        async:true,
        dataType: "json",
        success: function(json) {
                    console.log(json)
                    // Parse the response.
                    // Do other things.
                 },
        error: function(xhr, status, err) {
                    // This time, we do not end up here!
                 }
      });


}

    