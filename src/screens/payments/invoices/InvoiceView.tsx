import React from "react";
import Container from "../../../components/Hoc/container";
import Grid from "@mui/material/Grid";
import {
  PHONE_ICON_OUTLINE,
  MAIL_ICON_OUTLINE,
  LOGOBLUE,
  HORIZONTAL_DOTS_CIRCULAR,
} from "../../../constants";
import Typography from "@mui/material/Typography";
import NormalButton from "../../../components/buttons/normalButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
// import "./invoices.scss";
import { TableCell, TableHead, TableRow } from "@mui/material";

const InvoiceView = (data: any) => {
  return (
    <>
      <div className="page-invoice-view">
        <div className="Dflex al-tp sp-bt m-b-20">
          <Typography variant="h5">Invoice</Typography>
          <img src={LOGOBLUE} alt="logo" />
        </div>
        <Grid container rowSpacing={3} columnSpacing={2}>
          <Grid item md={9} lg={9}>
            <Typography variant="subtitle1" className="bold m-b-5">
              Invoice To
            </Typography>
            <Typography variant="subtitle1" className="color-label m-b-30">
              Customer Name 9087484288 Address line 1 Address line 2 Zip code
              City - Country
            </Typography>

            <Typography variant="subtitle1" className="bold m-b-5">
              Invoice From
            </Typography>
            <Typography variant="subtitle1" className="color-label">
              Customer Name 9087484288 Address line 1 Address line 2 Zip code
              City - Country
            </Typography>
          </Grid>
          <Grid item md={3} lg={3}>
            <NormalButton
              className="btn-purple m-b-20"
              buttonText="DOWNLOAD"
            />
            <NormalButton
              className="btn-purple "
              buttonText="PRINT"
            />
          </Grid>
        </Grid>
        <hr className="m-t-30 m-b-30" />
        <Grid container rowSpacing={3} columnSpacing={2}>
          <Grid item md={9} lg={9}>
            <Typography variant="body2" className="m-b-5">
              Date: <span className="bold">Jan 24, 2022, 15:33</span>
            </Typography>
            <Typography variant="body2">
              Due Date: <span className="bold">Jan 24, 2022, 15:33</span>
            </Typography>
          </Grid>
          <Grid item md={3} lg={3}>
            <Typography variant="body2" className="m-b-5">
              Reference: <span className="bold">#INV45</span>
            </Typography>
            <Typography variant="body2">
              Number: <span className="bold">1</span>
            </Typography>
          </Grid>
        </Grid>
        <hr className="m-t-30 m-b-20" />
        <Typography variant="h6" className="bold m-b-20">
          Items
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Items</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>Dell Laptop</TableCell>
              <TableCell>1</TableCell>
              <TableCell>₹110,000.00</TableCell>
              <TableCell>₹110,000.00</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Dell Laptop</TableCell>
              <TableCell>1</TableCell>
              <TableCell>₹110,000.00</TableCell>
              <TableCell>₹110,000.00</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Dell Laptop</TableCell>
              <TableCell>1</TableCell>
              <TableCell>₹110,000.00</TableCell>
              <TableCell>₹110,000.00</TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <hr className="m-t-20 m-b-20" />
        <ul>
          <li>
            <Typography variant="body2">Sub Total :</Typography>
            <Typography variant="body2" className="bold">
              ₹110,000.00
            </Typography>
          </li>
          <li>
            <Typography variant="body2">Discount :</Typography>
            <Typography variant="body2">0</Typography>
          </li>
          <li>
            <Typography variant="body2">IGST @ 3.00% :</Typography>
            <Typography variant="body2">₹3,300.00</Typography>
          </li>
          <li>
            <Typography variant="body2">IGST @ 7.50% :</Typography>
            <Typography variant="body2">₹0.00</Typography>
          </li>
          <li>
            <Typography variant="body2">TOTAL :</Typography>
            <Typography variant="body2">₹143,300.00</Typography>
          </li>
        </ul>
        <Typography className="m-b-10 color-purple bold" variant="body1">
          Note & Terms
        </Typography>
        <Typography variant="subtitle2">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ac
          elit a sapien convallis semper sit amet quis sem. Pellentesque
          vestibulum lectus eu est vehicula, eleifend dapibus nisl venenatis.
        </Typography>
        <div className="Dflex al-cnt js-cnt m-t-20">
          <img src={LOGOBLUE} alt="logo" />
        </div>
      </div>
    </>
  );
};

export default InvoiceView;
