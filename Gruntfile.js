module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        shell: {
            mongodb: {
                command: 'run_mongo.bat',
                options: {
                    async: true,
                    stdout: true
                }
            }
        },

        execute: {
            target: {
                src: ['server.js']
            }
        },

        exit: {
            normal: {}
        },

        jshint: {
            all: {
                src: ['server.js', 'server/**/*.js', 'public/js/*.js']
            }
        },

        csslint: {
            all: {
                src: ['public/css/*.css']
            }
        },

        nodemon: {
            dev: {
                script: 'server.js',
                options: {
                    ext: 'js,html',
                    watch: ['server.js', 'server/**/*.js']
                }
            }
        },
        watch: {
            js: {
                files: ['server.js', 'server/**/*.js', 'public/js/*.js'],
                tasks: ['jshint']
            },
            css: {
                files: 'public/css/*.css',
                tasks: ['csslint']
            },
            all: {
                tasks: ['reload'],
                files: ['public/*.*']
            }
        },
        concurrent: {
            dev: {
                tasks: ['nodemon', 'watch'],
                options: {
                    logConcurrentOutput: true
                }
            },
        },
        open: {
            all: {
                // Gets the port from the connect configuration
                path: 'http://localhost:3000'
            }
        },

        reload: {
            port: 3000,
            proxy: {
                host: 'localhost',
            }
        }
    });

    grunt.loadNpmTasks('grunt-shell-spawn');
    grunt.loadNpmTasks('grunt-exit');
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-csslint');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-open');
	grunt.loadNpmTasks('grunt-reload');

    // Default task(s).
    grunt.registerTask('default', ['shell:mongodb', 'open:all', 'concurrent:dev']);

    grunt.registerTask('lint', ['jshint', 'csslint']);
};