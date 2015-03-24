module.exports = function( grunt ){
	grunt.initConfig({
		pkg : grunt.file.readJSON('package.json'),
		uglify : {
		    my_target: {
		   	  options: {
		       	mangle: false
			  },
		      files: {
		          'build/js/output.min.js': [
		          		'js/lib/jquery-1.9.1.js', 
		          		'js/lib/jquery-ui-1.10.3.custom.min.js', 
		          		'js/lib/jquery.ui.touch-punch.min.js', 
		          		'js/lib/jquery.lettering.js', 
		          		'js/lib/jquery.textillate.js', 
		          		'js/audioplayer.js',
		          		'js/colors.js',
		          		'js/view.js',
		          		'js/extensions.js',
		          		'js/flipcard.js',
		          		'js/matchgame.js',
		          		'js/main.js'
		          ]
		      }
		    }
		},
		concat : {
			css : {
				src : ['css/style.css', 'css/baloons.css', 'css/mq.css'],
				dest : 'css/output.css'
			}
		},
		cssmin : {
			minify : {
				expand : true,
				src : ['css/output.css', 'output.min.css'],
				dest : "build/",
				ext: '.min.css'
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-cssmin');

	grunt.registerTask('default', ['uglify', 'concat', 'cssmin']);
};