import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import "../Styles/Register.css";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      userMessage: "",
      success: false,
      errors: ""
    };
  }

  register = (e) => {
    e.preventDefault();

    const userData = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
      userMessage: this.state.userMessage
    };

    axios
      .post("/auth/register", userData)
      .then((res) => this.props.history.push("/"))
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

  render() {
    return (
      <div className="container mb-5">
        <div className="row">
          <div className="col-md-12 text-center">
            <img
              className="duality-logo mt-5 mb-2"
              src="http://www.dualitysys.com/images/Duality%20Systems.png"
              alt="Duality Systems Logo"
            ></img>{" "}
          </div>
          <div className="col-md-12 mt-5">
            <Link to="/" className="router-link">
              <span className="back-arrow">
                <i className="fas fa-arrow-alt-circle-left"></i>{" "}
                <span className="back-text"></span>
              </span>
            </Link>
          </div>
        </div>
        <div className="row text-center">
          <div className="col-md-12">
            <h1 className="register-header">Register</h1>
          </div>
        </div>
        <div className="row">
          {this.state.errors && (
            <p className="form-errors"> {this.state.errors} </p>
          )}
          <div className="col-md-12">
            <form className="mt-5">
              <div className="form-group mb-4">
                <label>Full Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="registerName"
                  placeholder="Enter Full Name"
                  onChange={this.onChange}
                  value={this.state.name}
                  name="name"
                />
              </div>
              <div className="form-group mb-3">
                <label>Email address</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter email"
                  onChange={this.onChange}
                  value={this.state.email}
                  name="email"
                />
                <small id="emailHelp" className="form-text text-muted">
                  We'll never share your email with anyone else.
                </small>
              </div>

              <div className="form-group mb-4">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="registerPassword1"
                  placeholder="Password"
                  onChange={this.onChange}
                  value={this.state.password}
                  name="password"
                />
              </div>
              <div className="form-group mb-4">
                <label>Confirm Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="registerPassword2"
                  placeholder="Confirm Password"
                  onChange={this.onChange}
                  value={this.state.password2}
                  name="password2"
                />
              </div>
              <div className="form-group">
                <label>Tell us about yourself!</label>
                <textarea
                  className="form-control"
                  rows="3"
                  onChange={this.onChange}
                  value={this.state.userMessage}
                  name="userMessage"
                ></textarea>
              </div>

              <button
                type="submit"
                onClick={this.register}
                className="btn btn-primary form-register-btn mt-2"
              >
                Register<i className="fas fa-arrow-right ml-3"></i>
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
