EmmasApp.flipCard = (function(){
  var flipCardIndex = 0,
    colors = EmmasApp.colors,
    flipCardColor = colors.data[0].color;

  var flipView = 
      '<div id="learnview" class="flip">' +
          '<div id="flipcard" class="card">' +
              '<div class="face front"></div>' +
              '<div class="face back">' +
                  '<div id="backtitle"></div>' +
              '</div>' +
          '</div>' +
      '</div>';


  // Add flip view if it doesn't exist
  function initialize()
  {
    if($('#learnview').length === 0){
        
      $(flipView).insertAfter('#menubar');
      $('.face').addClass(flipCardColor);
      $('#backtitle').html(flipCardColor);

      $('.flip').click(function(){
          // only flip if it is not flipped
          if( $(this).find('.card').hasClass('flipped') === false)
          {
              $(this).find('.card').addClass('flipped');
              EmmasApp.audioPlayer.play(flipCardColor);
              return false;
          }
          else
          {
             $('#backtitle').html();
             $('#flipcard').removeClass('flipped');
             $('.face').removeClass(flipCardColor);

             flipCardIndex = (flipCardIndex + 1) % 9;
             flipCardColor = colors.data[flipCardIndex].color;
             $('.face').addClass(flipCardColor);

              setTimeout(function(){
                  $('#backtitle').html( flipCardColor );
             }, 800);                   
          }
      }); 
    }     
  }

  return{
    init : function(){
      initialize();
    }
  };

}());