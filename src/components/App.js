import React, { Component } from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import styled from "styled-components";
import theme from "./../styles/theme";
import { Switch, Route, Redirect } from "react-router-dom";
import Header from "./Header";
import Home from "./Home";
import AllPlansPage from "./../pages/AllPlansPage";
import LikedPlansPage from "../pages/LikedPlansPage";
import PlansForm from "./PlansForm";
import NotFound from "./NotFound";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import AuthContextProvider from "./../contexts/AuthContext";

import LandingPage from "./../pages/LandingPage.js";

const Container = styled.div`
  height: 100%;
  background-color: white;
`;

class App extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <Container>
          <AuthContextProvider>
            <Header />
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <main>
                <Switch>
                  <Route exact path="/home" component={Home} />
                  <Route exact path="/plans/all" component={AllPlansPage} />
                  <Route exact path="/plans/liked" component={LikedPlansPage} />
                  <Route exact path="/plans/new" component={PlansForm} />
                  <Route exact path="/" component={LandingPage} />

                  <Route path="/" component={NotFound} />
                </Switch>
              </main>
            </MuiPickersUtilsProvider>
          </AuthContextProvider>
        </Container>
      </ThemeProvider>
    );
  }
}

export default App;
