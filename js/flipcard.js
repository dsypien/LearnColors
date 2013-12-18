var flipCardIndex = 0;
var flipCardColor = Object.keys(colors.data)[0].toUpperCase();
var flipView = 
    '<div id="learnview" class="flip">' +
        '<div id="flipcard" class="card">' +
            '<div class="face front"></div>' +
            '<div class="face back"></div>' +
        '</div>' +
    '</div>';

// Add flip view if it doesn't exist
function AddFlipCardFunctionality()
{
  if($('#learnview').length == 0){
      
    $(flipView).insertAfter('#menubar');
    $('.face').addClass(flipCardColor +'tile');
    $('.back').html(flipCardColor);
    $('.back').fitText(0.8);

    $('.flip').click(function(){
        // only flip if it is not flipped
        if( $(this).find('.card').hasClass('flipped') == false)
        {
            $(this).find('.card').addClass('flipped');
            return false;
        }
        else
        {
           $('.back').html();
           $('#flipcard').removeClass('flipped');
           $('.face').removeClass(flipCardColor +'tile');

           flipCardIndex = (flipCardIndex + 1) % 9;
           flipCardColor = Object.keys(colors.data)[flipCardIndex].toUpperCase();
           $('.face').addClass(flipCardColor +'tile');

            setTimeout(function(){
                $('.back').html(flipCardColor);
           }, 500);                   
        }
    }); 
  }     
}