var views = (function(){
    var viewstack = [];

    function getCurrentView() {
        var size = viewstack.length;

        if (size < 1) {
            return null;
        }
        
        return viewstack[size - 1];
    }

    function goToPreviousView(){
        var curview = viewstack.pop();

        // if viewstack's length is zero we are at main menu need to display 100%
        // only 90% otherwise because other views have menubar that take up 10% of screen
        var height = viewstack.length === 0 ? "100%" : "90%";

        if(curview !== null){
            $(curview).show();
            $(curview).animate({
                "height": height,
                "opacity": "1"
                }, 500
            );
        }
    }

    function hideView(viewname) {
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

    return {
        get_current : getCurrentView(),
        getTileSize : function(){
            return getImageTileSize()
        },
        previous : function(){ 
            goToPreviousView();
        },
        hide : function(n){
            hideView(n);
        } ,
        push : function(n){
            viewstack.push(n);
        }
    };
}());