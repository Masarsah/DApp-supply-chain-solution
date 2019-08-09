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
        currentOwner: "0x0000000000000000000000000000000000000000",
        hospital: "0x0000000000000000000000000000000000000000",
        hospitalName: '',
        consentInfo: '',
        ICD10: '',
        PTconsentState: '',
        symptom: 0,
        practitioner: "0x0000000000000000000000000000000000000000",
        practitionerName: '',
        patient: "0x0000000000000000000000000000000000000000",
        patientName: '',
        patientID: 0,
        patientCondtion: ''
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

  getState = (stateID) => {
    switch (stateID) {
      case '0':
        return 'Approved'
      case '1':
        return 'Requested'
      case '2':
        return 'Signed'
      case '3':
        return 'PtSigned'
    }
  }

  handleButtonClick = async (e) => {
    e.preDefault()
    const web3 = await getWeb3();


    await web3.eth.getAccounts()

    var processId = parseInt((e.target).data('id'))

    switch (processId) {
      case 1:
        return await this.approvedHospital(e)
        break
      case 2:
        return await this.requestedConsent(e)
        break
      case 3:
        return await this.Signedconsent(e)
        break
      case 4:
        return await this.PtSigned(e)
        break
      case 5:
        return await this.fetchPTconsentBufferOne(e)
        break
      case 6:
        return await this.fetchPTconsentBufferTwo(e)
        break
      case 7:
        return await this.addHospital(e)
        break
      case 8:
        return await this.addPractitioner(e)
        break
      case 9:
        return await this.addPatient(e)
        break
    }
  }

  approvedHospital = (e) => {
    e.preventDefault()
    this.state.symptom = this.state.web3.toWei(('#sellingPrice').val(), 'ether')

    this.state.contracts.SupplyChain.deployed()
      .then(function (instance) {
        return instance.approvedHospital(
          this.state.sku,
          this.state.name,
          this.state.hospital,
          this.state.hospitalName,
          this.state.consentInfo,
          this.state.ICD10
        )
      })
      .then(function (result) {
        ('#ftc-hospital-consent').text(result.logs[0].transactionHash)
      })
      .catch(function (err) {
        console.log(err.message)
      })
  }

  requestedConsent = (e) => {
    e.preventDefault()

    var processId = parseInt((e.target).data('id'))
     this.state.sku = ('#sku-hospital').val()
    const consentPrice = this.state.data.symptom
    this.state.contracts.SupplyChain.deployed()
      .then(function (instance) {
        const walletValue = this.state.web3.toWei(consentPrice, 'ether')
        return instance.requestedConsent(
          this.state.sku,
          this.state.practitioner,
          this.state.practitionerName,
          this.state.patientCondtion,
          {
            from: this.state.hospital,
            value: walletValue
          })
      })
      .then(function (result) {
        ('#ftc-hospital-consent').text(result.logs[0].transactionHash)
      })
      .catch(function (err) {
        console.log(err.message)
      })
  }

  Signedconsent = (e) => {
    e.preventDefault()

    var processId = parseInt((e.target).data('id'))
     this.state.sku = ('#sku-product').val()
    this.state.contracts.SupplyChain.deployed()
      .then(function (instance) {
        return instance.Signedconsent(
          this.state.sku,
          { from: this.state.practitioner })
      })
      .then(function (result) {
        ('#ftc-product-consent').text(result.logs[0].transactionHash)
      })
      .catch(function (err) {
        console.log(err.message)
      })
  }

  PtSigned = (e) => {
    e.preventDefault()
    var processId = parseInt((e.target).data('id'))
     this.state.sku = ('#sku-product').val()
    this.state.contracts.SupplyChain.deployed()
      .then(function (instance) {
        return instance.PtSigned(
          this.state.sku,
          this.state.patient,
          this.state.patientName,
          this.state.patientID,
          { from: this.state.practitioner })
      })
      .then(function (result) {
        ('#ftc-product-consent').text(result.logs[0].transactionHash)
      })
      .catch(function (err) {
        console.log(err.message)
      })
  }

  fetchPTconsentBufferOne = () => {
     this.state.sku = ('#sku').val()

    this.state.contracts.SupplyChain.deployed()
      .then(function (instance) {
        return instance.fetchPTconsentBufferOne( this.state.sku)
      })
      .then(function (result) {
        ('#ftc-consent').text(
          <table className="table">
          <thead className="thead-dark">
            <tr>
              <th scope="col">sku</th>
              <th scope="col">name</th>
              <th scope="col">hospital</th>
              <th scope="col">hospitalName  </th>
              <th scope="col">symptom </th>
              <th scope="col">consentInfo </th>
              <th scope="col">ICD10 </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">{result[0]}</th>
            </tr>
            <tr>
              <th scope="row">{result[1]}</th>
            </tr>
            <tr>
              <th scope="row">{result[3]}</th>
            </tr>    <tr>
              <th scope="row">{result[4]}</th>
            </tr>
            <tr>
              <th scope="row">{result[5]}</th>
            </tr>
            <tr>
              <th scope="row">{result[6]}</th>
            </tr>    <tr>
              <th scope="row">{result[7]}</th>
            </tr>
          </tbody>
        </table>
        )
      })
      .catch(function (err) {
        console.log(err.message)
      })
  }
  fetchconsentBufferTwo = () => {
    ///    event.preventDefault();
    ///    var processId = parseInt((event.target).data('id'));
     this.state.sku = ('#sku').val()

    this.state.contracts.SupplyChain.deployed()
      .then(function (instance) {
        return instance.fetchconsentBufferTwo.call( this.state.sku)
      })
      .then(function (result) {
        return (

          <table className="table">
            <thead className="thead-dark">
              <tr>
                <th scope="col">sku</th>
                <th scope="col">practitioner</th>
                <th scope="col">practitionerName</th>
                <th scope="col">Patient  </th>
                <th scope="col">Patient Name </th>
                <th scope="col">Patient ID </th>
                <th scope="col">Patient Condition </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">{result[0]}</th>
              </tr>
              <tr>
                <th scope="row">{result[2]}</th>
              </tr>
              <tr>
                <th scope="row">{result[3]}</th>
              </tr>    <tr>
                <th scope="row">{result[4]}</th>
              </tr>
              <tr>
                <th scope="row">{result[5]}</th>
              </tr>
              <tr>
                <th scope="row">{result[6]}</th>
              </tr>    <tr>
                <th scope="row">{result[7]}</th>
              </tr>
            </tbody>
          </table>
        )

      })
      .catch(function (err) {
        console.log(err.message)
      })
  }



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
          <Tracker
            consentState={this.state.data}
          />
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

