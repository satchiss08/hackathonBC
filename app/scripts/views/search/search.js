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
            self.searchProducts('shirts black women', 'salePriceUS%3A%5B*+TO+25%5D');
        },

        template : _.template(Template),

        render: function(){
            self.$el.html(self.template);
        },

        shirtsQuery: {'q': 'shirts black men', 'filterQueries': 'salePriceUS%3A%5B*+TO+25%5D'},

        pantsQuery: {'q': 'pants black men', 'filterQueries': 'salePriceUS%3A%5B*+TO+25%5D'},

        shoesQuery: {'q': 'shoes black men', 'filterQueries': 'salePriceUS%3A%5B*+TO+25%5D'},

        searchProducts: function(hints, priceFilter){
            var url = 'http://localhost:3000/combo';
            $.ajax({
              url: url,
              type: 'GET',
              dataType: 'jsonp',
              data: {
                'shirts': 'q=' + self.shirtsQuery.q + '&filterQueries=' + self.shirtsQuery.filterQueries,
                'pants': 'q=' + self.pantsQuery.q + '&filterQueries' + self.pantsQuery.filterQueries,
                'shoes': 'q=' + self.shoesQuery.q + '&filterQueries' + self.shoesQuery.filterQueries
                // 'q':hints, 'filterQueries': priceFilter
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
            
        }
    });

    return SearchView;
});
