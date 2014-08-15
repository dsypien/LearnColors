module.exports = function( grunt ){
	grunt.initConfig({
		pkg : grunt.file.readJSON('package.json'),
		uglify : {
		    my_target: {
		   	  options: {
		       	mangle: false
			  },
		      files: {
		          'build/output.min.js': [
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
		cssmin : {
			minify : {
				expand : true,
				cwd : 	'css/',
				src : ['*.css', '!*min.css'],
				dest : "build/min",
				ext: '.min.css'
			}
		},
		concat : {
			css : {
				src : 'build/min/*.css',
				dest : 'build/package.min.css'
			}
		}

	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-concat');

	grunt.registerTask('default', ['uglify', 'cssmin', 'concat']);
};