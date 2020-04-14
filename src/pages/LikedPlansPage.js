import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import PlansService from "../services/PlansService";
import Fab from "@material-ui/core/Fab";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import Snackbar from "@material-ui/core/Snackbar";
import Typography from "@material-ui/core/Typography";
import FormDialog from "../components/Dialog";
import PlansList from "../components/PlansList";
import BottomNavigation from "../components/BottomNavigation";

const StyledButton = styled(Button)`
  color: white;
  text-decoration: none;
`;

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
}));

const LikedPlansPage = ({ context }) => {
  const [plans, setPlans] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [displayLoginAlert, setDisplayLoginAlert] = useState(false);
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
    PlansService.getLikedPlans().then((response) => {
      setPlans(response.data);
    });
  }, []);

  //TO DO: Handle loading state, not-authenthicated user, authenticated user but no favs.

  return (
    <>
      <div className={classes.homeWrapper}>
        <Typography variant="h1" className={classes.heading}>
          Your favourite
        </Typography>
        {plans.length === 0 && <div>You don't have favourites yet.</div>}
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
      {(context) => <LikedPlansPage {...props} context={context} ref={ref} />}
    </AuthContext.Consumer>
  ))
);
