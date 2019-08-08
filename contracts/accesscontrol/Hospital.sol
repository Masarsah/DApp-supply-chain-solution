

// Hospital: Can approved to policy with defult consent for procedure and track authenticity.
pragma solidity ^0.5.0;

// Import the library 'Roles'
import "./Roles.sol";

// Define a contract 'hospital' to manage this role - add, remove, check
contract hospital{
  using Roles for Roles.Role;

  // Define 2 events, one for Adding, and other for Removing
  event hospitalAdded(address indexed account);
  event hospitalRemoved(address indexed account);

  // Define a struct 'hospitals' by inheriting from 'Roles' library, struct Role
  Roles.Role private hospitals;

  // In the constructor make the address that deploys this contract the 1st hospital
  constructor() public {
    _addhospital(msg.sender);
  }

  // Define a modifier that checks to see if msg.sender has the appropriate role
  modifier onlyhospital() {
    require(ishospital(msg.sender));
    _;
  }

  // Define a function 'ishospital' to check this role
  function ishospital(address account) public view returns (bool) {
    return hospitals.has(account);
  }

  // Define a function 'addhospital' that adds this role
  function addhospital(address account) public onlyhospital {
    _addhospital(account);
  }

  // Define a function 'renouncehospital' to renounce this role
  function renouncehospital() public {
    _removehospital(msg.sender);
  }

  // Define an internal function '_addhospital' to add this role, called by 'addhospital'
  function _addhospital(address account) internal {
    hospitals.add(account);
    emit hospitalAdded(account);
  }

  // Define an internal function '_removehospital' to remove this role, called by 'removehospital'
  function _removehospital(address account) internal {
    hospitals.remove(account);
    emit hospitalRemoved(account);
  }
}





