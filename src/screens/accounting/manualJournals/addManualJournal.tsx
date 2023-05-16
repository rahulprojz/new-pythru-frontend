import React, { useEffect, useState } from "react";
import Schema from "../../../schema";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import NormalInput from "../../../components/inputs/normalInput";
import { Formik, Form, FieldArray, Field, FormikErrors, getIn } from "formik";
import Typography from "@mui/material/Typography";

import TextField from "@mui/material/TextField";
import NormalButton from "../../../components/buttons/normalButton";

import SelectTreeIncomeCategory from "../../../components/treeSelect/manualJournalTree";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { deleteIMG, calenderIMG, phonePreventText } from "../../../constants";

import { useDispatch } from "react-redux";

import { Box } from "@mui/system";
import { addManualJournal, updatedManualJournal } from "./action";

import { MANUAL_JOURNAL_TYPE } from "../../../constants";

function Index({ setState, editData, categories }: any) {
  const Navigate = useNavigate();
  const [formData, setFormData] = useState({});

  const dispatch: any = useDispatch();

  var initialValues: any = {
    transactionDate: new Date(),
    description: "",
    creditAccount: [
      {
        categoryId: "",
        categoryName: "",
        parentCategoryName: "",
        amount: "",
        chartOfAccountType: "",
        customerVendorId: "",
      },
    ],
    debitAccount: [
      {
        categoryId: "",
        categoryName: "",
        parentCategoryName: "",
        amount: "",
        chartOfAccountType: "",
        customerVendorId: "",
      },
    ],
    type: MANUAL_JOURNAL_TYPE.CUSTOM,
  };
  const [initialvalue, setInitialValues] = useState(initialValues);
  useEffect(() => {
    if (editData) {
      setInitialValues((prev: any) => ({
        ...prev,
        transactionDate: new Date(editData.transactionDate),
        description: editData.description,
        creditAccount: editData.creditAccount,
        debitAccount: editData.debitAccount,
      }));
    } else {
      setInitialValues(initialValues);
    }
  }, [editData, categories]);

  return (
    <Box>
      <h3 className="hd">
        {editData?.customerVendorDetails ? "Edit" : "Create New"} Manual journal
      </h3>

      <Formik
        initialValues={initialvalue}
        enableReinitialize
        validationSchema={Schema.ManualJournalSchema}
        initialTouched={{
          field: true,
        }}
        onSubmit={(values: any, { setSubmitting }) => {
          if (editData) {
            values.manualJournalId = editData._id;
            dispatch(updatedManualJournal(values, setState));
          } else {
            dispatch(addManualJournal(values, setState));
          }
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
        }) => (
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit(e);
            }}
          >
            <Grid container rowSpacing={3} columnSpacing={2}>
              <Grid item xs={12}>
                <Grid container rowSpacing={3} columnSpacing={2}>
                  <Grid item xs={12} sm={6}>
                    <div className="filterDate">
                      <i>
                        <img src={calenderIMG} alt="" />
                      </i>
                      <label className="required">
                        Transaction Date <span>*</span>
                      </label>
                      <DatePicker
                        dateFormat="dd-MM-yyyy"
                        selected={
                          values.transactionDate
                            ? new Date(values.transactionDate)
                            : new Date()
                        }
                        onChange={(e) => {
                          handleChange({
                            target: { name: "transactionDate", value: e },
                          });
                        }}
                        onKeyDown={(e) => {
                          e.preventDefault();
                        }}
                        onBlur={(e) =>
                          handleBlur({
                            target: { name: "transactionDate", value: e },
                          })
                        }
                        //maxDate={new Date()}
                        placeholderText="Transaction date"
                      />
                    </div>
                    {touched.transactionDate && errors.transactionDate && (
                      <p className="filterDateError">
                        {errors.transactionDate.toString()}
                      </p>
                    )}
                  </Grid>
                  <Grid item xs={12} sm={6}></Grid>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      value={values.description}
                      name={"description"}
                      id="description"
                      multiline
                      label="Description"
                      className="textarea-cover"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <div className="border-card">
                      <FieldArray
                        name="creditAccount"
                        render={({ insert, remove, push }) => (
                          <>
                            <div className="Dflex al-cnt sp-bt m-b-20">
                              <Typography variant="body2" className="bold">
                                Credit Account
                              </Typography>
                              <NormalButton
                                variant="contained"
                                buttonText="Add More"
                                className="btn-purple"
                                onPress={() =>
                                  push({
                                    categoryId: "",
                                    categoryName: "",
                                    parentCategoryName: "",
                                    amount: "",
                                    chartOfAccountType: "",
                                    customerVendorId: "",
                                  })
                                }
                              />
                            </div>
                            <Grid container rowSpacing={3} columnSpacing={2}>
                              {values.creditAccount &&
                                values.creditAccount.map(
                                  (item: any, index: any) => (
                                    <React.Fragment key={index}>
                                      <Grid item xs={11} sm={5.5}>
                                        <SelectTreeIncomeCategory
                                          value={
                                            values.creditAccount[index]
                                              .parentCategoryName +
                                            "-" +
                                            values.creditAccount[index]
                                              .categoryName
                                          }
                                          data={categories}
                                          name={`creditAccount.${index}.categoryId`}
                                          label={"Select Category"}
                                          handleChangeTreeSelect={(
                                            res: any
                                          ) => {}}
                                          onSelect={(
                                            value: any,
                                            node: any,
                                            extra: any
                                          ) => {
                                            handleChange({
                                              target: {
                                                name: `creditAccount.${index}.categoryId`,
                                                value: node.props.value,
                                              },
                                            });
                                            handleChange({
                                              target: {
                                                name: `creditAccount.${index}.categoryName`,
                                                value: node.props.categoryName,
                                              },
                                            });
                                            handleChange({
                                              target: {
                                                name: `creditAccount.${index}.parentCategoryName`,
                                                value:
                                                  node.props.parentCategoryName,
                                              },
                                            });
                                            handleChange({
                                              target: {
                                                name: `creditAccount.${index}.chartOfAccountType`,
                                                value:
                                                  node.props.chartOfAccountType,
                                              },
                                            });
                                            handleChange({
                                              target: {
                                                name: `creditAccount.${index}.customerVendorId`,
                                                value:
                                                  node?.props?.customerVendorId,
                                              },
                                            });
                                          }}
                                          index={1}
                                        />
                                        <Field
                                          name={`creditAccount.${index}.categoryId`}
                                        >
                                          {({ field, form, meta }: any) => {
                                            const error = getIn(
                                              form.errors,
                                              `creditAccount.${index}.categoryId`
                                            );
                                            const touch = getIn(
                                              form.touched,
                                              `creditAccount.${index}.categoryId`
                                            );
                                            return touch && error ? (
                                              <p className="filterDateError">
                                                {error}
                                              </p>
                                            ) : null;
                                          }}
                                        </Field>
                                      </Grid>

                                      <Grid item xs={11} sm={5.5}>
                                        <NormalInput
                                          isRequired
                                          name={`creditAccount.${index}.amount`}
                                          type={"number"}
                                          focused={false}
                                          onKeyDown={(e: any) =>
                                            phonePreventText.includes(e.key) &&
                                            e.preventDefault()
                                          }
                                          sizeval="medium"
                                          label="Amount"
                                          values={
                                            values.creditAccount[index].amount
                                          }
                                          onBlur={handleBlur}
                                          onChange={(e: any) => {
                                            if (
                                              e.target.value.split(".")
                                                ?.length == 2 &&
                                              e.target.value.split(".")[1]
                                                .length > 2
                                            )
                                              return;
                                            handleChange(e);
                                          }}
                                        />
                                        <Field
                                          name={`creditAccount.${index}.amount`}
                                        >
                                          {({ field, form, meta }: any) => {
                                            const error = getIn(
                                              form.errors,
                                              `creditAccount.${index}.amount`
                                            );
                                            const touch = getIn(
                                              form.touched,
                                              `creditAccount.${index}.amount`
                                            );
                                            return touch && error ? (
                                              <p className="filterDateError">
                                                {error}
                                              </p>
                                            ) : null;
                                          }}
                                        </Field>
                                      </Grid>

                                      <Grid item xs={1}>
                                        {index != 0 && (
                                          <img
                                            src={deleteIMG}
                                            onClick={() => remove(index)}
                                            title="Remove"
                                            className="remove-debit"
                                          />
                                        )}
                                      </Grid>
                                    </React.Fragment>
                                  )
                                )}
                            </Grid>
                          </>
                        )}
                      />
                    </div>
                  </Grid>

                  <Grid item xs={12}>
                    <div className="border-card">
                      <FieldArray
                        name="debitAccount"
                        render={({ insert, remove, push }) => (
                          <>
                            <div className="Dflex al-cnt sp-bt m-b-20">
                              <Typography variant="body2" className="bold">
                                Debit Account
                              </Typography>
                              <NormalButton
                                variant="contained"
                                buttonText="Add More"
                                className="btn-purple"
                                onPress={() =>
                                  push({
                                    categoryId: "",
                                    categoryName: "",
                                    parentCategoryName: "",
                                    amount: "",
                                    chartOfAccountType: "",
                                    customerVendorId: "",
                                  })
                                }
                              />
                            </div>
                            <Grid container rowSpacing={3} columnSpacing={2}>
                              {values.debitAccount &&
                                values.debitAccount.map(
                                  (item: any, index: any) => (
                                    <React.Fragment key={index}>
                                      <Grid item xs={10} sm={11} md={5.5}>
                                        <SelectTreeIncomeCategory
                                          value={
                                            values.debitAccount[index]
                                              .parentCategoryName +
                                            "-" +
                                            values.debitAccount[index]
                                              .categoryName
                                          }
                                          data={categories}
                                          name={`debitAccount.${index}.categoryId`}
                                          label={"Select Category"}
                                          handleChangeTreeSelect={(
                                            res: any
                                          ) => {}}
                                          onSelect={(
                                            value: any,
                                            node: any,
                                            extra: any
                                          ) => {
                                            handleChange({
                                              target: {
                                                name: `debitAccount.${index}.categoryId`,
                                                value: node.props.value,
                                              },
                                            });
                                            handleChange({
                                              target: {
                                                name: `debitAccount.${index}.categoryName`,
                                                value: node.props.categoryName,
                                              },
                                            });
                                            handleChange({
                                              target: {
                                                name: `debitAccount.${index}.parentCategoryName`,
                                                value:
                                                  node.props.parentCategoryName,
                                              },
                                            });
                                            handleChange({
                                              target: {
                                                name: `debitAccount.${index}.chartOfAccountType`,
                                                value:
                                                  node.props.chartOfAccountType,
                                              },
                                            });
                                            handleChange({
                                              target: {
                                                name: `debitAccount.${index}.customerVendorId`,
                                                value:
                                                  node?.props?.customerVendorId,
                                              },
                                            });
                                          }}
                                          index={3}
                                        />
                                        <Field
                                          name={`debitAccount.${index}.categoryId`}
                                        >
                                          {({ field, form, meta }: any) => {
                                            const error = getIn(
                                              form.errors,
                                              `debitAccount.${index}.categoryId`
                                            );
                                            const touch = getIn(
                                              form.touched,
                                              `debitAccount.${index}.categoryId`
                                            );
                                            return touch && error ? (
                                              <p className="filterDateError">
                                                {error}
                                              </p>
                                            ) : null;
                                          }}
                                        </Field>
                                      </Grid>
                                      <Grid item xs={10} sm={11} md={5.5}>
                                        <NormalInput
                                          isRequired
                                          name={`debitAccount.${index}.amount`}
                                          type={"number"}
                                          focused={false}
                                          onKeyDown={(e: any) =>
                                            phonePreventText.includes(e.key) &&
                                            e.preventDefault()
                                          }
                                          sizeval="medium"
                                          label="Amount"
                                          values={
                                            values.debitAccount[index].amount
                                          }
                                          onBlur={handleBlur}
                                          onChange={(e: any) => {
                                            if (
                                              e.target.value.split(".")
                                                ?.length == 2 &&
                                              e.target.value.split(".")[1]
                                                .length > 2
                                            )
                                              return;
                                            handleChange(e);
                                          }}
                                        />
                                        <Field
                                          name={`debitAccount.${index}.amount`}
                                        >
                                          {({ field, form, meta }: any) => {
                                            const error = getIn(
                                              form.errors,
                                              `debitAccount.${index}.amount`
                                            );
                                            const touch = getIn(
                                              form.touched,
                                              `debitAccount.${index}.amount`
                                            );
                                            return touch && error ? (
                                              <p className="filterDateError">
                                                {error}
                                              </p>
                                            ) : null;
                                          }}
                                        </Field>
                                      </Grid>
                                      <Grid item xs={2} sm={1}>
                                        {index != 0 && (
                                          <img
                                            src={deleteIMG}
                                            onClick={() => remove(index)}
                                            title="Remove"
                                            className="remove-debit"
                                          />
                                        )}
                                      </Grid>
                                    </React.Fragment>
                                  )
                                )}
                            </Grid>
                          </>
                        )}
                      />
                    </div>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid container rowSpacing={3} columnSpacing={2}>
                  <Grid item xs={6}>
                    <NormalButton
                      onPress={() => setState(false)}
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
                      buttonText="Submit"
                      //disabled={!(isValid && dirty)}
                      className="btn-purple w-100"
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </Box>
  );
}

export default Index;
