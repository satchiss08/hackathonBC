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
        normalizedProducts,

        SearchView = Backbone.View.extend({
        el: $('#container'),

        events: {
            '':''
        },

        initialize: function(){
            self = this;
            normalizedProducts = [];
            self.searchProducts("shirts");
        },

        template : _.template(Template),

        render: function(){
            self.$el.html(self.template);
        },

        searchProducts: function(query){
            var url = 'http://hackathon.backcountry.com:8081/hackathon/public/product/v1/products';

            $.ajax({
              url: url,
              type: 'GET',
              data: {'q':query, 'site': 'bcs'},
              dataType: 'jsonp',
              success: function(response){
                self.normalizeProductArray(response.products);
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
            console.log(normalizedProducts);
        }
    });

    return SearchView;
});
