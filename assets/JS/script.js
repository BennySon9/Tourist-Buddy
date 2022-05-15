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

                var eventNumber = json._embedded.events.length
                console.log(eventNumber)
                var eventDate = json._embedded.events[0].dates.start.localDate
                console.log(eventDate)

                if(JSON.parse(departureDate) <= eventDate){
                    var event0Name = json._embedded.events[0].name
                    $('.event-0-p').append(event0Name)

                    var event0Img = json._embedded.events[0].images[1].url
                    $(".event-icon-0").attr("src", event0Img)
    
                    var event1Name = json._embedded.events[1].name
                    $('.event-1-p').append(event1Name)

                    var event1Img = json._embedded.events[1].images[1].url
                    $(".event-icon-1").attr("src", event1Img)

                    var event2Name = json._embedded.events[2].name
                    $('.event-2-p').append(event2Name)

                    var event2Img = json._embedded.events[2].images[1].url
                    $(".event-icon-2").attr("src", event2Img)

                    var event3Name = json._embedded.events[3].name
                    $('.event-3-p').append(event3Name)

                    var event3Img = json._embedded.events[3].images[1].url
                    $(".event-icon-3").attr("src", event3Img)

                    var event4Name = json._embedded.events[4].name
                    $('.event-4-p').append(event4Name)

                    var event4Img = json._embedded.events[4].images[1].url
                    $(".event-icon-4").attr("src", event4Img)
                } else{
                  
                }
                
                    console.log(json)
                    
                    // Parse the response.
                    // Do other things.
                 },
        error: function(xhr, status, err) {
                    // This time, we do not end up here!
                 }
      });


}

    