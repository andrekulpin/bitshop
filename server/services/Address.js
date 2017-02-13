const Bitcoin = require('bitcoinjs-lib');
const bigi = require('bigi')

class Address {

	constructor( salt ){
		this.salt = salt || getRandInt();
	}

	getRandom(){
		const keyPair = Bitcoin.ECPair.makeRandom();
		return {
			address: keyPair.getAddress(),
			privKey: keyPair.toWIF()
		} 
	}

	getAddressBySalt(){
		const hash = Bitcoin.crypto.sha256( this.salt );
		const d = bigi.fromBuffer( hash );
		const keyPair = new Bitcoin.ECPair( d );
		return {
			address: keyPair.getAddress(),
			privKey: keyPair.toWIF()
		}
	}

}

function getRandInt(){
	return ~~( Math.random() * 0xfffffff );
}


module.exports = Address;