var EmmasApp = EmmasApp || {};

// Depends on EmmasApp.colors && EmmasApp.views

(function(){
    var title_text = 'Learn Colors', 
        colors = EmmasApp.colors,
        views = EmmasApp.views,
        audio = EmmasApp.audioPlayer;

    function populateOpaqueImages(){
        var tileIndex = 0;
        for(var i =0; i <  colors.data.length; i++){
            var color = colors.data[i].color;
            var backgroundImg = colors.data[i].images[0];

            $('#'+color+"cell").children('div').find('img').attr("src", backgroundImg + "_deColorD.png");
            tileIndex++;
        }
    }

    function updateCellWidth(){
        var cell_width = Math.floor( $( document ).width() / 3 ) - 6 ;
        $('.cell').width(cell_width);
    }

    $(window).resize(function(){
       updateCellWidth();

       if($('#mainmenu').height() > 0){
            $('#maintitle').adjustFont(false);
        }
        else if(EmmasApp.views.current() == '#mainview'){
            $('.cell p').adjustFont(true);
        }
        else if(EmmasApp.views.current() == '#learnview'){
             $('#backtitle').adjustFont();
        }

       var size = views.getTileSize();
       $('.cutoutimage').css({
            height: size.height,
            width: size.width
        });
    });

    $(window).load(function () {
        updateCellWidth();
   
        $('.tlt').textillate();
        $('#titleheader').html(title_text);

        $('#maintitle').adjustFont();
        $('#titleheader').lettering();

        populateOpaqueImages();

        for(i = 1; i <= title_text.length; i++){
            var color_index = i % colors.data.length; 
            var current_color = colors.data[color_index].color;
            var color_value = $("." + current_color ).css("background-color");
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
           views.previous();
        });

        $('#play').click(function(){
            $('#learnview').remove();
            views.hide('#mainmenu');
            views.push("#mainmenu");
            views.show("#mainview");
            updateCellWidth();
        });

        $('#learn').click(function(){
            EmmasApp.flipCard.init();
            views.hide('#mainmenu');
            views.push("#mainmenu");
            views.show('#learnview');
        });

        $('.cell').click(function () {
            var color = this.attributes.color.nodeValue;
            EmmasApp.matchgame.onCellClick(color);
        });
    });

    function capitalizeFirstChar(word) {
        return word.toLowerCase().replace(/\b[a-z]/g, function (char) {
            return char.toUpperCase();
        });
    }
})();