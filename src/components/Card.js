import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
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
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Like from "./Like";
import Tooltip from "./Tooltip";

import LANGUAGES from "./../constants/languages";
import CATEGORIES from "./../constants/categories";
import { formatDifference, relativeDate } from "../utils/date-utils";

import { truncateString, capitalizeAndSplit } from "../utils/string-utils";

import { AuthContext } from "../contexts/AuthContext";

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
  }
}));
const CardComponent = props => {
  const classes = useStyles();
  const {
    plan: { description, title, imageUrl, date, category, language }
  } = props;
  const [isLiked, setLiked] = useState(false);
  const [totalLikes, setTotalLikes] = useState(0);

  return (
    <AuthContext.Consumer>
      {context => {
        const { user, isAuthenticated } = context;
        const handleLike = () => {
          if (isAuthenticated()) {
            setLiked(!isLiked);
          }
        };
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
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              }
              title={truncateString(title, 70)}
              subheader={`${formatDifference(new Date(date), new Date(), {
                addSuffix: true
              })} - ${relativeDate(new Date(date), new Date())}`}
            />
            <CardMedia
              className={classes.media}
              image={imageUrl}
              title="title"
            />
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
              <div>
                {isAuthenticated() ? (
                  <Like
                    totalLikes={totalLikes}
                    isLiked={isLiked}
                    handleLike={handleLike}
                  ></Like>
                ) : (
                  <Tooltip title="Please, login with Google first">
                    <Like
                      totalLikes={0}
                      isLiked={false}
                      handleLike={handleLike}
                    ></Like>
                  </Tooltip>
                )}

                <IconButton aria-label="share">
                  <ShareIcon />
                </IconButton>
              </div>
            </CardActions>
          </Card>
        );
      }}
    </AuthContext.Consumer>
  );
};

export default CardComponent;
