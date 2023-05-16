import React from "react";
import moment from "moment";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import NormalButton from "../../../components/buttons/normalButton";
import { convertIntegerToDecimal } from "../../../utils";

interface detailProp {
  assetDetail: any;
  setOpenAssetDetail: React.Dispatch<React.SetStateAction<boolean>>;
  setState: React.Dispatch<React.SetStateAction<boolean>>;
}

const AssetDetail = (props: detailProp) => {
  const { assetDetail, setOpenAssetDetail, setState } = props;

  const openEdit = () => {
    setOpenAssetDetail(false);
    setState(true);
  };

  return (
    <>
      <h3 className="hd">Overview</h3>
      <NormalButton buttonText="Edit" className="btn-purple detailsEdit" onPress={openEdit} />
      <Grid
        container
        rowSpacing={3}
        columnSpacing={2}
        className="details_wrapper"
      >
        <Grid item xs={12} md={6}>
          <label>Asset Name</label>
          <Typography variant="body2" gutterBottom>
            {assetDetail?.name || "N/A"}
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <label>Purchased Date</label>
          <Typography variant="body2" gutterBottom>
            {assetDetail?.purchasedDate
              ? moment(assetDetail.purchasedDate).format("MMM D YYYY")
              : "N/A"}
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <label>Amount</label>
          <Typography variant="body2" gutterBottom>
            {convertIntegerToDecimal(assetDetail?.amount)}
            {/* {assetDetail?.amount ? `₹${assetDetail?.amount}` : "N/A"} */}
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <label>Supported Date</label>
          <Typography variant="body2" gutterBottom>
            {assetDetail?.supportedDate
              ? moment(assetDetail.supportedDate).format("MMM D YYYY")
              : "N/A"}
          </Typography>
        </Grid>
        <Grid item xs={12} md={12}>
          <label>Description</label>
          <Typography variant="h5">
            {assetDetail?.description || "N/A"}
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};

export default AssetDetail;
