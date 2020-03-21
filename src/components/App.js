import React, { Component } from "react";
import "./../App.css";
import PlansList from "./PlansList";
import PlansService from "./../services/PlansService";

class App extends Component {
  state = {
    plans: []
  };
  componentDidMount() {
    this.fetchPlans();
  }
  fetchPlans = () => {
    PlansService.getPlans().then(response =>
      this.setState({ plans: response.data })
    );
  };

  render() {
    const { plans } = this.state;
    return (
      <div className="App">
        <PlansList plans={plans} />
      </div>
    );
  }
}

export default App;
