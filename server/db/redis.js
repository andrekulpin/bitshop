const redis = require( 'redis' );
const P = require( 'bluebird' );
P.promisifyAll( redis.RedisClient.prototype );
var client = null;

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

	*incrby( key, value ){
		return yield this.client.incrbyAsync( key, value );
	}

	*decrby( key, value ){
		return yield this.client.decrbyAsync( key, value );
	}

	*exists( key ){
		return yield this.client.existsAsync( key );
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

module.exports = function( config ){
	client = client || redis.createClient( config );
	return new RedisClient( client );
}