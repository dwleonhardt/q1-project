
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
    
    $("#start").click(function() {
        $('html, body').animate({
            scrollTop: $(".content").offset().top
        }, 900);
    });
    // loop and concat?
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
    // if (restaurant.opening_hours.open_now === false) {
    //   console.log('closed please try again');
    // }
    $('#name').html(restaurant.name);
    $('#phone').html(restaurant.formatted_phone_number);
    console.log($('a[href]').attr('href', restaurant.website));
    //
    // console.log(restaurant.name);
    console.log(restaurant.price_level);

  });
}
