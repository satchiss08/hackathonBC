/*global require*/
'use strict';

require.config({
    shim: {
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: [
                'underscore',
                'jquery'
            ],
            exports: 'Backbone'
        },
        bootstrap: {
            deps: ['jquery'],
            exports: 'jquery'
        },
        jqueryui: {
            exports: '$',
            deps: ['jquery']
        }
    },
    paths: {
        jquery: '../../bower_components/jquery/dist/jquery.min',
        jqueryui: '../../bower_components/jquery/dist/jquery-ui-1.10.4.min',
        backbone: '../../bower_components/backbone/backbone',
        underscore: '../../bower_components/underscore/underscore',
        bootstrap: '../../bower_components/bootstrap/dist/js/bootstrap.min',
        text: '../../bower_components/requirejs-text/text',
        router: 'routes/router',
        viewHome: 'views/home'
    }
});

require([
    'views/app'
], function (App) {
    new App();
});
