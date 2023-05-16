import Typography from "@material-ui/core/Typography";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import NormalButton from "../buttons/normalButton";
import "./dialog.scss";

interface DialogProps {
  popimg?: any;
  dialogTitle?: string;
  dialogPara?: string;
  nvYes?: string;
  nvCancel?: string;
  handleDialogClose?: any;
  dialogOpen?: any;
  yesHandle?: any;
}

const index = (props: DialogProps) => {
  const {
    popimg,
    dialogTitle,
    dialogPara,
    nvYes,
    nvCancel,
    dialogOpen,
    handleDialogClose,
    yesHandle,
  } = props;

  return (
    <>
      <Dialog open={dialogOpen} className="dialog_pop">
        <i className="icon">
          <img src={popimg} alt="" />
        </i>
        <DialogTitle>{dialogTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Typography variant="subtitle1" className="m-b-20">{dialogPara}</Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <NormalButton
            buttonText={nvCancel}
            onPress={handleDialogClose}
            className="btn-simple"
          />
          {nvYes && (
            <NormalButton
            buttonText={nvYes}
              onPress={yesHandle}
              className="btn-purple"
            />
          )}
        </DialogActions>
      </Dialog>
    </>
  );
};

export default index;
