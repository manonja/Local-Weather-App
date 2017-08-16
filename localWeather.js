// var route = "/api/current?lon=" + ":longitude" + "&lat=" + ":latitude";
//ready() function runs only once our page has finished downloading

var weatherAPI = "";
var userCity = "";
var userCountry = "";
var weatherDescription = "";
var temp = "";
var weatherImg = "";
var celsius = "";
var fahrenheit = "";
var wind = "";
var mph = "";
var kph = "";
var icon = "";

var img1 = "url('http://wallup.net/wp-content/uploads/2015/12/244209-nature-landscape-blue-clear_sky-valley-mountain.jpg')";
var img2 = "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSz3GUBwbmWAev7dpuIE9cyCC_16RvUM2kIS7mTXaigzO4-Ep5W3w')";
var img0 = "url('https://i.ytimg.com/vi/SynzKC4fWp0/maxresdefault.jpg')";



//Convert Farheneit to Celsius
function convertCelToFah (temperature) {
  return Math.floor((temperature * 9 / 5) + 32);
};

//Convert Mph to Kph
function convertMphToKph (speed) {
  return Math.floor(speed * 1.6093);
};

$(document).ready(function() {
  $("body").css('background-image', 'url(' + "http://wallsdesk.com/wp-content/uploads/2016/06/No-Mans-Sky-Computer-Backgrounds.jpg" + ')');

  getWeather();
  function getWeather() {
  //get current geolocation
  if (navigator.geolocation) {
       navigator.geolocation.getCurrentPosition(function(position) {
         weatherAPI = "https://fcc-weather-api.glitch.me/api/current?lat=" + position.coords.latitude + "&lon=" + position.coords.longitude;
         console.log(weatherAPI);
         $.getJSON(weatherAPI, function(json){
           //convert the data into a string and select jey from JSON data
           console.log(JSON.parse(JSON.stringify(json)));
           //display infos
           userCity = json.name;
           userCountry = json.sys.country;
           $("#displayLocation").html(userCity + ", " + userCountry);
           temp = json.main.temp;
           $("#displayTemp").html(temp);
           $("#displayTempUnit").html(" °C");
           weatherDescription = json.weather[0].main;
           $("#displayDescription").html(weatherDescription);
           wind = json.wind.speed;
           $("#displayWind").html(wind);
           $("#displayWindUnit").html(" MPH");
           icon = json.weather[0].icon;
           $("#displayIcon").html('<img src ="' + icon + '" />');

           //change background image
           changeImg();
           function changeImg() {
            //  var displayImage;
             var weatherImg = json.weather[0].description;
             if (weatherImg === "clear sky"){
               document.body.style.backgroundImage = img1;
             } else if (weatherImg === "light rain"){
               document.body.style.backgroundImage = img2;
             } else {
               document.body.style.backgroundImage = img0;
             }
          };

           // switch temperature unit
           switchTempUnit();
           function switchTempUnit() {
             celsius = json.main.temp;
             fahrenheit = convertCelToFah(celsius);
             $("#displayTempUnit").on("click", function() {
               if(document.querySelector("#displayTempUnit").innerHTML == " °C"){
                 $("#displayTemp").html(fahrenheit);
                 $("#displayTempUnit").html("&#x02109");
               } else {
                 $("#displayTemp").html(celsius);
                 $("#displayTempUnit").html("&#x02103");
               }
             });
           };

           // switch wind speed unit
           switchWindUnit();
           function switchWindUnit() {
             mph = json.wind.speed;
             console.log(mph);
             kph = convertMphToKph(mph);
             console.log(kph);
             $("#displayWindUnit").on("click", function() {
               if(document.querySelector("#displayWindUnit").innerHTML == " MPH"){
                 $("#displayWind").html(kph);
                 $("#displayWindUnit").html("KPH");
               } else {
                 $("#displayWind").html(mph);
                 $("#displayWindUnit").html("MPH");
               }
             });
           };
         });
       });
     };
   };
 });
