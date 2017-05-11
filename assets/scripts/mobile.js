$( document ).ready(function() {
  var $modal = $('#modal1');
  var $inputForm = $('#input');
  var $reAttach = $('#reAttach');
  $(window).resize(function(){
  	if ($(window).width() <= 800){
      $modal.html($inputForm);
      console.log($modal);
  	}
  });
  $(window).resize(function(){
  	if ($(window).width() >= 800){
      $reAttach.append($inputForm);

      console.log($modal);
  	}
  });
});

// <div id="modal1" class="modal bottom-sheet">
