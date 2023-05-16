import { useDispatch } from "react-redux";
import { styled, alpha } from "@mui/material/styles";
import Menu, { MenuProps } from "@mui/material/Menu";
import React, { useState } from "react";
import DeleteDialogs from "../../dialog/index";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Formik, Form } from "formik";
import { updateAmountSalesAndPurchase } from "../../../screens/saleandPurchase/action";
import {
  calenderIMG,
  bankAccountList,
  phonePreventText,
  PAYMENT_MODE,
} from "../../../constants";
import { useNavigate } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import "../../dialog/dialog.scss";
import Schema from "../../../schema";
import NormalInput from "../../inputs/normalInput";
import { Box } from "@mui/system";
import Autocomplete from "../../autocomplete";
import NormalButton from "../../buttons/normalButton";
import { convertIntegerToDecimal } from "../../../utils";
import moment from "moment";
const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));
interface EstimateMenuProps {
  detail: any;
  openPopup: boolean | false;
  setMarkPaidOpen: any;
  setAnchorEl: any;
  setOpenDetail: any;
  markAspaidStatus: boolean;
}

const MarkPaid = (props: EstimateMenuProps) => {
  const {
    detail,
    openPopup,
    setMarkPaidOpen,
    setAnchorEl,
    setOpenDetail,
    markAspaidStatus,
  } = props;

  const dispatch: any = useDispatch();
  const navigate = useNavigate();
  const [openPartiallyPaid, setOpenPartiallyPaid] = useState(openPopup);
  const [partiallyPaidAmount, setPartiallyPaidAmount] = useState(null);

  const [paidOpen, setPaidOpen] = React.useState<boolean>(false);

  var val = {
    amount: "",
    transactionDate: new Date(),
    paymentMode: PAYMENT_MODE.CASH,
    bankAccount: "",
    totalPrice: detail?.dueAmount?.toFixed(2),
    salesPurchaseId: "",
    notes: "",
  };

  const [formData, setFormData] = React.useState<any>(val);

  const handleClose = () => {
    props.setMarkPaidOpen(false);
    setAnchorEl(null);
  };

  const markAsPaid = () => {
    setOpenPartiallyPaid(true);
    props.setOpenDetail(false);
    props.setMarkPaidOpen(false);
  };

  const partiallyPaid = () => {
    props.setOpenDetail(false);
    setAnchorEl(null);

    setOpenPartiallyPaid(true);
  };

  const getInitialValues = {
    amount: markAspaidStatus ? formData.amount : detail.dueAmount,
    transactionDate: formData.transactionDate
      ? new Date(formData.transactionDate)
      : new Date(),
    paymentMode: PAYMENT_MODE.CASH,
    bankAccount: "",
    totalPrice: detail.dueAmount.toFixed(2),
    salesPurchaseId: "",
    notes: formData.notes ? formData.notes : "",
  };

  return (
    <>
      <DeleteDialogs
        dialogOpen={paidOpen}
        // popimg={deleteIMG}
        dialogTitle={markAspaidStatus ? "Mark As Partial paid" : "Mark As Paid"}
        yesHandle={() => {
          dispatch(updateAmountSalesAndPurchase(formData));
          setAnchorEl(null);
          setPaidOpen(false);
          setMarkPaidOpen(false);
          props.setOpenDetail(false);
        }}
        handleDialogClose={() => {
          setFormData(formData);
          setPaidOpen(false);
          //setMarkPaidOpen(false);
        }}
        dialogPara={`Are you sure you want to ${
          markAspaidStatus ? `Partial ` : "Mark As "
        } Paid this Data?`}
        nvCancel="Cancel"
        nvYes="Yes"
      />
      <Dialog
        open={openPartiallyPaid}
        onClose={() => {
          setMarkPaidOpen(false);
          setOpenPartiallyPaid(false);
        }}
        className="dialog_pop addcategory"
      >
        <div>
          <DialogTitle>
            {markAspaidStatus ? " Partial " : " Mark As "} Paid
          </DialogTitle>
          <Formik
            initialValues={getInitialValues}
            enableReinitialize={true}
            validateOnChange={true}
            validationSchema={Schema.markAsParitalPaidSchema}
            onSubmit={(values, { setSubmitting }) => {
              values.salesPurchaseId = detail?._id;

              delete values.totalPrice;
              setFormData(values);
              setPaidOpen(true);
            }}
          >
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting,
              touched,
              values,
              setFieldValue,
              isValid,
              dirty,
            }) => {
              return (
                <Form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit(e);
                  }}
                >
                  <DialogContent>
                    <Grid container rowSpacing={3} columnSpacing={2}>
                      {markAspaidStatus && (
                        <>
                          <Grid item sm={12} md={12} lg={12}>
                            <NormalInput
                              type="number"
                              name={"amount"}
                              onKeyDown={(e: any) =>
                                phonePreventText.includes(e.key) &&
                                e.preventDefault()
                              }
                              values={values.amount || formData?.amount}
                              isRequired
                              onBlur={handleBlur}
                              focused={false}
                              sizeval="medium"
                              label="Enter Value"
                              onChange={(e: any) => {
                                if (
                                  e.target.value.split(".")?.length == 2 &&
                                  e.target.value.split(".")[1].length > 2
                                ) {
                                  return;
                                }
                                handleChange(e);
                              }}
                              error={Boolean(touched.amount && errors.amount)}
                              helperText={touched.amount && errors.amount}
                            />
                          </Grid>
                          <Grid item sm={12} md={12} lg={12}>
                            <NormalInput
                              type="number"
                              name={"totalAmount"}
                              values={values.totalPrice}
                              isDisabled={true}
                              onBlur={handleBlur}
                              focused={false}
                              sizeval="medium"
                              label="Total Amount"
                            />
                          </Grid>
                        </>
                      )}

                      <Grid item sm={12} md={12} lg={12}>
                        <div className="filterDate">
                          <i>
                            <img src={calenderIMG} alt="" />
                          </i>
                          <label className="required">
                            Transaction Date<span>*</span>
                          </label>
                          <DatePicker
                            dateFormat="dd-MM-yyyy"
                            selected={values.transactionDate}
                            onChange={(e) => {
                              handleChange({
                                target: { name: "transactionDate", value: e },
                              });
                            }}
                            maxDate={new Date()}
                            placeholderText="DD-MM-YYYY"
                            name="fromDate"
                          />
                        </div>
                        {touched.transactionDate && errors.transactionDate && (
                          <p className="filterDateError"></p>
                        )}
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          label="notes"
                          name={"notes"}
                          value={values.notes || formData?.notes}
                          id="notes"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={Boolean(touched.notes && errors.notes)}
                          helperText={
                            touched.notes &&
                            `${errors.notes ? errors.notes : ""}`
                          }
                          className="textarea-cover"
                          multiline
                          rows={2}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <label className="required">
                          Mode<span>*</span>
                        </label>
                        <RadioGroup
                          row
                          aria-labelledby="demo-row-radio-buttons-group-label"
                          name="paymentMode"
                          defaultValue={PAYMENT_MODE.CASH}
                          className="radio-buttons"
                          value={values.paymentMode}
                          onChange={handleChange}
                        >
                          <FormControlLabel
                            value={PAYMENT_MODE.CASH}
                            control={<Radio />}
                            label="Cash"
                          />
                          <FormControlLabel
                            value={PAYMENT_MODE.BANK}
                            control={<Radio />}
                            label="Bank"
                          />
                        </RadioGroup>
                      </Grid>
                      {values.paymentMode == PAYMENT_MODE.BANK && (
                        <Grid item sm={12} md={12} lg={12}>
                          <React.Fragment key={values.paymentMode}>
                            <Autocomplete
                              disableClearable={true}
                              //required={true}
                              isRequired
                              values={values.bankAccount}
                              label={"Bank Account"}
                              onChange={(_e: any, newValue: any) => {
                                handleChange({
                                  target: {
                                    name: "bankAccount",
                                    value: newValue.name,
                                  },
                                });
                              }}
                              defaultValue={() => {}}
                              size="small"
                              name="referenceNumber"
                              options={bankAccountList}
                              isOptionEqualToValue={(
                                option: any,
                                value: any
                              ) => {
                                if (
                                  value === "" ||
                                  option === "" ||
                                  value.id === option.id
                                )
                                  return option;
                              }}
                              getOptionLabel={(option: any) =>
                                option.name || ""
                              }
                              renderOption={(props: any, option: any) => {
                                return (
                                  <Box
                                    component="li"
                                    sx={{
                                      "& > img": { mr: 2, flexShrink: 0 },
                                    }}
                                    {...props}
                                  >
                                    {option.name}
                                  </Box>
                                );
                              }}
                              error={
                                Boolean(touched.bankAccount) &&
                                errors.bankAccount
                              }
                              helperText={
                                touched.bankAccount && errors.bankAccount
                              }
                            />
                          </React.Fragment>
                        </Grid>
                      )}
                    </Grid>
                    <Grid container rowSpacing={3} columnSpacing={2}>
                      <Grid item xs={6}>
                        <NormalButton
                          buttonText="Cancel"
                          onPress={() => {
                            props.setMarkPaidOpen(false);
                            setOpenPartiallyPaid(false);
                          }}
                          className="btn-simple w-100 m-t-20"
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <NormalButton
                          type="submit"
                          variant="contained"
                          buttonText="SAVE"
                          //disabled={!(isValid && dirty)}
                          className="btn-purple w-100 m-t-20"
                        />
                      </Grid>
                    </Grid>
                  </DialogContent>
                </Form>
              );
            }}
          </Formik>
        </div>
      </Dialog>
    </>
  );
};

export default MarkPaid;
