import { useState, Dispatch, SetStateAction } from "react";
import { Formik, Form } from "formik";
import { useSelector, useDispatch } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";

import NormalButton from "../../../components/buttons/normalButton";
import NormalInput from "../../../components/inputs/normalInput";
import { calenderIMG } from "../../../constants";
import Schema from "../../../schema";
import Dialog from "../../../components/dialog";
import {
  addAsset,
  updateAssetDetail,
} from "../../../screens/accounting/assets/action";
import { updateAsset } from "./assetSlice";

interface addAssetProp {
  openAddEdit: boolean | string;
  setOpenAddEdit: Dispatch<SetStateAction<string | boolean>>;
  setState: Dispatch<SetStateAction<boolean>>;
}

const AddAsset = (props: addAssetProp) => {
  const dispatch: any = useDispatch();
  const { openAddEdit, setOpenAddEdit, setState } = props;
  const [formData, setFormData] = useState({});
  const { editAsset, assetDetail } = useSelector(
    (state: any) => state.assetSlice
  );

  const initialValues = {
    name: editAsset ? assetDetail?.name : "",
    amount: editAsset ? assetDetail?.amount : "",
    purchasedDate: editAsset
      ? assetDetail?.purchasedDate
        ? new Date(assetDetail?.purchasedDate)
        : ""
      : "",
    supportedDate: editAsset
      ? assetDetail?.supportedDate
        ? new Date(assetDetail?.supportedDate)
        : ""
      : "",
    description: editAsset ? assetDetail?.description : "",
  };

  return (
    <>
      <h3 className="hd">{`${editAsset ? "Edit" : "Create New"}`} Asset</h3>
      <Formik
        initialValues={initialValues}
        validationSchema={Schema.AssetSchema}
        onSubmit={(values) => {
          if (editAsset) {
            dispatch(
              updateAssetDetail(values, assetDetail?._id, (res: any) => {
                setState(false);
                setOpenAddEdit(false);
                dispatch(
                  updateAsset({
                    editAsset: "",
                  })
                );
              })
            );
          } else {
            dispatch(
              addAsset(values, (res: any) => {
                setState(false);
                setOpenAddEdit(false);
                dispatch(
                  updateAsset({
                    editAsset: "",
                  })
                );
              })
            );
          }
          // setFormData(values);
          //setOpenAddEdit(true);
        }}
      >
        {({
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          touched,
          values,
        }) => (
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit(e);
            }}
          >
            <Grid container rowSpacing={3} columnSpacing={2}>
              <Grid item xs={12} lg={6}>
                <NormalInput
                  name={"name"}
                  isRequired
                  type={"text"}
                  focused={false}
                  sizeval="medium"
                  label="Asset Name"
                  values={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={Boolean(touched.name && errors.name)}
                  helperText={touched.name && errors.name}
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <div className="filterDate">
                  <i>
                    <img src={calenderIMG} alt="" />
                  </i>
                  <DatePicker
                    dateFormat="dd-MM-yyyy"
                    selected={
                      values?.purchasedDate
                        ? new Date(values.purchasedDate)
                        : null
                    }
                    onChange={(e) =>
                      handleChange({
                        target: { name: "purchasedDate", value: e },
                      })
                    }
                    onBlur={(e) =>
                      handleBlur({
                        target: { name: "purchasedDate", value: e },
                      })
                    }
                    placeholderText="Purchase Date *"
                  />
                </div>
                {touched.purchasedDate && errors.purchasedDate && (
                  <p className="filterDateError">{errors.purchasedDate}</p>
                )}
              </Grid>
              <Grid item xs={12} lg={6}>
                <NormalInput
                  name={"amount"}
                  isRequired
                  type={"number"}
                  focused={false}
                  sizeval="medium"
                  label="Amount"
                  values={values.amount}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={Boolean(touched.amount && errors.amount)}
                  helperText={touched.amount && errors.amount}
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <div className="filterDate">
                  <i>
                    <img src={calenderIMG} alt="" />
                  </i>
                  <DatePicker
                    dateFormat="dd-MM-yyyy"
                    selected={
                      values?.supportedDate
                        ? new Date(values.supportedDate)
                        : null
                    }
                    onChange={(e) =>
                      handleChange({
                        target: { name: "supportedDate", value: e },
                      })
                    }
                    onBlur={(e) =>
                      handleBlur({
                        target: { name: "supportedDate", value: e },
                      })
                    }
                    placeholderText="Supported Date *"
                  />
                </div>
                {touched.supportedDate && errors.supportedDate && (
                  <p className="filterDateError">{errors.supportedDate}</p>
                )}
              </Grid>
              <Grid item xs={12} lg={12}>
                <TextField
                  label="Description"
                  name={"description"}
                  id="description"
                  multiline
                  rows={2}
                  value={values.description}
                  className="textarea-cover"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Grid>
            </Grid>
            <Grid container rowSpacing={3} columnSpacing={2}>
              <Grid item xs={6}>
                <NormalButton
                  onPress={() => {
                    setOpenAddEdit("cancel");
                  }}
                  variant="contained"
                  buttonText="Cancel"
                  className="btn-simple w-100"
                  disabled={false}
                />
              </Grid>
              <Grid item xs={6}>
                <NormalButton
                  type="submit"
                  variant="contained"
                  buttonText="Save"
                  className="btn-purple w-100"
                />
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>

      <Dialog
        dialogOpen={openAddEdit}
        dialogTitle="Asset"
        yesHandle={() => {
          if (openAddEdit === "cancel") {
            setState(false);
            setOpenAddEdit(false);
            dispatch(
              updateAsset({
                editAsset: "",
              })
            );
          } else {
            if (editAsset) {
              dispatch(
                updateAssetDetail(formData, assetDetail?._id, (res: any) => {
                  setState(false);
                  setOpenAddEdit(false);
                  dispatch(
                    updateAsset({
                      editAsset: "",
                    })
                  );
                })
              );
            } else {
              dispatch(
                addAsset(formData, (res: any) => {
                  setState(false);
                  setOpenAddEdit(false);
                  dispatch(
                    updateAsset({
                      editAsset: "",
                    })
                  );
                })
              );
            }
          }
        }}
        handleDialogClose={() => setOpenAddEdit(false)}
        dialogPara={`Are you sure you want to  ${
          openAddEdit === "cancel"
            ? `leave without ${editAsset ? "updating" : "adding"} this asset?`
            : editAsset
            ? "update this asset?"
            : "add this asset?"
        }`}
        nvCancel="Cancel"
        nvYes="Yes"
      />
    </>
  );
};
export default AddAsset;
