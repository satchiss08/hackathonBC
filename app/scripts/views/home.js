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
            'click #btnSent': 'dataSent',
            'click .item-option': 'priceSelected'
        },

        priceSelected: function(event){
            console.log(event.target.id);
        },

        initialize: function(){
            self = this;
            this.render();
            //self.dragDrop();
        },

        template : _.template(Template),


        addDropDownDiv: function(idItem){
            $('#dropDownOps').append('<div class="col-xs-3">'+
            '<div class="dropdownPrices-2">'+
            '<select id="' + idItem + '" name="pricesList1" value="Prices-Shirts" class="select-block">'+
                '<option id="salePriceUS%3A%5B*+TO+25%5D" value="0">Under $25</option>'+
                '<option id="salePriceUS%3A%5B25+TO+50%5D" value="1">$25 to $50</option>'+
                '<option id="salePriceUS%3A%5B50+TO+75%5D" value="2">$50 to $75</option>'+
                '<option id="salePriceUS%3A%5B75+TO+100%5D" value="3">$75 to $100</option>'+
                '<option id="salePriceUS%3A%5B100+TO+125%5D" value="4">$100 to $125</option>'+
                '<option id="salePriceUS%3A%5B125+TO+150%5D" value="5">$125 to $150</option>'+
                '<option id="salePriceUS%3A%5B150+TO+200%5D" value="6">$150 to $200</option>'+
                '<option id="salePriceUS%3A%5B200+TO+250%5D" value="7">$200 to $250</option>'+
                '<option id="salePriceUS%3A%5B300+TO+400%5D" value="8">$300 to $400</option>'+
                '<option id="salePriceUS%3A%5B400+TO+500%5D" value="9">$400 to $500</option>'+
              '</select>'+
            '</div>'+
          '</div>');
        },

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
                    console.log(element[0].id);
                    self.addDropDownDiv($(ui.draggable).attr('id'));

                    $('.dropdownPrices-3').toggle('show');
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


/* Drag and Drop*/

