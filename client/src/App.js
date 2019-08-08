import React, { Component } from "react";
import getWeb3 from "./utils/getWeb3";
import Practitioner from "./component/Practitioner";
import Patient from "./component/Patient";
import Hospital from "./component/Hospital";
import Tracker from "./component/Tracker";
import NavBar from "./component/NavBar";
import Home from "./component/Home";

import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      showPage: "home"
    };
  }


  // componentDidMount = async () => {
  //   try {
  //     // Get network provider and web3 instance.
  //     const web3 = await getWeb3();

  //     // Use web3 to get the user's accounts.
  //     const accounts = await web3.eth.getAccounts();

  //     // Get the contract instance.
  //     const networkId = await web3.eth.net.getId();
  //     const deployedNetwork = SimpleStorageContract.networks[networkId];
  //     const instance = new web3.eth.Contract(
  //       SimpleStorageContract.abi,
  //       deployedNetwork && deployedNetwork.address,
  //     );

  //     // Set web3, accounts, and contract to the state, and then proceed with an
  //     // example of interacting with the contract's methods.
  //     this.setState({ web3, accounts, contract: instance }, this.runExample);
  //   } catch (error) {
  //     // Catch any errors for any of the above operations.
  //     alert(
  //       `Failed to load web3, accounts, or contract. Check console for details.`,
  //     );
  //     console.error(error);
  //   }
  // };

  changeShowPage = (showPage) => {

    console.log("\n\n\n\n &&&&&&&&& \n\n\n your are in ", showPage)
    this.setState({ showPage })
  }
  renderShow() {
    if (this.state.showPage === 'Hospital') {
      return (
        <div className="hospital">
          <Hospital />
          ]      </div>
      )
    } else if (this.state.showPage === 'Practitioner') {
      return (
        <div>
          <Practitioner />
        </div>
      )
    } else if (this.state.showPage === 'Patient') {
      return (
        <div>
          <Patient />
        </div>
      )

    }else if (this.state.showPage === 'Patient') {
      return (
        <div>
          <Tracker />
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
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <NavBar
          changeActivePage={this.changeShowPage}
        />
        <div className="home">
          {this.state ? this.renderShow() : <Home />}
        </div>
      </div>
    );
  }
}

export default App;
