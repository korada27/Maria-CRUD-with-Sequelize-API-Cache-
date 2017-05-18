var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var request = require('request');
 
var redis = require('redis');
var client = redis.createClient(6379, '127.0.0.1');
 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/products/:id/:limit/:offset', function (req, res) {
        client.get(req.params.id+req.params.limit+req.params.offset, function(error, product) {
            if (error) {throw error;}
            if (product) {
                res.json(JSON.parse(product));
            } else {
              request({uri:'http://localhost:3000/emp/' +req.params.id +'/'+req.params.limit+'/'+req.params.offset}, function(error, response, body) 
           {
                    if (error) {throw error;return}
                    if (!error && response.statusCode === 200) {
                        res.json(body);
                        client.setex(req.params.id+req.params.limit+req.params.offset,60, JSON.stringify(body), function (error) {
                            if (error) {throw error;}
                        });
                    } else {
                        res.send(response.statusCode);
                    }
                });
            }
        });
    });

 
var server = app.listen(7000, function () {
    console.log('Server running at : 7000');
});