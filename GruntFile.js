module.exports = function( grunt ){
	grunt.initConfig({
		pkg : grunt.file.readJSON('package.json'),
		uglify : {
			options : {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
			},
		    my_target: {
		      files: [{
		          expand: true,
		          cwd: 'js/',
		          src: '**/*.js',
		          dest: 'build/min/',
		          ext: '.min.js'
		      }]
		    }
		},
		cssmin : {
			options : {
				banner : '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
			},
			files : {
				'build/thermometer.min.css' : ['css/thermometer.css']
			},
			minify : {
				expand : true,
				cwd : 	'css/',
				src : ['*.css', '!*min.css'],
				dest : "build/min",
				ext: '.min.css'
			}
		},
		concat : {
			js : {
				src : 'build/min/*.js',
				dest : 'build/package.min.js'
			},
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