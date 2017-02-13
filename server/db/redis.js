const redis = require('redis');

module.exports = function( config ){
	const client = redis.createClient( config );
	return client;
}