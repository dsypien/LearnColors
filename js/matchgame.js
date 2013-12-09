var matched_items = 0;
 
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