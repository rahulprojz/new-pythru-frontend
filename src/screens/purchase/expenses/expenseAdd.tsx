import React, { useEffect, useState } from "react";
// import Grid from "@mui/material/Grid";
import moment from "moment";
import Schema from "../../../schema";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import NormalInput from "../../../components/inputs/normalInput";
import { Formik, Form } from "formik";
import NormalButton from "../../../components/buttons/normalButton";

import SelectTreeIncomeCategory from "../../../components/treeSelect";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import {
  updateProductAndServices,
  resetProductServices,
} from "../../productandServices/productServiceSlice";

import {
  calenderIMG,
  phonePreventText,
} from "../../../constants";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import { Box } from "@mui/system";
import { addExpenses, getExpensesListing } from "./action";
import CustomerAuto from "../../../components/autocomplete/CustomerAuto";

function valuetext(value: number) {
  return `${value}`;
}

function Index({
  setState,
  openForAddEditProduct,
  setOpenForAddEditProduct,
  editData,
}: any) {
  const Navigate = useNavigate();
  // const [openForAddEditProduct, setOpenForAddEditProduct] = useState(false)
  const [formData, setFormData] = useState({});

  // const [state, setState] = React.useState(false);
  const dispatch: any = useDispatch();
  const [expenseError, setExpenseError] = useState(false);
  const [skuError, setSkuError] = useState("");
  const [customOptions, setCustomOptions] = useState([]);
  const [transactionDate, setTransactionDate] = useState(new Date());
  const {
    productServicesCategory,
    salesUnit,
    productServiceDetail,
    hsnCodeList,
    addCategories,
    incomeCategory,
    expenseCategory,
    imageUrl,
    editProductData,
    salesPriceMin,
    salesPriceMax,
  } = useSelector((state: any) => state.productServicesSlice);

  const { chartOfAccountMasterData } = useSelector(
    (state: any) => state.commonSlice
  );
  console.log("editData", editData);
  const { customerList, type: typeIncome } = useSelector(
    (state: any) => state.expenseListSlice
  );

  const productCategory =
    productServicesCategory &&
    productServicesCategory.length > 0 &&
    productServicesCategory.filter((cat: any) => cat.type === 1);

  const [price, setPrice]: any = useState<number[]>(
    salesPriceMin && salesPriceMax ? [salesPriceMin, salesPriceMax] : [0, 1000]
  );

  const initialValues: any = {
    transactionDate: editData?.transactionDate
      ? new Date(editData?.transactionDate)
      : new Date(),
    amount: editData?.amount ? editData.amount : "",
    description: editData.description ? editData?.description : "",
    referenceId: editData?.referenceId ? editData?.referenceId : "",
    expenseCategoryId: editData?.expenseCategory?.categoryId
      ? editData?.expenseCategory?.categoryId
      : "",
    customerVendor: editData?.customerVendorDetails?.customerVendorId
      ? editData?.customerVendorDetails?.customerVendorId
      : "",
    expensesId: "",
    type: editData?.type ? editData.type : typeIncome ? typeIncome : "",
  };

  const handleVendorCustomer = (setFieldValue: any, newValue: any) => {
    if (newValue) {
      setFieldValue("customerVendor", newValue._id);
    } else {
      setFieldValue("customerVendor", "");
    }
  };
  return (
    <Box>
      <h3 className='hd'>
        {editData?.customerVendorDetails ? "Edit" : "Create New"} Exepnse
      </h3>

      <Formik
        initialValues={initialValues}
        enableReinitialize
        validationSchema={Schema.ExpenseSchema}
        initialTouched={{
          field: true,
        }}
        onSubmit={(values: any, { setSubmitting }) => {
          values.transactionDate = moment(
            values.transactionDate,
            "MM-DD-YYYY"
          ).toISOString();
          if (editData) {
            values.expensesId = editData._id;
          }
          dispatch(addExpenses(values, setState));
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
              console.log("errors", errors);
              e.preventDefault();
              handleSubmit(e);
            }}
          >
            <Grid container spacing={3}>
              <Grid item md={12}>
                <Grid container rowSpacing={3} columnSpacing={2}>
                  <Grid item xs={12} md={6}>
                    <div className='filterDate'>
                      <i>
                        <img src={calenderIMG} alt='' />
                      </i>
                      <label className='required'>
                        Transaction Date <span>*</span>
                      </label>
                      <DatePicker
                        dateFormat='dd-MM-yyyy'
                        selected={
                          values?.transactionDate
                            ? new Date(values.transactionDate)
                            : new Date()
                        }
                        onChange={(e) =>
                          handleChange({
                            target: { name: "transactionDate", value: e },
                          })
                        }
                        onBlur={(e) =>
                          handleBlur({
                            target: { name: "transactionDate", value: e },
                          })
                        }
                        maxDate={new Date()}
                        placeholderText='Transaction date'
                      />
                    </div>
                    {touched.transactionDate && errors.transactionDate && (
                      <p className='filterDateError'></p>
                    )}
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <NormalInput
                      isRequired
                      name={"amount"}
                      type={"number"}
                      focused={false}
                      onKeyDown={(e: any) =>
                        phonePreventText.includes(e.key) && e.preventDefault()
                      }
                      sizeval='medium'
                      label='Amount'
                      values={values.amount}
                      onChange={(e: any) => {
                        if (
                          e.target.value.split(".")?.length == 2 &&
                          e.target.value.split(".")[1].length > 2
                        )
                          return;
                        handleChange(e);
                      }}
                      onBlur={handleBlur}
                      error={Boolean(touched.amount && errors.amount)}
                      helperText={touched.amount && errors.amount}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    {/* <Autocomplete
                      disableClearable
                      required={true}
                      disabled={false}
                      values={values.customerVendor}
                      label={"Select Vendor/Customer"}
                      size="small"
                      name="customerVendor"
                      onChange={(_e: any, newValue: any) => {
                        if (newValue) {
                          setFieldValue("customerVendor", newValue._id);
                        } else {
                          setFieldValue("customerVendor", "");
                        }
                      }}
                      onBlur={() => {
                        console.log("onBluronBlur");
                      }}
                      defaultValue={() => {
                        const index = customerList.findIndex(
                          (x: any) => x._id == values.customerVendor
                        );
                        return customerList[index];
                      }}
                      error={Boolean(
                        touched.customerVendor && errors.customerVendor
                      )}
                      helperText={
                        touched.customerVendor && errors.customerVendor
                      }
                      options={customerList.length > 0 ? customerList : []}
                      isOptionEqualToValue={(option: any, value: any) =>
                        option._id === value._id
                      }
                      getOptionLabel={(option: any) => option.displayName || ""}
                      renderOption={(props: any, option: any) => {
                        return (
                          <Box
                            component="li"
                            sx={{ "& > img": { mr: 2, flexShrink: 0 }, fontFamily: 'Poppins' }}
                            {...props}
                          >
                            {option.displayName}
                          </Box>
                        );
                      }}
                    /> */}

                    <CustomerAuto
                      required={true}
                      disabled={false}
                      values={values.customerVendor}
                      label={"Select Vendor/Customer"}
                      size='small'
                      name='customerVendor'
                      handleVendorCustomer={handleVendorCustomer}
                      handleChange={setFieldValue}
                      error={Boolean(
                        touched.customerVendor && errors.customerVendor
                      )}
                      helperText={
                        touched.customerVendor && errors.customerVendor
                      }
                      options={customerList.length > 0 ? customerList : []}
                      isOptionEqualToValue={(option: any, value: any) =>
                        option._id === value._id
                      }
                      defaultValue={() => {
                        const index = customerList.findIndex(
                          (x: any) => x._id == values.customerVendor
                        );

                        return customerList[index];
                      }}
                      getOptionLabel={(option: any) => {
                        option.displayName || "";
                      }}
                      renderOption={(props: any, option: any) => {
                        return (
                          <Box
                            component='li'
                            sx={{ "& > img": { mr: 2, flexShrink: 0 }, fontFamily: 'Poppins' }}
                            {...props}
                            key={option._id}
                          >
                            {option.displayName}
                          </Box>
                        );
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <NormalInput
                      isRequired
                      name={"referenceId"}
                      type={"text"}
                      focused={false}
                      sizeval='medium'
                      label='Ref ID'
                      values={values.referenceId}
                      onChange={handleChange}
                      error={Boolean(touched.referenceId && errors.referenceId)}
                      helperText={touched.referenceId && errors.referenceId}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} md={6}>
                <SelectTreeIncomeCategory
                  value={values.expenseCategoryId}
                  data={chartOfAccountMasterData}
                  name='expenseCategoryId'
                  label={"Expense Category"}
                  handleChangeTreeSelect={(res: any) => {
                    setFieldValue("expenseCategoryId", res);
                  }}
                  index={1}
                />
                {errors.expenseCategoryId && touched.expenseCategoryId && (
                  <p className='filterDateError' style={{ color: "#d32f2f" }}>
                    {`${errors.expenseCategoryId}`}
                  </p>
                )}
              </Grid>
              <Grid item xs={12}>
                <NormalInput
                  name={"description"}
                  type={"text"}
                  focused={false}
                  sizeval='large'
                  label='Description'
                  values={values.description}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container rowSpacing={3} columnSpacing={2}>
                <Grid item xs={6}>
                  <NormalButton
                    onPress={() => setState(false)}
                    variant='contained'
                    buttonText='Cancel'
                    className='btn-simple w-100'
                    disabled={false}
                  />
                </Grid>
                <Grid item xs={6}>
                  <NormalButton
                    type='submit'
                    variant='contained'
                    buttonText='Submit'
                    disabled={!(isValid && dirty)}
                    className='btn-purple w-100'
                  />
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
