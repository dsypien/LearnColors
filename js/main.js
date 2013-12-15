var selectedColor = null;
var colors = new Colors();
var imageToCutout = new Array();

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

function updateCellWidth(){
    var cell_width = Math.floor( $( document ).width() / 3 ) - 6 ;
    $('.cell').width(cell_width);
}

$(window).resize(function(){
    updateCellWidth();
})

$(document).ready(function () {
    updateCellWidth();
    
    $('.tlt').textillate();
    $('#titleheader').fitText(0.8);
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
        AddFlipCardFunctionality();
        hideview('#mainmenu');
        viewstack.push("#mainmenu");
    });

    $('.cell').click(function () {
        selectedColor = this.attributes.color.nodeValue;
        onCellClick();
    });
});

function onPreviousClick(){
   goToPreviousView();
}

function goToPreviousView(){
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

    addDropEventHandlers(imageAry);
     
    viewstack.push("#mainview");
    hideview('#mainview');
    $('.cutoutimage').css("visibility", "visible");
}

function capitalizeFirstChar(word) {
    return word.toLowerCase().replace(/\b[a-z]/g, function (char) {
        return char.toUpperCase();
    });
}

function getImageTileSize() {
    var size = {
        width : $('.imagetile').width(),
        height : $('.imagetile').height()
    };
   
    return size;
}
