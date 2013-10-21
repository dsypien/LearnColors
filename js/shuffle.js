// Takes an array as parameter and returns an array with the array's contents shuffled
function shuffle(array) {
    for (i = array.length - 1; i > 0; i--) {
        var temp = array[i];
        var random = Math.floor(Math.random() * (i + 1));

        array[i] = array[random];
        array[random] = temp;
    }

    return array;
}