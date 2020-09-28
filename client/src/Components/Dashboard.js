import React, { Component } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import setAuthToken from "../helpers/setAuthToken";
import "../Styles/Dash.css";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      message: "",
      memberSince: "",
      name: ""
    };
  }
  componentDidMount() {
    var usersEmail = localStorage.getItem("userEmail");
    // If the token does not exist - Redirect back home
    if (localStorage.getItem("jwtToken") == null) {
      this.props.history.push("/");
    }

    axios
      .get("/auth/current", {
        params: {
          email: usersEmail
        }
      })
      .then((res) => {
        this.setState({
          email: res.data.user.email,
          message: res.data.user.userMessage,
          memberSince: res.data.user.memberSince,
          name: res.data.user.name
        });
      })
      .catch((err) => {
        console.log("something went wrong");
      });
  }

  // Log User Out
  logoutUser = () => {
    // Remove item from local storage
    localStorage.removeItem("jwtToken");
    // Remove auth header -- Call the same function as you did to set it but set it to false this time instead of passing in a token
    setAuthToken(false);
    this.props.history.push("/");
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12 text-center">
            <img
              className="duality-logo mt-5 mb-2"
              src="http://www.dualitysys.com/images/Duality%20Systems.png"
              alt="Duality Systems Logo"
            ></img>
          </div>
        </div>
        <div className="row text-center mb-5 mt-5">
          <div className="col-md-12">
            <h1 className="welcome-header">Welcome</h1>
          </div>
        </div>
        <div className="row">
          {" "}
          <div className="user-card ml-5">
            <div className="user-welcome">
              <h6>Hello,</h6>
              <h2>{this.state.name}</h2>
              <p>Welcome Back!</p>
            </div>
            <div className="card-info">
              <h3 className="summary">Account Summary:</h3>
              <h5 className="mt-4">
                <span className="user-info">Name: </span> {this.state.name}
              </h5>
              <h5 className="mt-4">
                <span className="user-info">Email:</span> {this.state.email}
              </h5>{" "}
              <h5 className="mt-4">
                <span className="user-info">Member Since:</span>{" "}
                {this.state.memberSince}
              </h5>{" "}
              <h5 className="mt-4">
                <span className="user-info">
                  About You: <br />
                </span>{" "}
                <span className="message">{this.state.message}</span>
              </h5>
            </div>
          </div>
        </div>
        <div className="col-md-12 text-center logout-row">
          <span className="logout-btn" onClick={this.logoutUser}>
            <i className="fas fa-power-off ml-1"></i>{" "}
            <span className="back-text"></span>
            <h5>Log Out</h5>
          </span>
        </div>
      </div>
    );
  }
}

export default withRouter(Dashboard);
