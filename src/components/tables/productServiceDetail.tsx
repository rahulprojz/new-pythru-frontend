import React from "react";
import { useDispatch } from "react-redux";
import Grid from "@mui/material/Grid";
import { Box, Button, TextField } from "@mui/material";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

import { profileIcon, taxability } from "../../constants";
import AddProductDrawer from "../drawer/index";
import NormalButton from "../buttons/normalButton";
import { updateProductAndServices } from "../../screens/productandServices/productServiceSlice";
import {
  addDefaultSrc,
  convertIntegerToDecimal,
} from "../../utils/Common.Function";
import { useSelector } from "react-redux";

interface detailProp {
  productServiceDetail: any;
  productDetailsState: any;
  setproductDetailsState: any;
  setState: any;
}

export default function Detail(props: detailProp) {
  const dispatch: any = useDispatch();
  const {
    productServiceDetail,
    productDetailsState,
    setproductDetailsState,
    setState,
  } = props;

  const openEdit = () => {
    setproductDetailsState(false);
    // dispatch(
    //   updateProductAndServices({
    //     editProductData: true,
    //   })
    // );
    setState(true);
  };
  const { type } = useSelector((state: any) => state.productServicesSlice);
  const { permissions } = useSelector((state: any) => state.commonSlice);
  return (
    <>
      <AddProductDrawer
        state={productDetailsState}
        setState={setproductDetailsState}
        isProductDetail
      >
        <h3 className="hd">Overview</h3>
        {(permissions && permissions["productAndServices"].edit) ||
        !permissions ? (
          <NormalButton
            buttonText="Edit"
            className="btn-purple detailsEdit"
            onPress={openEdit}
          />
        ) : (
          <></>
        )}
        <Grid
          container
          rowSpacing={3}
          columnSpacing={2}
          className="details_wrapper"
        >
          <Grid item xs={12} sm={3}>
            <figure className="pp_img">
              <img
                onError={(e) => addDefaultSrc(e, profileIcon)}
                src={
                  productServiceDetail.image
                    ? productServiceDetail.image
                    : profileIcon
                }
                alt="profile-pic"
              />
            </figure>
          </Grid>
          <Grid item xs={12} sm={9}>
            <Grid container rowSpacing={3} columnSpacing={2}>
              <Grid item xs={6}>
                <label>Name</label>
                <Typography variant="body2" gutterBottom>
                  {productServiceDetail?.name || "N/A"}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <label>Category</label>
                <Typography variant="body2" gutterBottom>
                  {productServiceDetail?.productCategoryId?.categoryName ||
                    "N/A"}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <label>SKU Number</label>
                <Typography variant="body2" gutterBottom>
                  {productServiceDetail?.skuNumber || "N/A"}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <label>Unit</label>
                <Typography variant="body2" gutterBottom>
                  {productServiceDetail?.salesUnitId || "N/A"}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <label>Purchase Price/Unit</label>
            <Typography variant="body2" gutterBottom>
              {convertIntegerToDecimal(productServiceDetail?.purchasePrice)}
              {/* ₹{productServiceDetail?.purchasePrice || "N/A"} */}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Box>
              <label>Sale Price/Unit</label>
              <Typography variant="body2" gutterBottom>
                {convertIntegerToDecimal(productServiceDetail?.salePrice)}
                {/* ₹{productServiceDetail?.salePrice || "N/A"} */}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <div className="border-card">
              <Typography className="m-b-20 semi-bold" variant="body2">
                GST
              </Typography>
              <Grid container rowSpacing={3} columnSpacing={2}>
                <Grid item xs={6}>
                  <label>{type === "1" ? "HSN Code" : "SAC Code"}</label>
                  <Typography variant="body2" gutterBottom>
                    {productServiceDetail?.gst?.hsnSacCode || "N/A"}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <label>Taxability of Item</label>
                  <Typography variant="body2" gutterBottom>
                    {productServiceDetail?.gst?.itemTaxability
                      ? taxability[
                          productServiceDetail?.gst?.itemTaxability - 1
                        ].title
                      : "N/A"}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <label>GST Rate</label>
                  <Typography variant="body2" gutterBottom>
                    {productServiceDetail?.gst?.gstRate || "N/A"}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <label>Cess%</label>
                  <Typography variant="body2" gutterBottom>
                    {productServiceDetail?.gst?.cess || "N/A"}
                  </Typography>
                </Grid>
              </Grid>
            </div>
          </Grid>
          {type === "1" ? (
            <Grid item xs={12}>
              <div className="border-card">
                <Typography className="m-b-20 semi-bold" variant="body2">
                  Track this item in inventory
                </Typography>
                <Grid container rowSpacing={3} columnSpacing={2}>
                  <Grid item xs={6}>
                    <label>Opening stock</label>
                    <Typography variant="body2" gutterBottom>
                      {productServiceDetail?.trackInventory
                        ? productServiceDetail?.inventory?.stockLeft || "N/A"
                        : "N/A"}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <label>Low stock Alert</label>
                    <Typography variant="body2" gutterBottom>
                      {productServiceDetail?.trackInventory
                        ? productServiceDetail?.inventory?.lowStockAlert ||
                          "N/A"
                        : "N/A"}
                    </Typography>
                  </Grid>
                </Grid>
              </div>
            </Grid>
          ) : (
            <React.Fragment></React.Fragment>
          )}
          {/* <Grid item xs={12}>
            <Paper variant='outlined'>
              <Grid container rowSpacing={3} columnSpacing={2}>
                <Grid item xs={6}>
                  <label>Income Category</label>
                  <Typography variant='h5' gutterBottom>
                    {productServiceDetail?.incomeCategory?.name || "N/A"}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <label>Expense Category</label>
                  <Typography variant='h5' gutterBottom>
                    {productServiceDetail?.expenseCategory?.name || "N/A"}
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          </Grid> */}
          <Grid item xs={12}>
            <label>Description</label>
            <Typography variant="body2" gutterBottom>
              {productServiceDetail?.description || "N/A"}
            </Typography>
          </Grid>
        </Grid>
      </AddProductDrawer>
    </>
  );
}
