// Set date
var currentDate = dayjs().format('MM/DD/YYYY');

// Set API key 
var apiKey = '31935cf21b5d358b8ba4c4da65b29118';

// Div where current conditions will render
var cityWeather = $("<div class=cityWeather>");

$(document).ready(function () {
    // var prevCity = localStorage.getItem('city');
    // console.log(prevCity);
    // getLocalWeather(prevCity);
    $('#submit').click(function (e) { 
        e.preventDefault();
        $('.card').attr('style', 'visibility: visible');
        var cityName = $('#citySearch').val();
        getLocalWeather(cityName);
    });

    function getLocalWeather(cityName) {
        clearContents();
        var queryURL = 'https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&units=imperial&appid=' + apiKey;
        
        // Call local weather data
        $.ajax({
            url: queryURL,
            method: 'GET',
            datatType: 'jsonp',
        }).then(function (response) { 
            clearContents();
            console.log(response);

            // SET VARIABLES
            // Weather image
            var imgWeather = $('<img src="https://openweathermap.org/img/wn/' + response.weather[0].icon + '@2x.png" alt="weather icon">');
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
            // Longitude
            var long = response.coord.lon;
            // Latitude
            var lat = response.coord.lat;
            // UV Index URL
            var uvQuery = 'https://api.openweathermap.org/data/2.5/uvi?lat=' + lat + '&lon=' + long + '&appid=' + apiKey;
            // Add data elements to div
            cityWeather.append(current, imgWeather, currWeather, temp, humidity, windSpeed,);
            // Add div to html
            $('#todayForecast').append(cityWeather);

            // Set local storage
            localStorage.setItem('city', cityName);

            // Trigger UV function
            getUV(long, lat);

            // Trigger 5 day forecast
            getFive(long, lat);
        })
    }

    function getUV(long, lat) {
        // UV Index URL
        var uvQuery = 'https://api.openweathermap.org/data/2.5/uvi?lat=' + lat + '&lon=' + long + '&appid=' + apiKey;
    
        // Call UV Index API
        $.ajax({
            url: uvQuery,
            method: 'GET',
        }).then(function(data) {
            console.log(data);
            var currentUV = $('<p>UV Index: </p>');
            var uvIndex = $('<span>' + data.value + '</span>');
            $(currentUV).append(uvIndex);
            // Assign UV color coding class based on EPA guidelines
            if (data.value < 3) {
                $(uvIndex).addClass('low');
            }
            else if (data.value >= 3 && data.value < 6 ) {
                $(uvIndex).addClass('moderate');
            }
            else if (data.value >= 6 && data.value < 8) {
                $(uvIndex).addClass('high');
            }
            else if (data.value >= 8 && data.value < 11) {
                $(uvIndex).addClass('veryHigh');
            }
            else {
                $(uvIndex).addClass('extreme');
            }
            // Send UV info to display div
            cityWeather.append(currentUV);
        })
    }

    function getFive(long, lat) {
        var fiveQuery = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + long + '&appid=' + apiKey;
        $.ajax({
            url: fiveQuery,
            method: 'GET',
        }).then(function(fiveData) {
            console.log(fiveData);
            for (var i = 0; i < 5; i++) {
                console.log(fiveData.daily[i].weather[0].main);
                
            }

        })
    }

    function getPast() {

    }

    function clearContents() {
        $('#todayForecast').text('');
    }
})

 // Event.target.text.val(); 
 // Could set value equal to city name
 // getLocalData();
 // getUvIndex();