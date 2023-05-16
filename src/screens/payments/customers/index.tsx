import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomerTable from "../../../components/customersTables/CustomerTable";
import AddCustomerButton from "../../../components/buttons/buttonWithIcon";

import {
  deleteIMG,
  calenderIMG,
  productServiceStatus,
} from "../../../constants";
import { Box } from "@mui/system";
import MenuItem from "@mui/material/MenuItem";

import { Formik, Form } from "formik";
import AddProductDrawer from "../../../components/drawer";
import Breadcrumbs from "../../../components/breadcrumb";
import NormalButton from "../../../components/buttons/normalButton";
import "./customer.scss";
import DeleteDialog from "../../../components/dialog";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Grid,
  Slider,
} from "@mui/material";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getCustomerListing, statesList } from "./action";
import NormalSelect from "../../../components/select/normalSelect";
import { updateCustomer, resetCustomer } from "../customerListSlice";

function Index() {
  const navigate = useNavigate();
  const [state, setState] = React.useState(false);
  const dispatch: any = useDispatch();
  const [name, setName] = useState("");
  const [desCription, setdesCription] = useState("");
  const [open, setOpen] = React.useState(false);
  const [filterState, setfilterState] = React.useState(false);

  const [value, setValue] = React.useState<number[]>([20, 87]);

  const [startDate, setStartDate] = useState<any>(null);
  const [endDate, setEndDate]: any = useState<any>(null);

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };
  const pathname = window.location.pathname;

  const path = pathname.includes("vendor");

  useEffect(() => {
    dispatch(updateCustomer({ type: path ? 2 : 1 }));
  }, [path]);

  const [status, setStatus] = useState<any>("");
  const initialValues = {
    userId: "",
    displayName: "",
    phoneNumber: "",
    email: "",
    isCustomerVendor: 1,
    status: 1,
  };
  let stvalue = 3;

  const customerInvoiceValues = {
    transactionDetail: "",
    due: "",
    status: "",
    action: "",
  };
  const type = pathname.includes("vendor") ? 2 : 1;
  var AddNewBtnLable = pathname.includes("vendor") ? "vendor" : "customer";

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [openfilterDrop, setopenfilterDrop] = useState(false);

  const filterhandleClick = () => {
    setopenfilterDrop((prev: any) => !prev);
  };

  var intVal = {
    status: 0,
    startDate: "",
    endDate: "",
  };

  const [initialVal, setIntialVal] = useState(intVal);

  useEffect(() => {
    document.title = (type == 1 ? "Customers" : "Vendor") + " | PyThru";
    setStatus("");
    setStartDate("");
    setEndDate("");
    setIntialVal(intVal);
  }, [type, pathname]);

  const editRoute = () => {
    let path = `${pathname}/add`;
    dispatch(updateCustomer({ imageUrl: "" }));
    navigate(path);
  };

  const { duePriceMin, duePriceMax, filterCount } = useSelector(
    (state: any) => state.customerListSlice
  );

  const [price, setPrice]: any = useState<number[]>(
    duePriceMax ? [duePriceMin, duePriceMax] : [0, 1000]
  );

  useEffect(() => {
    duePriceMax ? setPrice([duePriceMin, duePriceMax]) : setPrice([0, 1000]);
  }, [duePriceMax]);

  function valuetext(value: number) {
    return `${value}`;
  }
  const handlePriceChange = (event: Event, newValue: number | number[]) => {
    setPrice(newValue);
  };

  const { permissions } = useSelector((state: any) => state.commonSlice);

  const handleClearFilter = () => {
    setStatus("");
    setStartDate("");
    setEndDate("");
    setIntialVal((prev) => ({ ...prev, startDate: "", endDate: "" }));
    dispatch(resetCustomer({}));
    dispatch(
      updateCustomer({
        duePriceMin: duePriceMin,
        duePriceMax: duePriceMax,
        type: path ? 2 : 1,
      })
    );
    setPrice([duePriceMin, duePriceMax]);

    dispatch(getCustomerListing());

    setfilterState(false);
  };

  const handleStatusChange = (event: any) => {
    setStatus(event.target.value);
  };

  return (
    <>
      <Breadcrumbs />
      {((permissions &&
        permissions[
          pathname.includes("payment")
            ? "payments"
            : pathname.includes("sales")
            ? "sales"
            : "purchases"
        ].add) ||
        !permissions) && (
        <AddCustomerButton
          text={"+ New " + AddNewBtnLable}
          className="btn-purple m-r-20"
          onPress={editRoute}
        />
      )}
      <NormalButton
        buttonText={"Bulk Upload " + AddNewBtnLable}
        className="btn-purple"
        onPress={() => {
          const bulUrl =
            type == 1
              ? "/payments/collect/customers/bulk-upload"
              : "/payments/payouts/vendor/bulk-upload";
          navigate(bulUrl);
        }}
      />
      <CustomerTable
        type={type}
        filterPress={() => setfilterState(true)}
        handleAddItem={editRoute}
      />

      <AddProductDrawer
        state={filterState}
        setState={setfilterState}
        className="filterDrawer"
      >
        <h3 className="hd">Filter</h3>

        <Formik
          initialValues={initialVal}
          enableReinitialize={true}
          onSubmit={(values) => {
            var filterCount = 0;
            if (startDate || endDate) {
              filterCount = filterCount + 1;
            }
            if (status > 0) {
              filterCount = filterCount + 1;
            }
            if (duePriceMin != price[0] || duePriceMax != price[1]) {
              filterCount = filterCount + 1;
            }
            dispatch(
              updateCustomer({
                fromDate: startDate ? startDate : "",
                toDate: endDate ? endDate : "",
                status: status,
                fromAmount: price[0],
                toAmount: price[1],
                filterCount: filterCount,
                type: path ? 2 : 1,
              })
            );
            dispatch(getCustomerListing());
            setfilterState(false);
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
          }) => (
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit(e);
              }}
            >
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  Status
                </AccordionSummary>

                <AccordionDetails>
                  <NormalSelect
                    label="Status"
                    values={status}
                    handleChange={handleStatusChange}
                    options={productServiceStatus.map((item: any) => (
                      <MenuItem value={item.id} key={item.id}>
                        {item.name}
                      </MenuItem>
                    ))}
                  />
                </AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  Creation Date
                </AccordionSummary>
                <AccordionDetails>
                  <div className="filter-range-picker">
                    <div className="filterDate m-b-20">
                      <i>
                        <img src={calenderIMG} alt="" />
                      </i>
                      <DatePicker
                        dateFormat="dd-MM-yyyy"
                        selected={startDate}
                        onChange={(date: any) => {
                          setStartDate(date);
                          setEndDate("");
                          setFieldValue("startDate", date);
                        }}
                        maxDate={new Date()}
                        placeholderText="From"
                      />
                    </div>
                    <div className="filterDate">
                      <i>
                        <img src={calenderIMG} alt="" />
                      </i>
                      <DatePicker
                        dateFormat="dd-MM-yyyy"
                        selected={endDate}
                        onChange={(date: any) => {
                          setEndDate(date);
                          setFieldValue("endDate", date);
                        }}
                        minDate={startDate}
                        maxDate={new Date()}
                        placeholderText="To"
                      />
                    </div>
                  </div>
                </AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  Due Amount
                </AccordionSummary>
                <AccordionDetails>
                  <Box sx={{ ml: 1, mr: 1 }}>
                    <Slider
                      getAriaLabel={() => "Minimum distance"}
                      value={price}
                      onChange={handlePriceChange}
                      valueLabelDisplay="auto"
                      getAriaValueText={valuetext}
                      min={duePriceMin || 0}
                      max={duePriceMax || 1000}
                      className="filterSlider"
                    />
                  </Box>
                  <Box
                    sx={{ width: "100%" }}
                    className="Dflex sp-bt sliderValue"
                  >
                    <i>₹{price[0]}</i> <i>₹{price[1]}</i>
                  </Box>
                </AccordionDetails>
              </Accordion>

              <Grid container rowSpacing={3} columnSpacing={2}>
                <Grid item xs={6}>
                  <Button
                    onClick={handleClearFilter}
                    className="btn btn-simple w-100 m-t-20"
                    disabled={false}
                    type="button"
                  >
                    Clear
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <NormalButton
                    type="submit"
                    className="btn-purple w-100 m-t-20"
                    buttonText="Apply"
                  />
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </AddProductDrawer>

      <DeleteDialog
        dialogOpen={open}
        popimg={deleteIMG}
        dialogTitle="Remove Customer"
        yesHandle={""}
        dialogPara="Are you sure you want to Remove this Customer?"
        nvCancel="Cancel"
        nvYes="Yes"
      />
    </>
  );
}
export default Index;
