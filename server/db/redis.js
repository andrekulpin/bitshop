const redis = require( 'redis' );
const P = require( 'bluebird' );
P.promisifyAll( redis.RedisClient.prototype );

module.exports = function( config ){
	const client = redis.createClient( config );
	return new RedisClient( client );
}

class RedisClient {

	constructor( client ){
		this.client = client;
	}

	*get( key ){
		return yield this.client.getAsync( key );
	}

	*set( set, value ){
		return yield this.client.setAsync( key, value );
	}

	*srandmember( key ){
		return yield this.client.srandmemberAsync( key );
	}

	*sadd( key, value ){
		return yield this.client.saddAsync( key, value );
	}

	*hmset( hmap, key, value ){
		return yield this.client.hmsetAsync( hmap, key, value );
	}

	*spop( key ){
		return yield this.client.spopAsync( key );
	}

}