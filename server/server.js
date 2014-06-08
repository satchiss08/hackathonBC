var express = require('express'),
    // request = require('superagent'),
    request = require('request'),

    shirtsResponse,
    pantsResponse,
    shoesResponse,
    comboItem,
    comboResponse;




function options(filters){
	return {
	url: 'http://hackathon.backcountry.com:8081/hackathon/public/product/v1/products?' + filters + '&site=bcs',
    json: true,
    method: 'get'
	}  
};

var app = express();

// Main function, sends a request for filtered products
app.get('/combo', function(req, res){
  comboResponse = [];
  var filters = '', field,
  	shirtsData = req.query.shirts,
  	pantsData = req.query.pants,
  	shoesData = req.query.shoes;

  	// console.log(shirtsData);
  	// console.log(pantsData);
  	// console.log(shoesData);

  	// Request for shirts
  	request(options(shirtsData), function(error, response, body) {
      if (!error && response.statusCode == 200) {
    	shirtsResponse = body.products;
        // console.log(shirtsResponse);
      }
      else {
          console.log(response.statusCode);
          console.log(response.body);
      }
    });

    // Request for pants
    request(options(pantsData), function(error, response, body) {
      if (!error && response.statusCode == 200) {
    	pantsResponse = body.products;
        // console.log(pantsResponse);
      }
      else {
          console.log(response.statusCode);
          console.log(response.body);
      }
    });

    // Request for shoes
    request(options(shoesData), function(error, response, body) {
      if (!error && response.statusCode == 200) {
    	shoesResponse = body.products;
        // console.log(shoesResponse);


        // for(var item in shirtsResponse){
        // 	console.log(pantsResponse[0]);
        // }
     //    console.log('\n\n\n\n\n');
     //    console.log(shirtsResponse);
	    // res.type("application/json");
	    // res.jsonp({camisas: shirtsResponse});

         var comboId = 0;
         while(comboId < 10){
         	comboItem = {
        		shirt: {
         			image: shirtsResponse[comboId].skus[0].image.url,
         			brand: shirtsResponse[comboId].brand.name,
         			description: shirtsResponse[comboId].title,
         			price: shirtsResponse[comboId].skus[0].salePrice,
         			productLink: shirtsResponse[comboId].skus[0].url
          			// 'objetocamisa'
         		},
        
        		pant: {
        			image: pantsResponse[comboId].skus[0].image.url,
        			brand: pantsResponse[comboId].brand.name,
        			description: pantsResponse[comboId].title,
        			price: pantsResponse[comboId].skus[0].salePrice,
        			productLink: pantsResponse[comboId].skus[0].url
        			// 'objetoPantalon'
        		},

         		shoes: {
         			image: shoesResponse[comboId].skus[0].image.url,
         			brand: shoesResponse[comboId].brand.name,
         			description: shoesResponse[comboId].title,
         			price: shoesResponse[comboId].skus[0].salePrice,
         			productLink: shoesResponse[comboId].skus[0].url 
         			// 'objetoShoes'
         		}
         	};
         	comboResponse.push(comboItem);
         	comboId += 1;
         }
         console.log(comboResponse);

	     res.type("application/json");
	     res.jsonp(comboResponse);
      }
      else {
          console.log(response.statusCode);
          console.log(response.body);
      }
    });
});

// Sends a request for recomentations for products
function searchRecomendations(productId){
	var myOpt = {
		url: 'http://hackathon.backcountry.com:8081/hackathon/public/kit/' + productId + '/xsellProducts',
		json: true,
		method: 'get'
	}
	request(myOpt, function(error, response, body){
		if (!error && response.statusCode == 200) {
	        // console.log(body.metadata.found);
	        console.log(body);
	    }
	    else {
	        console.log(response.statusCode);
	        console.log(response.body);
	    }
	});
}


var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});