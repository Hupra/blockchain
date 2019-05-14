const SHA256 = require("crypto-js/sha256");

class Block {
  constructor(data, prevHash) {
    this.data = data;
    this.prevHash = prevHash;
    this.hash = "";
    this.nonce = 1; // used in assignment 1
    this.timeStamp = Date.now();
  }

  calculateHash() {
    return SHA256(
      this.prevHash +
        JSON.stringify(this.data) +
        JSON.stringify(this.timeStamp) +
        this.nonce
    ).toString();
  }

  // ______________ ASSIGNMENT 1 ______________
  // This method should modify this.nonce until this.calculateHash() returns a hash starting with a substring of n specific characters.
  // That being "0" in our case. a such hash could look like this given n = 5:
  // "00000f57195c6c3218eceac496b78d59d5a62314820031d9ac1ef3530778ce73"
  //
  // This method should be called from the blockchain object,
  // when you are trying to add it to the chain using the addBlock() method
  mineblock(n) {}
}

class BlockChain {
  constructor() {
    this.difficulty = 4; // used in assignment 1
    this.chain = [this.createGenesisBlock()];
  }
  addBlock(block) {
    block.prevHash = this.getLatestBlock().hash;
    block.hash = block.calculateHash(); // this line to be removed for version 2
    //block.mineblock(this.difficulty); // this line to be added for version 2
    this.chain.push(block);
  }

  createGenesisBlock() {
    let block = new Block("Genesis Block", "Nothing");
    block.hash = block.calculateHash();
    return block;
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  // ______________ ASSIGNMENT 2 ______________
  // This method should return true or false depending on the validity of the chain.
  // This neans that all the blocks in the chain must have a valid hash
  // And a prevHash that matches the previous blocks hash
  isChainValid() {
    for (let i = 1; i < this.chain.length; i++) {
      const newblock = this.chain[i];
      const oldblock = this.chain[i - 1];

      if (newblock.hash !== newblock.calculateHash()) return false;

      if (newblock.prevHash !== oldblock.hash) return false;
    }
    return true;
  }
}

console.time("\nBlockchain creation time");
bc = new BlockChain();
bc.addBlock((block = new Block("daniel")));
bc.addBlock((block = new Block("benjamin")));
bc.addBlock((block = new Block("lars")));
bc.addBlock((block = new Block("gitte")));
console.timeEnd("\nBlockchain creation time");

console.log("----");

console.log("EXPECTED: true || RESULT: ", bc.isChainValid());

bc.chain[2].data = "jabob";

console.log("EXPECTED: false || RESULT: ", bc.isChainValid());
