import React from "react";


const Home = ({ consentInfo }) => {
  console.log(consentInfo)
  return (
    <div className="">
      <div className="jumbotron">
        <h1 className="display-4">Consent Managment System </h1>

        <p className="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
          <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
          <a className="btn btn-primary btn-lg" href="#" role="button">Learn more</a>
</div>

        <ul className="list-group w-50 mt-5 position-relative list-group-flush">
          <li className="list-group-item">Consent Name:{consentInfo.name}</li>
          <li className="list-group-item">currentOwner: {consentInfo.currentOwner}</li>
          <li className="list-group-item">Hospital ID  :{consentInfo.hospital}</li>
          <li className="list-group-item">hospital Name  :{consentInfo.hospitalName}</li>
          <li className="list-group-item">consentInfo    :{consentInfo.consentInfo}</li>
          <li className="list-group-item">ICD10   :{consentInfo.ICD10}</li>
          <li className="list-group-item">PTconsentState  :{consentInfo.PTconsentState}</li>
          <li className="list-group-item">Practitioner ID  :{consentInfo.practitioner}</li>
          <li className="list-group-item">Practitioner Name   :{consentInfo.practitionerName}</li>
          <li className="list-group-item">Patient    :{consentInfo.patient}</li>
          <li className="list-group-item">Patient Name   :{consentInfo.patientName}</li>
          <li className="list-group-item">Patient ID :{consentInfo.patientID}</li>
          <li className="list-group-item">patientCondtion :{consentInfo.patientCondtion}</li>
        </ul>
      </div>
      );
    };
    
export default Home;