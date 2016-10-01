
class Poe {
  constructor(ProofOfExistence){
  }
  setup(ProofOfExistence, account){
    this.poe = ProofOfExistence.deployed()
    this.account = account;
  }
  notarize(string) {
    return this.poe.notarize(string, {from: this.account}).then(()=>{

    })
  }

  checkDocument(string){
    return this.poe.checkDocument.call(string, {from: this.account}).then(result=>{
      console.log(result)
    })
  }

  calculateProof(string){
    return this.poe.calculateProof.call(string, {from: this.account}).then(result=>{
      console.log(result)
      return result
    })
  }

  hasProof(hash){
    return this.hasProof.call(hash, {from: this.account}).then(result=>{
      console.log(hash, result)
    })
  }
}

export default new Poe()
