var matched_items = 0;
 
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
            }
            
            return !event;
        }
    });
}

function addDropEventHandlers(imageAry){
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

                matched_items++;

                if(matched_items == 4){
                    setTimeout( function(){
                        alert("Congratulations ! :-)");
                        goToPreviousView();
                    }, 1200);
                }
            }
        });
    }
}