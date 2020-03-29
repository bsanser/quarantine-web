import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import styled from "styled-components";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import ShareIcon from "@material-ui/icons/Share";
import VisibilityIcon from '@material-ui/icons/Visibility';
import Snackbar from "@material-ui/core/Snackbar";
import Like from "./Like";

import LANGUAGES from "./../constants/languages";
import CATEGORIES from "./../constants/categories";
import { formatDifference, relativeDate } from "../utils/date-utils";
import { truncateString, capitalizeAndSplit } from "../utils/string-utils";

import { AuthContext } from "../contexts/AuthContext";
import PlansService from "../services/PlansService";

const useStyles = makeStyles(theme => ({
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  actions: {
    justifyContent: "space-between"
  },
  actionsWrapper: {
    display: "flex"
  },
  snackbar: {
    bottom: "600px"
  }
}));

const StyledButton = styled(Button)`
  color: white;
  text-decoration: none;
`;

const CardComponent = ({ context, ...props }) => {
  const classes = useStyles();
  const {
    plan: { id, link, description, title, imageUrl, date, category, language }
  } = props;
  const [isLiked, setLiked] = useState(false);
  const [totalLikes, setTotalLikes] = useState(0);
  const { isAuthenticated } = context;
  const [displayLoginAlert, setDisplayLoginAlert] = useState(false);
  const handleLike = () => {
    if (isAuthenticated()) {
      PlansService.likePlan(id).then(response => {
        setTotalLikes(totalLikes + response.data.likes);
        setLiked(response.data.isLiked);
      });
    } else {
      setDisplayLoginAlert(true);
    }
  };

  useEffect(() => {
    // Get total number of likes of plan
    PlansService.getTotalLikes(id).then(totalLikes =>
      setTotalLikes(totalLikes.data)
    );
    // Get whether the user had already liked this plan
    if (isAuthenticated()) {
      PlansService.getUserLikedPlan(id).then(isLiked => setLiked(isLiked.data));
    }
  }, [id, isAuthenticated]);

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar
            aria-label="recipe"
            src={LANGUAGES[language.toLowerCase()]}
          ></Avatar>
        }
        action={
          <IconButton component="a" href={link} aria-label="go-to-link">
            <VisibilityIcon />
          </IconButton>
        }
        title={truncateString(title, 70)}
        subheader={`${formatDifference(new Date(date), new Date(), {
          addSuffix: true
        })} - ${relativeDate(new Date(date), new Date())}`}
      />
      <CardMedia className={classes.media} image={imageUrl} title="title" />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {description}
        </Typography>
      </CardContent>
      <CardActions className={classes.actions} disableSpacing>
        <Button
          variant="text"
          color="primary"
          className={classes.button}
          startIcon={CATEGORIES[capitalizeAndSplit(category)]}
        >
          {capitalizeAndSplit(category)}
        </Button>
        <div className={classes.actionsWrapper}>
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
          <Like
            totalLikes={totalLikes}
            isLiked={isAuthenticated() ? isLiked : false}
            handleLike={handleLike}
          ></Like>

          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
        </div>
      </CardActions>
    </Card>
  );
};

export default React.forwardRef((props, ref) => (
  <AuthContext.Consumer>
    {context => <CardComponent {...props} context={context} ref={ref} />}
  </AuthContext.Consumer>
));
