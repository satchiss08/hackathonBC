/*global define*/

define([
    'jquery',
    'backbone',
    'viewHome'
], function ($, Backbone, ViewHome) {
    'use strict';

    var homeView,
        
        Router = Backbone.Router.extend({
        routes: {
            "" : "home"
        },

        initialize: function(){
        	homeView = new ViewHome();
        },

        home: function(){
            homeView.render();
        }

    });

    return Router;
});
