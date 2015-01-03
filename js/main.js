var EmmasApp = EmmasApp || {};

// Depends on EmmasApp.colors && EmmasApp.views

(function(){
    var title_text = 'Colors', 
        colors = EmmasApp.colors,
        views = EmmasApp.views,
        audio = EmmasApp.audioPlayer;

   jQuery(window).bind('orientationchange', function(e) {

  switch ( window.orientation ) {

    case 0:
        // alert('portrait mode');
    break;

    case 90:
        // alert('landscape mode screen turned to the left');
    break;

    case -90:
        // alert('landscape mode screen turned to the right');
    break;

  }

});

    function populateOpaqueImages(){
        var tileIndex = 0;
        for(var i =0; i <  colors.data.length; i++){
            var color = colors.data[i].color;
            var backgroundImg = colors.data[i].images[0];

            $('#'+color+"cell").children('div').find('img').attr("src", backgroundImg + "_deColorD.png");
            tileIndex++;
        }
    }

    $(window).resize(function(){
       var size = views.getTileSize();
       $('.cutoutimage').css({
            height: size.height,
            width: size.width
        });
    });


    $(window).load(function () {   
        $('.tlt').textillate();
        $('#titleheader').html(title_text);

        $('#titleheader').lettering();

        populateOpaqueImages();

        for(i = 1; i <= title_text.length; i++){
            var color_index = i % colors.data.length; 
            var current_color = colors.data[color_index].color;
            $('.char'+ i).addClass(current_color + "-font");
            $('.char'+ i).attr('color', current_color);
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

        $('#titleheader span').click(function(){
             //ignore blank field
            if($(this).hasClass('char6')){
                return;
            }

            var color = $(this).attr('color');
            EmmasApp.audioPlayer.play(color);
        });
    });

    function capitalizeFirstChar(word) {
        return word.toLowerCase().replace(/\b[a-z]/g, function (char) {
            return char.toUpperCase();
        });
    }
})();