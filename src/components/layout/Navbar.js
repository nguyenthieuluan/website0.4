import React from 'react';
import { Link } from 'react-router-dom';
import SingedInLinks from "./SignedInLinks";
import SingedOutLinks from "./SignedOutLinks";

const Navbar = () => {
    return (
      <nav >
        <div className="nav-wrapper grey darken-3">
          <Link to="/" className="m2 left">THIEULUAN</Link>
          <SingedInLinks/>
          <SingedOutLinks/>
        </div>
        </nav>
    )
};
export default Navbar;