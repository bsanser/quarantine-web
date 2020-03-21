import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import PlansList from "./PlansList";
import PlansService from "./../services/PlansService";

import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";

const fabStyle = {
  right: 20,
  position: "fixed"
};

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
        <Fab color="primary" aria-label="add" style={fabStyle}>
          <AddIcon onClick={()=>this.props.history.push('/plans/new')} />
        </Fab>
      </div>
    );
  }
}

export default withRouter(Home);
