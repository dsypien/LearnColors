var colors = {
    "red": {
        "images": ["images/red/apple.png"
                    , "images/red/cherry.png"
                    , "images/red/pepper.png"
                    , "images/red/raspberry.png"
                    , "images/red/tomato.png"
                    , "images/red/tomatoe.png"
                    , "images/red/watermellon.png"
        ]
    },
    "orange": {
        "images": ["images/orange/apricot.png"
                    , "images/orange/carrots.png"
                    , "images/orange/orange.png"
                    , "images/orange/pie.png"
        ]
    },
    "yellow": {
        "images": ["images/yellow/banana.png"
                    , "images/yellow/bee.png"
                    , "images/yellow/cheese.png"
                    , "images/yellow/cheese2.png"
                    , "images/yellow/fish.png"
                    , "images/yellow/lemon.png"
                    , "images/yellow/sun.png"
        ]
    },
    "green": {
        "images": ["images/green/candy.png"
                    , "images/green/fish.png"
                    , "images/green/frog.png"
                    , "images/green/leaf.png"
                    , "images/green/olive.png"
                    , "images/green/pear.png"
                    , "images/green/snake.png"
                    , "images/green/soybeans.png"
                    , "images/green/turtle.png"
        ]
    },
    "blue": {
        "images": ["images/blue/blue.png"
                    , "images/blue/elephant.png"
        ]
    },
    "purple": {
        "images": ["images/purple/grapes.png"
                    , "images/purple/ice-cream.png"
                    , "images/purple/onion.png"
        ]
    },
    "black": {
        "images": ["images/black/camera.png"
                    , "images/black/cat.png"
                    , "images/black/computer.png"
                    , "images/black/microphone.png"
                    , "images/black/tv.png"
                    , "images/black/tv2.png"
        ]
    },
    "pink": {
        "images": ["images/pink/flower.png"
                    , "images/pink/pencil.png"
                    , "images/pink/pinkbow.png"
                    , "images/pink/rabbit.png"
        ]
    },
    "brown": {
        "images": ["images/brown/cake.png"
                    , "images/brown/chocolate.png"
                    , "images/brown/cookie.png"
                    , "images/brown/dog.png"
                    , "images/brown/hamster.png"
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

    $('#previousview').click(function () {
        var curview = viewstack.pop();

        $(getCurrentView()).show();
        $(getCurrentView()).animate({
            "height": "90%"
        }, 1000, function () {
            $(curview).css("height", 0);
        }
		);

        // If the current view is the only view on the stack, there is
        // no previous view.  Hide the previousview button
        if (viewstack.length == 1) {
            $('#previousview').css("visibility", "hidden");
        }
    });

    $('.tilebutton').click(function () {
        $('#tileview').css({
            "height": "90%"
        });

        $('#bigtile').attr("class", this.parentNode.attributes.color.nodeValue + "tile");
        $('.imagetile').attr("class", "imagetile " + this.parentNode.attributes.color.nodeValue + "tile");

        hideview('#mainview');
        viewstack.push("#tileview");
        $('#previousview').css("visibility", "visible");
    });
});

function hideview(viewname) {
    $(viewname).animate({
        "height": "0"
    }, 500, function () {
        $(viewname).hide();
    }
	);
}