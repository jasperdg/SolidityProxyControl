
const KeyValueStorage = artifacts.require('KeyValueStorage')
const DelegateV1 = artifacts.require('DelegateV1')
const DelegateV2 = artifacts.require('DelegateV2')
const Proxy = artifacts.require('Proxy')

contract('Storage and upgradability example', async (accounts) => {
  let keyValueStorage;
  let proxy; 
  let delegateV1;
  let delegateV2;

  it('Should be able to deploy all contracts', async () => {
    keyValueStorage = await KeyValueStorage.new()
    proxy = await Proxy.new(keyValueStorage.address)
    delegateV1 = await DelegateV1.new()
    delegateV2 = await DelegateV2.new()
  })

  it('Should be able to upgrade the proxy to version 1', async () => {
    // Upgrade contracts to V1
    await proxy.upgradeTo(delegateV1.address)
    proxy = _.extend(proxy, DelegateV1.at(proxy.address))
  })

  it('Should be able add to storage of V1 and get the correct input field', async () => {
    // Get and set storage V1
    await proxy.newStorage("test");
    var err, hash = await proxy.getNewStorageHash(0)
    assert.equal(hash, "test")
  })

  it('Should be able to upgrade the proxy to version 2', async () => {
    // Upgrade contracts to V2
    await proxy.upgradeTo(delegateV2.address)
    proxy = DelegateV2.at(proxy.address)
  })

  it('Should be able to still read data from storage and write to it with different logic', async () => {
    // Get and set Storage vor V2
    await proxy.newStorage("test2")
    var err, hash1 = await proxy.getNewStorageHash(0)
    var err, hash2 = await proxy.getNewStorageHash(1)
    assert.equal(hash1, "test")
    assert.equal(hash2, "test2")
  })

  it('Check if new logic is applied (Should fail)', async () => {
    await proxy.newStorage("test2", {from: accounts[1]}); // Should fail
  })
});