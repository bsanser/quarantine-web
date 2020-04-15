import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import PlansService from "./../services/PlansService";
import Fab from "@material-ui/core/Fab";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import Snackbar from "@material-ui/core/Snackbar";
import Typography from "@material-ui/core/Typography";
import FormDialog from "./../components/Dialog";
import FiltersList from "./../components/FiltersList";
import PlansList from "./../components/PlansList";
import BottomNavigation from "./../components/BottomNavigation";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  homeWrapper: {
    padding: theme.spacing(3),
    paddingBottom: theme.spacing(5),
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
    position: "fixed",
  },
  loaderWrapper: {
    width: "100px",
    margin: "auto",
  },
  loginButton: {
    color: "white",
    textDecoration: "none",
  },
}));

const AllPlansPage = ({ context }) => {
  const [plans, setPlans] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [fromFilter, setFromFilter] = useState(null);
  const [toFilter, setToFilter] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [languageFilter, setLanguageFilter] = useState("");
  const [displayLoginAlert, setDisplayLoginAlert] = useState(false);
  const [isLoading, setLoading] = useState(false);
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
    setLoading(true);
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

      PlansService.getAllPlans(filter).then((response) => {
        setPlans(response.data);
        setLoading(false);
      });
    };

    fetchPlans();
  }, [categoryFilter, fromFilter, languageFilter, toFilter]);

  return (
    <>
      <div className={classes.homeWrapper}>
        <Typography variant="h1" className={classes.heading}>
          All activities
        </Typography>

        <FiltersList
          handleApplyFilter={handleApplyFilter}
          category={categoryFilter}
          language={languageFilter}
          handleChangeDate={handleChangeDate}
          from={fromFilter}
          to={toFilter}
        ></FiltersList>
        {plans.length === 0 && isLoading && (
          <div className={classes.loaderWrapper}>
            <CircularProgress color="secondary" size={80} />
          </div>
        )}

        {plans.length > 0 && !isLoading && <PlansList plans={plans} />}
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
            <Button
              as="a"
              href="/auth/google"
              color="inherit"
              size="medium"
              className={classes.loginButton}
            >
              Login
            </Button>
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
      {(context) => <AllPlansPage {...props} context={context} ref={ref} />}
    </AuthContext.Consumer>
  ))
);
