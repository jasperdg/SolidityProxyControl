
pragma solidity ^0.4.18;

import "./DelegateV1.sol";
import "./StorageState.sol";

contract DelegateV2 is StorageState {
  

  modifier onlyOwner() {
    require(msg.sender == _storage.getOwner());
    _;
  }

  function newStorage(string _storageHash) public onlyOwner{
    _storage.setStorageHash(_storageHash);
    _storage.addToNonce();
  }

  function getNewStorageHash(uint _nonce) view public returns (string) {
    return _storage.getStorageHash(_nonce); 
  }
}