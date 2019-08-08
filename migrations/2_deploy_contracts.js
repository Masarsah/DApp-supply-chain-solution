// migrating the appropriate contracts
const Practitioner = artifacts.require("./Practitioner.sol");
const Hospital = artifacts.require("./Hospital.sol");
const Patient = artifacts.require("./Patient.sol");
const SupplyChain = artifacts.require("./SupplyChain.sol");

module.exports = function(deployer) {
  deployer.deploy(Practitioner);
  deployer.deploy(Hospital);
  deployer.deploy(Patient);
  deployer.deploy(SupplyChain);
};
