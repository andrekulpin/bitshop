const redis = require('redis');

module.exports = function( config ){
	return redis.createClient( config );
}