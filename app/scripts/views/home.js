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
    var price;
    var genre;

         var HomeView = Backbone.View.extend({
        el: $('#container'),

        events:
        {
            'click #btnSent': 'dataSent'
        },

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
                accept: ":not(.ui-sortable-helper)",
                drop: function(event, ui)
                {
                    var element = $(ui.draggable).detach();
                    $('#label-margin-drop').append(element);
                    $(element).css('left', 0).css('top', 0);


                    /*$( this ).find( ".placeholder" ).remove();
                    $( "#label-margin-drop" ).text( ui.draggable.text() ).appendTo( this );*/
                }
            }).sortable({
                  items: "label",
                  sort: function() {
                    // gets added unintentionally by droppable interacting with sortable
                    // using connectWithSortable fixes this, but doesn't allow you to customize active/hoverClass options
                    $( this ).removeClass( "ui-state-default" );
                  }
                });
        },

        dataSent: function(event, ui)
        {
            var data = [];
            price = $('#inpPrice').val();

            var lista=document.getElementById('label-margin-drop');

            if($("input[name = optionsRadios]:checked").val()){
                genre = $('[name="optionsRadios"]:checked').attr('value');
            }
       
            alert(lista.childNodes[1].id);
            alert(price);
            alert(genre);

        }
    });

    return HomeView;
});
