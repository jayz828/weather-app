(function Main(){




getLocation();
var zipCode;
var city;


function getLocation() {

    var xhr = new XMLHttpRequest();
    var json;


    xhr.onreadystatechange = function() {

        if (xhr.readyState === 4 && xhr.status === 200){

            var savedZip;
            var savedCity;
        
            json = JSON.parse(xhr.responseText);

            savedZip = json.zip;
            savedCity = json.city;
            saveLocation(savedZip, savedCity);


        }

    };

    xhr.open("GET","http://ip-api.com/json", true);
    xhr.send();



}



function saveLocation(zip, cityFromJson) {
  zipCode = zip;
  city = cityFromJson;
  console.log(zipCode);
  console.log(city);


}


})();