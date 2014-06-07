/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'text',
    'text!/scripts/templates/home.html'
], function ($, _, Backbone, text, Template) {
    'use strict';

    var username,
        self,

        HomeView = Backbone.View.extend({
        el: $('#container'),

        events: {
            '':''
        },

        initialize: function(){
            self = this;
        },

        template : _.template(Template),

        render: function(){
            self.$el.html(self.template);
        }
    });

    return HomeView;
});
