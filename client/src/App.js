import React, { Component } from "react";
import getWeb3 from "./utils/getWeb3";
import SupplyChain from "./contracts/SupplyChain.json";
import Tracker from "./component/Tracker";
import NavBar from "./component/NavBar";
import Home from "./component/Home";
import Patient from "./component/Patient";
import Practitionereq from "./component/Practitionereq";
import Practitioner from "./component/Practitioner";
import Hospital from "./component/Hospital";
import Input from "./component/Input";



import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      showPage: "home",
      web3Provider: null,
      contracts: {},
      emptyAddress: "0x0000000000000000000000000000000000000000",
      data: {
        sku: 0,
        name: "",
        metamaskAccountID: "0x0000000000000000000000000000000000000000",
        currentOwner: "0x0000000000000000000000000000000000000000",
        hospital: "0x0000000000000000000000000000000000000000",
        hospitalName: null,
        consentInfo: null,
        ICD10: null,
        PTconsentState: null,
        symptom: 0,
        practitioner: "0x0000000000000000000000000000000000000000",
        practitionerName: null,
        patient: "0x0000000000000000000000000000000000000000",
        patientName: null,
        patientID: null,
        patientCondtion: null
      }
    };
  }


  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = SupplyChain.networks[networkId];
      const instance = new web3.eth.Contract(
        SupplyChain.abi,
        deployedNetwork && deployedNetwork.address,
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance }, this.runExample);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };



  changeShowPage = (showPage) => {

    console.log("\n\n\n\n &&&&&&&&& \n\n\n your are in ", showPage)
    this.setState({ showPage })
  }


  handleSubmit = e => {
    e.preventDefault();
  };
  handleChange = ({ currentTarget: input }) => {
    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data });
  };

  renderInput = (name, lable, type = "text") => {
    const { data } = this.state;
    // const data = this.state.data

    return (
      <Input
        name={name}
        lable={lable}
        type={type}
        value={data[name]}
        onChange={this.handleChange}
      />
    );
  };

  renderShow() {
    if (this.state.showPage === 'hospital') {
      return (
        <div className="hospital">
          <Hospital 
                renderInput={this.renderInput}
                handleSubmit={this.handleSubmit}
                />
              </div>
      )
    } else if (this.state.showPage === 'practitionereq') {
      return (
        <div>
          <Practitionereq
                renderInput={this.renderInput}
                handleSubmit={this.handleSubmit}
          />
        </div>
      )
    } else if (this.state.showPage === 'patient') {
      return (
        <div>
          <Patient
            renderInput={this.renderInput}
            handleSubmit={this.handleSubmit}
          />
        </div>
        
      )

    } else if (this.state.showPage === 'tracker') {
      return (
        <div>
          <Tracker />
        </div>
      )

    } else if (this.state.showPage === 'home') {
      return (
        <div>
          <Home consentInfo={this.state.data} />
        </div>
      )
    } else if (this.state.showPage === 'practitioner') {
      return (
        <div>
          <Practitioner
                renderInput={this.renderInput}
                handleSubmit={this.handleSubmit}
          />
        </div>
      )
    }
  }
  // runExample = async () => {
  //   const { accounts, contract } = this.state;

  //   // Stores a given value, 5 by default.
  //   await contract.methods.set(5).send({ from: accounts[0] });

  //   // Get the value from the contract to prove it worked.
  //   const response = await contract.methods.get().call();

  //   // Update state with the result.
  //   this.setState({ storageValue: response });
  // };

  render() {
    return (
      <div className="App">
        <NavBar
          changeActivePage={this.changeShowPage}
        />

        {this.renderShow()}

      </div>
    );
  }
}

export default App;
