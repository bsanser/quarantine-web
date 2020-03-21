import React, { Component } from "react";
import { withRouter } from "react-router-dom";

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

  goToPath(path) {
    this.props.history.push(path);
  }

  render() {
    const { plans } = this.state;
    return (
      <div className="Home">
        <PlansList plans={plans} />
        <button
          style={{ border: "1px solid black", borderRadius: "4px" }}
          onClick={() => this.goToPath("/plans/new")}
        >
          Create Plan
        </button>
      </div>
    );
  }
}

export default withRouter(Home);
