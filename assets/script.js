

 $(document).ready(function () {
    $('#submit').click(function (e) { 
        e.preventDefault();
        var cityName = $('#citySearch').val();
        console.log(cityName);
        var apiKey = '31935cf21b5d358b8ba4c4da65b29118';
        var queryURL = 'http://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&appid=' + apiKey;
        $.ajax({
            url: queryURL,
            method: 'GET',
            datatType: 'jsonp',
        }).then(function (response) { 
            console.log(response);
            var cityWeather = $("<div class=cityWeather>");
            var current = $('<p>').text(response.name);
            var currWeather = $('<p>').text('Currently: ' + response.weather[0].main);
            cityWeather.append(current, currWeather);
            $('#todayForecast').append(cityWeather);
         })
    });
 });


 // Req for current conditions: 
 // City Name
 // Date
 // Weather icon
 // Temperature
 // humidity
 // wind speed
 // UV index color-coded
 