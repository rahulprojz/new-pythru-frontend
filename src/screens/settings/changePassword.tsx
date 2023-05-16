import Grid from "@mui/material/Grid";
import NormalButton from "../../components/buttons/normalButton";
import { Formik, Form } from "formik";
import AddProductDrawer from "../../components/drawer";
import { changePassword } from "./action";

import "react-datepicker/dist/react-datepicker.css";
import { updateSettingsState } from "./settingSlice";
import NormalInput from "../../components/inputs/passwordInput";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Schema from "../../schema";
import { useEffect } from "react";

function Index() {
  const dispatch: any = useDispatch();

  let { changePasswordDrawer, editData } = useSelector(
    (state: any) => state.settingSlice
  );

  const initialValues = {
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

  return (
    <>
      <AddProductDrawer
        state={changePasswordDrawer}
        togalDrawrr={() => {
          dispatch(
            updateSettingsState({ changePasswordDrawer: !changePasswordDrawer })
          );
        }}
        className="filterDrawer"
      >
        <h3 className="hd">Change Password</h3>
        {changePasswordDrawer ? (
          <Formik
            initialValues={initialValues}
            // enableReinitialize
            validationSchema={Schema.ChangePasswordSchema}
            onSubmit={(values, { setSubmitting, resetForm }) => {
              dispatch(changePassword(values));
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
              resetForm,
            }) => (
              <Form>
                <Grid container rowSpacing={3} columnSpacing={2}>
                  <Grid item xs={12}>
                    <NormalInput
                      className="onboarding-input"
                      name={"currentPassword"}
                      isRequired
                      values={values.currentPassword}
                      type={"text"}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      focused={false}
                      sizeval="medium"
                      label="Current Password"
                      error={Boolean(
                        touched.currentPassword && errors.currentPassword
                      )}
                      helperText={
                        touched.currentPassword && errors.currentPassword
                      }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <NormalInput
                      className="onboarding-input"
                      name={"newPassword"}
                      isRequired
                      onBlur={handleBlur}
                      values={values.newPassword}
                      type={"text"}
                      onChange={handleChange}
                      focused={false}
                      sizeval="medium"
                      label="New password"
                      error={Boolean(touched.newPassword && errors.newPassword)}
                      helperText={touched.newPassword && errors.newPassword}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <NormalInput
                      className="onboarding-input"
                      name={"confirmPassword"}
                      isRequired
                      values={values.confirmPassword}
                      type={"text"}
                      onChange={handleChange}
                      focused={false}
                      onBlur={handleBlur}
                      sizeval="medium"
                      label="Confirm Password"
                      error={Boolean(
                        touched.confirmPassword && errors.confirmPassword
                      )}
                      helperText={
                        touched.confirmPassword && errors.confirmPassword
                      }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Grid container rowSpacing={3} columnSpacing={2}>
                      <Grid item xs={6}>
                        <NormalButton
                          onPress={() => {
                            dispatch(
                              updateSettingsState({
                                changePasswordDrawer: false,
                              })
                            );
                            resetForm();
                          }}
                          variant="contained"
                          buttonText="Cancel"
                          className="btn-simple w-100"
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <NormalButton
                          type="submit"
                          variant="contained"
                          buttonText="Submit"
                          className="btn-purple w-100"
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        ) : (
          <></>
        )}
      </AddProductDrawer>
    </>
  );
}

export default Index;
