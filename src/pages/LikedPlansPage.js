import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import PlansService from "../services/PlansService";
import Fab from "@material-ui/core/Fab";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import Snackbar from "@material-ui/core/Snackbar";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import FormDialog from "../components/Dialog";
import PlansList from "../components/PlansList";
import BottomNavigation from "../components/BottomNavigation";

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

const LikedPlansPage = ({ context }) => {
  const [plans, setPlans] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [displayLoginAlert, setDisplayLoginAlert] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const { isAuthenticated } = context;
  const classes = useStyles();

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
    if (!isAuthenticated()) {
      setLoading(false);
      return;
    }
    PlansService.getLikedPlans().then((response) => {
      setPlans(response.data);
      setLoading(false);
    });
  }, []);

  return (
    <>
      <div className={classes.homeWrapper}>
        <Typography variant="h1" className={classes.heading}>
          Your favourite
        </Typography>

        {plans.length === 0 && isLoading && (
          <div className={classes.loaderWrapper}>
            <CircularProgress color="secondary" size={80} />
          </div>
        )}
        {plans.length === 0 && !isLoading && !isAuthenticated() && (
          <div>
            <p>
              You don't have favourites yet. Sign in via google and start saving
              your favourite activities
            </p>
            <Button
              variant="contained"
              color="primary"
              component="a"
              href="/auth/google"
              size="medium"
            >
              Login
            </Button>
          </div>
        )}
        {plans.length === 0 && !isLoading && isAuthenticated() && (
          <div>You don't have favourites yet.</div>
        )}
        {plans.length > 0 && <PlansList plans={plans} />}
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
      {(context) => <LikedPlansPage {...props} context={context} ref={ref} />}
    </AuthContext.Consumer>
  ))
);
