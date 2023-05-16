import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from "@mui/material";
import NormalButton from "../buttons/normalButton";
import "./dialog.scss";
import { blockIMG, sucdigIMG } from "../../constants";
import { useDispatch } from "react-redux";
import { changeCustomerStatus } from "../../screens/payments/customers/action";
import { changeProductServiceStatus } from "../../screens/productandServices/action";
import { changeMemberStatus, changeRoleStatus } from "../../screens/teamManagement/teamManagemnetAction";

interface DialogProps {
  popimg?: any;
  dialogTitle?: string;
  dialogPara?: string;
  nvYes?: string;
  nvCancel?: string;
  handleDialogClose?: any;
  dialogOpen?: any;
  yesHandle?: any;
  id: any;
  type: string;
  status: any;
}

const ChangeStatus = (props: DialogProps) => {
  const {
    popimg,
    dialogTitle,
    dialogPara,
    nvYes,
    nvCancel,
    dialogOpen,
    handleDialogClose,
    id,
    type,
    status,
  } = props;
  const dispatch: any = useDispatch();
  const confirmHandle = () => {
    if (type === "customer") {
      dispatch(changeCustomerStatus({ id: id, status: status }));
    }

    if (type === "productservice") {
      dispatch(changeProductServiceStatus({ id: id, status: status }));
    }
    if (type === "role") {
      dispatch(changeRoleStatus({ id: id, status: status }));
    }
    if (type === "member") {
      dispatch(changeMemberStatus({ id: id, status: status }));
    }

    handleDialogClose(false);
  };

  return (
    <>
      <Dialog open={dialogOpen} className="dialog_pop">
        <i className="icon">
          <img src={status === "1" ? sucdigIMG : blockIMG} alt="" />
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
          <NormalButton
            buttonText={nvYes}
            onPress={confirmHandle}
            className="btn-purple"
          />
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ChangeStatus;
