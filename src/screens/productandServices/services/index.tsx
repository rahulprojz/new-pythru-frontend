import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import moment from "moment";
import AddServices from "./addServices";
import Grid from "@mui/material/Grid";
import FormControlLabel from "@mui/material/FormControlLabel";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import { elementFromArray } from "../../../utils//Common.Function";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Checkbox,
  FormGroup,
  Slider,
} from "@mui/material";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import AddProductServicesDrawer from "../../../components/drawer/productServicesDrawer";
import AddProductDrawer from "../../../components/drawer";
import ServiceTable from "../../../components/tables/serviceTable";
import Breadcrumbs from "../../../components/breadcrumb";
import NormalButton from "../../../components/buttons/normalButton";
import UploadImage from "../../../components/uploadImage";
import {
  getProductAndServicesListing,
  getProductAndServicesCategory,
  getPresignedurl,
  // getHsnCodeList,
  // getSalesUnitList,
  getListManagement,
  addProductServices,
  getSalesPriceValues,
  checkDetailExist,
  getCOACategory,
  getProductServicedetail,
  updateProductServices,
} from "../action";
// import { elementFromArray } from "../../../utils//Common.Function";
import {
  updateProductAndServices,
  resetProductServices,
} from "./../productServiceSlice";
import { Alert } from "../../../utils";

import {
  calenderIMG,
  LIST_TYPE,
  productServiceStatus,
} from "../../../constants";
import NormalSelect from "../../../components/select/normalSelect";

function valuetext(value: number) {
  return `${value}`;
}

function Index() {
  const Navigate = useNavigate();
  const dispatch: any = useDispatch();
  const [state, setState] = useState(false);
  const [filterState, setfilterState] = useState(false);
  const [category, setCategory]: any = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [status, setStatus] = useState("");
  const [openForAddEditProduct, setOpenForAddEditProduct] = useState(false);
  const [filterCount, setFilterCount] = useState<number>(0);
  const { permissions } = useSelector((state: any) => state.commonSlice);
  const { productServicesCategory, salesPriceMin, salesPriceMax } = useSelector(
    (state: any) => state.productServicesSlice
  );

  const [price, setPrice]: any = useState<number[]>(
    salesPriceMin && salesPriceMax ? [salesPriceMin, salesPriceMax] : [0, 1000]
  );
  const serviceCategory =
    productServicesCategory &&
    productServicesCategory.length > 0 &&
    productServicesCategory.filter((cat: any) => cat.type === 2);

  useEffect(() => {
    document.title = "Services | PyThru";
    dispatch(
      updateProductAndServices({
        type: "2",
        categories: "",
        fromDate: "",
        toDate: "",
        fromSalePrice: "",
        toSalePrice: "",
      })
    );
    if (permissions && !permissions["productAndServices"].view) {
      Alert(2, "Not permission to access this page");
      Navigate(-1);
      return;
    }
    dispatch(getProductAndServicesCategory());
    dispatch(getSalesPriceValues());
    dispatch(getProductAndServicesListing());
    dispatch(getProductAndServicesCategory());
    dispatch(getSalesPriceValues());
    // dispatch(getHsnCodeList());
    // dispatch(getSalesUnitList());

    dispatch(getListManagement(LIST_TYPE.HSN_SAC, 2));
    dispatch(getListManagement(LIST_TYPE.SALES_UNIT));
    dispatch(getListManagement(LIST_TYPE.GST_RATE));
    // dispatch(
    //   getCOACategory(1, (res: any) => {
    //     dispatch(
    //       updateProductAndServices({
    //         incomeCategory: res.data.responseData?.masterAccounts,
    //       })
    //     );
    //   })
    // );
    // dispatch(
    //   getCOACategory(2, (res: any) => {
    //     dispatch(
    //       updateProductAndServices({
    //         expenseCategory: res.data.responseData?.masterAccounts,
    //       })
    //     );
    //   })
    // );
    return () => {
      dispatch(
        updateProductAndServices({
          type: "1",
          limit: 10,
          page: 1,
          search: "",
          fromDate: "",
          fromSalePrice: "",
          toSalePrice: "",
          toDate: "",
          categories: "",
          sort_type: "-1",
          sort_key: "createdAt",
          productServiceList: [],
          productServicesCategory: [],
          queryFor: "",
          SearchFor: "",
          salesUnit: [],
          // hsnCodeList: [],
          // sacCodeList: [],
          gstRate: [],
          imageUrl: "",
          salesPriceMin: null,
          salesPriceMax: null,
          typeOfCOA: "",
          incomeCategory: [],
          expenseCategory: [],
          editProductData: "",
          productServiceDetail: {},
          lowStock: 0,
          outOfStock: 0,
          lowStockFilter: "",
          outOfStockFilter: "",
          status: "",
        })
      );
    };
  }, []);

  useEffect(() => {
    salesPriceMin && salesPriceMax
      ? setPrice([salesPriceMin, salesPriceMax])
      : setPrice([0, 1000]);
  }, [salesPriceMin, salesPriceMax]);

  const handleCategoryChange = (e: any) => {
    if (e.target.checked) {
      setCategory([...category, e.target.name]);
    } else {
      setCategory(elementFromArray(category, e.target.name));
    }
  };

  const handleAllCategoryChange = (e: any) => {
    if (e.target.checked) {
      if (serviceCategory && serviceCategory.length > 0) {
        let ids = serviceCategory.map(({ _id }: any) => _id);
        setCategory(ids);
      }
    } else {
      setCategory([]);
    }
  };

  const handlePriceChange = (event: Event, newValue: number | number[]) => {
    setPrice(newValue);
  };

  const handleStatusChange = (event: any) => {
    setStatus(event.target.value);
  };

  const handleClearFilter = () => {
    setFilterCount(0);
    setStatus("");
    setCategory([]);
    salesPriceMin && salesPriceMax
      ? setPrice([salesPriceMin, salesPriceMax])
      : setPrice([0, 1000]);

    setStartDate(null);
    setEndDate(null);
    dispatch(
      updateProductAndServices({
        categories: "",
        fromDate: "",
        toDate: "",
        status: "",
        fromSalePrice: "",
        toSalePrice: "",
      })
    );
    dispatch(getProductAndServicesListing());
    setfilterState(false);
  };

  const handleFilter = () => {
    setFilterCount(0);
    if (category.length > 0) {
      dispatch(
        updateProductAndServices({
          categories: category.toString(),
        })
      );
      setFilterCount((prevCount) => prevCount + 1);
    }

    if (startDate || endDate) {
      dispatch(
        updateProductAndServices({
          fromDate: startDate ? moment(startDate).format("YYYY-MM-DD") : "",
          toDate: endDate ? moment(endDate).format("YYYY-MM-DD") : "",
        })
      );
      setFilterCount((prevCount) => prevCount + 1);
    } else {
      setStartDate(null);
      setEndDate(null);
      dispatch(
        updateProductAndServices({
          fromDate: "",
          toDate: "",
        })
      );
    }

    if (status) {
      dispatch(
        updateProductAndServices({
          status: status,
        })
      );
      setFilterCount((prevCount) => prevCount + 1);
    }

    setFilterCount((prevCount) => prevCount + 1);

    dispatch(
      updateProductAndServices({
        fromSalePrice: price[0],
        toSalePrice: price[1],
      })
    );
    dispatch(getProductAndServicesListing());
    setfilterState(false);
  };

  const openFilter = () => {
    setfilterState(true);
  };

  const handleStartDate = (date: any) => {
    setStartDate(date);
    setEndDate(null);
  };

  return (
    <div>
      <Breadcrumbs />
      {(permissions && permissions["productAndServices"].add) ||
      !permissions ? (
        <NormalButton
          buttonText="+ New Service"
          className="btn-purple m-r-20"
          onPress={() => {
            dispatch(
              updateProductAndServices({
                editProductData: "",
                imageUrl: "",
                productServiceDetail: {},
              })
            );
            setState(true);
          }}
        />
      ) : (
        <></>
      )}
      <NormalButton
        buttonText="Bulk Upload Services"
        className="btn-purple"
        onPress={() => {
          Navigate(
            `/products-&-services/services/bulk-upload?category_id=2&template=4&type=2&fileNameConstant=19`
          );
        }}
      />
      <ServiceTable
        filterPress={() => setfilterState(true)}
        handleEdit={(row: any) => {
          dispatch(getProductServicedetail(row?._id, setState));
        }}
        setState={setState}
        count={filterCount}
      />
      <AddProductServicesDrawer
        state={state}
        setState={setOpenForAddEditProduct}
      >
        <AddServices
          setState={setState}
          openForAddEditProduct={openForAddEditProduct}
          setOpenForAddEditProduct={setOpenForAddEditProduct}
          count={filterCount}
          state={state}
        />
      </AddProductServicesDrawer>
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
                  control={
                    <Checkbox
                      name={"All"}
                      onChange={handleAllCategoryChange}
                      checked={
                        category && serviceCategory
                          ? category.length === serviceCategory.length
                          : false
                      }
                    />
                  }
                  label={"All"}
                  labelPlacement="start"
                />

                {serviceCategory &&
                  serviceCategory.length > 0 &&
                  serviceCategory.map((item: any) => (
                    <FormControlLabel
                      control={
                        <Checkbox
                          name={item?._id}
                          onChange={handleCategoryChange}
                          checked={category.includes(item?._id)}
                        />
                      }
                      label={item?.categoryName}
                      labelPlacement="start"
                      key={item?._id}
                    />
                  ))}
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
                  onChange={(date) => handleStartDate(date)}
                  selectsStart
                  placeholderText="From"
                  maxDate={new Date()}
                />
              </div>
              <div className="filterDate">
                <i>
                  <img src={calenderIMG} alt="" />
                </i>
                <DatePicker
                  dateFormat="dd-MM-yyyy"
                  selected={endDate}
                  onChange={(date: any) => setEndDate(date)}
                  selectsEnd
                  minDate={startDate || new Date()}
                  placeholderText="To"
                  maxDate={new Date()}
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
            Sale Price
          </AccordionSummary>
          <AccordionDetails>
            <Box sx={{ ml: 1, mr: 1 }}>
              <Slider
                getAriaLabel={() => "Minimum distance"}
                value={price}
                onChange={handlePriceChange}
                valueLabelDisplay="auto"
                getAriaValueText={valuetext}
                min={salesPriceMin || 0}
                max={salesPriceMax || 1000}
                className="filterSlider"
              />
            </Box>
            <Box sx={{ width: "100%" }} className="Dflex sp-bt sliderValue">
              <i>₹{price[0]}</i> <i>₹{price[1]}</i>
            </Box>
          </AccordionDetails>
        </Accordion>
        <Grid container rowSpacing={3} columnSpacing={2}>
          <Grid item xs={6}>
            <NormalButton
              className="btn-simple w-100 m-t-20"
              buttonText="Clear"
              onPress={handleClearFilter}
            />
          </Grid>
          <Grid item xs={6}>
            <NormalButton
              className="btn-purple w-100 m-t-20"
              buttonText="Apply"
              onPress={handleFilter}
            />
          </Grid>
        </Grid>
      </AddProductDrawer>
    </div>
  );
}

export default Index;
