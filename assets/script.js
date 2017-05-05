$( document ).ready(function() {
  var id = config.id;
  var secret = config.secret;
  function Input(city, state){
    this.city = city;
    this.state = state;
    this.radius = 800;
  }
  console.log(id);
  // Search.prototype.radius = function(miles){
  //   this.radius =
  // };

  $('form').submit(function search(event){
    event.preventDefault();
    var $city = $('#city').val();
    var $state = $('#state').val();
    var input = new Input($city, $state);
    var url = 'https://api.foursquare.com/v2/venues/explore?client_id='+config.id+'&client_secret='+config.secret+'&v=20170401&mode=url&near='+input.city+','+input.state+'&q=food';
    var $call = $.getJSON(url);
    $call.done(function(data){
        console.log(data);
      });
  });



});



//   var $firstCall = $.getJSON(url);
//   $firstCall.done(function(data){
//     console.log(data);
//   });
