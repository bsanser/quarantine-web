import React, { useState } from "react";
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

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const FormDialog = ({ handleClose, open, onSubmit, history }) => {
  const [urlInfo, setUrlInfo] = useState({});

  const handleOnChange = e => {
    setUrlInfo(e.target.value);
  };

  const handleLinkSubmission = async () => {
    const { data } = await UrlService.getInfoFromUrl(urlInfo);
    history.push("/plans/new", data);
  };

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
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleLinkSubmission} color="primary">
          Send link
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default withRouter(FormDialog);
