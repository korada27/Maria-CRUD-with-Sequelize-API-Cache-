var express = require('express');
var router = express.Router();
var db=require('../db');
var redis = require('redis');
var app=express();

app.param(['id', 'limit','offset'], function (req, res, next, value) {
  next();
});

router.get('/:id/:limit/:offset', function(req, res) {  

		var a= req.param('id');
		var a1=parseInt(a);
		
		var b=req.param('limit');
		var b1=parseInt(b);
		
		var c= req.param('offset');
		var c1=parseInt(c);
		
	console.log("id :"+a+""+"limit"+b+"offset"+c);
    db.findAll({  
        where: {  
            Empid:a1
        },limit:b1,offset:c1
    }).  
    then(function(data) {
		console.log("hello");
		if(data==""){
			console.log('No Data found  try again')
		}
		console.log(JSON.stringify(data));
      //  res.json(data)
		res.status(200).json(data);  
    }).catch(function (err) {
  // handle error;
  if(err){
	  
	  console.log("Not Found");
  }
});;  
}); 


router.post('/',function(req,res,next){

    console.log(req.body);  
    var data = {  
		"id":req.body.id,
        "Empid": req.body.Empid,  
        "Empname": req.body.Empname  
    };  
  
    db.create(data).  
    then(function(empdata) {  
        res.status(200).json(empdata);  
    }, function(error) {  
        res.status(500).send(error);  
    });  
}); 



router.delete('/:id', function(req, res) {  
    var data = {  
        id: req.params.id  
    };  
    db.destroy({  
        where: {  
            Empid:data.id  
        }  
    }).  
    then(function(data) {  
        res.status(200).json(data);  
    }, function(error) {  
        res.status(500).send(error);  
    });  
});

router.put('/:id', function(req, res) {  
    var data = {    
        "Empid": req.body.Empid,  
        "Empname": req.body.Empname  
    };  
  
    db.update(data, {  
        where: {  
            Empid: data.Empid  
        }  
    }).  
    then(function(data) {  
        res.status(200).json(data);  
    }, function(error) {  
        res.status(500).send(error);  
    });  
}); 


module.exports=db;
module.exports=router;