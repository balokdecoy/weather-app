

 $(document).ready(function () {
    $('#submit').click(function (e) { 
        e.preventDefault();
        var cityName = $('#citySearch').val();
        console.log(cityName);
        var apiKey = '31935cf21b5d358b8ba4c4da65b29118';
        var queryURL = 'http://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&units=imperial&appid=' + apiKey;
        $.ajax({
            url: queryURL,
            method: 'GET',
            datatType: 'jsonp',
        }).then(function (response) { 
            clearContents();
            console.log(response);
            // Create div where current conditions will render
            var cityWeather = $("<div class=cityWeather>");
            // Location
            var current = $('<h1>').text(response.name);
            // Temperature
            var temp = $('<p>').text('Temp: ' + response.main.temp + ' \u2109');
            // Weather conditions
            var currWeather = $('<p>').text('Currently: ' + response.weather[0].main);
            // Humidity
            var humidity = $('<p>').text('Humidity: ' + response.main.humidity + "%");
            // Wind Speed
            var windSpeed = $('<p>').text('Wind Speed: ' + response.wind.speed + ' mph');
            // Add data elements to div
            cityWeather.append(current, currWeather, temp, humidity, windSpeed);
            // Add div to html
            $('#todayForecast').append(cityWeather);
         })
    });
 });

 function clearContents() {
     $('#todayForecast').text('');
 }


 // Req for current conditions: 
 // City Name
 // Date
 // Weather icon
 // Temperature
 // humidity
 // wind speed
 // UV index color-coded
 