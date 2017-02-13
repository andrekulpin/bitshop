const _ = require('lodash');
const Bitcoin = require('bitcoinjs-lib');
const Blockchain = require('blockchain.info');

class Transaction {

	constructor(){
		this.tx = new Bitcoin.TransactionBuilder();
		this.steps = [];
		this.keyPairs = [];
	}

	from( wallet ){
		const self = this;
		self.steps.push(function*(){
			const keyPair = Bitcoin.ECPair.fromWIF( wallet );
			const address = keyPair.getAddress();
			const txID = yield Blockchain.blockexplorer.getUnspentOutputs( address );
			const index = self.keyPairs.length;
			self.tx.addInput( txID, index );
			self.keyPairs.push( keyPair );
		});
		return self;
	}

	to( address, amount ){
		this.tx.addOutput( address, amount );
		return this;
	}

	sign(){
		//add another step
		_.each( this.keyPairs, ( keyPair, index ) => {
			this.tx.sign( 0, keyPair );
		});
		return this;
	}

	*execute( callback ){
		let step;
		while( step = this.steps.shift() ){
			yield step();
		}
		const hex = this.tx.build().toHex();
		return yield blockchain.pushtx( hex );
	}

}

module.exports = Transaction;