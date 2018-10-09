const SHA256 = require('crypto-js/sha256');
class Block{
    constructor(data){
        this.index = 0;
        this.data = data;
        this.previousHash = " ";
        this.hash = this.calculateHash();
        this.nonce = 0;

    }
    calculateHash(){
        return SHA256(this.index + this.previousHash + JSON.stringify(this.data) + this.nonce).toString();
    }
    //mineBlock(difficulty){
      //  while(this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")){
        //    this.nonce++;
          //  this.hash = this.calculateHash();
            
       // }
        //console.log("block mined: " + this.hash);
    //}
    mineBlock(difficulty){
        var i;
        var cont;
        cont = 50;
        while (cont !== difficulty){
            cont = 0;
            for (i = 0; i < this.hash.length; i++) {
                if (this.hash.charAt(i) == "0"){
                  cont++;     
                }    
            } 
            if (cont == difficulty){
                console.log("bloque minado: "+this.hash);
            } else {
                this.nonce++;
                this.hash = this.calculateHash();
            }
        } 
    }
}
module.exports = Block;