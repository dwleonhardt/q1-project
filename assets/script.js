
var map;
var infoWindow;
var service;


function Input(city, state, price){
  this.city = city;
  this.state = state;
  this.price = price;
  }
  $('form').submit(function search(event){
    event.preventDefault();
    var $city = $('#city').val();
    var $state = $('#state').val();
    var $price = $('#price').val();
    var $result = $('<p></p>');
    var input = new Input($city, $state, $price);
    var geo = 'https://maps.googleapis.com/maps/api/geocode/json?address='+$city+'+'+$state+'+'+'&region=us&key=AIzaSyBauiiK4RzU0EjgyAggzpVg3ogJs-CnWTg';
    var $call = $.getJSON(geo);
    $call.done(function(data){
      var location = data.results[0].geometry.location;
      initMap(location);
      });
  });



function initMap(location) {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {
      lat: location.lat,
      lng: location.lng
    },
    zoom: 15,

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

  // The idle event is a debounced event, so we can query & listen without
  // throwing too many requests at the server.
  map.addListener('idle', performSearch);
}

function performSearch() {
  var request = {
    bounds: map.getBounds(),
    keyword: 'restaurant'
  };
  service.radarSearch(request, callback);
}

function callback(results, status) {
  var picker = [];
  if (status !== google.maps.places.PlacesServiceStatus.OK) {
    // console.error(status);
    return;
  }
  for (var i = 0, result; result = results[i]; i++) {
    // var request = {
    //   placeId: result
    // };
    picker.push(result);
    // addMarker(result);

  }
  console.log(picker[Math.floor(Math.random() * picker.length)]);
  addMarker(picker[Math.floor(Math.random() * picker.length)]);
}

function addMarker(place) {
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location,
    icon: {
      url: 'https://developers.google.com/maps/documentation/javascript/images/circle.png',
      anchor: new google.maps.Point(10, 10),
      scaledSize: new google.maps.Size(10, 17)
    }
  });

  google.maps.event.addListener(marker, 'click', function() {
    service.getDetails(place, function(result, status) {
      if (status !== google.maps.places.PlacesServiceStatus.OK) {
        console.error(status);
        return;
      }
      infoWindow.setContent(result.name);
      infoWindow.open(map, marker);
    });
  });
}
