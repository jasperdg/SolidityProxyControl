
pragma solidity ^0.4.18;

import "../node_modules/openzeppelin-solidity/contracts/math/SafeMath.sol";
import "./StorageState.sol";


contract DelegateV1 is StorageState {
  using SafeMath for uint256;
  
  function newStorage(string _storageHash) public {
    _storage.setStorageHash(_storageHash);
    _storage.addToNonce();
  }

  function getNewStorageHash(uint _nonce) view public  returns (string) {
    return _storage.getStorageHash(_nonce); 
  }
}