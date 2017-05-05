$( document ).ready(function() {
  var id = config.id;
  var secret = config.secret;
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
    var input = new Input($city, $state, $price);
    var url = 'https://api.foursquare.com/v2/venues/explore?client_id='+id+'&client_secret='+secret+'&v=20170401&mode=url&near='+input.city+','+input.state+'&price='+input.price+'&q=food';
    var $call = $.getJSON(url);
    $call.done(function(data){
      var $restaurants = $(data.response.groups[0].items);
      var pick = Math.floor(Math.random()*$restaurants.length);
      console.log($restaurants[pick].venue);

      });
  });



});



//   var $firstCall = $.getJSON(url);
//   $firstCall.done(function(data){
//     console.log(data);
//   });
