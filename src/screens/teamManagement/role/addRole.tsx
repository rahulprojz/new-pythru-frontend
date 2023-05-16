import React, { useState } from "react";
import {
  Box,
  Checkbox,
  FormControlLabel,
  Grid,
  Typography,
} from "@mui/material";

import NormalButton from "../../../components/buttons/normalButton";

import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import { addrole, updateRole } from "../teamManagemnetAction";

import { Form, Formik } from "formik";

import NormalInput from "../../../components/inputs/normalInput";
import Schema from "../../../schema";

interface Props {
  setAddState: any;
  type?: string;
}

let intialState: any = {
  permission: {
    dashboard: { view: false, edit: false, add: false },
    productAndServices: { view: false, edit: false, add: false },
    payments: { view: false, edit: false, add: false },
    sales: { view: false, edit: false, add: false },
    purchases: { view: false, edit: false, add: false },
    accounting: { view: false, edit: false, add: false },
    settings: { view: false, edit: false, add: false, block: false },
    reports: { view: false, edit: false, add: false },
    banking: { view: false, edit: false, add: false },
    notification: { view: false, clear: false },
  },
};

const addRole = (props: Props) => {
  const dispatch: any = useDispatch();

  const { roleDetail } = useSelector((state: any) => state.teamManagementSlice);

  const initialValues: any = {
    name: props.type == "edit" ? roleDetail.name : "",
  };

  const [state, setState] = useState(
    props.type == "new" ? intialState : roleDetail
  );

  const handleChangeCheckbox = (e: any, label: string, type: string) => {
    let obj: any = {};

    let notificationObj: any = {};

    console.log(type, label);

    if (
      (state.permission[type]?.edit === false &&
        label === "add" &&
        e.target?.checked === false) ||
      (state.permission[type]?.add === false &&
        label === "edit" &&
        e.target?.checked === false)
    ) {
      obj.view = false;
    } else if (type === "settings" && label === "block") {
      console.log("enter for setting block");
      obj.view = true;
    } else if (type === "notification" && label === "clear") {
      notificationObj.view = true;
    } else {
      obj.view = true;
    }

    if ((label === "clear" && type=== "notification" && e.target.checked === false)
    || (type ==="notification" && label === "view" && state.permission[type]?.view === true) 
    ) {
      console.log("Notidication view clear")
      notificationObj = { view: false, clear: false };
    }

    let checkView: any = {};
    if (
      label === "view" &&
      e.target?.checked === false &&
      type !== "notification"
    ) {
      console.log("Do here for theat");
      checkView = {
        view: false,
        edit: false,
        add: false,
        ...(type === "settings" && { block: false }),
      };
    }

    if (type === "name") {
      // setState({ ...state, [type]: e.target.value });
    } else {
      setState({
        ...state,
        permission: {
          ...state.permission,
          [type]: {
            ...state.permission[type],
            [label]: e.target.checked,
            ...(["edit", "add", "block"].includes(label) && obj),
            ...(checkView && checkView),
            ...(["clear","view"].includes(label) && notificationObj),
          },
        },
      });
    }
  };

  const handleSave = (values: any) => {
    if (props.type === "new") {
      dispatch(
        addrole({ ...state, ...values }, (res: any) => {
          props.setAddState(false);
        })
      );
    } else {
      dispatch(
        updateRole({ ...state, ...values }, (res: any) => {
          props.setAddState(false);
        })
      );
    }

    setState(intialState);
  };

  console.log(state);

  return (
    <div>
      {props?.type == "new" ? (
        <h2 className="hd">Create Role</h2>
      ) : (
        <h2 className="hd">Edit Role</h2>
      )}

      <Box>
        <Formik
          initialValues={initialValues}
          validationSchema={Schema.RoleAddSchema}
          enableReinitialize
          onSubmit={(values, { resetForm }) => {
            handleSave(values);
            // resetForm();
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
            setFieldError,
            dirty,
          }) => {
            const { name } = values;

            return (
              <Form>
                <Grid container spacing={1}>
                  <Grid item xs={12} sm={6}>
                    <NormalInput
                      name={"name"}
                      isRequired
                      type={"text"}
                      focused={false}
                      label="Full Name"
                      sizeval="medium"
                      values={name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={Boolean(touched.name && errors.name)}
                      touched={Boolean(touched.name)}
                      errors={Boolean(errors.name)}
                      helperText={touched.name && errors.name}
                    />
                  </Grid>
                </Grid>

                <Typography
                  variant="body2"
                  className="color-purple semi-bold m-t-30 m-b-20 capitalize"
                >
                  Permissions
                </Typography>

                <ul className="permission-list">
                  {Object.keys(state.permission).length > 0
                    ? Object.entries(state?.permission)?.map(
                        ([key, value]: any, i: number) => {
                          return (
                            <li key={key}>
                              <Grid
                                container
                                rowSpacing={{ xs: 1, sm: 2, md: 3 }}
                                columnSpacing={{ xs: 0.5, sm: 1.5 }}
                              >
                                <Grid item xs={12} sm={3} md={4}>
                                  <Typography
                                    variant="subtitle1"
                                    className="semi-bold m-t-10 capitalize"
                                  >
                                    {key === "productAndServices"
                                      ? key?.replace(
                                          "productAnd",
                                          "Products  & "
                                        )
                                      : key}
                                  </Typography>
                                </Grid>
                                {Object.entries(value).map(
                                  ([name, label]: any) => {
                                    return (
                                      <Grid
                                        item
                                        xs={3}
                                        sm={2.2}
                                        md={2}
                                        key={name}
                                      >
                                        <FormControlLabel
                                          control={
                                            <Checkbox
                                              checked={label}
                                              onChange={(e) =>
                                                handleChangeCheckbox(
                                                  e,
                                                  name,
                                                  key
                                                )
                                              }
                                            />
                                          }
                                          className="nowrap capitalize"
                                          label={
                                            name === "block" ? "Delete" : name
                                          }
                                          labelPlacement="end"
                                        />
                                      </Grid>
                                    );
                                  }
                                )}
                              </Grid>
                            </li>
                          );
                        }
                      )
                    : null}
                </ul>

                <Grid container rowSpacing={3} columnSpacing={2}>
                  <Grid item xs={6}>
                    <NormalButton
                      type="submit"
                      variant="contained"
                      buttonText="Save"
                      className="btn-purple w-100 m-t-20"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <NormalButton
                      variant="contained"
                      buttonText="Cancel"
                      className="btn-simple w-100 m-t-20"
                      disabled={false}
                      onPress={() => props.setAddState(false)}
                    />
                  </Grid>
                </Grid>
              </Form>
            );
          }}
        </Formik>
      </Box>
    </div>
  );
};

export default addRole;
