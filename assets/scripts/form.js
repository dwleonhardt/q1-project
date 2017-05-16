$( document ).ready(function() {
  (function buildSelect() {
    var states = ["AK",
                  "AL",
                  "AR",
                  "AS",
                  "AZ",
                  "CA",
                  "CO",
                  "CT",
                  "DC",
                  "DE",
                  "FL",
                  "GA",
                  "GU",
                  "HI",
                  "IA",
                  "ID",
                  "IL",
                  "IN",
                  "KS",
                  "KY",
                  "LA",
                  "MA",
                  "MD",
                  "ME",
                  "MI",
                  "MN",
                  "MO",
                  "MS",
                  "MT",
                  "NC",
                  "ND",
                  "NE",
                  "NH",
                  "NJ",
                  "NM",
                  "NV",
                  "NY",
                  "OH",
                  "OK",
                  "OR",
                  "PA",
                  "PR",
                  "RI",
                  "SC",
                  "SD",
                  "TN",
                  "TX",
                  "UT",
                  "VA",
                  "VI",
                  "VT",
                  "WA",
                  "WI",
                  "WV",
                  "WY"];
    var $stateSelect = $('#state');
    for (var i = 0; i < states.length; i++) {
      var $option = $('<option></option>');
      $option.html(states[i]);
      $stateSelect.append($option);
    }
  })();
  (function buildRadius() {
    var $radiusSelect = $('#radius');
    for (var i = 0; i < 31; i++) {
      var $option = $('<option></option>');
      $option.html(i);
      $radiusSelect.append($option);
    }
    $('select').material_select();
    $('.modal').modal();
  })();

  $('.btn-large').on('click', function(event){
    $('#link').remove();
  });
});
