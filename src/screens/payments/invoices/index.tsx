import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Filter from "../../../components/customersTables/Filter";
import AddCustomerButton from "../../../components/buttons/buttonWithIcon";
import FormControlLabel from "@mui/material/FormControlLabel";
import Paper from "@mui/material/Paper";
import AddProductDrawer from "../../../components/drawer";
import Breadcrumbs from "../../../components/breadcrumb";
import NormalButton from "../../../components/buttons/normalButton";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Checkbox,
  Collapse,
  FormGroup,
  Slider,
} from "@mui/material";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import { Box } from "@mui/system";
import productServiceSlice from "../../productandServices/productServiceSlice";

function valuetext(value: number) {
  return `${value}`;
}

function Index() {
  const Navigate = useNavigate();
  const [state, setState] = React.useState(false);
  const dispatch: any = useDispatch();
  const [productError, setProductError] = useState("");
  const [skuError, setSkuError] = useState("");
  const [name, setName] = useState("");
  const [skuNumber, setskuNumber] = useState("");
  const [purchasePrice, setpurchasePrice] = useState("");
  const [salePrice, setsalePrice] = useState("");
  const [cess, setcess] = useState("");
  const [incomeCategory, setincomeCategory] = useState("");
  const [expenseCategory, setexpenseCategory] = useState("");
  const [desCription, setdesCription] = useState("");
  const [open, setOpen] = React.useState(false);
  const [filterState, setfilterState] = React.useState(false);
  const [invoiceDetailState, setinvoiceDetailState] = React.useState(false);

  const [value, setValue] = React.useState<number[]>([20, 87]);

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };

  const {
    productServicesCategory,
    salesUnit,
    hsnCodeList,
    addCategories,
    imageUrl,
  } = useSelector((state: any) => state.productServicesSlice);

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

  useEffect(() => {
    // dispatch(getCustomerListing());
    //dispatch(getProductAndServicesCategory())
    //dispatch(getHsnCodeList())
    //dispatch(getSalesUnitList())
    //dispatch(checkDetailExist())
  }, []);

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

  //********Add Validation on ProductName*/
  // const handleChangeProductName = (value: any) => {
  //   if (!value) {
  //     setProductError("Name is required");
  //     return;
  //   }
  //   dispatch(
  //     checkDetailExist("name", value, (res: any) => {
  //       if (res?.data?.responseCode === 200) setProductError("");
  //       else setProductError(res.responseMsg);
  //     })
  //   );
  // };
  // const handleChangeSku = (value: any) => {
  //   if (!value) {
  //     setProductError("Sku is required");
  //     return;
  //   }
  //   dispatch(
  //     checkDetailExist("skuNmae", value, (res: any) => {
  //       if (res?.data?.responseCode === 200) setSkuError("");
  //       else setSkuError(res.responseMsg);
  //     })
  //   );
  // };
  return (
    <>
      <Breadcrumbs />

      <div className="Dflex sp-bt al-cnt m-b-10">
        <AddCustomerButton
          text="+ New Invoice"
          className="btn-purple"
          onPress={() => setState(true)}
        />
        <AddCustomerButton
          text="+ Invoice Detail"
          className="btn-purple"
          onPress={() => setinvoiceDetailState(true)}
        />
      </div>
      <Filter />

      <AddProductDrawer
        state={filterState}
        setState={setfilterState}
        className="filterDrawer"
      >
        <h3 className="hd">Filter</h3>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            Category
          </AccordionSummary>
          <AccordionDetails>
            <Paper elevation={3} className="categoryList">
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox />}
                  label="All"
                  labelPlacement="start"
                />
                <FormControlLabel
                  control={<Checkbox />}
                  label="Electornics"
                  labelPlacement="start"
                />
                <FormControlLabel
                  control={<Checkbox />}
                  label="Cloths"
                  labelPlacement="start"
                />
                <FormControlLabel
                  control={<Checkbox />}
                  label="Kitchenware"
                  labelPlacement="start"
                />
                <FormControlLabel
                  control={<Checkbox />}
                  label="Furniture"
                  labelPlacement="start"
                />
              </FormGroup>
            </Paper>
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
            <DatePicker
              dateFormat="dd-MM-yyyy"
              selected={startDate}
              onChange={(date: any) => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
            />
            <DatePicker
              dateFormat="dd-MM-yyyy"
              selected={endDate}
              onChange={(date: any) => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
            />
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            Sale Price
          </AccordionSummary>
          <AccordionDetails>
            <Slider
              getAriaLabel={() => "Temperature range"}
              value={value}
              onChange={handleChange}
              valueLabelDisplay="auto"
              defaultValue={[20, 87]}
              getAriaValueText={valuetext}
              className="filterSlider"
            />
            <Box sx={{ width: "100%" }} className="Dflex sp-bt sliderValue">
              <i>₹{value[0]}</i> <i>₹{value[1]}</i>
            </Box>
          </AccordionDetails>
        </Accordion>
        <Grid container rowSpacing={3} columnSpacing={2}>
          <Grid item xs={6}>
            <NormalButton
              className="btn-simple w-100 m-t-20"
              buttonText="Clear"
            />
          </Grid>
          <Grid item xs={6}>
            <NormalButton
              className="btn-purple w-100 m-t-20"
              buttonText="Apply"
            />
          </Grid>
        </Grid>
      </AddProductDrawer>

      {/* <InvoiceDetailDrawer
        state={invoiceDetailState}
        setState={setinvoiceDetailState}
      >
        <div className="invoice-detail">
          <div className="invoice-detail-header color-white">
            <div className="Dflex al-tp sp-bt m-b-20">
              <div>
                <Typography variant="h5">Alex Campbell</Typography>
                <Typography variant="subtitle2" className="m-t-30">
                  GONOWFLY
                </Typography>
              </div>

              <a
                href=""
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
              >
                <img src={HORIZONTAL_DOTS_CIRCULAR} />
              </a>
              <Menu
                id="basic-menu"
                // anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem>Edit</MenuItem>
                <MenuItem>Preview</MenuItem>
              </Menu>
            </div>
            <Grid container rowSpacing={3} columnSpacing={2}>
              <Grid item md={6}>
                <ul>
                  <li className="Dflex al-cnt">
                    <img src={MAIL_ICON_OUTLINE} alt="phone" />
                    <Typography variant="subtitle2" className="m-l-10">
                      sales@gonowfly.co.in
                    </Typography>
                  </li>
                  <li className="Dflex al-cnt">
                    <img
                      src={PHONE_ICON_OUTLINE}
                      alt="phone"
                      className="m-l-5"
                    />
                    <Typography variant="subtitle2" className="m-l-10">
                      63246236427
                    </Typography>
                  </li>
                </ul>
              </Grid>
              <Grid item md={6} style={{ textAlign: "right" }}>
                <Typography variant="subtitle2" className="m-b-10">
                  GSTIN : 08AAWCS3653C1Z1
                </Typography>
                <Typography variant="subtitle2">
                  Address : Hospital Rd, Asind Rajasthan 311301
                </Typography>
              </Grid>
            </Grid>
          </div>

          <div className="invoice-detail-card m-b-20">
            <div className="Dflex al-cnt sp-bt m-b-10 wrap">
          <Typography variant="subtitle2" className="m-b-10">
                Collection Activity :
                <span className="bold">#GNF-/21-22/012</span>
              </Typography>
              <Typography variant="h5" className="m-b-10">Invoice Actions Dropdown</Typography>
            </div>
            <div className="stockContainer Dflex al-cnt">
              <StockStatus
                text="Current Due"
                stvalue={stvalue}
                classname="flex-wrap due normal-info"
              />
              <StockStatus
                text="Total Amount"
                stvalue={stvalue}
                classname="flex-wrap paid normal-info"
              />
              <StockStatus
                text="Date Sent"
                stvalue={stvalue}
                classname="flex-wrap gray normal-info"
              />
              <StockStatus
                text="Days Overdue"
                stvalue={stvalue}
                classname="flex-wrap gray normal-info"
              />
            </div>
          </div>

          <div className="invoice-detail-card">
            <Grid container rowSpacing={3} columnSpacing={2}>
              <Grid item xs={12} md={6} lg={3}>
                <Typography variant="subtitle2" className="color-label">
                  Invoice Date
                </Typography>
                <Typography variant="subtitle2" className="color-purple bold">
                  15-09-2021
                </Typography>
              </Grid>
              <Grid item xs={12} md={6} lg={3}>
                <Typography variant="subtitle2" className="color-label">
                  Invoice Date
                </Typography>
                <Typography variant="subtitle2" className="color-purple bold">
                  15-09-2021
                </Typography>
              </Grid>
              <Grid item xs={12} md={6} lg={3}>
                <Typography variant="subtitle2" className="color-label">
                  Invoice Date
                </Typography>
                <Typography variant="subtitle2" className="color-purple bold">
                  15-09-2021
                </Typography>
              </Grid>
              <Grid item xs={12} md={6} lg={3}>
                <Typography variant="subtitle2" className="color-label">
                  Invoice Date
                </Typography>
                <Typography variant="subtitle2" className="color-purple bold">
                  15-09-2021
                </Typography>
              </Grid>
            </Grid>
            <hr className="m-t-20 m-b-20" />
            <Grid container rowSpacing={3} columnSpacing={2}>
              <Grid item xs={12} md={6} lg={4}>
                <Typography variant="subtitle2" className="color-label">
                  Bill To
                </Typography>
                <Typography variant="subtitle2" className="color-purple bold">
                  Madison Crawford
                </Typography>
                <Typography variant="subtitle2" className="color-label">
                  Company Name,
                </Typography>
                <Typography variant="subtitle2" className="color-label">
                  8237438734,
                </Typography>
                <Typography variant="subtitle2" className="color-label">
                  Address Line 1,
                </Typography>
                <Typography variant="subtitle2" className="color-label">
                  Address Line 2,
                </Typography>
                <Typography variant="subtitle2" className="color-label">
                  Zip code City - Country
                </Typography>
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <Typography variant="subtitle2" className="color-label">
                  Ship To
                </Typography>
                <Typography variant="subtitle2" className="color-purple bold">
                  Madison Crawford
                </Typography>
                <Typography variant="subtitle2" className="color-label">
                  Company Name,
                </Typography>
                <Typography variant="subtitle2" className="color-label">
                  8237438734,
                </Typography>
                <Typography variant="subtitle2" className="color-label">
                  Address Line 1,
                </Typography>
                <Typography variant="subtitle2" className="color-label">
                  Address Line 2,
                </Typography>
                <Typography variant="subtitle2" className="color-label">
                  Zip code City - Country
                </Typography>
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <Typography variant="subtitle2" className="color-label">
                  Place of Supply
                </Typography>
                <Typography variant="subtitle2" className="color-purple bold">
                  Gujrat
                </Typography>
              </Grid>
            </Grid>
            <hr className="m-t-20 m-b-20" />

            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography
                  className="color-cell-head bold"
                  variant="subtitle1"
                >
                  Show Status History
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Product</TableCell>
                      <TableCell>Item Details</TableCell>
                      <TableCell>Rate</TableCell>
                      <TableCell>Quantity</TableCell>
                      <TableCell>Disc (%)</TableCell>
                      <TableCell>Price</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>Product1</TableCell>
                      <TableCell>Women Solid Bag</TableCell>
                      <TableCell>$99.00</TableCell>
                      <TableCell>1 QTY</TableCell>
                      <TableCell>$99.00</TableCell>
                      <TableCell>$99.00</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>


                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Subtotal</TableCell>
                      <TableCell>Discount</TableCell>
                      <TableCell>IGST @ 3%</TableCell>
                      <TableCell>CESS%</TableCell>
                      <TableCell>Total</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>₹99.00</TableCell>
                      <TableCell>₹99.00</TableCell>
                      <TableCell>0.99</TableCell>
                      <TableCell>0.99</TableCell>
                      <TableCell>$199.00</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </AccordionDetails>
            </Accordion>

            <hr className="m-t-20 m-b-20" />
            <Typography className="m-b-20 color-purple bold" variant="body2">
              Note & Terms
            </Typography>
            <Typography variant="subtitle2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
              ac elit a sapien convallis semper sit amet quis sem. Pellentesque
              vestibulum lectus eu est vehicula, eleifend dapibus nisl
              venenatis.
            </Typography>
            <div className="Dflex al-cnt js-cnt m-t-20">
              <img src={LOGOBLUE} alt="logo" />
            </div>
          </div>
        </div>
      </InvoiceDetailDrawer> */}
    </>
  );
}

export default Index;
