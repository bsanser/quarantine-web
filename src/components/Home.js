import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import PlansList from "./PlansList";
import PlansService from "./../services/PlansService";

import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import FormDialog from "./Dialog";

const fabStyle = {
  right: 20,
  bottom: 20,
  position: "fixed"
};

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      plans: [],
      isModalOpen: false
    };
  }

  componentDidMount() {
    this.fetchPlans();
  }
  fetchPlans = () => {
    PlansService.getPlans().then(response =>
      this.setState({ plans: response.data })
    );
  };

  handleCloseModal = () => {
    this.setState({ isModalOpen: false });
  };

  render() {
    const { plans, isModalOpen } = this.state;
    return (
      <div className="Home">
        <PlansList plans={plans} />
        <Fab color="primary" aria-label="add" style={fabStyle}>
          <AddIcon onClick={() => this.setState({ isModalOpen: true })} />
        </Fab>
        <FormDialog
          handleClose={this.handleCloseModal}
          open={isModalOpen}
        ></FormDialog>
      </div>
    );
  }
}

export default withRouter(Home);
