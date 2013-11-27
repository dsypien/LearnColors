var selectedColor = null;
var colors = new Colors();
var imageToCutout = new Array();
var flipView = 
    '<div id="learnview" class="flip">' +
        '<div class="card">' +
            '<div class="face front">Front</div>' +
            '<div class="face back">Back</div>' +
        '</div>' +
    '</div>';

function hideSplashScreen(milliseconds){
    setTimeout( function(){
     $('#splashscreen').remove();
    }, milliseconds);
}

function populateOpaqueImages(){
    var tileIndex = 0;
    for(var color in colors.data){
        var backgroundImg = colors.data[color].images[0];

        $('#'+color+"cell").children(".tilebutton").css("background-image","url("+ backgroundImg + "_deColorD.png)");
        tileIndex++;
    }
}

$(document).ready(function () {
    $('.tlt').textillate();
    populateOpaqueImages();
    hideSplashScreen(400);

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
        $(flipView).insertAfter('#menubar');
        $('.flip').click(function(){
           $(this).find('.card').addClass('flipped').mouseleave(function(){
               $(this).removeClass('flipped');
           });
           return false;
        });

        hideview('#mainmenu');
        viewstack.push("#mainmenu");
    });

    $('.cell').click(function () {
        selectedColor = this.attributes.color.nodeValue;
        onCellClick();
    });
});

function onPreviousClick(){
     var curview = viewstack.pop();

    // if viewstack's length is zero we are at main menu need to display 100%
    // only 90% otherwise because other views have menubar that take up 10% of screen
    var height = viewstack.length == 0 ? "100%" : "90%";

    if(curview != null){
        $(curview).show();
        $(curview).animate({
            "height": height,
            "opacity": "1"
            }, 1000
        );
    }   
}

function onCellClick(){
    var tileLabelString = capitalizeFirstChar(selectedColor);
    $('#bigtilelabel').html(tileLabelString);
    generateImageTiles();

    $('#tileview').css({
        "height": "90%"
    });

    $('#bigtile').attr("class", selectedColor + "tile");        

    // Set the background of each cutout image object
    for (i = 0; i < 4; i++) {
        document.getElementById('cutoutimage' + i).style.backgroundImage =
            "url(" + colors.data[selectedColor].images[i] + "_deColorD.png)";
        $('#cutoutimage' + i).attr("num", i)
    }

    // Create an aray of image file names
    var imageAry = new Array();
    for (i = 0; i < 4; i++) {
        imageAry[i] = {
            "filename": colors.data[selectedColor].images[i] ,
            "index" : i 
        };
    }

    //shuffle images
    imageAry = shuffle(imageAry);

    for (i = 0; i < 4; i++) {
        var obj = $.grep(imageAry, function(e){ return e.filename ==  imageAry[i].filename; })
        var image = "url(" + imageAry[obj[0].index].filename + ".png)";

        document.getElementById('imagetile' + obj[0].index).style.backgroundImage = image;
        $('#imagetile' + obj[0].index).attr("num", obj[0].index);
        var obj = $.grep(imageAry, function(e){ return e.filename ==  imageAry[i].filename; })
        imageToCutout[obj[0].index]= i;
    }

    for (i = 0; i < 4; i++) {
        var obj = $.grep(imageAry, function(e){ return e.filename ==  imageAry[i].filename; })

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
                        .css("background-image", "url(" + colors.data[selectedColor].images[cutoutindex] + ".png)")
                        .animate({ opacity: 1 });
                });
            }
        });
    }
     
    viewstack.push("#mainview");
    hideview('#mainview');
    $('.cutoutimage').css("visibility", "visible");
}

function capitalizeFirstChar(word) {
    return word.toLowerCase().replace(/\b[a-z]/g, function (char) {
        return char.toUpperCase();
    });
}

function generateImageTiles() {
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
            }
            return !event;
        }
    });
}

function getImageTileSize() {
    var size = {
        width : $('.imagetile').width(),
        height : $('.imagetile').height()
    };
   
    return size;
}
