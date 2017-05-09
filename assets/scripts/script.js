
var map;
var infoWindow;
var service;


function Input(city, state, price){
  this.city = city;
  this.state = state;
  this.price = price;
  }

  var input = new Input();


  $('form').submit(function search(event){
    event.preventDefault();
    // loop and concat?
    input.city = $('#city').val();
    input.state = $('#state').val();
    input.price = $('#price').val();
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
  map = new google.maps.Map(document.getElementById('map'), {
    center: {
      lat: location.lat,
      lng: location.lng
    },
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

  infoWindow = new google.maps.InfoWindow();
  service = new google.maps.places.PlacesService(map);
  // search =  google.maps.places.PlaceSearchRequest();
  // console.log(google.maps.places.PlaceSearchRequest);
  map.addListener('idle', performSearch);
}

function performSearch() {
  var request = {
    bounds: map.getBounds(),
    type: 'restaurant'
  };
  service.radarSearch(request, callback);
}

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
    // console.log(restaurant.website);

  });
}
