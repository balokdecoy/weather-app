var apiKey = '31935cf21b5d358b8ba4c4da65b29118';
var cityName = '';
var queryURL = 'http://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&appid=' + apiKey;

$.ajax({
    url: queryURL,
    method: 'GET',
}).then(function (response) { 
    console.log(response);
 })
