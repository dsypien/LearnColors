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
            containment: "window",
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

            $('#cutoutimage' + obj[0].index).droppable({
                accept: "#imagetile" + i ,
                drop: function (event, ui) {                
                    $(ui.draggable).animate({
                        opacity: 0
                    }, 300, function () {
                        var num = parseInt(ui.draggable.attr("num"));

                        var cutoutindex = parseInt(imageToCutout.indexOf(num));
                        console.log("num: "+ num + "  cutoutindex: " + cutoutindex);

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
                            $('.balloon').remove();
                            //TODO DRAW BALLOONS HERE
                        }, 7800);
                    }
                }
            });
        }
    }

    function congratulate(){
        EmmasApp.audioPlayer.applaud();
          var baloons =$( 
              '<div class="balloon">' +
                '<div><span class="smiley">☺</span></div>' +
                '<div><span>Y</span></div>' +
                '<div><span>A</span></div>' +
                '<div><span>Y</span></div>' +
                '<div><span>!</span></div>' +
              '</div>');

          baloons.appendTo('#tileview');
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
            views.hide('#mainview');
            views.show("#tileview");
            $('.cutoutimage').css("visibility", "visible");
        }
    };
}());