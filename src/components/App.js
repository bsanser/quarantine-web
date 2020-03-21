import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import "./../App.css";
import Header from "./Header";
import Home from "./Home";
import PlansForm from "./PlansForm";
import NotFound from "./NotFound";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <main className="container">
          <Switch>
            <Route exact path="/home" component={Home} />
            <Route exact path="/plans/new" component={PlansForm} />
            <Route exact path="/" component={() => <Redirect to="/home" />} />

            <Route path="/" component={NotFound} />
          </Switch>
        </main>
      </div>
    );
  }
}

export default App;
