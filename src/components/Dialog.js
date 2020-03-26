import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import { withRouter } from "react-router-dom";
import UrlService from "./../services/UrlService";
import CircularProgress from "@material-ui/core/CircularProgress";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles(theme => ({
  wrapper: {
    margin: theme.spacing(1),
    position: "relative"
  },
  buttonProgress: {
    color: theme.primary,
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12
  }
}));

const FormDialog = ({ handleClose, open, onSubmit, history }) => {
  const [urlInfo, setUrlInfo] = useState({});
  const [loading, setLoading] = useState(false);
  const classes = useStyles();

  const handleOnChange = e => {
    setUrlInfo(e.target.value);
  };

  const handleLinkSubmission = async () => {
    if (!loading) {
      try {
        setLoading(true);
        const { status, data } = await UrlService.getInfoFromUrl(urlInfo);
        if (status === 201) {
          setLoading(false);
          history.push("/plans/new", data);
        }
      } catch (err) {
        alert(err); // TypeError: failed to fetch
      }
    }
  };

  const handleCancel = () => {
    setLoading(false);
    handleClose()
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="add-link-title"
      aria-describedby="add-link-description"
      TransitionComponent={Transition}
    >
      <DialogTitle id="form-dialog-title">
        Add a new plan - just paste the link
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          We'll get all the info from it (and you can edit afterwards). Remember
          to start the link with http or https!
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="link"
          label="Link to the plan"
          type="text"
          fullWidth
          onChange={handleOnChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel} color="primary" variant="contained">
          Cancel
        </Button>
        <div className={classes.wrapper}>
          <Button
            onClick={handleLinkSubmission}
            color="primary"
            disabled={loading}
            variant="contained"
          >
            Send link
          </Button>
          {loading && (
            <CircularProgress size={24} className={classes.buttonProgress} />
          )}
        </div>
      </DialogActions>
    </Dialog>
  );
};

export default withRouter(FormDialog);
