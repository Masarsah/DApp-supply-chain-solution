

// Practitioner: Can approved to policy with defult consent for procedure and track authenticity.
pragma solidity ^0.5.0;

// Import the library 'Roles'
import "./Roles.sol";

// Define a contract 'PractitionerRole' to manage this role - add, remove, check
contract Practitioner {

    using Roles for Roles.Role;

    // Define 2 events, one for Adding, and other for Removing
    event PractitionerAdded(address indexed account);
    event PractitionerRemoved(address indexed account);

    // Define a struct 'Practitioners' by inheriting from 'Roles' library, struct Role
    Roles.Role private Practitioners;

    // In the constructor make the address that deploys this contract the 1st Practitioner
    constructor() public {
        _addPractitioner(msg.sender);
    }

    // Define a modifier that checks to see if msg.sender has the appropriate role
    modifier onlyPractitioner() {
        require(isPractitioner(msg.sender));
        _;
    }

    // Define a function 'isPractitioner' to check this role
    function isPractitioner(address account) public view returns (bool) {
        return Practitioners.has(account);
    }

    // Define a function 'addPractitioner' that adds this role
    function addPractitioner(address account) public onlyPractitioner {
        _addPractitioner(account);
    }

    // Define a function 'renouncePractitioner' to renounce this role
    function renouncePractitioner() public {
        _removePractitioner(msg.sender);
    }

    // Define an internal function '_addPractitioner' to add this role, called by 'addPractitioner'
    function _addPractitioner(address account) internal {
        Practitioners.add(account);
        emit PractitionerAdded(account);
    }

    // Define an internal function '_removePractitioner' to remove this role, called by 'removePractitioner'
    function _removePractitioner(address account) internal {
        Practitioners.remove(account);
        emit PractitionerRemoved(account);
    }

}




