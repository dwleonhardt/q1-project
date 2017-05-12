
var map;
var infoWindow;
var service;

function Input(city, state, price, radius){
  this.city = city;
  this.state = state;
  this.price = price;
  this.radius = radius;
  }

  var input = new Input();

  $('form').submit(function search(event){
    event.preventDefault();

    $('html, body').animate({
        scrollTop: $(".content").offset().top
    }, 900);

    input.city = $('#city').val();
    input.state = $('#state').val();
    input.price = $('#price').val();
    input.radius = $('#radius').val() * 1609.34;
    console.log(input.radius);
    if (input.state === 'State' || input.price === 'Select Price') {
      alert('Please do something');
    } else{
        var geo = 'https://maps.googleapis.com/maps/api/geocode/json?address='+input.city+'+'+input.state+'+'+'&region=us&key=AIzaSyBauiiK4RzU0EjgyAggzpVg3ogJs-CnWTg';
        var $call = $.getJSON(geo);
        $call.done(function(data){
          console.log(input.price);
          var location = data.results[0].geometry.location;
          initMap(location);
        });
      }
  });



function initMap(location) {
  var  latLng = new google.maps.LatLng(location.lat,location.lng);
  map = new google.maps.Map(document.getElementById('map'), {
    center: latLng,
    zoom: 15,
    draggable: false,
    scrollwheel: false,
    styles: [{
      stylers: [{ visibility: 'simplified' }]
    },
    {
      elementType: 'labels',
      stylers: [{ visibility: 'on' }]
    },
  ],
  });



  var request = {
    location: latLng,
    radius: input.radius,
    types: ['restaurant'],
    openNow: true,
    minPriceLevel: input.price,
    maxPriceLevel: input.price
  };

  infoWindow = new google.maps.InfoWindow();
  service = new google.maps.places.PlacesService(map);
  service.nearbySearch(request, callback);
  // search =  google.maps.places.PlaceSearchRequest();
  // console.log(google.maps.places.PlaceSearchRequest);
  // map.addListener('idle', performSearch);
}

// function performSearch() {
//   var request = {
//     bounds: map.getBounds(),
//     type: 'restaurant'
//   };
//   service.radarSearch(request, callback);
// }


function callback(results, status) {
  var picker = [];
  if (status !== google.maps.places.PlacesServiceStatus.OK) {
    console.error(status);
    return;
  }
  for (var i = 0, result; result = results[i]; i++) {
    picker.push(result);
  }
  var restaurant = picker[Math.floor(Math.random() * picker.length)];
  addMarker(restaurant);
  details(restaurant);
}

function addMarker(place) {
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location,
  });
  map.panTo(marker.getPosition());
}
function details(place) {
  service.getDetails(place, function(restaurant, status) {
    if (status !== google.maps.places.PlacesServiceStatus.OK) {
      console.error(status);
      return;
    }
    $('#name').get(0).lastChild.nodeValue = restaurant.name;
    $('#phone').get(0).lastChild.nodeValue = restaurant.formatted_phone_number;
    if (restaurant.website) {
      var $webButton = $('<a href="" taget="_blank"><button class="btn col m12 col s12" type="button" name="button">Website</button></a>');
      $webButton.attr('href', restaurant.website);
      $('#phone').append($webButton);
    }
  });
}
