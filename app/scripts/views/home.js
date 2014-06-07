/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'text',
    'text!/scripts/templates/home.html',
    'viewSearch'
], function ($, _, Backbone, text, Template, SearchView) {
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
            new SearchView();
        },

        template : _.template(Template),

        render: function(){
            self.$el.html(self.template);
        }
    });

    return HomeView;
});
