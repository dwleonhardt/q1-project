$( document ).ready(function() {
    checkSize();
    $(window).resize(checkSize);
});
function checkSize() {
  var $modal = $('#modal1');
  var $inputForm = $('#input');
  var $reAttach = $('#reAttach');
  var $map = $('#map');

    if ($(window).width() <= 800){
      $map.detach();
      $('.content').append($map);
      $modal.html($inputForm);
      $('i').removeClass('medium');
      $('i').addClass('small');
      console.log($map);
    }
    else if ($(window).width() >= 800){
      $reAttach.append($inputForm);
      $('i').removeClass('small');
      $('i').addClass('medium');
    }
}


// <div id="modal1" class="modal bottom-sheet">
