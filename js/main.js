(function(){
    var title_text = 'Learn Colors';

    function populateOpaqueImages(){
        var tileIndex = 0;
        for(var i =0; i <  colors.data.length; i++){
            var color = colors.data[i].color;
            var backgroundImg = colors.data[i].images[0];

            $('#'+color+"cell").children(".tilebutton").css("background-image","url("+ backgroundImg + "_deColorD.png)");
            tileIndex++;
        }
    }

    function updateCellWidth(){
        var cell_width = Math.floor( $( document ).width() / 3 ) - 6 ;
        $('.cell').width(cell_width);
    }

    $(window).resize(function(){
       updateCellWidth();
        //updateVerticalAlignment('maintitle', 'titleheader');
        //updateVerticalAlignment('bigtile', 'bigtilelabel');

       if($('#mainmenu').height() > 0){
            $('#maintitle').adjustFont();
        }

       var size = getImageTileSize();
       $('.cutoutimage').css({
            height: size.height,
            width: size.width
        });

       updateVerticalAlignedFlipCard();
    });

    $(document).ready(function () {
        updateCellWidth();

        // var game = new matchGame()   ;     
        $('.tlt').textillate();
        $('#titleheader').html(title_text);

        $('#maintitle').adjustFont();
        $('#titleheader').lettering();
        // updateVerticalAlignment('maintitle', 'titleheader');
        //updateVerticalAlignment('bigtile', 'bigtilelabel');

        populateOpaqueImages();

        for(i = 1; i <= title_text.length; i++){
            var color_index = i % colors.data.length; 
            var current_color = colors.data[color_index].color;
            var color_value = $("." + current_color + "tile").css("background-color");
            $('.char'+ i).css("color", color_value );
            $('.char'+ i).css("margin", '2px' );

            if(i%2 == 1)
            {
                $('.char'+ i).css('-webkit-transform', 'rotate(-2deg)');
            }
        }

        document.getElementById('learnicon').style.backgroundImage ="url(images/learn_deColorD.png)";
        document.getElementById('playicon').style.backgroundImage ="url(images/play_deColorD.png)";

        $('#imgprevious').click(function () {
           onPreviousClick();
        });

        $('#play').click(function(){
            $('#learnview').remove();
            hideview('#mainmenu');
            viewstack.push("#mainmenu");
        });

        $('#learn').click(function(){
            AddFlipCardFunctionality();
            hideview('#mainmenu');
            viewstack.push("#mainmenu");
        });

        $('.cell').click(function () {
            var color = this.attributes.color.nodeValue;
            matchGame.onCellClick(color);
        });
    });

    function onPreviousClick(){
       goToPreviousView();
    }

    function goToPreviousView(){
        var curview = viewstack.pop();

        // if viewstack's length is zero we are at main menu need to display 100%
        // only 90% otherwise because other views have menubar that take up 10% of screen
        var height = viewstack.length === 0 ? "100%" : "90%";

        if(curview !== null){
            $(curview).show();
            $(curview).animate({
                "height": height,
                "opacity": "1"
                }, 500
            );
        }
    }

    function capitalizeFirstChar(word) {
        return word.toLowerCase().replace(/\b[a-z]/g, function (char) {
            return char.toUpperCase();
        });
    }
})();