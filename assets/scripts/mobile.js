$( document ).ready(function() {
    checkSize();
    $(window).resize(checkSize);
});
function checkSize() {
  var $modal = $('#modal1');
  var $inputForm = $('#input');
  var $reAttach = $('#reAttach');

    if ($(window).width() <= 800){
      $modal.html($inputForm);
      console.log($modal);
    }
    else if ($(window).width() >= 800){
      $reAttach.append($inputForm);
    }
}


// <div id="modal1" class="modal bottom-sheet">
