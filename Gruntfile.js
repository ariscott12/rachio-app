module.exports = function(grunt) {
    grunt.initConfig({
        sass: {
            dist: {
                files: {
                    'css/styles.css': 'sass/main.scss',
                }
            }
        },
        cssmin: {
            target: {
                files: [{
                    expand: true,
                    cwd: 'static/css',
                    src: ['*.css', '!*.min.css'],
                    dest: 'static/css',
                    ext: '.min.css'
                }]
            }
        },

        // compiles js modules into single file
        browserify: {
            dist: {
                options: {
                    transform: [
                        ['babelify', {
                            presets: ['es2015', 'react']
                        }]
                    ],
                    watch: true,
                    livereload: true,
                    browserifyOptions: {
                        debug: true // source mapping
                    },
                },
                files: {
                    'js/build/app.js': ['js/*.js']
                },
            }
        },

        // Run local server on specified port
        connect: {
            server: {
                options: {
                    port: 9001,
                    base: '.'
                }
            }
        },

        // Watch files for changes, execute tasks when change happens
        watch: {
            sass: {
                files: ['sass/*.scss'],
                tasks: 'sass'
            },
            browserify: {
                files: ['js/build/*.js'],
                options: {
                    livereload: true
                }
            },
            css: {
                files: ['css/*.css', '!css/*.min.css'],
                tasks: 'cssmin'
            },
            html: {
                files: ['*.html'],
                options: {
                    livereload: true
                }
            }
        }
    });

    // Where we tell Grunt what plugins we are going to use
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-connect');

    // Where we tell Grunt what to do when we type a command into the terminal
    grunt.registerTask('serve', ['connect:server', 'browserify', 'watch']);
    grunt.registerTask('default', ['watch']);
};