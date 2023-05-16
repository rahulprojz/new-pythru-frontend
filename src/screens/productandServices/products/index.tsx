import React, { useEffect, useState } from "react";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import ProductTable from "../../../components/tables/productTabel";
import FormControlLabel from "@mui/material/FormControlLabel";
import MenuItem from "@mui/material/MenuItem";
import StockStatus from "../../../components/stock";
import AddProductServicesDrawer from "../../../components/drawer/productServicesDrawer";
import Paper from "@mui/material/Paper";
import AddProductDrawer from "../../../components/drawer";
import Breadcrumbs from "../../../components/breadcrumb";
import NormalButton from "../../../components/buttons/normalButton";
import AddProduct from "../products/addProduct";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Checkbox,
  FormGroup,
  Slider,
} from "@mui/material";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { updateProductAndServices } from "../productServiceSlice";

import {
  LOWSTOCK,
  OUTSTOCK,
  calenderIMG,
  productServiceStatus,
  LIST_TYPE,
} from "../../../constants";
import { useDispatch } from "react-redux";
import NormalSelect from "../../../components/select/normalSelect";
import {
  getProductAndServicesListing,
  getProductAndServicesCategory,
  getListManagement,
  checkDetailExist,
  getStockCount,
  getSalesPriceValues,
  getCOACategory,
  getProductServicedetail,
  updateProductServices,
} from "../action";

import { useSelector } from "react-redux";
import { Box } from "@mui/system";
import { Alert } from "../../../utils";
import { elementFromArray } from "../../../utils//Common.Function";

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
  // const [incomeCategory, setincomeCategory] = useState("");
  // const [expenseCategory, setexpenseCategory] = useState("");
  const [desCription, setdesCription] = useState("");
  const [open, setOpen] = React.useState(false);
  const [filterState, setfilterState] = React.useState(false);
  const [openForAddEditProduct, setOpenForAddEditProduct] = useState(false);
  const [category, setCategory]: any = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [status, setStatus] = useState("");
  const [filterCount, setFilterCount] = useState<number>(0);

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
    lowStock,
    outOfStock,
    lowStockFilter,
    outOfStockFilter,
  } = useSelector((state: any) => state.productServicesSlice);
  const productCategory =
    productServicesCategory &&
    productServicesCategory.length > 0 &&
    productServicesCategory.filter((cat: any) => cat.type === 1);

  const [price, setPrice]: any = useState<number[]>(
    salesPriceMin && salesPriceMax ? [salesPriceMin, salesPriceMax] : [0, 1000]
  );

  const initialValues = {
    productName: editProductData ? productServiceDetail?.name : "",
    itemCategory: editProductData
      ? productServiceDetail?.productCategoryId?._id
      : "",
    salesUnit: editProductData ? productServiceDetail?.salesUnitId : "",
    skuNumber: editProductData ? productServiceDetail?.skuNumber : "",
    purchasePrice: editProductData ? productServiceDetail?.purchasePrice : "",
    salePrice: editProductData ? productServiceDetail?.salePrice : "",
    cess: editProductData ? productServiceDetail?.gst?.cess : "",
    isGstApplicable: editProductData
      ? productServiceDetail?.isGstApplicable
        ? "yes"
        : "no"
      : "yes",
    hsnCode: editProductData ? productServiceDetail?.gst?.hsnSacCode : "",
    taxability: editProductData
      ? productServiceDetail?.gst?.itemTaxability
      : "",
    gstRate: editProductData ? productServiceDetail?.gst?.gstRate : "",
    incomeCategory: editProductData
      ? productServiceDetail?.incomeCategory?.id
      : "",
    expenseCategory: editProductData
      ? productServiceDetail?.expenseCategory?.id
      : "",
    description: editProductData ? productServiceDetail?.description : "",
    openingStock: editProductData
      ? productServiceDetail?.inventory?.openingStock
      : "",
    lowstockAlert: editProductData
      ? productServiceDetail?.inventory?.lowstockAlert
      : "",
    trackInventory: editProductData
      ? productServiceDetail?.trackInventory
      : true,
  };

  let stvalue = "0";
  useEffect(() => {
    document.title = "Products | PyThru";
    dispatch(
      updateProductAndServices({
        type: "1",
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
    dispatch(getProductAndServicesListing());
    dispatch(getProductAndServicesCategory());
    dispatch(getSalesPriceValues());
    // dispatch(getHsnCodeList());
    // dispatch(getSalesUnitList());

    dispatch(getListManagement(LIST_TYPE.HSN_SAC, 1));
    dispatch(getListManagement(LIST_TYPE.SALES_UNIT));
    dispatch(getListManagement(LIST_TYPE.GST_RATE));
    dispatch(getStockCount());
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
  const handleChangeProductName = (value: any) => {
    if (!value) {
      setProductError("Name is required");
      return;
    }
    if (!editProductData)
      dispatch(
        checkDetailExist("name", value, (res: any) => {
          if (res?.data?.responseCode === 200) setProductError("");
          else setProductError(res.responseMsg);
        })
      );
  };
  const handleChangeSku = (value: any) => {
    if (!editProductData)
      if (!value) {
        setSkuError("Sku is required");
        return;
      }
    dispatch(
      checkDetailExist("skuNmae", value, (res: any) => {
        if (res?.data?.responseCode === 200) setSkuError("");
        else setSkuError(res.responseMsg);
      })
    );
  };

  const handleCategoryChange = (e: any) => {
    if (e.target.checked) {
      setCategory([...category, e.target.name]);
    } else {
      setCategory(elementFromArray(category, e.target.name));
    }
  };

  const handleAllCategoryChange = (e: any) => {
    if (e.target.checked) {
      if (productCategory && productCategory.length > 0) {
        let ids = productCategory.map(({ _id }: any) => _id);
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

  const handleStockFilter = (type: any) => {
    if (type == 1) {
      dispatch(
        updateProductAndServices({
          lowStockFilter: lowStockFilter ? "" : type,
        })
      );
    } else if (type === 2) {
      dispatch(
        updateProductAndServices({
          outOfStockFilter: outOfStockFilter ? "" : type,
        })
      );
    }

    dispatch(getProductAndServicesListing());
  };

  const { permissions } = useSelector((state: any) => state.commonSlice);
  return (
    <>
      <Breadcrumbs />
      {(permissions && permissions["productAndServices"].add) ||
      !permissions ? (
        <NormalButton
          buttonText="+ New product"
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
        buttonText="Bulk Upload Products"
        className="btn-purple"
        onPress={() => {
          Navigate(
            `/products-&-services/products/bulk-upload?category_id=1&template=3&type=1&fileNameConstant=18`
          );
        }}
      />
      <div className="stockContainer Dflex al-cnt m-t-10">
        <StockStatus
          stockImg={LOWSTOCK}
          text="Low Stock"
          stvalue={lowStock}
          filter={lowStockFilter}
          handleStockFilter={() => handleStockFilter(1)}
        />
        <StockStatus
          type="outOfStock"
          filter={outOfStockFilter}
          stockImg={OUTSTOCK}
          text="Out of Stock"
          stvalue={outOfStock}
          handleStockFilter={() => handleStockFilter(2)}
        />
      </div>
      <ProductTable
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
        <AddProduct
          state={state}
          setState={setState}
          openForAddEditProduct={openForAddEditProduct}
          setOpenForAddEditProduct={setOpenForAddEditProduct}
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
                        category && productCategory
                          ? category.length === productCategory.length
                          : false
                      }
                    />
                  }
                  label={"All"}
                  labelPlacement="start"
                />

                {productCategory &&
                  productCategory.length > 0 &&
                  productCategory.map((item: any) => (
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
                  onChange={(date: any) => handleStartDate(date)}
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
    </>
  );
}

export default Index;
