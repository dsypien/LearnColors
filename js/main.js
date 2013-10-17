var selectedColor = null;
var colors = {
    "red": {
        "images": ["images/red/apple"
                    , "images/red/cherry"
                    , "images/red/pepper"
                    , "images/red/raspberry"
                    , "images/red/tomato"
                    , "images/red/tomatoe"
                    , "images/red/watermellon"
        ]
    },
    "orange": {
        "images": ["images/orange/apricot"
                    , "images/orange/carrots"
                    , "images/orange/orange"
                    , "images/orange/pie"
        ]
    },
    "yellow": {
        "images": ["images/yellow/banana"
                    , "images/yellow/bee"
                    , "images/yellow/cheese"
                    , "images/yellow/cheese2"
                    , "images/yellow/fish"
                    , "images/yellow/lemon"
                    , "images/yellow/sun"
        ]
    },
    "green": {
        "images": ["images/green/candy"
                    , "images/green/fish"
                    , "images/green/frog"
                    , "images/green/leaf"
                    , "images/green/olive"
                    , "images/green/pear"
                    , "images/green/snake"
                    , "images/green/soybeans"
                    , "images/green/turtle"
        ]
    },
    "blue": {
        "images": ["images/blue/blue"
                    , "images/blue/elephant"
        ]
    },
    "purple": {
        "images": ["images/purple/grapes"
                    , "images/purple/ice-cream"
                    , "images/purple/onion"
        ]
    },
    "black": {
        "images": ["images/black/camera"
                    , "images/black/cat"
                    , "images/black/computer"
                    , "images/black/microphone"
                    , "images/black/tv"
                    , "images/black/tv2"
        ]
    },
    "pink": {
        "images": ["images/pink/flower"
                    , "images/pink/pencil"
                    , "images/pink/pinkbow"
                    , "images/pink/rabbit"
        ]
    },
    "brown": {
        "images": ["images/brown/cake"
                    , "images/brown/chocolate"
                    , "images/brown/cookie"
                    , "images/brown/dog"
                    , "images/brown/hamster"
        ]
    }
};

var viewstack = new Array();

function getCurrentView() {
    var size = viewstack.length;

    if (size < 1) {
        return null;
    }
    
    return viewstack[size - 1];
}

$(document).ready(function () {
    $('#main').animate({
        opacity: 1.0
    }, 1000);

    viewstack.push("#mainview");

    for (i = 0; i < 4; i++) {
        $('#cutoutimage' + i).droppable({
            accept: "#imagetile" +  i,
            drop: function (event, ui) {
                $(ui.draggable).animate({
                    opacity: 0
                }, 300, function () {
                    var num = ui.draggable.attr("num");
                    $('#cutoutimage' + num).css("opacity", "0");
                    $('#cutoutimage' + num)
                        .css("background-image", "url(" + colors[selectedColor].images[num] + ".png)")
                        .animate({ opacity: 1 });
                });
            }
        });
    }

    $('#imgprevious').click(function () {
        var curview = viewstack.pop();

        $(getCurrentView()).show();
        $(getCurrentView()).animate({
            "height": "90%",
            "opacity": "100"
        }, 1000, function () {
            $(curview).css("height", 0);
            $('.cutoutimage').css("visibility", "hidden");
        }
		);

        // If the current view is the only view on the stack, there is
        // no previous view.  Hide the imgprevious button
        if (viewstack.length == 1) {
            $('#imgprevious').css("visibility", "hidden");
        }
    });

    $('.tilebutton').click(function () {
        selectedColor = this.parentNode.attributes.color.nodeValue

        var tileLabelString = capitalizeFirstChar(selectedColor);
        $('#bigtilelabel').html(tileLabelString);
        generateImageTiles();

        $('#tileview').css({
            "height": "90%"
        });

        $('#bigtile').attr("class", selectedColor + "tile");        

        for (i = 0; i < 4; i++) {
            $('#imagetile' + i).css("background-image", "url(" + colors[selectedColor].images[i] + ".png)");
            $('#cutoutimage' + i).css("background-image", "url(" + colors[selectedColor].images[i] + "_deColorD.png)");
        }
         
        hideview('#mainview');
        viewstack.push("#tileview");
        $('#imgprevious').css("visibility", "visible");
        $('.cutoutimage').css("visibility", "visible");
    });
});

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

function hideview(viewname) {
    $(viewname).animate({
        "height": "0",
        "opacity": "0"
    }, 500, function () {
        $(viewname).hide();
        var size = getImageTileSize();
        $('.cutoutimage').css({
            height: size.height,
            width: size.width
        });
    });
}