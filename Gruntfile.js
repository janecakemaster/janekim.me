module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    sass: {
      dist: {
        options: {
          style: 'compressed'
        },
        files: {
          'app.min.css': [
            'node_modules/normalize.css/normalize.css',
            'src/sass/app.scss'
          ]
        }
      }
    },

    concat: {
      dist: {
        src: [
          // 'src/js/libs/*.js',
          'src/js/*.js'
        ],
        dest: 'build/app.js'
      }
    },

    uglify: {
      build: {
        src: 'build/app.js',
        dest: 'app.min.js'
      }
    },

    copy: {
      main: {
        src: 'src/index.html',
        dest: 'index.html'
      }
    },

    watch: {
      options: {
        livereload: true,
      },
      js: {
        files: ['src/js/*.js'],
        tasks: ['concat', 'uglify'],
      },
      css: {
        files: ['src/sass/*.scss'],
        tasks: ['sass'],
      }
    },

    clean: {
      dist: [
        '.sass-cache',
        'build'
      ],
      all: [
        '.sass-cache',
        'build',
      ]
    }

  });

  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.registerTask('default', ['clean:all', 'sass', 'concat', 'uglify', 'copy', 'clean:dist']);

};
