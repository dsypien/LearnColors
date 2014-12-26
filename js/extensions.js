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