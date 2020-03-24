import React from "react";
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
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import MusicNoteIcon from "@material-ui/icons/MusicNote";
import LANGUAGES from "./../constants/languages";
import { formatDifference, relativeDate } from "./../utils/date-utils/date-utils";

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 345
  },
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
        title={title}
        subheader={`${formatDifference(new Date(date), new Date(), {
          addSuffix: true
        })} - ${relativeDate(new Date(date), new Date())}`}
      />
      <CardMedia className={classes.media} image={imageUrl} title="eLTITULO" />
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
          startIcon={<MusicNoteIcon />}
        >
          {category}
        </Button>
        <div>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
        </div>
      </CardActions>
    </Card>
  );
};

export default CardComponent;
