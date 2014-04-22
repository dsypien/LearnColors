// Array extensions
Array.prototype.shuffle =  function() {
    for (i = this.length - 1; i > 0; i--) {
        var temp = this[i];
        var random = Math.floor(Math.random() * (i + 1));

        this[i] = this[random];
        this[random] = temp;
    }

    return this;
};

//Jquery Extensions
jQuery.fn.extend({
  adjustFont: function() {
    var width = this.width();
    var height = this.height();
    var fontsize;

    if((width / 3) < height){
        fontsize = width / 15;
    }
    else{
        fontsize =  height /5;
    }

    this.css("font-size", fontsize );
  }
});