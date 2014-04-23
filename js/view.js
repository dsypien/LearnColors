var viewstack = [];

function getCurrentView() {
    var size = viewstack.length;

    if (size < 1) {
        return null;
    }
    
    return viewstack[size - 1];
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

function getImageTileSize() {
    var size = {
        width : $('.imagetile').width(),
        height : $('.imagetile').height()
    };
   
    return size;
}

function updateVerticalAlignment(outercontrolid, innercontrolid){
  var outerheight = $('#' + outercontrolid).height();
  var innerheight = $('#' + innercontrolid).height();

  var topPadding = (outerheight - innerheight) / 2;
  $('#' + innercontrolid).css("top", topPadding);
}