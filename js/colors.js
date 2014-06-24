var EmmasApp = EmmasApp || {};

EmmasApp.colors = function (){
    return {
        data : [
            {   color: "red",
                "images": ["images/red/apple", "images/red/cherry", "images/red/pepper", "images/red/raspberry", "images/red/tomato", "images/red/tomatoe", "images/red/watermelon"]
            },
            {   color: "orange",
                "images": ["images/orange/apricot", "images/orange/carrots", "images/orange/orange", "images/orange/pie"]
            },
            {   color: "yellow",
                "images": ["images/yellow/banana", "images/yellow/bee", "images/yellow/cheese", "images/yellow/cheese2", "images/yellow/fish", "images/yellow/lemon", "images/yellow/sun"]
            },
            {   color: "green",
                "images": ["images/green/candy", "images/green/fish", "images/green/frog", "images/green/leaf", "images/green/olive", "images/green/pear", "images/green/snake", "images/green/soybeans", "images/green/turtle"]
            },
            {   color: "blue",
                "images": ["images/blue/blue", "images/blue/elephant", "images/blue/bird", "images/blue/butterfly"]
            },
            {   color: "purple",
                "images": ["images/purple/grapes", "images/purple/ice-cream", "images/purple/onion", "images/purple/star"]
            },
            {   color: "black",
                "images": ["images/black/camera", "images/black/cat", "images/black/computer", "images/black/microphone", "images/black/tv", "images/black/tv2"]
            },
            {   color: "pink",
                "images": ["images/pink/flower", "images/pink/pencil", "images/pink/pinkbow", "images/pink/rabbit"]
            },
            {   color: "brown",
                "images": ["images/brown/cake", "images/brown/chocolate", "images/brown/cookie", "images/brown/dog", "images/brown/hamster", "images/brown/tedy"]
            }
        ],
        objByColor : function(color){
            return $.grep(this.data, function(e){ return e.color == color; })[0];
        }
    };
}();