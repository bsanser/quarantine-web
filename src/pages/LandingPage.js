import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import LandingImage from "./../images/cards_with_illustration.png";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(3),
    [theme.breakpoints.up("md")]: {
      padding: theme.spacing(6),
      width: "520px",
      margin: "auto",
      display: "flex",
      flexDirection: "column",
    },
    [theme.breakpoints.up("lg")]: {
      width: "900px",
      padding: theme.spacing(4),
      textAlign: "center"
    },
  },
  heading: {
    fontSize: "48px",
    marginBottom: theme.spacing(2),
    [theme.breakpoints.only("xs")]: {
      fontSize: "32px",
    },
  },
  subtitle: {
    fontWeight: "600",
    fontSize: "28px",
    lineHeight: "28px",
    margin: 0,
    marginBottom: theme.spacing(4),
    "& span": {
      color: theme.palette.primary.main,
    },
    [theme.breakpoints.only("xs")]: {
      fontSize: "24px",
    },
    [theme.breakpoints.up("md")]: {
      marginBottom: theme.spacing(5),
    },
  },
  description: {
    fontWeight: "800",
    fontSize: "16px",
    lineHeight: "24px",
    [theme.breakpoints.only("xs")]: {
      fontSize: "14px",
      lineHeight: "16px",
    },
    [theme.breakpoints.up("md")]: {
      marginBottom: theme.spacing(1),
    },
  },
  imageWrapper: {
    position: "relative",
    height: "410px",
    margin: theme.spacing(2),
    backgroundImage: `url(${LandingImage})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "contain",
    [theme.breakpoints.up("md")]: {
      width: "450px",
      height: "550px",
      alignSelf: "center",
      backgroundSize: "cover",
    },
  },
  button: {
    position: "absolute",
    padding: theme.spacing(2),
    top: "45%",
    left: "2px",
    width: "85vw",
    maxWidth: "400px",
    border: "2px solid black",
    "& span": {
      fontWeight: 800,
      fontSize: "20px",
      textTransform: "none",
      lineHeight: "30px",
    },
    [theme.breakpoints.only("xs")]: {
      top:"30%",
      left: "-16px",
    },
    [theme.breakpoints.up("md")]: {
      padding: theme.spacing(3),
      top: "45%",
      left: "20px",
      maxWidth: "450px",
    },
  },
}));

const LandingPage = ({ history }) => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <Typography variant="h1" className={classes.heading}>
        Welcome to Quarantining
      </Typography>

      <p className={classes.subtitle}>
        a new world for being <span>together apart</span>
      </p>
      <p className={classes.description}>
        Discover and contribute to a network of free online activities
      </p>
      <div className={classes.imageWrapper}>
        {/* <img src={LandingImage} alt="landing" /> */}
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={() => history.push("/home")}
        >
          <span>Oh, please, entertain me</span>
        </Button>
      </div>
    </div>
  );
};

export default LandingPage;
