import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { Button } from "@material-ui/core";
import { productActions } from "redux/actions";
import { useDispatch } from "react-redux";
import CreateUpdateSupp from "pages/Supplier/component/CreateUpdateSupp";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function SuppModal({ listSupp, role }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    dispatch(productActions.getProducts());
  };

  return (
    <div>
      <Button
        variant="contained"
        style={{ backgroundColor: "#2EC0FF", color: "white" }}
        color="primary"
        onClick={handleOpen}
        disabled={role !== "Admin"}
      >
        Add new supplier
      </Button>
      <Dialog
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <CreateUpdateSupp
            handleOpen={handleOpen}
            handleClose={handleClose}
            listSupp={listSupp}
          />
        </Fade>
      </Dialog>
    </div>
  );
}
