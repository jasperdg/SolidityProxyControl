var KeyValueStorage = artifacts.require("./KeyValueStorage.sol")
var DelegateV1 = artifacts.require("./DelegateV1.sol")
var DelegateV2 = artifacts.require("./DelegateV2.sol")
var Proxy = artifacts.require("./Proxy.sol")

module.exports = function(deployer) {
  deployer.deploy(KeyValueStorage).then(res => {
    deployer.deploy(DelegateV1)
    deployer.deploy(DelegateV2)
    deployer.deploy(Proxy, res.address)
  })
  
};
