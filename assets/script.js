$(document).ready(function () {
    // Set date
    var currentDate = dayjs().format('MM/DD/YYYY');

    // Set API key 
    var apiKey = '31935cf21b5d358b8ba4c4da65b29118';

    // Div where current conditions will render
    var cityWeather = $("<div class=cityWeather>");

    // Past searches
    var pastSearches = [];

    // Retrieve last search from local storage
    var getCity = localStorage.getItem('city');
    if (getCity != null) {
        cityName = getCity;
        $('.card').attr('style', 'visibility: visible');
        getLocalWeather(cityName);
    }
    
    // Set local weather data to user's search request
    $('#submit').click(function (e) { 
        e.preventDefault();        
        $('.card').attr('style', 'visibility: visible');
        var cityName = $('#citySearch').val();
        if ($('#citySearch').val() === '') {
            alert("Please enter a valid city name.");
        }
        else {
            getLocalWeather(cityName);
        }
    });

    function getLocalWeather(cityName) {
        clearContents(cityWeather);
        var queryURL = 'https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&units=imperial&appid=' + apiKey;
        
        // Call local weather data
        $.ajax({
            url: queryURL,
            method: 'GET',
            datatType: 'jsonp',
        }).then(function (response) { 
            clearContents();

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
            // Add data elements to div
            cityWeather.append(current, imgWeather, currWeather, temp, humidity, windSpeed,);
            // Add div to html
            $('#todayForecast').append(cityWeather);

            // Set local storage
            var storedCity = localStorage.setItem('city', cityName);    

            // Trigger UV function
            getUV(long, lat);

            // Trigger 5 day forecast
            getFive(long, lat);

            // Trigger history function if city not previously searched
            if (!pastSearches.includes(cityName)) {
                setHistory(cityName)
            };
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
        // Set API call
        var fiveQuery = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + long + '&units=imperial&appid=' + apiKey;
        $.ajax({
            url: fiveQuery,
            method: 'GET',
        }).then(function(fiveData) {
            console.log(fiveData);
            for (var i = 1; i < 6; i++) {
                // Set five day forecast variables
                var dayDiv = $('<div class="col-lg-2 col-md-6 card bg-info mb-3"></div>')
                $(dayDiv).attr('style', 'color: white; margin: auto;');
                var day = dayjs().date();
                var adjDay = (day + i);
                var month = dayjs().format('MM');
                var year = dayjs().format('YYYY');
                var dayDisp = $('<p>' + month + '/' + adjDay + '/' + year + '</p>');
                var maxTemp = $('<p>High: ' + fiveData.daily[i].temp.max + '\u2109</p>');
                var minTemp = $('<p>Low: ' + fiveData.daily[i].temp.min + '\u2109</p>');
                var dayHumid = $('<p>Humidity: ' + fiveData.daily[i].humidity + '%</p>');
                var dayImg = $('<img src="https://openweathermap.org/img/wn/' + fiveData.daily[i].weather[0].icon + '@2x.png" alt="weather icon">');

                // Add five day forecast variables to div, add div to html
                $(dayDiv).append(dayDisp, dayImg, maxTemp, minTemp, dayHumid);
                $(dayDiv).addClass('card');
                $('.cardSpread').append(dayDiv);
            }
        })
    }

    // Add previous searches to search history list
    function setHistory(cityName) {
        var listHist = $('<li>' + cityName + '</li>');
        $(listHist).addClass('list-group-item');
        $('.list-group').append(listHist);
        pastSearches.push(cityName);
    }

    // Trigger getLocalWeather function with search history selection
    $('.list-group').click(function (e) { 
        e.preventDefault();
        cityName = ($(e.target).text());
        getLocalWeather(cityName);
    });

    // Clear contents to reset local weather display
    function clearContents() {
        $(cityWeather).empty();
        $('.cardSpread').empty();
    }
})