/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'router'
], function ($, _, Backbone, Router) {
    'use strict';

    var AppView = Backbone.View.extend({
        initialize: function(){
            new Router();

            Backbone.history.start();
        }
    });

    return AppView;
});
