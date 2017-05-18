var Sequelize = require('sequelize');

var cacher=require('sequelize-redis-cache');
var sequelize = new Sequelize('db', 'root', 'admin', {
  host: "127.0.0.1",
  port: 3306,
  dialect: 'mariadb'
  })
  
var User = sequelize.define('emptable', {
			"Empid": Sequelize.STRING,
			"Empname": Sequelize.STRING
			},
			{
				timestamps:false
			});
			
		
var redis=
{
	"host":'127.0.0.1',
	"port":6379
}
var cacheObj=cacher(sequelize,redis).model('emptable').ttl(1000);

module.exports=cacheObj;
module.exports=redis;
module.exports=sequelize;
module.exports=User;