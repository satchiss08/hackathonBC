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
            $('#option1').draggable({ revert: "invalid" });
            $('#option2').draggable({ revert: "invalid" });
            $('#option3').draggable({ revert: "invalid" });
            $('#option4').draggable({ revert: "invalid" });
            $('#option5').draggable({ revert: "invalid" });
            $('#dropDiv').droppable({
                activeClass: "ui-state-default",
                hoverClass: "ui-state-hover",
                drop: function(event, ui)
                {
                    /*$(this).css("background-color", "#00FFFF");*/
                    var element = $(ui.draggable).detach();
                    $('#dropDiv').append(element);
                    $(element).css('left', 0);
                }
            });
        },

        dragDrop: function()
        {
            var fff = $('#option1');
            fff.draggable();
        }
    });

    return HomeView;
});
