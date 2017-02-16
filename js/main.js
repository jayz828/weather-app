$(document).ready(function() {

  
  
  // open weather does not work without https, try this https://api.forecast.io/forecast/e424a6c7e858a676fcbd8b7e65d45097/37.8267,-122.423
  
  
  // no luck with forecast io might need to move to different api
  
  // Still need to work on cleaning up the code 

  
  toggleSwitch();

  
  showLocation();

});


function toggleSwitch() {
  
    $("#slider").change(function() {

  
  var currentSelection =  $("#slider option:selected" ).text();
  var currentTemp = $("#temp").html();
  convertDegrees(currentSelection,currentTemp);
  
  
});
  
  
  
}

function showLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    alert("Your browser doesn't support geolocation");
  }
}

function showPosition(position) {
  var currentLong;
  var currentLat;
  currentLong = position.coords.longitude;
  currentLat = position.coords.latitude;

  $("#lat").append(" " + currentLat);
  $("#long").append(" " + currentLong);
  getInformation(currentLat, currentLong);

}



/*
function testThis() {
  $(function() {
    $.ajax({
      type: 'GET',
      url: 'http://api.openweathermap.org/data/2.5/weather?lat=' + currentLat + '&lon=' + long + '&appid=b5333a4e0061fe95658cb4c9637910bc',
      success: function(data) {
        console.log('success', data);
      }
    })
  });
  // http://api.openweathermap.org/data/2.5/weather?lat=32.9223091&lon=-117.14411120000001&appid=b5333a4e0061fe95658cb4c9637910bc

} */
// San Diego location 
// https://maps.googleapis.com/maps/api/geocode/json?latlng=32.9223091,-117.14411120000001&key=AIzaSyDE0SHFdl6GERL_H5_dnC31Ug6_Ri636zA
function getInformation(lat, long) {
  //var currentZip;
 // var currentState ="";
  var currentCity = "";
  var getUrl = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + ',' + long + '&key=AIzaSyDE0SHFdl6GERL_H5_dnC31Ug6_Ri636zA';
  console.log(getUrl);

  getZip(getUrl);
  
  // need to get a value from data
  
 
 
  getWeather(lat, long);

  /*
$.getJSON('https://maps.googleapis.com/maps/api/geocode/json?latlng=32.9223091,-117.14411120000001&key=AIzaSyDE0SHFdl6GERL_H5_dnC31Ug6_Ri636zA', function(data) {
  console.log("Successful");
  console.log(data);
});
  
  */

  //   alert(currentZip);
  /*
      var currentZip = data.results[0].address_components[7].long_name;
     */

  /*
   $(data.results).each(function(index, value) {
     console.log(value.formatted_address);
     
     
   });
   
  */

 
  
  
 

}

function getZip(url) {
  
  var data;
  var currentZip;
  
  $.ajax({
        url: url,
        dataType: 'json',
        type: 'get',
        cache: false,
        success: function(data) {

          
          findZipResults(data); // make function call to save zip 
         
          
          /*
  $(data.results[0].address_components).each(function(index, value) {
              
              if (value.types == 'postal_code') {
                var currentZip;
                 currentZip = value.short_name;
                  console.log(value.short_name);
                }
            $("#zip").append(currentZip);
            }); // end inside anon
          */
          
       }
  }); // end ajax
  

}

function getCity(zipCode) {
  var currentState;
  console.log("accepted parameter for zip: " + zipCode);
   $.ajax({
    url: 'http://ziptasticapi.com/' + zipCode,
    dataType: 'json',
    type: 'get',
    cache: false,
    success: function(data) {
      console.log(data);
      
      currentState = data.state;

      currentCity = data.city;
      console.log("current city is: " + currentCity);

   $("#city").html(currentCity + ",");
   $("#state").html(currentState);
    }
  });
}

function findZipResults(data) {
  var currentZip;
  
    $(data.results[0].address_components).each(function(index, value) {
              
              if (value.types == 'postal_code') {
                
currentZip = value.short_name;
                  console.log("value shortname:" + value.short_name);
                getCity(currentZip);  
                }
        $("#zip").html(currentZip);

      console.log(currentZip + "no zip code");
            }); // end inside anon
  
}
 

// function to get current weather, accepts latitude and longitude as parameters 
function getWeather(lat, long) {
  var kelvinTemp
  var farenheit;
  var celcius;
  var weatherIcon;
  var condition;
  var timeOfDay;
  var weatherType;
  
  
  /*
  console.log('weather function');
   $(function() {
    $.ajax({
      type: 'GET',
      url: 'http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + long + '&appid=b5333a4e0061fe95658cb4c9637910bc',
      success: function(data) {
        console.log('success', data);
        
      
    */   
  
  
    console.log('weather function');
    console.log('test ok');
    
  
 
   $(function() {
    $.ajax({
      type: 'GET',
      url: 'https://api.forecast.io/forecast/e424a6c7e858a676fcbd8b7e65d45097/37.8267,-122.423',
      success: function(data) {
        console.log('success', data);
        
       // farenheit = data.currently.temparature;
        console.log('this is it' + farenheit);
        console.log('test');
        
       
        // subtract 273.15 to convert to celcius
    
        
        /*
        
      kelvinTemp = data.main.temp;
      celcius = kelvinTemp - 273.15;
     
      farenheit = Math.round(celcius * 1.8 + 32);
      $("#temp").html(farenheit+ "°F");
      $("#farenheit").html(farenheit);  
      $("#celcius").html(Math.round(celcius));  
        
        
         weatherIcon = data.weather[0].icon;
        condition = data.weather[0].description;
  //alert(condition);  
        $("#conditions").html(condition);
        console.log(weatherIcon + " weather icon here");
       // alert(kelvinTemp);
        
    $('#weather-icon').attr("src","http://openweathermap.org/img/w/" + weatherIcon +".png" );
        
        // Break down the weatherIcon info to determine type of weather and time of day.
        
          weatherType = weatherIcon.substr(0,2);
        
       
          console.log("Type of weather: " + weatherType);
          timeOfDay = weatherIcon.substr(2,1);
          console.log("Time of day: " + timeOfDay);
        
          changeBackground(weatherIcon);
          
          */
      }
    })
  });

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



// Function to change the background based on the type of weather.

function changeBackground() {
  // Try to make info opaque and get other backgrounds to work.  
  
  $("#weather-app").css("background", "url(http://jasonnatividad.net/images/weatherapp/01n.jpg) no-repeat")
}