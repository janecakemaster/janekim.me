module.exports = function(grunt) {

  grunt.initConfig({
    sass: {
      dist: {
        // options: {
        //   style: 'compressed'
        // },
        expand: true,
        cwd: 'src/sass/',
        src: ['*.scss'],
        dest: './',
        ext: '.min.css'
      },
      dev: {
        options: {
          style: 'expanded',
          lineNumbers: true
        },
        expand: true,
        cwd: 'src/sass/',
        src: ['*.scss'],
        dest: './',
        ext: '.css'
      }
    },

    jshint: {
      files: ['Gruntfile.js', 'src/**/*.js'],
      options: {
        // more options here if you want to override JSHint defaults
        globals: {
          console: true,
          module: true
        }
      }
    },

    copy: {
      main: {
        files: [
        { src: 'src/index.html', dest: 'index.html' },
        { expand: true, cwd: 'node_modules/font-awesome/fonts', src: '*', dest: 'fonts/' }
        ]
      }
    },

    concat: {
      dist: {
        src: ['src/**/*.js'],
        dest: 'build/app.js'
      },
      dev: {
        src: ['src/**/*.js'],
        dest: 'app.js'
      }
    },

    uglify: {
      build: {
        src: 'build/app.js',
        dest: 'app.min.js'
      }
    },

    replace: {
      dist: {
        src: ['src/index.html'],
        dest: 'index.html',
        replacements: [
        { from: 'app.js', to: 'app.min.js' },
        // { from: 'app.css', to: 'app.min.css' }
        ]
      }
    },

    watch: {
      js: {
        files: ['src/**/*.js'],
        tasks: ['concat:dev'],
      },
      css: {
        files: ['src/**/*.scss'],
        tasks: ['sass:dev'],
      },
      html: {
        files: ['src/**/*.html'],
        tasks: ['copy']
      }
    },

    connect: {
      server: {
        options: {
          port: 8080
        }
      }
    },

    clean: {
      dist: [ '.sass-cache', 'build', 'app.js', 'app.css'],
      all: [ '.sass-cache', 'build', 'app.*']
    }
  });

grunt.loadNpmTasks('grunt-contrib-sass');
grunt.loadNpmTasks('grunt-contrib-concat');
grunt.loadNpmTasks('grunt-contrib-uglify');
grunt.loadNpmTasks('grunt-contrib-copy');
grunt.loadNpmTasks('grunt-contrib-watch');
grunt.loadNpmTasks('grunt-contrib-clean');
grunt.loadNpmTasks('grunt-contrib-jshint');
grunt.loadNpmTasks('grunt-text-replace');
grunt.loadNpmTasks('grunt-contrib-connect');

grunt.registerTask('default', ['clean:all', 'sass:dist', 'jshint', 'concat:dist', 'uglify', 'replace', 'clean:dist']);
grunt.registerTask('dev', ['clean:all', 'sass:dev', 'jshint', 'concat:dev', 'copy']);

grunt.registerTask('serve', ['dev', 'connect', 'watch']);

};
