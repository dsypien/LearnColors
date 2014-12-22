EmmasApp.matchgame = (function (){

    var matched_items = 0,
        imageToCutout = [],
        selectedColor = null,
        selectedIndex,
        colors = EmmasApp.colors,
        views = EmmasApp.views;

     
    function generateImageTiles() {
        matched_items = 0;

        // Clear all images in tile column2
        $('#tilecolumn2').html("");

        for (i = 0; i < 4; i++) {
            $('<div/>', {
                id :'imagetile' + i,
                "class": "imagetile",
                "num": i
            }).appendTo('#tilecolumn2');
        }

        $('.imagetile').draggable({
            // containment: "document",
            revert: function (event, ui) {
                $(this).data("uiDraggable").originalPosition = {
                    top: 0,
                    left: 0
                };
                return !event;
            }
        });
    }

    function addDropEventHandlers(imageAry){
            for (i = 0; i < 4; i++) {
            var obj = $.grep(imageAry, function(e){ return e.filename ==  imageAry[i].filename; });

            $('#droppable' + obj[0].index).droppable({
                accept: "#imagetile" + i ,
                drop: function (event, ui) {                
                    $(ui.draggable).animate({
                        opacity: 0
                    }, 300, function () {
                        var num = parseInt(ui.draggable.attr("num"));

                        var cutoutindex = parseInt(imageToCutout.indexOf(num));

                        $('#cutoutimage' + cutoutindex).css("opacity", "0");
                        $('#cutoutimage' + cutoutindex)
                            .css("background-image", "url(" + colors.objByColor(selectedColor).images[cutoutindex] + ".png)")
                            .animate({ opacity: 1 });
                    });

                    matched_items++;

                    if(matched_items == 4){
                        congratulate();
                        setTimeout( function(){
                            views.previous();

                            $('.balloon').animate({
                                top : '-500px',
                              }, 2000, function(){
                                $('.balloon').remove();
                              });
                        }, 7800);
                    }
                }
            });
        }
    }

    function congratulate(){
        EmmasApp.audioPlayer.play("applause");
          var baloons =$( 
              '<div class="balloon">' +
                '<div><span class="smiley">☺</span></div>' +
                '<div><span>Y</span></div>' +
                '<div><span>A</span></div>' +
                '<div><span>Y</span></div>' +
                '<div><span>!</span></div>' +
              '</div>'),
            windowHeight = $(window).height(),
            windowWidth = $(window).width();


          baloons.appendTo('#tileview');


          baloons.width = $('.balloon div').first().width() * $('.balloon div').length;
          baloons.height = $('.balloon div').first().height();

          var top = (windowHeight - baloons.height) / 2;
          var left = (windowWidth - baloons.width) / 2;
          $('.balloon').css({
            'top' : windowHeight,
            'left' : left
          });

          $('.balloon').animate({
            top : 100,
          }, 5000);
    }

   function positionDroppables(){
        var offset_0 = $('#cutoutimage0').offset();
        var offset_1 = $('#cutoutimage1').offset();
        var offset_2 = $('#cutoutimage2').offset();
        var offset_3 = $('#cutoutimage3').offset();
        var imageWidth = $('.cutoutimage').width();
        var imageHeight = $('#cutoutimage0').height();
        var droppableHeight = imageHeight * 1.5;
        var droppableWidth = imageWidth * 1.5;

        console.log(offset_0);
        console.log(offset_1);
        console.log(offset_2);
        console.log(offset_3);

        $('.droppable').width( droppableWidth);
        $('.droppable').height( droppableHeight );

        $('#droppable0').offset({top:offset_0.top - (imageHeight/4), left: offset_0.left - (imageWidth / 4)});
        $('#droppable1').offset({top:offset_1.top - (imageHeight/4), left: offset_1.left - (imageWidth / 4)});
        $('#droppable2').offset({top:offset_2.top - (imageHeight/4), left: offset_2.left - (imageWidth / 4)});
        $('#droppable3').offset({top:offset_3.top - (imageHeight/4), left: offset_3.left - (imageWidth / 4)});
    }

    return {
        onCellClick : function (colorClicked){
            selectedColor = colorClicked;
            $('#bigtilelabel').html(selectedColor);
            generateImageTiles();

            $('#tileview').css({
                "height": "90%"
            });

            $('#bigtile').attr("class", selectedColor);    

            colors.objByColor(selectedColor).images.shuffle();

            // Set the background of each cutout image object
            for (i = 0; i < 4; i++) {
                document.getElementById('cutoutimage' + i).style.backgroundImage =
                    "url(" + colors.objByColor(selectedColor).images[i] + "_deColorD.png)";
                $('#cutoutimage' + i).attr("num", i);
            }

            // Create an aray of image file names
            var imageAry = [];
            for (i = 0; i < 4; i++) {
                imageAry[i] = {
                    "filename": colors.objByColor(selectedColor).images[i] ,
                    "index" : i 
                };
            }

            //shuffle images
            imageAry.shuffle();

            for (i = 0; i < 4; i++) {
                var obj = $.grep(imageAry, function(e){ return e.filename ==  imageAry[i].filename; })
                var image = "url(" + imageAry[obj[0].index].filename + ".png)";

                document.getElementById('imagetile' + obj[0].index).style.backgroundImage = image;
                $('#imagetile' + obj[0].index).attr("num", obj[0].index);
                var obj = $.grep(imageAry, function(e){ return e.filename ==  imageAry[i].filename; })
                imageToCutout[obj[0].index]= i;
            }

            addDropEventHandlers(imageAry);
             
            views.push("#mainview");
            views.show("#tileview");
            views.hide('#mainview', function(){
                positionDroppables();
            });
            
            $('.cutoutimage').css("visibility", "visible");
        }
    };
}());