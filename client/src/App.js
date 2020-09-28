import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Switch, Route } from "react-router-dom";
import Home from "./Components/Home";
import Footer from "./Components/Footer";
import Register from "./Components/Register";
import Dashboard from "./Components/Dashboard";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/dashboard" component={Dashboard} />
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
