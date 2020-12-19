// Set date
var currentDate = dayjs().format('MM/DD/YYYY');

 $(document).ready(function () {
    $('#submit').click(function (e) { 
        e.preventDefault();
        var cityName = $('#citySearch').val();
        console.log(cityName);
        var apiKey = '31935cf21b5d358b8ba4c4da65b29118';
        var queryURL = 'http://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&units=imperial&appid=' + apiKey;
        // Call local weather data
        $.ajax({
            url: queryURL,
            method: 'GET',
            datatType: 'jsonp',
        }).then(function (response) { 
            clearContents();
            console.log(response);
            // Create div where current conditions will render
            var cityWeather = $("<div class=cityWeather>");
            // Weather image
            var imgWeather = $('<img src="http://openweathermap.org/img/wn/' + response.weather[0].icon + '@2x.png" alt="weather icon">');
            // Location
            var current = $('<h1>').text(response.name + " " + "(" + currentDate + ") ");
            // Temperature
            var temp = $('<p>').text('Temp: ' + response.main.temp + ' \u2109');
            // Weather conditions
            var currWeather = $('<p>').text('Currently: ' + response.weather[0].main);
            // Humidity
            var humidity = $('<p>').text('Humidity: ' + response.main.humidity + "%");
            // Wind Speed
            var windSpeed = $('<p>').text('Wind Speed: ' + response.wind.speed + ' mph');
            // Set longitude
            var long = response.coord.lon;
            // Set latitude
            var lat = response.coord.lat;
            // Define UV Index URL
            var uvQuery = 'http://api.openweathermap.org/data/2.5/uvi?lat=' + lat + '&lon=' + long + '&appid=' + apiKey;
            // Call UV Index API
            $.ajax({
                url: uvQuery,
                method: 'GET',
                datatType: 'jsonp',
            }).then(function(data) {
                console.log(data);
                var currentUV = $('<span id="UV">UV Index: ' + data.value + '</span>');
                cityWeather.append(currentUV);
            })


            // Add data elements to div
            cityWeather.append(current, imgWeather, currWeather, temp, humidity, windSpeed,);
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
 