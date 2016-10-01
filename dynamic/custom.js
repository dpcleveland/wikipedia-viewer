$(document).ready(function() {

    // OpenWeatherMap API Key
    var apiKey = "96f6bcd552af365b9711c29cf4e5bdb4";

    // Setup Global Vars
    var userLatitude, userLongitude, openWeatherMapURL, userCity, userCountry, userKelvinTemp, userFahrenheitTemp, userCelsiusTemp, userWeatherCondition, userWeatherIcon, userWeatherIconLink, isCelcius = false;

    function getUserLocation() {
        $.getJSON("//ip-api.com/json", function(json, status) {
            if (status == "success") {
                // Pull user's location from http://ip-api.com/json
                userLatitude = json.lat;
                console.log('Latitude : ' + userLatitude);
                userLongitude = json.lon;
                console.log('Longitude: ' + userLongitude);
                userCity = json.city;
                console.log(userCity);
                userCountry = json.countryCode;
                console.log(userCountry);

                // Input user location into OpenWeatherMap API URL along with key
                openWeatherMapURL = "http://api.openweathermap.org/data/2.5/weather?lat=" + userLatitude + "&lon=" + userLongitude + "&APPID=" + apiKey;
                console.log(openWeatherMapURL);
            } else if (status == "timeout") {
                alert("Connection timeout. Please try again later.");
            } else if (status == "error" || status == "parseerror") {
                alert("System error. Please try again later.");
            } else {
                alert("An error occured");
            }
        }).then(getUserWeather);
    }

    function getUserWeather() {
        $.getJSON(openWeatherMapURL, function(json, status) {
            if (status == "success") {
                // Get Temperature & Unit Conversion
                userKelvinTemp = Math.round(json.main.temp);
                console.log(userKelvinTemp);
                userFahrenheitTemp = Math.round(userKelvinTemp * (9 / 5) - 459.67);
                console.log(userFahrenheitTemp);
                userCelsiusTemp = Math.round(userKelvinTemp - 273.15);
                console.log(userCelsiusTemp);

                // Get Weather
                userWeatherCondition = json.weather[0].main;
                console.log(userWeatherCondition);
                userWeatherIcon = json.weather[0].icon;
                console.log(userWeatherIcon);
                userWeatherIconLink = "http://openweathermap.org/img/w/" + userWeatherIcon + ".png";
                console.log(userWeatherIconLink);
            } else if (status == "timeout") {
                alert("Connection timeout. Please try again later.");
            } else if (status == "error" || status == "parseerror") {
                alert("System error. Please try again later.");
            } else {
                alert("An error occured");
            }
        }).then(changeUserInterface);
    }

    function changeUserInterface() {
        // Update City
        $('#user-location').text(userCity + ', ' + userCountry);

        // Update Temperature
        $('#user-temperature').text(userFahrenheitTemp + '° F');

        // Update Weather Condition
        $('#user-weather-text').text(userWeatherCondition);

        // Update Weather Icon
        $('#user-weather-symbol img').attr('src', userWeatherIconLink);
    }

    function toggleTemp() {
        $('#user-temperature').text(isCelcius ? (userFahrenheitTemp + '° F') : (userCelsiusTemp + '° C'));
        $('#toggle').text(isCelcius ? 'Show Celcius' : 'Show Fahrenheit');

        isCelcius = isCelcius ? false : true;
    }

    $('#toggle').on('click', toggleTemp);

    getUserLocation();
});
