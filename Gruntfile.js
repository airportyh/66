module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-contrib-jasmine');

    grunt.config.set('jasmine.66', {
        options: {
            specs: 'index.spec.js',
            template: require('grunt-template-jasmine-requirejs'),
            keepRunner: true
        }
    });

    grunt.registerTask('test', [
        'jasmine'
    ]);
};
