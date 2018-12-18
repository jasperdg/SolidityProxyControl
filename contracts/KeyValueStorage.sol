pragma solidity ^0.4.18;
import "../node_modules/openzeppelin-solidity/contracts/math/SafeMath.sol";
import "../node_modules/openzeppelin-solidity/contracts/ownership/Ownable.sol";

contract KeyValueStorage is Ownable{
  using SafeMath for uint256;

  mapping(uint => string) nonceToStorageHash;

  uint[] nonces;
  uint nonce;
  /**** Get Methods ***********/

  function getStorageHash(uint _nonce) public view returns (string) {
    return nonceToStorageHash[_nonce];
  }

  function getOwner() public view returns (address) {
    return owner();
  }

  /**** Set Methods ***********/

  function setStorageHash(string _storageHash) public {
    nonceToStorageHash[nonce] = _storageHash;
  }

  function addToNonce() public {
    nonce = nonce.add(1);
    nonces.push(nonce);
  }
}