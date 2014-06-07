/*global define*/

define([
    'jquery',
    'jqueryui',
    'underscore',
    'backbone',
    'text',
    'text!/scripts/templates/home.html'
], function ($, iu , _, Backbone, text, Template) {
    'use strict';

    var self;

         var HomeView = Backbone.View.extend({
        el: $('#container'),


        initialize: function(){
            self = this;
            this.render();
            //self.dragDrop();
        },

        template : _.template(Template),

        render: function(){
            self.$el.html(self.template);
            $('#option1').draggable();
            $('#option2').draggable();
            $('#option3').draggable();
            $('#option4').draggable();
            $('#option5').draggable();
        },

        dragDrop: function()
        {
            var fff = $('#option1');
            fff.draggable();
        }
    });

    return HomeView;
});
