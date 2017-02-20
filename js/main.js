(function Main(){




// weather object




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


            json = JSON.parse(xhr.responseText);
            console.log(json);

            kelvinTemp = json.main.temp;
            farenheit = (kelvinTemp * (9/5)) - 459.67;
            farenheit = Math.round(farenheit);
            tempId.innerHTML = farenheit;
            descId.innerHTML = json.weather[0].description;
            iconId.src = "http://openweathermap.org/img/w/" + json.weather[0].icon + ".png";
            console.log(farenheit);
 


        }

    };

    xhr.open("GET","http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon +"&appid=b5333a4e0061fe95658cb4c9637910bc", true);
    xhr.send(); 


}


function convertDegrees(toggleValue,temp) {

  switch (toggleValue) {
    case "°F":
      var getFarenheit = $("#farenheit").text();
      $("#temp").html(getFarenheit + toggleValue);
      
      break;
    case "°C":
      var getCelcius = $("#celcius").text();
      $("#temp").html(getCelcius + toggleValue);
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



//  NEED TO FIGURE OUT HOW TO COVERT DEGREES

function convertDegrees(toggleValue,temp) {

    var currentTemp = document.getElementById("temp").innerHTML;


  switch (toggleValue) {
    case "°F":
      var getFarenheit = $("#farenheit").text();
      $("#temp").html(currentTemp + toggleValue);
      
      break;
    case "°C":
      var getCelcius = $("#celcius").text();
      $("#temp").html(currentTemp + toggleValue);
      break;
    default: 
      alert('nothing');
  }

}


function changeBackground() {

}



})();