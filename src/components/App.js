import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import "./../App.css";
import Header from "./Header";
import Home from "./Home";
import PlansForm from "./PlansForm";
import NotFound from "./NotFound";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import AuthContextProvider from "./../contexts/AuthContext";
import BottomNavigation from "./BottomNavigation";

class App extends Component {
  render() {
    return (
      <div className="App">
        <AuthContextProvider>
          <Header />
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <main className="container">
              <Switch>
                <Route exact path="/home" component={Home} />
                <Route exact path="/plans/new" component={PlansForm} />
                <Route
                  exact
                  path="/"
                  component={() => <Redirect to="/home" />}
                />

                <Route path="/" component={NotFound} />
              </Switch>
            </main>
            <BottomNavigation />
          </MuiPickersUtilsProvider>
        </AuthContextProvider>
      </div>
    );
  }
}

export default App;
