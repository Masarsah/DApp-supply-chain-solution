// import React, { Component } from "react";
// import Input from "./Input";
// import Practitioner from "./Practitioner";
// import Patient from "./Patient";
// import Hospital from "./component/Hospital";
// import Tracker from "./Tracker";
// import NavBar from "./NavBar";
// import Home from "./Home";

// class Tracker extends Component {
//   constructor() {
//     super();
//     this.state = {
//         web3Provider: null,
//         contracts: {},
//         emptyAddress: "0x0000000000000000000000000000000000000000",
//         sku: 0,
//         name:"",
//         metamaskAccountID: "0x0000000000000000000000000000000000000000",
//         currentOwner: "0x0000000000000000000000000000000000000000",
//         hospital: "0x0000000000000000000000000000000000000000",
//         hospitalName: null,
//         consentInfo: null,
//         ICD10: null,
//         PTconsentState: null,
//         symptom: 0,
//         practitioner: "0x0000000000000000000000000000000000000000",
//         practitionerName: null,
//         patient: "0x0000000000000000000000000000000000000000",
//         patientName: null,
//         patientID: null,
//         patientCondtion: null
//     };
//   }

//   handleRequest(user) {
//     let apiUrl = "http://localhost:3000/rapi";

//     apiUrl += this.props.form === "signup" ? "/users" : "/auth";
//     console.log(apiUrl);
//     console.log(user);

//     fetch(apiUrl, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify(user)
//     })
//       .then(response => response.json())
//       .then(data => {
//         console.log(data);
//         setJwt(data.token);
//         this.props.onLogin();
//       })
//       .catch(error => {
//         console.log(error);
//       });
//   }
//   handleSubmit = e => {
//     e.preventDefault();
//     this.handleRequest(this.state.data);
//   };
//   handleChange = ({ currentTarget: input }) => {
//     const data = { ...this.state.data };
//     data[input.name] = input.value;
//     this.setState({ data });
//   };

//   renderInput = (name, lable, type = "text") => {
//     const { data } = this.state;
//     // const data = this.state.data

//     return (
//       <Input
//         name={name}
//         lable={lable}
//         type={type}
//         value={data[name]}
//         onChange={this.handleChange}
//       />
//     );
//   };
//   render() {
//     return (
//       <div>
//         {this.props.form === "signup" ? (
//           <Signup
//             renderInput={this.renderInput}
//             handleSubmit={this.handleSubmit}
//           />
//         ) : (
//           <Login
//             renderInput={this.renderInput}
//             handleSubmit={this.handleSubmit}
//           />
//         )}
//       </div>
//     );
//   }
// }

// export default Tracker;