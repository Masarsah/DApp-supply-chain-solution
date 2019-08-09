import React  from "react";


const Patient = ({ renderInput, handleSubmit  }) => {
    return (
        <div className="form">
        <div className="jumbotron text-center">
        <h1 className="jumbotron-heading"> Patient Signing Consent </h1>
        </div>
    <form onSubmit={handleSubmit}>
      {renderInput("sku", "Consent ID")}
      {renderInput("patient", "Patient address")}
      {renderInput("patientName","Patient Name")}
      {renderInput("patientID", "Patient ID")}

      <button className="btn btn-info"> Signup Consent </button>
    </form>
  </div>
    );
  };
  
export default Patient;