var flipCardIndex = 0;
var flipCardColor = colors.data[0].color.toUpperCase();

var flipView = 
    '<div id="learnview" class="flip">' +
        '<div id="flipcard" class="card">' +
            '<div class="face front"></div>' +
            '<div class="face back">' +
                '<div id="backtitle"></div>' +
            '</div>' +
        '</div>' +
    '</div>';

function updateVerticalAlignedFlipCard(){
  updateVerticalAlignment('flipcard', 'backtitle');
}

// Add flip view if it doesn't exist
function AddFlipCardFunctionality()
{
  if($('#learnview').length === 0){
      
    $(flipView).insertAfter('#menubar');
    $('.face').addClass(flipCardColor +'tile');
    $('#backtitle').html(flipCardColor);

    updateVerticalAlignedFlipCard();

    $('.flip').click(function(){
        // only flip if it is not flipped
        if( $(this).find('.card').hasClass('flipped') === false)
        {
            $(this).find('.card').addClass('flipped');
            return false;
        }
        else
        {
           $('#backtitle').html();
           $('#flipcard').removeClass('flipped');
           $('.face').removeClass(flipCardColor +'tile');

           flipCardIndex = (flipCardIndex + 1) % 9;
           flipCardColor = colors.data[flipCardIndex].color.toUpperCase();
           $('.face').addClass(flipCardColor +'tile');

            setTimeout(function(){
                $('#backtitle').html( flipCardColor );
           }, 500);                   
        }
    }); 
  }     
}