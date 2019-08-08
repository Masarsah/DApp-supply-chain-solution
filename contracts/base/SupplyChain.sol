pragma solidity ^ 0.5.0;
import "../accesscontrol/Practitioner.sol";
import "../accesscontrol/Hospital.sol";
import "../accesscontrol/Patient.sol";
import "../core/Ownable.sol";

contract SupplyChain is
    Practitioner,
    hospital,
    Patient,
    Ownable
{

    uint public sku;
    mapping(uint => PTconsent) ptconsents;
    mapping(uint => string[]) ptconsentsHisrtory;

    enum State {
        Approved,   //0
        Requested,  //1
        Signed,     //2
        PtSigned    //3
    }

    State constant defaultState = State.Approved;

    struct PTconsent {
        uint    sku;
        string  name;
        address currentOwner;
        address payable hospital;
        string hospitalName;
        string  consentInfo;
        string  ICD10;
        State   PTconsentState;
        uint    symptom;
        address payable practitioner;
        string practitionerName;
        address patient;       
        string patientName;
        uint patientID;
        string patientCondtion;
        // string ipfsHash;
    }

    // Define events for PT consent
    event Approvedconsent(uint sku);
    event Requestedconsent(uint sku);
    event Signedconsent(uint sku);
    event PtSignedconsent(uint sku);
    event Uploadedconsent(uint sku, string ipfsHash);


    // // Define a modifer that checks to see if msg.sender == owner of the contract
    // modifier onlyOwner() {
    //     require(msg.sender != address(0));
    //     require(msg.sender == ptconsents[sku].currentOwner);
    //     _;
    // }

    // Define a modifer that verifies the Caller
    modifier verifyCaller(address _address) {
        require(msg.sender == _address);
        _;
    }

    // Define a modifier that checks if the patient symptom  is matched for procerdure 

    modifier matched(uint _symptom) {
        require(msg.value >= _symptom);
        _;
    }


  // Define a modifier that checks the price and refunds the remaining balance
  modifier checkMatch(uint _sku) {
    _;
    uint _symptom = ptconsents[_sku].symptom;
    uint misMatch = msg.value - _symptom;
    ptconsents[_sku].practitioner.transfer(misMatch);
  }

// Define a modifier that checks if Hospital has approved from MOH and SFDA , 
modifier Approved(uint _sku) {
    require(ptconsents[_sku].PTconsentState == State.Approved,
        "Hospital Consent is not yet Approved");
    _;
}

// Define a modifier that checks if Practitioner has Requested consent for PT , 
modifier Requested(uint _sku) {
    require(ptconsents[_sku].PTconsentState == State.Requested,
        "Consent is not yet Requested");
    _;
}
// Define a modifier that checks if Practitioner has signed consent , 
modifier Signed(uint _sku) {
    require(ptconsents[_sku].PTconsentState == State.Signed,
        "Consent is not yet Signed by Practitioner");
    _;
}
// Define a modifier that checks if PT has signed consent , 
modifier PtSigned(uint _sku) {
    require(ptconsents[_sku].PTconsentState == State.PtSigned,
        "Concsent is not yet Signed by Patient");
    _;
}

constructor() public payable {
    sku = 1;
    ptconsents[sku].currentOwner = msg.sender;

}

  // Define a function 'kill' if required
  function kill() public 
  onlyOwner
  {
   address payable owne = address(uint160(owner()));
        if (msg.sender == owner()) {
            selfdestruct(owne);
  }

  }
function hospitalApproved(
    uint _sku,
    string memory _name,
    address payable  _hospital,
    string memory _hospitalName,
    string memory _consentInfo,
    string memory _ICD10,
    uint _symptom

)
public
payable
onlyhospital
{

      // Add the new ptconsents as part of hospital
    ptconsents[_sku].sku  =  _sku;
    ptconsents[_sku].name  =  _name;
    ptconsents[_sku].currentOwner =  _hospital;
    ptconsents[_sku].hospital  =  _hospital;
    ptconsents[_sku].hospitalName  = _hospitalName;
    ptconsents[_sku].consentInfo  = _consentInfo;
    ptconsents[_sku].ICD10 = _ICD10;
    ptconsents[_sku].PTconsentState  = State.Approved;
    ptconsents[_sku].symptom  = _symptom;
    ptconsents[_sku].practitioner  =  address(0);
    ptconsents[_sku].practitionerName = "null";
    ptconsents[_sku].patient  =  address(0);
    ptconsents[_sku].patientName  = "null";
    ptconsents[_sku].patientID = 0;

    // ptconsents[_sku].symptom = msg.value;
      // Increment sku
      sku = sku + 1;
// Emit the appropriate event
    emit Approvedconsent(_sku);
}


function reqPractitioner(
    uint _sku,
    address payable  _practitioner,
    string memory _practitionerName,  
    string memory _patientCondtion

)
public 
payable

Approved(_sku)
verifyCaller(ptconsents[_sku].currentOwner)
// onlyPractitioner
matched(ptconsents[_sku].symptom)
checkMatch(_sku)
{

      // Add the new ptconsents as part of hospital
    ptconsents[_sku].currentOwner  =  _practitioner;
    ptconsents[_sku].practitioner  =  _practitioner;
    ptconsents[_sku].practitionerName  = _practitionerName;
    ptconsents[_sku].PTconsentState  = State.Requested;
    ptconsents[_sku].patientCondtion = _patientCondtion;

    ptconsents[_sku].hospital.transfer(ptconsents[_sku].symptom);


// Emit the appropriate event
    emit Requestedconsent(_sku);
}

function prSigned(
    uint _sku
)
public 

Requested(_sku)
verifyCaller(ptconsents[_sku].practitioner)
// onlyPractitioner
{

      // Add the new ptconsents as part of hospital

    ptconsents[_sku].PTconsentState  = State.Signed;


// Emit the appropriate event
    emit Signedconsent(_sku);
}



function ptSignConsent(
    uint _sku,
address payable  _patient,
    string memory _patientName,
    uint  _patientID
)
public 
Signed(_sku)
verifyCaller(ptconsents[_sku].practitioner)
// onlyPatient
{

      // Add the new ptconsents as part of hospital
    ptconsents[_sku].currentOwner  =  _patient;
    ptconsents[_sku].PTconsentState  = State.PtSigned;
    ptconsents[_sku].patient  =  _patient;
    ptconsents[_sku].patientName  = _patientName;
    ptconsents[_sku].patientID = _patientID;
  

// Emit the appropriate event
    emit PtSignedconsent(_sku);
}


// Define a function 'fetchItemBufferOne' that fetches the data
  function fetchPTconsentBufferOne(uint _sku) public view returns 
  (
  uint consentID,
  string  memory name,
  address currentOwner,
  address hospital,
  string  memory hospitalName,
   uint    symptom,
  string  memory consentInfo,
  string  memory ICD10
  ) 
  {
  // Assign values to the 8 parameters
  
    

  consentID =  ptconsents[_sku].sku;
  name= ptconsents[_sku].name;
  currentOwner    = ptconsents[_sku].currentOwner;
  hospital   = ptconsents[_sku].hospital;
  hospitalName= ptconsents[_sku].hospitalName;
  symptom = ptconsents[_sku].symptom;
  consentInfo = ptconsents[_sku].consentInfo;
  ICD10= ptconsents[_sku].ICD10;
  }


  // Define a function 'fetchItemBufferTwo' that fetches the data
  function fetchPTconsentBufferTwo(uint _sku) public view returns 
  (
     uint    consentSKU,
     State    PTconsentState,
     address practitioner,
     string memory practitionerName,
     address patient,
     string memory patientName,
     uint    patientID,
     string  memory patientCondtion

  ) 
  {
    // Assign values to the 9 parameters  
  consentSKU =  ptconsents[_sku].sku;
  PTconsentState =  ptconsents[_sku].PTconsentState;
  practitioner = ptconsents[_sku].practitioner;
  practitionerName  = ptconsents[_sku].practitionerName;
  patient  = ptconsents[_sku].patient;
  patientName  = ptconsents[_sku].patientName;
  patientID  = ptconsents[_sku].patientID;
  patientCondtion = ptconsents[_sku].patientCondtion;
  }

}






//  

//concent ID
//Hospital 
// Doctor assign  address
// Procedure 
// Origin Actor (e.g.  ID, Hospital Name, )
///ACTORS
//hospital ID , Hospital Name
//Doctor ID , Doctor Name
//Patient ID , Patient Name
// Concent Data
// 

        // retailPrice: 0,
        // practitionerName: _practitionerName,
        // patientName: _patientName,
        // patientID: _patientID,
        // patientCondtion: _patientCondtion,