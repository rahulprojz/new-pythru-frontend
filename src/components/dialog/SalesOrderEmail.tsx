import {
  Autocomplete,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Stack,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

import NormalButton from "../buttons/normalButton";
import useMediaQuery from "@mui/material/useMediaQuery";
import "./dialog.scss";
import { useEffect, useState } from "react";
import { getSalePurchaseSaleOrderEmail } from "../../screens/saleandPurchase/action";
import { useDispatch, useSelector } from "react-redux";
import { DOCUMENT_TYPE, emailRegExp } from "../../constants";

interface DialogProps {
  popimg?: any;
  dialogTitle?: string;
  dialogContent?: string;
  nvYes?: string;
  nvCancel?: string;
  handleDialogClose?: any;
  dialogOpen?: any;
  yesHandle?: any;
  documentType: number;
}

const SalesOrderEmail = (props: DialogProps) => {
  const dispatch: any = useDispatch();
  const [email, setEmail] = useState<string>("");

  const [errorEmail, setErrorEmail] = useState<string>("");

  const {
    popimg,
    dialogTitle,
    dialogContent,
    nvYes,
    nvCancel,
    dialogOpen,
    handleDialogClose,
    yesHandle,
    documentType,
  } = props;

  useEffect(() => {
    if (dialogOpen && documentType === DOCUMENT_TYPE.SALES_ORDER) {
      dispatch(getSalePurchaseSaleOrderEmail());
    }
  }, [dialogOpen]);

  const { saleOrderEmail } = useSelector(
    (state: any) => state.salePurchaseSlice
  );

  const handleEmail = (val: string) => {
    if (!val) {
      setErrorEmail("email is required");
      return;
    }
    if (!val.match(emailRegExp)) {
      setErrorEmail("invalid email");
      return;
    }
    setEmail(val);
    setErrorEmail("");
  };

  const handleClose = () => {
    setEmail("");
    setErrorEmail("");
    handleDialogClose();
  };
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <>
      <Dialog
        open={dialogOpen}
        className="dialog_pop salesOrder"
        fullScreen={fullScreen}
        maxWidth="sm"
      >
        <DialogTitle style={{ padding: "0 0 30px 0", marginTop: '-20px' }}>
          {dialogTitle}
        </DialogTitle>
          <Autocomplete
            disableClearable
            id="free-solo-demo"
            className="MuiFormControl-root"
            freeSolo
            onChange={(_e: any, newValue: any) => {
              setErrorEmail("");
              handleEmail(newValue);
            }}
            onInputChange={(_e: any, newValue: any) => {
              setErrorEmail("");
              handleEmail(newValue);
            }}
            options={saleOrderEmail.map((option: any) => option._id)}
            renderInput={(params) => (
              <TextField
                {...params}
                required
                label="Enter Email ID"
                onChange={(e: any) => handleEmail(e.target.value)}
                error={errorEmail ? true : false}
                helperText={errorEmail ? errorEmail : ""}
              />
            )}
          />
        <DialogActions>
          <NormalButton
            buttonText={nvCancel}
            onPress={handleClose}
            className="btn-simple m-t-30"
          />
          <NormalButton
            buttonText={nvYes}
            disabled={!email || errorEmail}
            onPress={() => yesHandle(email)}
            className="btn-purple m-t-30"
          />
        </DialogActions>
      </Dialog>
    </>
  );
};

export default SalesOrderEmail;
