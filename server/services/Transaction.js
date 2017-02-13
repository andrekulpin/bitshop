const Bitcoin = require('bitcoinjs-lib');
const Blockchain = require('blockchain.info');

class Transaction {

	constructor(){
		this.tx = new Bitcoin.TransactionBuilder();
		this.steps = [];
	}

	from( address ){
		const self = this;
		self.steps.push(function*(){
			const txID = yield Blockchain.blockexplorer.getUnspentOutputs( address );
			self.tx.addInput( txID, 0 );
		});
		return self;
	}

	to( address, amount ){
		this.tx.addOutput( address, amount );
		return this;
	}

	sign( privKey ){
		this.tx.sign( 0, privKey );
		return this;
	}

	*execute( callback ){
		var step;
		while( step = this.steps.shift() ){
			yield step;
		}

		const hex = this.tx.build().toHex();
		return yield blockchain.pushtx( hex );
	}

}

module.exports = Transaction//Transaction;