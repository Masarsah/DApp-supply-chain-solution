import React from "react";
// import logo from "../jddlogo.png";
const NavBar = ({  changeActivePage }) => {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="navbar-brand">
                    {/* <img src={logo} style={{ "width": "90px" }} /> */}
                </div>

                <div className="NavBar">
                    <ul className="navbar-nav">

                                <React.Fragment>
                                    <li onClick={() => {changeActivePage("Hospital") }}>
                                        <div >Hospital Approved</div>
                                    </li>
                                    <li onClick={() => {changeActivePage("Patient") }}>
                                        <div>Patient Signed</div>
                                    </li>
                                    <li onClick={() => { changeActivePage("Practitioner") }}>
                                        <div >Practitioner</div>
                                    </li>
                                    <li onClick={() => {changeActivePage("home") }}>
                                        <div>Home</div>
                                    </li>
                                    <li onClick={() => { changeActivePage("Tracker") }}>
                                        <div>Tracker</div>
                                    </li>
                                </React.Fragment>
                    </ul>
                </div>
            </nav>
            <div>
         </div>
       </div>
    );
};

export default NavBar;