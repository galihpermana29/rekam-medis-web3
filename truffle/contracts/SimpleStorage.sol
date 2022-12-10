// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract SimpleStorage {
  string IPFSHash;

  function get() public view returns (string ) {
    return IPFSHash;
  }

  function set(string newValue) public {
    IPFSHash = newValue;
  }
}
