import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import setAuthToken from "../helpers/setAuthToken";
import axios from "axios";
import { Link as ScrollLink } from "react-scroll";

import jwt_decode from "jwt-decode";

import "../Styles/Main.css";
import "../Styles/Header.css";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      success: false,
      token: {},
      errors: ""
    };
  }

  componentDidMount() {
    if (localStorage.getItem("jwtToken") != null) {
      this.props.history.push("/dashboard");
    }
  }

  login = (e) => {
    e.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password
    };

    axios
      .post("/auth/login", userData)
      .then((res) => {
        // console.log(res.data);
        // Save token to local storage
        const token = res.data.token;
        localStorage.setItem("jwtToken", token);
        // Set token to auth header
        setAuthToken(token);
        const decoded = jwt_decode(token);
        localStorage.setItem("userEmail", decoded.email);
        this.props.history.push("/dashboard");
      })
      .catch((err) => {
        this.setState({
          errors: "Invalid Credentials. Please try again."
        });
      });
  };

  onChange = (e) => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  };

  componentDidUpdate() {
    if (localStorage.getItem("jwtToken")) {
      this.props.history.push("/dashboard");
    }
  }
  render() {
    return (
      <div className="container-fluid">
        {/* Header Row */}
        <div className="row header-row home-header">
          <div className="col-md-12">
            <div className="bg-text">
              {" "}
              <img
                className="duality-logo mt-5 mb-2"
                src="http://www.dualitysys.com/images/Duality%20Systems.png"
                alt="Duality Systems Logo"
              ></img>{" "}
              <h4 className="mt-5 header-text"> Consulting Done Right.</h4>{" "}
              <ScrollLink
                className="btn start-btn"
                activeClass="active"
                to="main"
                spy={true}
                smooth={true}
                offset={0}
                duration={800}
              >
                Lets Get Started
              </ScrollLink>
            </div>
          </div>
        </div>

        <div className="row" id="main">
          <div className="col-md-6 left-content">
            <h1 className="left-text">Dream Bigger</h1>
          </div>
          <div className="col-md-6 right-content">
            <div className="card login-card">
              <img
                className="card-img-top"
                src="http://www.dualitysys.com/images/Duality%20Systems.png"
                alt="Card cap"
              />

              <div className="card-body">
                <form className="mt-5">
                  <div className="form-group">
                    <label>Email address</label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      onChange={this.onChange}
                      value={this.state.email}
                      placeholder="Enter email"
                    />
                    <small id="emailHelp" className="form-text text-muted">
                      * Case Sensitive
                    </small>
                  </div>
                  <div className="form-group">
                    <label>Password</label>
                    <input
                      type="password"
                      className="form-control"
                      onChange={this.onChange}
                      name="password"
                      value={this.state.password}
                      placeholder="Password"
                    />
                  </div>
                  {this.state.errors && (
                    <p className="form-errors"> {this.state.errors} </p>
                  )}
                  <div className="row">
                    <div className="col-md-6">
                      <button
                        onClick={this.login}
                        className="btn btn-primary form-btn mt-2"
                      >
                        Login
                      </button>
                    </div>
                    <div className="col-md-6 text-right">
                      <button className="btn btn-primary form-btn mt-2 register-btn">
                        <Link
                          to="register"
                          className="router-link register-btn"
                        >
                          Register
                        </Link>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>{" "}
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Home);
