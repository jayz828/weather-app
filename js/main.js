(function Main(){




// weather object


function weather(kelvin) {
  this.kelvin = kelvin;
  this.farenheit = Math.round((kelvin * (9/5)) - 459.67);
  this.celsius = Math.round(kelvin - 273.15);




}



var test;



// Eventlisteners



// Program Start


getLocation();
toggleSwitch();



function getLocation() {

    var xhr = new XMLHttpRequest();
    var json;


    xhr.onreadystatechange = function() {

        if (xhr.readyState === 4 && xhr.status === 200){

            var savedZip;
            var savedCity;
            var savedCountry;
            var savedCountryCode;
            var savedLatitude;
            var savedLongitute;

        
            json = JSON.parse(xhr.responseText);

            savedZip = json.zip;
            savedCity = json.city + "," + json.region;
            savedCountry = json.country;
            savedCountryCode = json.countryCode;
            savedLatitude = json.lat;
            savedLongitute = json.lon;

            console.log(savedLatitude);
            console.log(savedLongitute);

            saveLocation(savedZip, savedCity, savedCountry,savedCountryCode, savedLatitude,savedLongitute);


        }

    };

    xhr.open("GET","http://ip-api.com/json", true);
    xhr.send();



}





function saveLocation(zip, cityFromJson, countryFromJson, ccFromJson, latFromJson, lonFromJson) {
  
  var zipCode = zip;
  var city = cityFromJson;
  var country = countryFromJson;
  var countryCode = ccFromJson;
  var lat = latFromJson;
  var lon = lonFromJson;

  var zipId = document.getElementById("zip");
  var cityId = document.getElementById("city");
  var countryId = document.getElementById("country");
  var countryCodeId = document.getElementById("country-code");


  // zipCode = zip;
  // city = cityFromJson;
  console.log(zipCode);
  console.log(city);

  zipId.innerHTML = zip;
  cityId.innerHTML = city;
  countryCodeId.innerHTML = countryCode;
  countryId.innerHTML = country;


  getWeather(lat, lon);


}

function getWeather(lat, lon) {
  var kelvinTemp
  var farenheit;
  var celcius;
  var weatherIcon;
  var condition;
  var timeOfDay;
  var weatherType;
  
  
      // api.openweathermap.org/data/2.5/weather?zip=94040,us
      // api.openweathermap.org/data/2.5/weather?lat=35&lon=139
  
  
    console.log('weather function');
    console.log('test ok');
    
  
  var xhr = new XMLHttpRequest();
  var json;


    xhr.onreadystatechange = function() {

        if (xhr.readyState === 4 && xhr.status === 200){

            var tempId = document.getElementById("temp");
            var descId = document.getElementById("description");
            var iconId = document.getElementById("icon");
            var celsiusId = document.getElementById("celsius-ajax");
            var farenheitId = document.getElementById("farenheit-ajax");
            var icon;




            json = JSON.parse(xhr.responseText);
            console.log(json);


            

            kelvinTemp = json.main.temp;
            var currentWeather = new weather(kelvinTemp);

            console.log(currentWeather.kelvin);


            // farenheit = (kelvinTemp * (9/5)) - 459.67;
            // farenheit = Math.round(farenheit);
            tempId.innerHTML = currentWeather.farenheit;
            farenheitId.innerHTML = currentWeather.farenheit;
            icon = json.weather[0].icon;
            descId.innerHTML = json.weather[0].description;
            celsiusId.innerHTML = currentWeather.celsius;
            iconId.src = "http://openweathermap.org/img/w/" + json.weather[0].icon + ".png";
          


            changeBackground(icon);

    
 


        }

    };

    xhr.open("GET","http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon +"&appid=b5333a4e0061fe95658cb4c9637910bc", true);
    xhr.send(); 


}


function convertDegrees(toggleValue,temp) {

    console.log(test + 'work');

    var tempId = document.getElementById("temp");

    var farId = document.getElementById("farenheit-ajax");
    var celId = document.getElementById("celsius-ajax");

  switch (toggleValue) {
    case "°F":
      // var getFarenheit = $("#farenheit").text();
      tempId.innerHTML = farId.innerHTML + toggleValue;

      
      break;
    case "°C":
      tempId.innerHTML = celId.innerHTML + toggleValue;
      break;
    default: 
      alert('nothing');
  }

}


// WORK WITH FUNCTION BELOW TO GET THINGS WORKING


function toggleSwitch() {

  
    $("#slider").change(function() {
      console.log("slider");
  
  var currentSelection =  $("#slider option:selected" ).text();
  var currentTemp = $("#temp").html();
  var unitMeasure = document.getElementById("unit-measure");
  unitMeasure.innerHTML ="";

  // var currentTemp = document.getElementById("temp-unit").innerHTML;
  console.log(currentTemp + "test");
  convertDegrees(currentSelection,currentTemp);
  
  
  });
  
  
}





function changeBackground(weatherIcon) {

  console.log(weatherIcon);

  var background = document.getElementsByClassName("container-background");

  // var background = document.getElementsByTagName("body");


  switch (weatherIcon) {
    // Clear Night
  case "01n":
    background[0].style.backgroundImage = "url('images/clear-night.jpg')";
    break;
    // Cloudy night
  case "02n":
  case "03n":
  case "04n":
    background[0].style.backgroundImage = "url('images/cloudy-night.jpg')";
    break;
    // Rainy night
  case "09n":
  case "10n":

    background[0].style.backgroundImage = "url('images/rain-night.jpg')";
    break;
    // Thunder night
  case "11n":
    background[0].style.backgroundImage = "url('images/thunder-night.jpg')";
    break;
    // Snow Night
  case "13n":
    background[0].style.backgroundImage = "url('images/snow-night.jpg')";
    break;

  case "50n":
    background[0].style.backgroundImage = "url('images/mist-night.jpg')";
    break;
    // Clear Day
  case "01d":
    background[0].style.backgroundImage = "url('images/clear-day.jpg')";
    break;
    // Cloudy Day
  case "02d":
  case "03d":
  case "04d":
     background[0].style.backgroundImage = "url('images/clear-day.jpg')";    
    break;
    // Shower Day
  case "09d":
  case "10d":
    background[0].style.backgroundImage = "url('images/shower-day.jpg')"; 
    break;

    // Thunderstorm day

  case "11d":
    background[0].style.backgroundImage = "url('images/thunder-day.jpg')"; 
    break;
   // Snow day
   case "13d":
    background[0].style.backgroundImage = "url('images/snow-day.jpg')"; 
    break;
   // Mist Day
   case "50d":
   background[0].style.backgroundImage = "url('images/mist-day.jpg')"; 
    break;
  default:
    console.log("missed one");
}




}



})();