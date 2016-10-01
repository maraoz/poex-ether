module.exports = function(deployer) {
  deployer.deploy(ProofOfExistence);
  deployer.deploy(ConvertLib);
  deployer.autolink();
  deployer.deploy(MetaCoin);
};
