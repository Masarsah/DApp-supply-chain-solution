import React  from "react";

const Practitionereq = ({ renderInput, handleSubmit  }) => {
    return (
        <div className="form">
        <div className="jumbotron text-center">
        <h1 className="jumbotron-heading"> Practitioner Signup Consent</h1>
        </div>
    <form onSubmit={handleSubmit}>
    {renderInput("sku", "Consent ID")}

      <button className="btn btn-info"> Signup Consent </button>
    </form>
  </div>
    );
  };
  
export default Practitionereq;