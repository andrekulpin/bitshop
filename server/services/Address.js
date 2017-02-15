const Bitcoin = require('bitcoinjs-lib');
const { blockexplorer } = require('blockchain.info');
const converter = require('satoshi-bitcoin');

class Address {

	constructor( wif ){
		const keyPair = wif 
			? Bitcoin.ECPair.fromWIF( wif ) 
			: Bitcoin.ECPair.makeRandom();
		this.keyPair = keyPair;
		this.address = keyPair.getAddress();
		this.wif = wif || keyPair.toWIF();
	}

	*getBalance(){
		return ( yield blockexplorer.getAddress( this.address ) ).final_balance;
	}

	*getPrevTXID(){
		return ( yield blockexplorer.getUnspentOutputs( this.address ) )
		.unspent_outputs[0]
		.tx_hash_big_endian;
	}

}

module.exports = Address;