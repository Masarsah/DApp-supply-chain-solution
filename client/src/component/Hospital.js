import React  from "react";

const Hospital = ({ renderInput, handleSubmit , changeCurrentOwner }) => {
    return (
        <div className="form">
        <div className="jumbotron text-center">
        <h1 className="jumbotron-heading"> Hospital Signing Consent</h1>
        </div>
    <form onSubmit={handleSubmit}>
    {renderInput("sku", "Consent ID")}
    {renderInput("name", "Consent Name")}
    {renderInput("hospital", "Hospital address")}
      {renderInput("hospitalName","Hospital Name")}
      {renderInput("consentInfo", "Consent Info")}
      {renderInput("ICD10", "ICD10")}
      {renderInput("symptom", "symptom")}

      <button className="btn btn-info" onClick={() => { changeCurrentOwner("hospital") }}> Signup Consent </button>
    </form>
  </div>
    );
  };
  
export default Hospital;