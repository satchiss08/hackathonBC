/*global define*/

define([
    'jquery',
    'jqueryui',
    'underscore',
    'backbone',
    'text',
    'text!/scripts/templates/home.html',
    'text!/scripts/templates/viewcombos.html',
    'carouselView'
    // 'jquerymovingboxes'
    // 'demo'
], function ($, iu , _, Backbone, text, Template, ViewComboTemplate, Carousel) {
    'use strict';

    var self;
    var price;
    var genre;

         var HomeView = Backbone.View.extend({
        el: $('#container'),

        events:
        {
            'click #btnSent': 'requestCombos'
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

        viewcombosTemplate : _.template(ViewComboTemplate),


        addDropDownDiv: function(idItem){
            $('#dropDownOps').append('<div class="col-xs-3">'+
            '<div class="dropdownPrices-2">'+
            '<select id="' + idItem + 'Price' +'" name="pricesList1" value="Prices-Shirts" class="select-block">'+
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
              '<select id="' + idItem + 'Color' + '" name="colorsList1" class="select-block" style="margin-left: 20px;">'+
                '<option id="black" style="background:black;">black</option>'+
                '<option id="red" style="background:red;">red</option>'+
                '<option id="green" style="background:green;">green</option>'+
                '<option id="blue" style="background:blue;">blue</option>'+
                '<option id="white" style="background:white;">white</option>'+
                '<option id="yellow" style="background:yellow;">yellow</option>'+
                '<option id="gray" style="background:gray;">gray</option>'+
                '<option id="pink" style="background:pink;">pink</option>'+
              '</select>'+
            '</div>'+
          '</div>');
          
        },

        render: function(){
            self.$el.html(self.template);
            $('#viewCombos').html(self.viewcombosTemplate)
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
                    // console.log(element[0].id);
                    self.addDropDownDiv($(ui.draggable).attr('id'));
                    $(ui.draggable).draggable('disable');
                    //$('.dropdownPrices-3').toggle('show');
                }
            });
            // .sortable({
            //       items: "label",
            //       sort: function() {
            //         // gets added unintentionally by droppable interacting with sortable
            //         // using connectWithSortable fixes this, but doesn't allow you to customize active/hoverClass options
            //         $( this ).removeClass( "ui-state-default" );
            //       }
            //     });
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

        },

        shirtsQuery: {'q': '', 'filterQueries': ''},

        pantsQuery: {'q': '', 'filterQueries': ''},

        shoesQuery: {'q': '', 'filterQueries': ''},

        searchProducts: function(){
            var url = 'http://localhost:3000/combo';
            $.ajax({
              url: url,
              type: 'GET',
              dataType: 'jsonp',
              data: {
                'shirts': 'q=' + self.shirtsQuery.q + '&filterQueries=' + self.shirtsQuery.filterQueries,
                'pants': 'q=' + self.pantsQuery.q + '&filterQueries' + self.pantsQuery.filterQueries,
                'shoes': 'q=' + self.shoesQuery.q + '&filterQueries' + self.shoesQuery.filterQueries
              },
              success: function(data){
                // self.normalizeProductArray(response.products);
                console.log(data);
              },
              error : function(e){
                console.log(e);
              }
            });
        },

        normalizeProductArray: function(products){
            var i, product;
            for(i in products){
                product = new Object({
                    id: products[i].id, 
                    brand: products[i].brand.name,
                    price: products[i].skus[0].listPrice.toFixed(2),
                    description: products[i].title,
                    imageUrl: 'http://www.backcountry.com/' + products[i].skus[0].image.url
                });
                normalizedProducts.push(product);
            }
            //console.log(normalizedProducts);
            
        },

        requestCombos: function(){

            if($("input[name = optionsRadios]:checked").val()){
                genre = $('[name="optionsRadios"]:checked').attr('value');
                price = $('#inpPrice').val();

                var lista=$('#label-margin-drop').children('.item-option'),
                    colors=$('#label-margin-drop').children('.item-option'),
                    price=$('#label-margin-drop').children('.item-option');

                $(lista).each(function(index, item){
                    // console.log($(item).text());
                    if($(item).text()==='Shirts'){
                        self.shirtsQuery.q = 'shirts ' + $('#'+$(item).attr("id")+'Color').val() + ' ' + genre;
                        self.shirtsQuery.filterQueries = 'filterQueries=' + $('#'+$(item).attr("id")+'Price').children(":selected").attr("id");
                    }
                    else{
                         if($(item).text()==='Pants'){
                            self.pantsQuery.q = 'pants ' + $('#'+$(item).attr("id")+'Color').val() + ' ' + genre;
                            self.pantsQuery.filterQueries = 'filterQueries=' + $('#'+$(item).attr("id")+'Price').children(":selected").attr("id");
                        }
                        else{
                            self.shoesQuery.q = 'shoes ' + $('#'+$(item).attr("id")+'Color').val() + ' ' + genre;
                            self.shoesQuery.filterQueries = 'filterQueries=' + $('#'+$(item).attr("id")+'Price').children(":selected").attr("id");
                        }
                    }

                    console.log("Shirts");
                    console.log(self.shirtsQuery);
                    console.log("Pants");
                    console.log(self.pantsQuery);
                    console.log("Shoes");
                    console.log(self.shoesQuery);

                    self.searchProducts();
                });
            }
            else{
                alert("You have not selected filters yet");
            }

        },

        showCombos: function(){

            $('#viewCombos').draggable().show();
            $(document).mouseup(function (e){
                var container = $("div#viewCombos");
                if (!container.is(e.target) // if the target of the click isn't the container...
                    && container.has(e.target).length === 0) // ... nor a descendant of the container
                {
                    container.hide();
                }
            });
        }

    });

    return HomeView;
});


/* Drag and Drop*/

