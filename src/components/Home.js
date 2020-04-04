import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import Fab from "@material-ui/core/Fab";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import FormDialog from "./Dialog";
import FiltersList from "./FiltersList";
import { formatToISO } from "./../utils/date-utils";
import Snackbar from "@material-ui/core/Snackbar";

import { AuthContext } from "../contexts/AuthContext";
import PlansList from "./PlansList";
import PlansService from "./../services/PlansService";

const fabStyle = {
  margin: 0,
  top: "auto",
  right: 20,
  bottom: 20,
  left: "auto",
  position: "fixed"
};

const useStyles = makeStyles(theme => ({
  snackbar: {
    bottom: "60px"
  }
}));

const StyledButton = styled(Button)`
  color: white;
  text-decoration: none;
`;

const Home = ({ context }) => {
  // console.log(formatToISO(new Date())); //2020-03-26T13:45:56Z
  const [plans, setPlans] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [todayFilter, setTodayFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [languageFilter, setLanguageFilter] = useState("all");
  const [displayLoginAlert, setDisplayLoginAlert] = useState(false);
  const { isAuthenticated } = context;
  const classes = useStyles();

  const handleFilterByToday = () => {
    console.log(new Date().toISOString());
    console.log(formatToISO(new Date()));
    todayFilter === "all"
      ? setTodayFilter(new Date().toISOString())
      : setTodayFilter("all");
  };

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
    if (isAuthenticated()) {
      setModalOpen(true);
    } else {
      setDisplayLoginAlert(true);
    }
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
      <Snackbar
        className={classes.snackbar}
        key={`top,center`}
        open={displayLoginAlert}
        autoHideDuration={3000}
        onClose={() => {
          setDisplayLoginAlert(false);
        }}
        message="Please, log in with Google first"
        action={
          <StyledButton
            as="a"
            href="/auth/google"
            color="inherit"
            size="medium"
          >
            Login
          </StyledButton>
        }
      />

      <Fab color="primary" aria-label="add" style={fabStyle}>
        <AddIcon onClick={handleAddPlan} />
      </Fab>

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
