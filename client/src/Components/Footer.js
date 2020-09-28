import React, { Component } from "react";
import footerLogo from "../img/duality-thumb.jpeg";
import "../Styles/Footer.css";

class Footer extends Component {
  render() {
    return (
      <div className=" footer-container">
        <div className="row text-center">
          <div className="col-md-12">
            <img
              src={footerLogo}
              className="img-fluid footer-logo mt-4"
              alt="Responsive Footer logo"
            />
          </div>
        </div>
        <div className="row text-center">
          <div className="col-md-12 mt-4">
            <h4 className="footer-name">
              Joel Ferrales | {new Date().getFullYear()}
            </h4>
          </div>
        </div>
      </div>
    );
  }
}

export default Footer;
