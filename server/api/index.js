const Client = require('coinbase').Client;

class CoinbaseClient {

	constructor( client, account ){
		this.client = client;
		this.account = account;
	}

	addOrder( amount ){
		this.client.getAccount()
	}

}



module.exports = function({ apiKey, apiSecret }){
	const client =  new Client({ apiKey, apiSecret });

}

