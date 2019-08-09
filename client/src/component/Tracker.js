import React from "react";


const Tracker = ({ consentState }) => {
  console.log(consentState)
  return (
    <div className="">
      <div className="jumbotron">
        <h1 className="display-4">Consent Tracker System </h1>


</div>
<table className="table">
  <thead className="thead-dark">
    <tr>
      <th scope="col">#</th>
      <th scope="col">Approved</th>
      <th scope="col">Requested</th>
      <th scope="col">Practitioner Signed</th>
      <th scope="col">Patient Signed </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
      <td>@mdo</td>
    </tr>
    <tr>
      <th scope="row">2</th>
      <td>Jacob</td>
      <td>Thornton</td>
      <td>@fat</td>
      <td>@fat</td>
    </tr>
    <tr>
      <th scope="row">3</th>
      <td>Larry</td>
      <td>the Bird</td>
      <td>@twitter</td>
      <td>@twitter</td>
    </tr>
  </tbody>
</table>


      </div>
      );
    };
    
export default Tracker;