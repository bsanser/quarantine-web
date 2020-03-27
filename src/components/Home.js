import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";

import PlansList from "./PlansList";
import PlansService from "./../services/PlansService";

import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import FormDialog from "./Dialog";
import FiltersList from "./FiltersList";
import { formatToISO } from "./../utils/date-utils";
import Tooltip from "./../components/Tooltip";
import { AuthContext } from "../contexts/AuthContext";

const fabStyle = {
  margin: 0,
  top: "auto",
  right: 20,
  bottom: 20,
  left: "auto",
  position: "fixed"
};

const Home = ({ context }) => {
  // console.log(formatToISO(new Date())); //2020-03-26T13:45:56Z
  const [plans, setPlans] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [todayFilter, setTodayFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [languageFilter, setLanguageFilter] = useState("all");
  const { isAuthenticated } = context;

  const handleFilterByToday = () =>
    todayFilter === "all"
      ? setTodayFilter(formatToISO(new Date()))
      : setTodayFilter("all");

  const handleApplyFilter = event => {
    const { name, value } = event.target;
    // eslint-disable-next-line default-case
    switch (name) {
      case "category":
        setCategoryFilter(value);
        break;
      case "language":
        setLanguageFilter(value);
        break;
    }
  };

  const handleAddPlan = () => {
    if (isAuthenticated()) setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    const fetchPlans = () => {
      PlansService.getPlans({
        date: todayFilter,
        category: categoryFilter.toLowerCase(),
        language: languageFilter
      }).then(response => {
        setPlans(response.data);
      });
    };
    fetchPlans();
  }, [categoryFilter, todayFilter, languageFilter]);

  return (
    <div className="Home">
      <FiltersList
        handleApplyFilter={handleApplyFilter}
        handleFilterByToday={handleFilterByToday}
        category={categoryFilter}
        language={languageFilter}
        today={todayFilter}
      ></FiltersList>
      <PlansList plans={plans} />
      {isAuthenticated() ? (
        <Fab color="primary" aria-label="add" style={fabStyle}>
          <AddIcon onClick={handleAddPlan} />
        </Fab>
      ) : (
        <Tooltip title="Please, login with Google first">
          <Fab color="primary" aria-label="add" style={fabStyle}>
            <AddIcon />
          </Fab>
        </Tooltip>
      )}
      <FormDialog
        handleClose={handleCloseModal}
        open={isModalOpen}
      ></FormDialog>
    </div>
  );
};

export default withRouter(
  React.forwardRef((props, ref) => (
    <AuthContext.Consumer>
      {context => <Home {...props} context={context} ref={ref} />}
    </AuthContext.Consumer>
  ))
);
