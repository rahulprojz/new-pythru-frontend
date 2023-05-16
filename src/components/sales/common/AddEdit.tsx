import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import { Formik, Form, FieldArray, Field, getIn } from "formik";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import {
  Box,
  Button,
  InputAdornment,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
//@ts-ignore
import { useNavigate, useParams, useLocation, json } from "react-router-dom";
import NormalSelect from "../../select/normalSelect";

import DeleteDialog from "../../dialog";

import "./addEdit.scss";
import Autocomplete from "../../autocomplete";

import {
  getCustomerlist,
  statesList,
  getProductServiceSearch,
  generateDocumentNumber,
  addSalePurchase,
  getSalePurchaseDetail,
  editSalePurchase,
  getRefList,
} from "../../../screens/saleandPurchase/action";
import CustomerAuto from "../../autocomplete/CustomerAuto";
import Schema from "../../../schema";
import Breadcrumbs from "../../breadcrumb";
import {
  calenderIMG,
  productServiceDropdown,
  phonePreventText,
  DOCUMENT_TYPE,
  TYPE,
  deleteIMG,
  CloseIMG,
  LIST_TYPE,
} from "../../../constants";
import NormalInput from "../../inputs/normalInput";
import NormalButton from "../../buttons/normalButton";
import DynamicMenu from "../../menu/dynamicMenu";
import AddProductServicesDrawer from "../../drawer/productServicesDrawer";
import Preview from "../../dialog/preview";
import {
  updateSalePurchase,
  resetSalePurchase,
} from "../../../screens/saleandPurchase/salePurchaseSlice";
import { convertIntegerToDecimal, getStateInSession } from "../../../utils";
import AddProduct from "../../../screens/productandServices/products/addProduct";
import {
  getProductServicedetail,
  getProductAndServicesCategory,
  getCOACategory,
  getListManagement,
} from "../../../screens/productandServices/action";
import AddServices from "../../../screens/productandServices/services/addServices";
import { updateProductAndServices } from "../../../screens/productandServices/productServiceSlice";
import NumberInput from "../../inputs/normalInput/number";
import ProductServiceAuto from "../../autocomplete/ProductServiceAuto";
import SalesOrderEmail from "../../dialog/SalesOrderEmail";
import moment from "moment";

const initialValues = {
  salePurchaseDetail: "",
  customerVendorId: "",
  customerVendor: {},
  fromDate: new Date(),
  dueDate: new Date(),
  daysLeft: 0,
  documentNumber: "",
  referenceNumber: "",
  placeOfSupply: "",
  productDetails: [
    {
      detailType: "",
      productId: "",
      productName: "",
      productUnit: "",
      quantity: 1,
      rate: 0,
      discount: 0,
      amount: 0,
      cessPercent: 0,
      isInterStateTaxApplied: true,
      iGstPercent: 0,
    },
  ],
  subTotal: 0,
  discount: 0,
  tax: 0,
  totalPrice: 0,
  description: "",
  savingType: 1,
  billingAddress: {},
  shippingAddress: {},
};

const AddEdit = (data: any) => {
  const dispatch: any = useDispatch();
  const navigate = useNavigate();
  const params: any = useParams();

  const [subTotal, setSubTotal] = useState<number>(0);
  const [tax, setTax] = useState<number>(0);
  const [index, setIndex] = useState<number | null>(null);
  const [typeMode, setTypeMode] = useState<string>("");
  const [dataValues, setDataValues] = useState<any>({});
  const [initial, setInitial] = useState<any>(initialValues);

  const [discount, setDiscount] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);

  const [retainValue, setRetainValue] = useState<any>({});

  const [previewState, setPreviewState] = useState(false);
  const [openForAddEditProduct, setOpenForAddEditProduct] = useState(false);
  const [openForAddEditService, setOpenForAddEditService] = useState(false);
  const [productState, setProductState] = React.useState(false);
  const [serviceState, setServiceState] = React.useState(false);
  const [savingType, setSavingType] = useState<number>(1);
  const [refData, setRefDate] = useState<boolean>(false);

  const [cancelDialogBox, setCancelDialogBox] = useState<boolean>(false);
  const [emailDialog, setEmailDialog] = useState<boolean>(false);

  const [invoice, setInvoice] = useState<any>({});
  const docType: any = [DOCUMENT_TYPE.CREDIT_NOTE, DOCUMENT_TYPE.DEBIT_NOTE];
  const location: any = useLocation();

  const {
    customerList,
    productServiceList,
    documentNumber,
    referenceNumber,
    isEdit,
    refList,
    salePurchaseDetail,
    responseData,
    type,
    documentType,
  } = useSelector((state: any) => state.salePurchaseSlice);
  const { state: stateList } = useSelector((state: any) => state.commonSlice);
  const { organizationDeatil } = useSelector(
    (state: any) => state.settingSlice
  );
  useEffect(() => {
    if (responseData?._id) {
      updateProductServiceItem(responseData);
    }
  }, [responseData]);

  useEffect(() => {
    dispatch(
      updateSalePurchase({
        documentType: location.state.documentType,
        type: location.state.type,
      })
    );

    dispatch(getListManagement(LIST_TYPE.HSN_SAC, 1));
    dispatch(getListManagement(LIST_TYPE.HSN_SAC, 2));
    dispatch(getListManagement(LIST_TYPE.SALES_UNIT));
    dispatch(getListManagement(LIST_TYPE.GST_RATE));

    dispatch(
      getCOACategory(1, (res: any) => {
        dispatch(
          updateProductAndServices({
            incomeCategory: res.data.responseData?.masterAccounts,
          })
        );
      })
    );
    dispatch(
      getCOACategory(2, (res: any) => {
        dispatch(
          updateProductAndServices({
            expenseCategory: res.data.responseData?.masterAccounts,
          })
        );
      })
    );
    if (params?.id) {
      dispatch(getSalePurchaseDetail(params?.id, true, true));
      if (location?.state?.isDocumentConverted) {
        dispatch(generateDocumentNumber(false));
      }
    } else {
      docType.includes(location.state.documentType)
        ? dispatch(generateDocumentNumber(false))
        : dispatch(generateDocumentNumber(true));
    }
    dispatch(getCustomerlist());
    // dispatch(statesList());
    dispatch(getProductServiceSearch(false));
    if (docType.includes(location.state.documentType)) {
      if ([DOCUMENT_TYPE.CREDIT_NOTE].includes(location.state.documentType)) {
        dispatch(getRefList(DOCUMENT_TYPE.INVOICE));
      } else {
        dispatch(getRefList(DOCUMENT_TYPE.BILLS));
      }
    }

    return () => {
      dispatch(resetSalePurchase());
    };
  }, []);

  useEffect(() => {
    if (documentNumber && !location?.state?.isDocumentConverted) {
      docType.includes(location.state.documentType)
        ? setInitial({
            ...initial,
            documentNumber: documentNumber,
          })
        : setInitial({
            ...initial,
            documentNumber: documentNumber,
            referenceNumber: referenceNumber,
          });
    }
  }, [documentNumber]);

  useEffect(() => {
    if (isEdit) {
      let values = {
        ...initial,
        salesPurchaseId: salePurchaseDetail?._id,
        customerVendorId:
          salePurchaseDetail?.customerVendorDetails?.customerVendorId,
        customerVendor: salePurchaseDetail?.customerVendorDetails,
        fromDate: salePurchaseDetail?.fromDate,
        daysLeft: salePurchaseDetail?.daysLeft,
        dueDate: salePurchaseDetail?.dueDate,
        documentNumber: location?.state?.isDocumentConverted
          ? documentNumber
          : salePurchaseDetail?.documentNumber,
        referenceNumber: salePurchaseDetail?.referenceNumber,
        placeOfSupply: salePurchaseDetail?.placeOfSupply,
        productDetails: salePurchaseDetail?.productDetails,
        subTotal: salePurchaseDetail?.subTotal || 0,
        discount: salePurchaseDetail?.discount || 0,
        tax: salePurchaseDetail?.tax || 0,
        totalPrice: salePurchaseDetail?.totalPrice || 0,
        description: salePurchaseDetail?.description,
        billingAddress: salePurchaseDetail?.billingAddress,
        shippingAddress: salePurchaseDetail?.shippingAddress,
        isBillingAndShippingAddressSame:
          salePurchaseDetail?.isBillingAndShippingAddressSame,
        isDocumentConverted: docType.includes(location.state.documentType)
          ? true
          : location.state.isDocumentConverted,
        convertedFrom: location.state.convertedFrom,
      };
      if (location?.state?.isDocumentConverted) {
        values = {
          ...values,
          previousDocumentAmount: salePurchaseDetail?.totalPrice,
        };
      }
      setInitial(values);
    } else {
      if (location.state.documentType == DOCUMENT_TYPE.ESTIMATES) {
        setInitial((prev: any) => ({
          ...prev,
          dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        }));
      }
    }
  }, [isEdit, documentNumber]);

  useEffect(() => {
    if (refData) {
      let values = {
        ...initial,
        fromDate: invoice?.fromDate,
        dueDate: invoice?.dueDate,
        daysLeft: invoice?.daysLeft,
        convertedFrom: invoice?._id,
        referenceNumber: invoice?.referenceNumber,
        placeOfSupply: invoice?.placeOfSupply,
        productDetails: invoice?.productDetails,
        subTotal: invoice?.subTotal || 0,
        discount: invoice?.discount || 0,
        tax: invoice?.tax || 0,
        totalPrice: invoice?.totalPrice || 0,
        previousDocumentAmount: invoice?.totalPrice,
        description: invoice?.description,
        billingAddress: invoice?.billingAddress,
        isDocumentConverted: true,
        shippingAddress: invoice?.shippingAddress,
        isBillingAndShippingAddressSame:
          invoice?.isBillingAndShippingAddressSame,
      };
      if (!isEdit) {
        values = {
          ...values,
          customerVendorId: invoice?.customerVendorDetails?.customerVendorId,
          customerVendor: invoice?.customerVendorDetails,
        };
      }
      setInitial(values);
    }
  }, [invoice]);
  const calculateSubTotalValues = (arr: any, property: any) => {
    try {
      let value = arr.reduce(function (prev: any, current: any) {
        prev += +current[property];
        return prev;
      }, 0);
      setSubTotal(value?.toFixed(2));
      // setTotal(value.toFixed(2));
      return value?.toFixed(2);
    } catch (error) {
      console.log("error", error);
    }
  };
  const calculateValues = (arr: any, property: any) => {
    try {
      let value = arr.reduce(function (prev: any, current: any) {
        prev +=
          +current[property] +
          (+current.amount * +current?.cessPercent || 0) / 100 +
          (+current.amount *
            (+current?.iGstPercent ||
              +current?.cGstPercent + +current?.sGstPercent ||
              0)) /
            100;
        return prev || 0;
      }, 0);

      setTotal(value?.toFixed(2));
      return value?.toFixed(2);
    } catch (error) {
      console.log("error", error);
    }
  };

  const redirect = () => {
    // navigate(
    //   location.state.type == 1
    //     ? "/sales/" + location.state.redirect
    //     : "/purchase/" + location.state.redirect
    // );
    navigate(-1);
  };

  const onPress = () => {
    setPreviewState(true);
  };

  const handleAddItem = (val: any, index: number) => {
    setRetainValue(val);
    setIndex(index);
    setTypeMode("add");
  };

  const handleEdit = (product: any, val: any) => {
    if (product?.productId) {
      setRetainValue(val);
      setTypeMode("edit");
      if (+product?.detailType === 1) {
        dispatch(updateProductAndServices({ type: "1" }));
        dispatch(getProductAndServicesCategory());
        dispatch(getProductServicedetail(product?.productId, setProductState));
      } else {
        dispatch(updateProductAndServices({ type: "2" }));
        dispatch(getProductAndServicesCategory());
        dispatch(getProductServicedetail(product?.productId, setServiceState));
      }
    }
  };

  const updateProductServiceItem = (responseData: any) => {
    if (typeMode) {
      let updatedVal = {};
      if (typeMode === "edit") {
        updatedVal = retainValue?.productDetails.map((obj: any) => {
          if (obj.productId === responseData._id) {
            return {
              ...obj,
              productName: responseData?.name,
              rate: responseData?.salePrice,
              quantity: 1,
              amount: responseData?.salePrice,
              productUnit: responseData?.salesUnitId || "QTY",
              discount: 0,
              cessPercent: responseData?.gst?.cess,
              iGstPercent: responseData?.gst?.gstRate,
            };
          }
          return obj;
        });
      } else {
        updatedVal = retainValue?.productDetails.map(
          (obj: any, ObjIndex: number) => {
            if (ObjIndex === index) {
              return {
                ...obj,
                productId: responseData?._id,
                productName: responseData?.name,
                rate: responseData?.salePrice,
                productUnit: responseData?.salesUnitId || "QTY",
                quantity: 1,
                amount: responseData?.salePrice,
                discount: 0,
                cessPercent: responseData?.gst?.cess,
                iGstPercent: responseData?.gst?.gstRate,
              };
            }
            return obj;
          }
        );
      }

      const updatedObj = {
        ...retainValue,
        productDetails: updatedVal,
      };

      dispatch(getProductServiceSearch(true, setInitial, updatedObj));
    }
  };

  /*****
   * Calulate Tax on change of product
   *
   */

  const handleChnageProduct = (
    newVal: any,
    setFieldValue: Function,
    index: number,
    placeOfSupply: string
  ) => {
    setFieldValue(
      `productDetails.${index}.cessPercent`,
      newVal?.isGstApplicable ? newVal?.gst?.cess : 0
    );
    setFieldValue(
      `productDetails.${index}.iGstPercent`,
      newVal?.isGstApplicable ? newVal?.gst?.gstRate : 0
    );
  };

  const isReadOnly = () => {
    if (params?.id) {
      if (location?.state?.isDocumentConverted) {
        return true;
      }
      return true;
    }
    if (docType.includes(location.state.documentType)) {
      return true;
    }
    return false;
  };

  const handleVendorCustomer = (handleChange: any, newValue: any) => {
    handleChange({
      target: { name: "customerVendor", value: newValue },
    });
    handleChange({
      target: { name: "customerVendorId", value: newValue._id },
    });
    handleChange({
      target: {
        name: "billingAddress",
        value: newValue.billingAddress,
      },
    });
    debugger;
    handleChange({
      target: {
        name: "shippingAddress",
        value: newValue.shippingAddress,
      },
    });

    if (type === TYPE.SALES) {
      debugger;
      handleChange({
        target: {
          name: "placeOfSupply",
          value: newValue?.shippingAddress?.state,
        },
      });
    } else {
      debugger;
      handleChange({
        target: {
          name: "placeOfSupply",
          value: newValue?.billingAddress?.state || "Delhi",
        },
      });
    }
  };

  const handleEmailSubmit = (email: string) => {
    const newVal = {
      ...dataValues,
      sendDocumentTo: email,
    };
    setEmailDialog(false);
    location.state.isDocumentConverted
      ? dispatch(addSalePurchase(newVal, redirect))
      : isEdit
      ? dispatch(editSalePurchase(newVal, redirect))
      : dispatch(addSalePurchase(newVal, redirect));
  };

  return (
    <>
      <Breadcrumbs />

      <div className="add-edit-form">
        <Formik
          validationSchema={Schema.EstimateSchema}
          initialValues={initial}
          enableReinitialize={true}
          onSubmit={(values) => {
            (values.subTotal = subTotal),
              (values.discount = discount),
              (values.tax = (+total - +subTotal)?.toFixed(2)),
              (values.totalPrice = total),
              (values.savingType = savingType);

            if (
              savingType === 2 &&
              documentType === DOCUMENT_TYPE.SALES_ORDER
            ) {
              setEmailDialog(true);
              setDataValues(values);
            } else {
              location.state.isDocumentConverted
                ? dispatch(addSalePurchase(values, redirect))
                : isEdit
                ? dispatch(editSalePurchase(values, redirect))
                : dispatch(addSalePurchase(values, redirect));
            }
          }}
        >
          {({
            errors,
            handleBlur,
            handleChange,
            handleSubmit,
            touched,
            values,
            setFieldValue,
            isValid,
            isSubmitting,
            dirty,
          }): any => (
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit(e);
              }}
            >
              <Preview
                openModal={previewState}
                setState={setPreviewState}
                calculateValues={calculateValues}
                data={values}
                calculateSubToatalValues={calculateSubTotalValues}
                isSameState={
                  (organizationDeatil?.address?.state || "Delhi") ===
                  values.placeOfSupply
                }
                label={location}
              />{" "}
              <div className="bg-white">
                <Grid container rowSpacing={3} columnSpacing={2}>
                  <Grid item xs={12} sm={6} lg={4}>
                    <React.Fragment key={values.customerVendorId}>
                      {(isEdit
                        ? salePurchaseDetail?.customerVendorDetails
                            ?.customerVendorId &&
                          customerList.length > 0 &&
                          customerList
                        : true) && (
                        <CustomerAuto
                          required={true}
                          disabled={isReadOnly()}
                          values={values.customerVendorId}
                          itemCategories={values.customerVendorId}
                          label={location.state.billTo}
                          type={location?.state?.type}
                          size="small"
                          name="customerVendorId"
                          handleVendorCustomer={handleVendorCustomer}
                          handleChange={(e: any) => {
                            touched.customerVendorId = false;
                            handleChange(e);
                          }}
                          handleBlur={handleBlur}
                          /*error={Boolean(
                            touched.customerVendorId && errors.customerVendorId
                          )}
                          helperText={
                            touched.customerVendorId && errors.customerVendorId
                          }*/
                          options={customerList.length > 0 ? customerList : []}
                          isOptionEqualToValue={(option: any, value: any) =>
                            option._id === value._id
                          }
                          defaultValue={() => {
                            const index = customerList.findIndex(
                              (x: any) => x._id == values.customerVendorId
                            );

                            return customerList[index];
                          }}
                          getOptionLabel={(option: any) => {
                            option.displayName || "";
                          }}
                          renderOption={(props: any, option: any) => {
                            return (
                              <Box
                                component="li"
                                sx={{
                                  "& > img": { mr: 2, flexShrink: 0 },
                                  fontFamily: "Poppins",
                                }}
                                {...props}
                                key={option._id}
                              >
                                {option.displayName}
                              </Box>
                            );
                          }}
                        />
                      )}
                      {touched.customerVendorId && errors.customerVendorId && (
                        <p className="filterDateError">
                          {location?.state?.type == 1
                            ? errors.customerVendorId.toString()
                            : errors.customerVendorId
                                .toString()
                                .replace("Customer", "Vendor")}
                        </p>
                      )}
                    </React.Fragment>
                  </Grid>
                  <Grid item xs={12} sm={6} lg={4}>
                    <div className="filterDate">
                      <i>
                        <img src={calenderIMG} alt="" />
                      </i>
                      <label className="required">
                        {location.state.salesOrderDate} <span>*</span>
                      </label>
                      <DatePicker
                        dateFormat="dd-MM-yyyy"
                        selected={
                          values?.fromDate ? new Date(values.fromDate) : null
                        }
                        onChange={(e: any) => {
                          values.dueDate =
                            location?.state?.documentType ==
                            DOCUMENT_TYPE.ESTIMATES
                              ? new Date(e) > new Date()
                                ? new Date(e)
                                : new Date()
                              : e;
                          handleChange({
                            target: { name: "fromDate", value: e },
                          });
                        }}
                        //minDate={}
                        onBlur={handleBlur}
                        placeholderText="DD-MM-YYYY"
                        name="fromDate"
                      />
                    </div>

                    {touched.fromDate && errors.fromDate && (
                      <p className="filterDateError">
                        {errors.fromDate.toString()}
                      </p>
                    )}
                  </Grid>
                  <Grid item xs={12} sm={6} lg={4}>
                    <div className="filterDate">
                      <i>
                        <img src={calenderIMG} alt="" />
                      </i>
                      <label className="required">
                        {location.state.dueDate} <span>*</span>
                      </label>
                      <DatePicker
                        dateFormat="dd-MM-yyyy"
                        selected={
                          values?.dueDate ? new Date(values.dueDate) : null
                        }
                        name="dueDate"
                        onBlur={handleBlur}
                        onChange={(e) => {
                          var date1 = moment(e);
                          var date2 = moment(new Date());
                          var days = date1.diff(date2, "days");

                          handleChange({
                            target: {
                              name: "daysLeft",
                              value: days >= 0 ? days + 1 : days,
                            },
                          });

                          handleChange({
                            target: { name: "dueDate", value: e },
                          });
                        }}
                        minDate={
                          location?.state?.documentType ==
                          DOCUMENT_TYPE.ESTIMATES
                            ? new Date(values?.fromDate) > new Date()
                              ? new Date(values?.fromDate)
                              : new Date()
                            : new Date(values?.fromDate)
                        }
                        //maxDate={new Date()}
                        placeholderText="DD-MM-YYYY"
                      />
                    </div>
                    {touched.dueDate && errors.dueDate && (
                      <p className="filterDateError">
                        {errors.dueDate.toString()}
                      </p>
                    )}
                  </Grid>
                  <Grid item xs={12} sm={6} lg={4}>
                    <NormalInput
                      name={"documentNumber"}
                      values={values.documentNumber}
                      isRequired
                      isDisabled={true}
                      onBlur={handleBlur}
                      focused={false}
                      sizeval="medium"
                      label={location.state.salesOrderNo}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} lg={4}>
                    {docType.includes(location.state.documentType) &&
                    !params?.id ? (
                      (isEdit
                        ? salePurchaseDetail.referenceNumber &&
                          refList.length > 0 &&
                          refList.length
                        : true) && (
                        <Autocomplete
                          //disabled={isReadOnly()}
                          disableClearable={true}
                          required={true}
                          isRequired
                          values={values.referenceNumber || null}
                          label={"Ref Id"}
                          onChange={(_e: any, newValue: any) => {
                            handleChange({
                              target: {
                                name: "referenceNumber",
                                value: newValue.referenceNumber,
                              },
                            });

                            setInvoice(newValue);
                            setRefDate(true);
                          }}
                          defaultValue={() => {
                            const index = refList.findIndex(
                              (x: any) =>
                                x.referenceNumber ==
                                salePurchaseDetail?.referenceNumber
                            );
                            return refList[index];
                          }}
                          size="small"
                          name="referenceNumber"
                          options={refList}
                          isOptionEqualToValue={(option: any, value: any) => {
                            if (
                              value === "" ||
                              option === "" ||
                              value?.referenceNumber === option?.referenceNumber
                            )
                              return option;
                          }}
                          getOptionLabel={(option: any) =>
                            option.referenceNumber || ""
                          }
                          renderOption={(props: any, option: any) => {
                            return (
                              <Box
                                component="li"
                                sx={{
                                  "& > img": { mr: 2, flexShrink: 0 },
                                  fontFamily: "Poppins",
                                }}
                                {...props}
                              >
                                Ref ID:{option.referenceNumber}
                              </Box>
                            );
                          }}
                          error={
                            Boolean(touched.referenceNumber) &&
                            errors.referenceNumber
                          }
                          helperText={
                            touched.referenceNumber && errors.referenceNumber
                          }
                          handleBlur={handleBlur}
                        />
                      )
                    ) : (
                      <NormalInput
                        name={"referenceNumber"}
                        values={values.referenceNumber}
                        isRequired
                        isDisabled={true}
                        focused={false}
                        onBlur={handleBlur}
                        sizeval="medium"
                        label="Ref Id"
                      />
                    )}
                  </Grid>
                  <Grid item xs={12} sm={6} lg={4}>
                    <React.Fragment key={values.placeOfSupply}>
                      {(isEdit
                        ? salePurchaseDetail?.placeOfSupply &&
                          stateList.length > 0 &&
                          stateList.length
                        : true) && (
                        <Autocomplete
                          required={true}
                          disableClearable
                          disabled={!stateList.length}
                          isRequired
                          values={values.placeOfSupply}
                          openOnFocus
                          onChange={(_e: any, newValue: any) => {
                            handleChange({
                              target: {
                                name: "placeOfSupply",
                                value: newValue.name,
                              },
                            });
                          }}
                          defaultValue={() => {
                            const index = stateList.findIndex(
                              (x: any) => x.name == values?.placeOfSupply
                            );
                            return stateList[index];
                          }}
                          size="small"
                          name="placeOfSupply"
                          label="Place of Supply"
                          options={stateList}
                          isOptionEqualToValue={(option: any, value: any) => {
                            if (
                              value === "" ||
                              option === "" ||
                              value?.name === option?.name
                            )
                              return option;
                          }}
                          getOptionLabel={(option: any) => option.name || ""}
                          renderOption={(props: any, option: any) => {
                            return (
                              <Box
                                component="li"
                                sx={{
                                  "& > img": { mr: 2, flexShrink: 0 },
                                  fontFamily: "Poppins",
                                }}
                                {...props}
                              >
                                {option.name}
                              </Box>
                            );
                          }}
                          error={
                            Boolean(touched.placeOfSupply) &&
                            errors.placeOfSupply
                          }
                          helperText={
                            touched.placeOfSupply && errors.placeOfSupply
                          }
                          onBlur={handleBlur}
                        />
                      )}
                    </React.Fragment>
                  </Grid>
                </Grid>
                <hr className="m-t-20 m-b-20" />
                <FieldArray
                  name="productDetails"
                  render={({ insert, remove, push }) => (
                    <div className="salePurchase_table">
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell>Products/Service</TableCell>
                            <TableCell>Items</TableCell>
                            <TableCell>Quantity</TableCell>
                            <TableCell>Rate (₹)</TableCell>
                            <TableCell>Discount (%)</TableCell>
                            <TableCell>Amount (₹)</TableCell>
                            <TableCell>Tax </TableCell>
                            <TableCell>Actions</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          <>
                            {values.productDetails &&
                              values.productDetails.length > 0 &&
                              values.productDetails.map(
                                (item: any, index: any) => (
                                  <TableRow key={index}>
                                    <TableCell>
                                      <NormalSelect
                                        required={true}
                                        name={`productDetails.${index}.detailType`}
                                        label="Product/Service"
                                        className="product-dropdown"
                                        values={
                                          values.productDetails[index]
                                            .detailType
                                        }
                                        handleChange={(e: any) => {
                                          if (e.target.value) {
                                            handleChange({
                                              target: {
                                                name: `productDetails.${index}.productId`,
                                                value: "",
                                              },
                                            });
                                            handleChange({
                                              target: {
                                                name: `productDetails.${index}.productName`,
                                                value: "",
                                              },
                                            });

                                            handleChange({
                                              target: {
                                                name: `productDetails.${index}.productUnit`,
                                                value: "",
                                              },
                                            });
                                            handleChange({
                                              target: {
                                                name: `productDetails.${index}.amount`,
                                                value: "",
                                              },
                                            });
                                            handleChange({
                                              target: {
                                                name: `productDetails.${index}.rate`,
                                                value: "",
                                              },
                                            });
                                            handleChange({
                                              target: {
                                                name: `productDetails.${index}.discount`,
                                                value: 0,
                                              },
                                            });
                                            handleChange({
                                              target: {
                                                name: `productDetails.${index}.quantity`,
                                                value: 1,
                                              },
                                            });

                                            handleChange(e);
                                          }
                                        }}
                                        options={productServiceDropdown.map(
                                          (item: any) => (
                                            <MenuItem
                                              value={item.id}
                                              key={item.id}
                                            >
                                              {item.name}
                                            </MenuItem>
                                          )
                                        )}
                                        handleBlur={handleBlur}
                                      />
                                      <Field
                                        name={`productDetails.${index}.detailType`}
                                        render={({ form }: any) => {
                                          const error = getIn(
                                            form.errors,
                                            `productDetails.${index}.detailType`
                                          );
                                          const touch = getIn(
                                            form.touched,
                                            `productDetails.${index}.detailType`
                                          );
                                          return touch && error ? (
                                            <p className="filterDateError">
                                              {error}
                                            </p>
                                          ) : null;
                                        }}
                                      />
                                    </TableCell>

                                    <TableCell>
                                      <React.Fragment
                                        key={
                                          values.productDetails[index]
                                            .productName
                                        }
                                      >
                                        {(isEdit
                                          ? productServiceList.length > 0 &&
                                            productServiceList.length
                                          : true) && (
                                          <ProductServiceAuto
                                            type={type}
                                            required={true}
                                            disabled={false}
                                            id={`productDetails.${index}.productId`}
                                            name={`productDetails.${index}.productId`}
                                            displayType={
                                              values.productDetails[index]
                                                .detailType
                                            }
                                            values={
                                              values.productDetails[index]
                                                .productId
                                            }
                                            setAdd={() =>
                                              handleAddItem(values, index)
                                            }
                                            index={index}
                                            label={"Item"}
                                            size="small"
                                            setProductState={setProductState}
                                            setServiceState={setServiceState}
                                            setFieldValue={setFieldValue}
                                            handleChnageProduct={
                                              handleChnageProduct
                                            }
                                            handleChange={handleChange}
                                            options={productServiceList.filter(
                                              (x: any) => {
                                                return (
                                                  x.type ===
                                                    Number(
                                                      values.productDetails[
                                                        index
                                                      ].detailType
                                                    ) &&
                                                  !values?.productDetails
                                                    .map(
                                                      (x: any) => x.productId
                                                    )
                                                    .includes(x._id)
                                                );
                                              }
                                            )}
                                            isOptionEqualToValue={(
                                              option: any,
                                              value: any
                                            ) => value?._id === option?._id}
                                            defaultValue={() => {
                                              var index1 = productServiceList
                                                .map(function (data: any) {
                                                  return data._id;
                                                })
                                                .indexOf(
                                                  values.productDetails[index]
                                                    ?.productId
                                                );
                                              return productServiceList[index1];
                                            }}
                                            renderOption={(
                                              props: any,
                                              option: any
                                            ) => {
                                              return (
                                                <Box
                                                  component="li"
                                                  sx={{
                                                    "& > img": {
                                                      mr: 2,
                                                      flexShrink: 0,
                                                    },
                                                    fontFamily: "Poppins",
                                                  }}
                                                  {...props}
                                                  key={option._id}
                                                >
                                                  {option.name}
                                                </Box>
                                              );
                                            }}
                                            onBlur={handleBlur}
                                          />
                                        )}
                                      </React.Fragment>
                                      <Field
                                        name={`productDetails.${index}.productId`}
                                        render={({ form }: any) => {
                                          const error = getIn(
                                            form.errors,
                                            `productDetails.${index}.productId`
                                          );
                                          const touch = getIn(
                                            form.touched,
                                            `productDetails.${index}.productId`
                                          );

                                          return touch && error ? (
                                            <p
                                              className="filterDateError"
                                              style={{ color: "#d32f2f" }}
                                            >
                                              {error}
                                            </p>
                                          ) : null;
                                        }}
                                      />
                                    </TableCell>

                                    <TableCell>
                                      {" "}
                                      <NumberInput
                                        name={`productDetails.${index}.quantity`}
                                        isRequired
                                        focused={false}
                                        type="number"
                                        sizeval="medium"
                                        className="show-counter-arrow p-10"
                                        values={
                                          values.productDetails[index].quantity
                                        }
                                        onChange={(e: any) => {
                                          if (
                                            e.target.value >= 1 ||
                                            e.target.value === ""
                                          ) {
                                            if (
                                              e.target.value.split(".")
                                                ?.length == 2 &&
                                              e.target.value.split(".")[1]
                                                .length > 2
                                            )
                                              return;
                                            if (
                                              values.productDetails[index].rate
                                            ) {
                                              if (
                                                values.productDetails[index]
                                                  .discount
                                              ) {
                                                handleChange({
                                                  target: {
                                                    name: `productDetails.${index}.amount`,
                                                    value: (
                                                      values.productDetails[
                                                        index
                                                      ].rate *
                                                        e.target.value -
                                                      values.productDetails[
                                                        index
                                                      ].rate *
                                                        e.target.value *
                                                        (values.productDetails[
                                                          index
                                                        ].discount /
                                                          100)
                                                    )?.toFixed(2),
                                                  },
                                                });
                                              } else {
                                                handleChange({
                                                  target: {
                                                    name: `productDetails.${index}.amount`,
                                                    value: (
                                                      values.productDetails[
                                                        index
                                                      ].rate * e.target.value
                                                    )?.toFixed(2),
                                                  },
                                                });
                                              }
                                            }

                                            handleChange(e);
                                          }
                                        }}
                                        onBlur={(e: any) => {
                                          if (
                                            e.target.value >= 1 ||
                                            e.target.value === ""
                                          ) {
                                            if (
                                              e.target.value.split(".")
                                                ?.length == 2 &&
                                              e.target.value.split(".")[1]
                                                .length > 2
                                            )
                                              return;
                                            if (
                                              values.productDetails[index].rate
                                            ) {
                                              if (
                                                values.productDetails[index]
                                                  .discount
                                              ) {
                                                handleChange({
                                                  target: {
                                                    name: `productDetails.${index}.amount`,
                                                    value: (
                                                      values.productDetails[
                                                        index
                                                      ].rate *
                                                        e.target.value -
                                                      values.productDetails[
                                                        index
                                                      ].rate *
                                                        e.target.value *
                                                        (values.productDetails[
                                                          index
                                                        ].discount /
                                                          100)
                                                    )?.toFixed(2),
                                                  },
                                                });
                                              } else {
                                                handleChange({
                                                  target: {
                                                    name: `productDetails.${index}.amount`,
                                                    value: (
                                                      values.productDetails[
                                                        index
                                                      ].rate * e.target.value
                                                    )?.toFixed(2),
                                                  },
                                                });
                                              }
                                            }

                                            handleBlur(e);
                                          }
                                        }}
                                        onKeyDown={(e: any) =>
                                          phonePreventText.includes(e.key) &&
                                          e.preventDefault()
                                        }
                                        InputProps={{
                                          endAdornment: (
                                            <InputAdornment position="end">
                                              <p style={{ fontSize: "14px" }}>
                                                {
                                                  values?.productDetails[index]
                                                    ?.productUnit
                                                }
                                              </p>
                                            </InputAdornment>
                                          ),
                                        }}
                                      />
                                      <Field
                                        name={`productDetails.${index}.quantity`}
                                        render={({ form }: any) => {
                                          const error = getIn(
                                            form.errors,
                                            `productDetails.${index}.quantity`
                                          );
                                          const touch = getIn(
                                            form.touched,
                                            `productDetails.${index}.quantity`
                                          );
                                          return touch && error ? (
                                            <p className="filterDateError">
                                              {error}
                                            </p>
                                          ) : null;
                                        }}
                                      />
                                    </TableCell>

                                    <TableCell>
                                      {" "}
                                      <NormalInput
                                        name={`productDetails.${index}.rate`}
                                        isRequired
                                        // isDisabled
                                        focused={false}
                                        type="number"
                                        onKeyDown={(e: any) =>
                                          phonePreventText.includes(e.key) &&
                                          e.preventDefault()
                                        }
                                        sizeval="medium"
                                        values={
                                          values.productDetails[index].rate
                                        }
                                        onChange={(e: any) => {
                                          if (
                                            e.target.value.split(".")?.length ==
                                              2 &&
                                            e.target.value.split(".")[1]
                                              .length > 2
                                          )
                                            return;

                                          if (
                                            values.productDetails[index]
                                              .quantity
                                          ) {
                                            const price = e.target.value;
                                            if (
                                              values.productDetails[index]
                                                .discount
                                            ) {
                                              handleChange({
                                                target: {
                                                  name: `productDetails.${index}.amount`,
                                                  value: (
                                                    values.productDetails[index]
                                                      .quantity *
                                                      +price -
                                                    values.productDetails[index]
                                                      .quantity *
                                                      +price *
                                                      (values.productDetails[
                                                        index
                                                      ].discount /
                                                        100)
                                                  )?.toFixed(2),
                                                },
                                              });
                                            } else {
                                              handleChange({
                                                target: {
                                                  name: `productDetails.${index}.amount`,
                                                  value: (
                                                    values.productDetails[index]
                                                      .quantity * +price
                                                  )?.toFixed(2),
                                                },
                                              });
                                            }
                                          }
                                          handleChange(e);
                                        }}
                                        onBlur={(e: any) => {
                                          handleChange({
                                            target: {
                                              name: `productDetails.${index}.rate`,
                                              value: Number(
                                                e.target.value
                                              )?.toFixed(2),
                                            },
                                          });
                                        }}
                                      />
                                      <Field
                                        name={`productDetails.${index}.rate`}
                                        render={({ form }: any) => {
                                          const error = getIn(
                                            form.errors,
                                            `productDetails.${index}.rate`
                                          );
                                          const touch = getIn(
                                            form.touched,
                                            `productDetails.${index}.rate`
                                          );
                                          return touch && error ? (
                                            <p className="filterDateError">
                                              {error}
                                            </p>
                                          ) : null;
                                        }}
                                      />
                                    </TableCell>

                                    <TableCell>
                                      <NormalInput
                                        name={`productDetails.${index}.discount`}
                                        isRequired
                                        focused={false}
                                        type="number"
                                        sizeval="medium"
                                        values={
                                          values.productDetails[index].discount
                                        }
                                        onChange={(e: any) => {
                                          if (e.target.value > 100) {
                                            return;
                                          }
                                          if (
                                            e.target.value.split(".")?.length ==
                                              2 &&
                                            e.target.value.split(".")[1]
                                              .length > 2
                                          )
                                            return;
                                          if (
                                            values.productDetails[index].rate &&
                                            values.productDetails[index]
                                              .quantity &&
                                            e.target.value > -1
                                          ) {
                                            handleChange({
                                              target: {
                                                name: `productDetails.${index}.amount`,
                                                value: (
                                                  values.productDetails[index]
                                                    .rate *
                                                    values.productDetails[index]
                                                      .quantity -
                                                  values.productDetails[index]
                                                    .rate *
                                                    values.productDetails[index]
                                                      .quantity *
                                                    (e.target.value / 100)
                                                )?.toFixed(2),
                                              },
                                            });
                                            handleChange(e);
                                          }

                                          if (
                                            values.productDetails[index].rate &&
                                            values.productDetails[index]
                                              .quantity &&
                                            e.target.value === ""
                                          ) {
                                            handleChange({
                                              target: {
                                                name: `productDetails.${index}.amount`,
                                                value: (
                                                  values.productDetails[index]
                                                    .rate *
                                                  values.productDetails[index]
                                                    .quantity
                                                )?.toFixed(2),
                                              },
                                            });
                                            handleChange({
                                              target: {
                                                name: `productDetails.${index}.discount`,
                                                value: 0,
                                              },
                                            });
                                          }
                                          //handleChange(e);
                                        }}
                                        onBlur={(e: any) => {
                                          if (
                                            values.productDetails[index].rate &&
                                            values.productDetails[index]
                                              .quantity &&
                                            e.target.value > 0
                                          ) {
                                            handleChange({
                                              target: {
                                                name: `productDetails.${index}.amount`,
                                                value: (
                                                  values.productDetails[index]
                                                    .rate *
                                                    values.productDetails[index]
                                                      .quantity -
                                                  values.productDetails[index]
                                                    .rate *
                                                    values.productDetails[index]
                                                      .quantity *
                                                    (e.target.value / 100)
                                                )?.toFixed(2),
                                              },
                                            });
                                            handleBlur(e);
                                          }

                                          if (
                                            values.productDetails[index].rate &&
                                            values.productDetails[index]
                                              .quantity &&
                                            e.target.value === ""
                                          ) {
                                            handleChange({
                                              target: {
                                                name: `productDetails.${index}.amount`,
                                                value: (
                                                  values.productDetails[index]
                                                    .rate *
                                                  values.productDetails[index]
                                                    .quantity
                                                )?.toFixed(2),
                                              },
                                            });
                                            handleBlur({
                                              target: {
                                                name: `productDetails.${index}.discount`,
                                                value: 0,
                                              },
                                            });
                                          }
                                        }}
                                        onKeyDown={(e: any) =>
                                          phonePreventText.includes(e.key) &&
                                          e.preventDefault()
                                        }
                                      />

                                      <Field
                                        name={`productDetails.${index}.discount`}
                                        render={({ form }: any) => {
                                          const error = getIn(
                                            form.errors,
                                            `productDetails.${index}.discount`
                                          );
                                          const touch = getIn(
                                            form.touched,
                                            `productDetails.${index}.discount`
                                          );
                                          return touch && error ? (
                                            <p className="filterDateError">
                                              {error}
                                            </p>
                                          ) : null;
                                        }}
                                      />
                                    </TableCell>

                                    <TableCell>
                                      <NormalInput
                                        name={`productDetails.${index}.amount`}
                                        isRequired
                                        isDisabled
                                        focused={false}
                                        type="text"
                                        sizeval="medium"
                                        values={
                                          values.productDetails[index].amount
                                        }
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                      />

                                      <Field
                                        name={`productDetails.${index}.amount`}
                                        render={({ form }: any) => {
                                          const error = getIn(
                                            form.errors,
                                            `productDetails.${index}.amount`
                                          );
                                          const touch = getIn(
                                            form.touched,
                                            `productDetails.${index}.amount`
                                          );
                                          return touch && error ? (
                                            <p className="filterDateError">
                                              {error}
                                            </p>
                                          ) : null;
                                        }}
                                      />
                                    </TableCell>
                                    <TableCell>
                                      <Typography
                                        variant="subtitle1"
                                        sx={{ minWidth: 170 }}
                                      >
                                        <React.Fragment>
                                          {(organizationDeatil?.address
                                            ?.state || "Delhi") ===
                                          values.placeOfSupply ? (
                                            <>
                                              <Typography
                                                variant="subtitle2"
                                                className="nowrap m-t-5"
                                              >
                                                CGST @{" "}
                                                {values.productDetails[index]
                                                  .iGstPercent / 2 ||
                                                  values.productDetails[index]
                                                    .cGstPercent ||
                                                  "0"}
                                                % : ₹
                                                {(
                                                  (+values.productDetails[index]
                                                    .amount *
                                                    (+values.productDetails[
                                                      index
                                                    ]?.iGstPercent / 2 ||
                                                      +values.productDetails[
                                                        index
                                                      ]?.cGstPercent ||
                                                      0)) /
                                                  100
                                                )?.toFixed(2) || "0.00"}
                                                <br />
                                              </Typography>
                                              <Typography
                                                variant="subtitle2"
                                                className="nowrap"
                                              >
                                                SGST @{" "}
                                                {values.productDetails[index]
                                                  .iGstPercent / 2 ||
                                                  values.productDetails[index]
                                                    .sGstPercent ||
                                                  "0"}
                                                % : ₹
                                                {(
                                                  (values.productDetails[index]
                                                    .amount *
                                                    (values.productDetails[
                                                      index
                                                    ]?.iGstPercent / 2 ||
                                                      values.productDetails[
                                                        index
                                                      ]?.cGstPercent ||
                                                      0)) /
                                                  100
                                                )?.toFixed(2) || "0.00"}
                                              </Typography>
                                            </>
                                          ) : (
                                            <>
                                              <Typography
                                                variant="subtitle2"
                                                className="nowrap m-t-5"
                                              >
                                                IGST @{" "}
                                                {values.productDetails[index]
                                                  .iGstPercent ||
                                                  values.productDetails[index]
                                                    .sGstPercent * 2 ||
                                                  "0"}
                                                % : ₹
                                                {(
                                                  (values.productDetails[index]
                                                    .amount *
                                                    (values.productDetails[
                                                      index
                                                    ]?.iGstPercent ||
                                                      values.productDetails[
                                                        index
                                                      ].sGstPercent * 2) || 0) /
                                                  100
                                                )?.toFixed(2) || "0.00"}
                                              </Typography>
                                            </>
                                          )}
                                          <Typography
                                            variant="subtitle2"
                                            className="nowrap"
                                          >
                                            CESS @{" "}
                                            {values.productDetails[index]
                                              .cessPercent || "0"}
                                            % : ₹
                                            {(
                                              (values.productDetails[index]
                                                ?.amount *
                                                values.productDetails[index]
                                                  ?.cessPercent || 0) / 100
                                            )?.toFixed(2) || "0.00"}
                                          </Typography>
                                        </React.Fragment>
                                      </Typography>
                                    </TableCell>
                                    <TableCell>
                                      <DynamicMenu
                                        id={index}
                                        handleDelete={() => remove(index)}
                                        showDelete={
                                          values &&
                                          values.productDetails &&
                                          values.productDetails.length > 1
                                            ? true
                                            : false
                                        }
                                        product={values?.productDetails[index]}
                                        values={values}
                                        handleEdit={handleEdit}
                                      />
                                    </TableCell>
                                  </TableRow>
                                )
                              )}
                            <Button
                              className="add-item-link"
                              variant="text"
                              sx={{ mt: 1 }}
                              onClick={() =>
                                push({
                                  detailType: "",
                                  productId: "",
                                  productName: "",
                                  quantity: "",
                                  rate: "",
                                  discount: 0,
                                  amount: "",
                                })
                              }
                            >
                              + Add Item
                            </Button>
                          </>
                        </TableBody>
                      </Table>
                    </div>
                  )}
                />

                <div className="Dflex sp-bt al-tp">
                  <button
                    type="button"
                    className="add-item-link"
                    //onClick={handleAddRow}
                  ></button>
                  <div className="price-distribution">
                    <ul>
                      <li>
                        <Typography variant="subtitle1">Sub Total :</Typography>
                        <Typography variant="subtitle1">
                          ₹
                          {calculateSubTotalValues(
                            values?.productDetails,
                            "amount"
                          )}
                        </Typography>
                      </li>

                      <li>
                        <Typography variant="subtitle1">Tax :</Typography>
                        <Typography variant="subtitle1">
                          ₹{(+total - +subTotal)?.toFixed(2)}
                        </Typography>
                      </li>
                      <li>
                        <Typography variant="subtitle1">
                          Total Price:
                        </Typography>
                        <Typography variant="subtitle1">
                          ₹{calculateValues(values?.productDetails, "amount")}
                        </Typography>
                      </li>
                    </ul>
                  </div>
                </div>
                <Grid container rowSpacing={3} columnSpacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      value={values.description}
                      name={"description"}
                      id="description"
                      label={location.state.salesOrderDesc}
                      multiline
                      rows={3}
                      className="m-t-30 textarea-cover"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {touched.description && errors.description && (
                      <p className="filterDateError">
                        {errors.description.toString()}
                      </p>
                    )}
                  </Grid>
                  <Grid item xs={12}>
                    {!isEdit || location.state.isDocumentConverted ? (
                      <Grid container rowSpacing={3} columnSpacing={2}>
                        <Grid item xs={6} sm={4} md={3} lg={2.5} xl={2}>
                          <NormalButton
                            variant="contained"
                            buttonText="CANCEL"
                            className="btn-simple w-100"
                            onPress={() => {
                              setCancelDialogBox(true);
                            }}
                          />
                        </Grid>
                        <Grid item xs={6} sm={4} md={3} lg={2.5} xl={2}>
                          <NormalButton
                            variant="outlined"
                            buttonText="Preview"
                            onPress={onPress}
                            disabled={
                              !(
                                isValid &&
                                (location.state.isDocumentConverted ||
                                refData ||
                                responseData?._id
                                  ? true
                                  : dirty)
                              )
                            }
                            className="btn-purple-border w-100 preview"
                          />
                        </Grid>
                        <Grid item xs={6} sm={4} md={3} lg={2.5} xl={2}>
                          <NormalButton
                            type="submit"
                            variant="contained"
                            buttonText="SAVE"
                            disabled={
                              !(
                                isValid &&
                                (location.state.isDocumentConverted ||
                                refData ||
                                responseData?._id
                                  ? true
                                  : dirty)
                              )
                            }
                            className="btn-purple w-100"
                            onPress={() => setSavingType(1)}
                          />
                        </Grid>
                        <Grid item xs={6} sm={4} md={3} lg={2.5} xl={2}>
                          <NormalButton
                            type="submit"
                            variant="contained"
                            buttonText="SAVE & SEND"
                            onPress={() => setSavingType(2)}
                            disabled={
                              !(
                                isValid &&
                                (location.state.isDocumentConverted ||
                                refData ||
                                responseData?._id
                                  ? true
                                  : dirty)
                              )
                            }
                            className="btn-purple w-100"
                          />
                        </Grid>
                      </Grid>
                    ) : (
                      <Grid container rowSpacing={3} columnSpacing={2}>
                        <Grid item xs={6} sm={4} md={3} lg={2.5} xl={2}>
                          <NormalButton
                            variant="contained"
                            buttonText="CANCEL"
                            className="btn-simple w-100"
                            onPress={() => {
                              setCancelDialogBox(true);
                            }}
                          />
                        </Grid>
                        <Grid item xs={6} sm={4} md={3} lg={2.5} xl={2}>
                          <NormalButton
                            variant="outlined"
                            buttonText="Preview"
                            onPress={onPress}
                            disabled={!isValid}
                            className="btn-purple-border w-100 preview"
                          />
                        </Grid>
                        <Grid item xs={6} sm={4} md={3} lg={2.5} xl={2}>
                          <NormalButton
                            type="submit"
                            variant="contained"
                            buttonText="UPDATE"
                            className="btn-purple w-100"
                          />
                        </Grid>
                      </Grid>
                    )}
                  </Grid>
                </Grid>
              </div>
            </Form>
          )}
        </Formik>
      </div>

      <AddProductServicesDrawer
        state={productState}
        setState={setOpenForAddEditProduct}
      >
        <AddProduct
          setState={setProductState}
          openForAddEditProduct={openForAddEditProduct}
          setOpenForAddEditProduct={setOpenForAddEditProduct}
        />
      </AddProductServicesDrawer>

      <AddProductServicesDrawer
        state={serviceState}
        setState={setOpenForAddEditService}
      >
        <AddServices
          setState={setServiceState}
          openForAddEditProduct={openForAddEditService}
          setOpenForAddEditProduct={setOpenForAddEditService}
        />
      </AddProductServicesDrawer>

      <DeleteDialog
        dialogOpen={cancelDialogBox}
        dialogTitle={"Cancel"}
        popimg={deleteIMG}
        yesHandle={() => {
          setCancelDialogBox(false);
          navigate(
            location.state.type === 1
              ? "/sales/" + location.state.redirect
              : "/purchase/" + location.state.redirect
          );
        }}
        handleDialogClose={() => setCancelDialogBox(false)}
        dialogPara={`Are you sure you want to cancel?`}
        nvCancel="Cancel"
        nvYes="Yes"
      />

      <SalesOrderEmail
        dialogOpen={emailDialog}
        dialogTitle={"Send Sales Order"}
        // popimg={deleteIMG}
        yesHandle={handleEmailSubmit}
        handleDialogClose={() => setEmailDialog(false)}
        nvCancel="Cancel"
        nvYes="Send"
        documentType={documentType}
      />
    </>
  );
};

export default AddEdit;
