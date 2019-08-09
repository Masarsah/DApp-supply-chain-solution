import React  from "react";

const Practitionereq = ({ renderInput, handleSubmit  }) => {
    return (
        <div className="form">
        <div className="jumbotron text-center">
        <h1 className="jumbotron-heading"> Practitioner Request Consent</h1>
        </div>
    <form onSubmit={handleSubmit}>
    {renderInput("sku", "Consent ID")}
      {renderInput("practitioner", "Practitioner address")}
      {renderInput("practitionerName","Practitioner Name")}
      {renderInput("patientCondtion", "patientCondtion")}

      <button className="btn btn-info"> Request Consent </button>
    </form>
  </div>
    );
  };
  
export default Practitionereq;