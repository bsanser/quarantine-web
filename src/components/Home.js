import React, { Component } from "react";

import PlansList from "./PlansList";
import PlansService from "./../services/PlansService";

class Home extends Component {
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
      <div className="Home">
        <PlansList plans={plans} />
      </div>
    );
  }
}

export default Home;
