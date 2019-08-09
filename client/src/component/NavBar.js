import React from "react";
// import logo from "../jddlogo.png";
const NavBar = ({ changeActivePage }) => {
    return (
        <div>
            <div className="navbar-light bg-light navbar navbar-expand-md fixed-top">
                <div className="navbar-brand">
                    {/* <img src={logo} style={{ "width": "90px" }} /> */}
                </div>
                <ul className="navbar-nav">

                    <React.Fragment>
                        <li className="nav-link" onClick={() => { changeActivePage("home") }}>
                            <div>Home</div>
                        </li>

                        <li className="nav-link" onClick={() => { changeActivePage("hospital") }}>
                            <div >Hospital Approved</div>
                        </li>
                        <li className="nav-link" onClick={() => { changeActivePage("practitionereq") }}>
                            <div >Request consent </div>
                        </li>
                        <li className="nav-link" onClick={() => { changeActivePage("practitioner") }}>
                            <div >Practitioner SignUp</div>
                        </li>
                        <li className="nav-link" onClick={() => { changeActivePage("patient") }}>
                            <div>Patient SignUp</div>
                        </li>


                        <li className="nav-link" onClick={() => { changeActivePage("tracker") }}>
                            <div>Tracker</div>
                        </li>
                    </React.Fragment>
                </ul>
                <div>
                </div>
            </div>
        </div>
    );
};

export default NavBar;