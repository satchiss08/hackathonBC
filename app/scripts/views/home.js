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
        productExample,

        HomeView = Backbone.View.extend({
        el: $('#container'),

        events: {
            '':''
        },

        initialize: function(){
            self = this;
            self.getProduct('PAT1629');
        },

        template : _.template(Template),

        render: function(){
            self.$el.html(self.template);
        },

        getProduct: function(productId){
            var url = 'http://hackathon.backcountry.com:8081/hackathon/public/product/v1/products/' + productId;

            $.ajax({
              url: url,
              type: 'GET',
              dataType: 'jsonp',
              success: function(product){
                productExample = 'http://www.backcountry.com/' + product.products[0].detailImages[0].url;
                $('#image1.imageContainer').css('background-image', 'url(' + productExample + ')');
              },
              error : function(e){
                console.log(e);
              }
            });
        }
    });

    return HomeView;
});
