import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import PlansService from "./../services/PlansService";
import Fab from "@material-ui/core/Fab";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import Snackbar from "@material-ui/core/Snackbar";
import Typography from "@material-ui/core/Typography";
import FormDialog from "./Dialog";
import FiltersList from "./FiltersList";
import PlansList from "./PlansList";
import BottomNavigation from "./BottomNavigation";


const StyledButton = styled(Button)`
  color: white;
  text-decoration: none;
`;

const useStyles = makeStyles((theme) => ({
  homeWrapper: {
    padding: theme.spacing(3),
    paddingBottom: theme.spacing(5)
  },
  snackbar: {
    bottom: "60px",
  },
  heading: {
    fontSize: "40px",
    marginBottom: theme.spacing(2),
    [theme.breakpoints.only("xs")]: {
      fontSize: "32px",
    },
  },
  actionButton: {
    margin: 0,
    bottom: theme.spacing(12),
    right: theme.spacing(4),
    position: "fixed"
  },
}));

const Home = ({ context }) => {
  const [plans, setPlans] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [fromFilter, setFromFilter] = useState(null);
  const [toFilter, setToFilter] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [languageFilter, setLanguageFilter] = useState("");
  const [displayLoginAlert, setDisplayLoginAlert] = useState(false);
  const { isAuthenticated } = context;
  const classes = useStyles();

  const handleApplyFilter = (event) => {
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

  const handleChangeDate = (value) => {
    setFromFilter(value);
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
      let filter = {
        from: fromFilter,
        to: toFilter,
      };
      if (categoryFilter) {
        filter = { ...filter, category: categoryFilter.toLowerCase() };
      }
      if (languageFilter) {
        filter = { ...filter, language: languageFilter.toLowerCase() };
      }
      PlansService.getPlans(filter).then((response) => {
        setPlans(response.data);
      });
    };

    fetchPlans();
  }, [categoryFilter, fromFilter, languageFilter, toFilter]);

  return (
    <>
      <div className={classes.homeWrapper}>
      <Typography variant="h1" className={classes.heading}>
       Upcoming activities
      </Typography>
        <FiltersList
          handleApplyFilter={handleApplyFilter}
          category={categoryFilter}
          language={languageFilter}
          handleChangeDate={handleChangeDate}
          from={fromFilter}
          to={toFilter}
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

        <Fab color="primary" aria-label="add" className={classes.actionButton}>
          <AddIcon onClick={handleAddPlan} />
        </Fab>

        <FormDialog
          handleClose={handleCloseModal}
          open={isModalOpen}
        ></FormDialog>
      </div>
      <BottomNavigation />
    </>
  );
};

export default withRouter(
  React.forwardRef((props, ref) => (
    <AuthContext.Consumer>
      {(context) => <Home {...props} context={context} ref={ref} />}
    </AuthContext.Consumer>
  ))
);
