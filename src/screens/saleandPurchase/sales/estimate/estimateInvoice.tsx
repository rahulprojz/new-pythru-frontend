import React from "react";
import Container from "../../../../components/Hoc/container";
import Grid from "@mui/material/Grid";
import {
  PHONE_ICON_OUTLINE,
  MAIL_ICON_OUTLINE,
  LOGOBLUE,
  HORIZONTAL_DOTS_CIRCULAR,
} from "../../../../constants";
import './estimateInvoice.scss';
import Typography from "@mui/material/Typography";
import NormalButton from "../../../../components/buttons/normalButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import { TableCell, TableHead, TableRow } from "@mui/material";

const EstimateInvoice = (data: any) => {
  return (
    <>
      <div className="page-estimate-invoice">
        <div className="top-info">
          <Grid container rowSpacing={3} columnSpacing={2}>
            <Grid item sm={12} md={6} lg={4}>
              <img src={LOGOBLUE} alt="logo" />
            </Grid>
            <Grid item sm={12} md={6} lg={4}>
              <Typography variant="h4" className="color-purple">
                ESTIMATE
              </Typography>
            </Grid>
            <Grid item sm={12} md={6} lg={4}>
              <NormalButton
                className="btn-purple"
                buttonText="PRINT"
              />
              <NormalButton
                className="btn-purple m-l-20"
                buttonText="DOWNLOAD"
              />
            </Grid>
          </Grid>
        </div>
        <div className="bill-info">
          <Grid container rowSpacing={3} columnSpacing={2}>
            <Grid item sm={12} md={6} lg={4}>
              <Typography variant="h5" className="color-purple m-b-20">
                Bill From
              </Typography>
              <Typography variant="body2">John Doe</Typography>
              <Typography variant="body2">3274287342</Typography>
              <Typography variant="body2">Address Line 1</Typography>
              <Typography variant="body2">Address Line 2</Typography>
              <Typography variant="body2">Zip Code</Typography>
              <Typography variant="body2">City-Country</Typography>
            </Grid>
            <Grid item sm={12} md={6} lg={4}>
              <Typography variant="h5" className="color-purple m-b-20">
                Ship To
              </Typography>
              <Typography variant="body2">John Doe</Typography>
              <Typography variant="body2">3274287342</Typography>
              <Typography variant="body2">Address Line 1</Typography>
              <Typography variant="body2">Address Line 2</Typography>
              <Typography variant="body2">Zip Code</Typography>
              <Typography variant="body2">City-Country</Typography>
            </Grid>
            <Grid item sm={12} md={6} lg={4}>
              <Typography variant="h5" className="color-white m-b-20">
                .
              </Typography>
              <Typography variant="body2" className="m-b-10">
                Purchase Order Date : <span className="bold">Jan 24, 2022</span>
              </Typography>
              <Typography variant="body2" className="m-b-10">
                Due Date : <span className="bold">Jan 24, 2022</span>
              </Typography>
              <Typography variant="body2" className="m-b-10">
                Ref ID : <span className="bold">35151</span>
              </Typography>
              <Typography variant="body2" className="m-b-10">
                Purchase Order No :<span className="bold">PO/21-22/001</span>
              </Typography>
              <Typography variant="body2" className="m-b-10">
                Place of Supply :<span className="bold">Haryana</span>
              </Typography>
            </Grid>
          </Grid>
        </div>
        <div className="prod-info">
          <Typography variant="h5" className="color-purple m-b-20">
            Items
          </Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Product/Service</TableCell>
                <TableCell>Items</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Rate</TableCell>
                <TableCell>Discount%</TableCell>
                <TableCell>Amount</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>Product</TableCell>
                <TableCell>Dell Laptop</TableCell>
                <TableCell>1</TableCell>
                <TableCell>₹110,000.00</TableCell>
                <TableCell>3%</TableCell>
                <TableCell>₹110,000.00</TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <ul>
            <li>
              <Typography variant="subtitle2">Sub Total :</Typography>
              <Typography variant="subtitle2">₹110,000.00</Typography>
            </li>
            <li>
              <Typography variant="subtitle2">Discount :</Typography>
              <Typography variant="subtitle2">₹110,000.00</Typography>
            </li>
            <li>
              <Typography variant="subtitle2">IGST @ 7.50% :</Typography>
              <Typography variant="subtitle2">₹110,000.00</Typography>
            </li>
            <li>
              <Typography variant="subtitle2">Total :</Typography>
              <Typography variant="subtitle2">₹110,000.00</Typography>
            </li>
          </ul>

          <Typography className="m-b-10 color-purple bold" variant="body1">
            Purchase Order Description
          </Typography>
          <Typography variant="subtitle2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ac
            elit a sapien convallis semper sit amet quis sem. Pellentesque
            vestibulum lectus eu est vehicula, eleifend dapibus nisl venenatis.
          </Typography>
        </div>
      </div>
    </>
  );
};

export default EstimateInvoice;
