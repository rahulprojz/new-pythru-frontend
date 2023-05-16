import {
  Box,
  Checkbox,
  FormControlLabel,
  Grid,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import NormalButton from "../../../components/buttons/normalButton";
import NormalInput from "../../../components/inputs/normalInput";

import NormalSelect from "../../../components/select/normalSelect";
import { add_Member, updateMember } from "../teamManagemnetAction";
import { phonePreventText } from "../../../constants";
import Schema from "../../../schema";

interface Props {
  setMemberState: any;
  type?: string;
}

let intialState: any = {
  fullName: "",
  email: "",
  // countryCode: "",
  phoneNumber: "",
  roleId: "",
  permission: {
    dashboard: { view: false, edit: false, add: false },
    productAndServices: { view: false, edit: false, add: false,  },
    payments: { view: false, edit: false, add: false,  },
    sales: { view: false, edit: false, add: false,  },
    purchases: { view: false, edit: false, add: false,  },
    accounting: { view: false, edit: false, add: false,  },
    settings: { view: false, edit: false, add: false, block: false  },
    reports: { view: false, edit: false, add: false,  },
    banking: { view: false, edit: false, add: false,  },
    notification: { view: false, clear: false },
  },
};

interface IntialValues {
  fullName: string;
  phoneNumber: string;
  email: string;
  roleId: string;
  // countryCode: string;
}

const addMember = (props: Props) => {
  const { roleList, memberDetail } = useSelector(
    (state: any) => state.teamManagementSlice
  );
  const [state, setState] = useState(
    props.type === "new" ? intialState : memberDetail
  );

  const dispatch: any = useDispatch();

  const initialValues: IntialValues = {
    fullName: props.type == "edit" ? memberDetail.fullName : "",
    phoneNumber: props.type == "edit" ? memberDetail.phoneNumber : "",
    email: props.type == "edit" ? memberDetail.email : "",
    roleId: props.type == "edit" ? memberDetail.roleId : "",
  };

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
    let saveData = {
      ...state,
      ...values,
      phoneNumber: values.phoneNumber.toString(),
      countryCode: "91",
    };

    setState(saveData);

    if (props.type === "new") {
      dispatch(
        add_Member(saveData, (res: any) => {
          props.setMemberState(false);
        })
      );
    } else {
      let { fullName, permission, roleId, memberId } = saveData;

      let sendData = { fullName, permission, roleId, memberId };

      dispatch(
        updateMember(sendData, (res: any) => {
          props.setMemberState(false);
        })
      );
    }
    setState(intialState);
  };

  return (
    <div>
      {props?.type == "new" ? (
        <h3 className="hd">Create Member</h3>
      ) : (
        <h3 className="hd">edit Member</h3>
      )}

      <Box>
        <Formik
          initialValues={initialValues}
          validationSchema={Schema.TeamMemberSchema}
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
            const { fullName, email, roleId, phoneNumber } = values;

            return (
              <Form>
                <Grid container rowSpacing={3} columnSpacing={2}>
                  <Grid item xs={12} sm={6}>
                    <NormalInput
                      name={"fullName"}
                      isRequired
                      type={"text"}
                      focused={false}
                      label="Full Name"
                      sizeval="medium"
                      values={fullName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={Boolean(touched.fullName && errors.fullName)}
                      touched={Boolean(touched.fullName)}
                      errors={Boolean(errors.fullName)}
                      helperText={touched.fullName && errors.fullName}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <NormalInput
                      name={"email"}
                      isRequired
                      type={"text"}
                      focused={false}
                      label="Eamil Id"
                      sizeval="medium"
                      readOnly={props.type === "edit" && true}
                      values={email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={Boolean(touched.email && errors.email)}
                      touched={Boolean(touched.email)}
                      errors={Boolean(errors.email)}
                      helperText={touched.email && errors.email}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <NormalInput
                      name={"phoneNumber"}
                      isRequired
                      type={"number"}
                      focused={false}
                      label="Mobile Number"
                      sizeval="medium"
                      values={phoneNumber}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      onKeyDown={(e: any) =>
                        phonePreventText.includes(e.key) && e.preventDefault()
                      }
                      error={Boolean(touched.phoneNumber && errors.phoneNumber)}
                      touched={Boolean(touched.phoneNumber)}
                      errors={Boolean(errors.phoneNumber)}
                      helperText={touched.phoneNumber && errors.phoneNumber}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <NormalSelect
                      values={roleId}
                      handleChange={(e: any) => {
                        setState({
                          ...state,
                          permission:
                            roleList?.length &&
                            roleList.find(
                              (item: any) => item._id === e.target.value
                            )?.permission,
                        });
                        handleChange(e);
                      }}
                      label="Select Role"
                      options={
                        roleList?.length &&
                        roleList.map((item: any) => {
                          if (item.status == 1) {
                            return (
                              <MenuItem
                                key={item._id}
                                value={item._id}
                              >{`${item.name}`}</MenuItem>
                            );
                          }
                        })
                      }
                      name={"roleId"}
                      error={touched.roleId && errors.roleId}
                      helperText={touched.roleId && errors.roleId}
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
                                columnSpacing={{ xs: .5, sm: 1.5 }}
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
                      variant="contained"
                      buttonText="Cancel"
                      className="btn-simple w-100 m-t-20"
                      disabled={false}
                      onPress={() => props.setMemberState(false)}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <NormalButton
                      type="submit"
                      variant="contained"
                      buttonText="Save"
                      className="btn-purple w-100 m-t-20"
                      // onPress={handleSave}
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

export default addMember;
