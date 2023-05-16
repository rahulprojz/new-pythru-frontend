import React from "react";
import Breadcrumbs from "../../../components/breadcrumb";
import Container from "../../../components/Hoc/container";
import Grid from "@mui/material/Grid";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Switch from "@mui/material/Switch";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import NormalInput from "../../../components/inputs/normalInput";
import StockStatus from "../../../components/stock";
//@ts-ignore
import { Formik, Form } from "formik";
import { ADD_CIRCULAR_ICON, MINUS_CIRCULAR_ICON } from "../../../constants";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import AddProductDrawer from "../../../components/drawer";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import { TableCell, TableHead, TableRow } from "@mui/material";
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
import NormalButton from "../../../components/buttons/normalButton";
import Link from "@material-ui/core/Link";

const AddInvoice = (data: any) => {
  return (
    <>
      <Breadcrumbs />
      <div className="add-edit-form">
        <Formik
          initialValues={{}}
          onSubmit={(values) => {
            // setFormData(values);
            // setOpenForAddEditProduct(true);
          }}
        >
          <Form onSubmit={(e) => {}}>
            <div className="bg-white m-b-30">
              <Grid container rowSpacing={3} columnSpacing={2}>
                <Grid item sm={12} md={6} lg={4}>
                  Select Customer Dropdown
                </Grid>
                <Grid item sm={12} md={6} lg={4}>
                  <NormalInput
                    name={"fromDate"}
                    isRequired
                    type={"date"}
                    focused={false}
                    sizeval="medium"
                    label="From Date"
                  />
                </Grid>
                <Grid item sm={12} md={6} lg={4}>
                  <NormalInput
                    name={"dueDate"}
                    isRequired
                    type={"date"}
                    focused={false}
                    sizeval="medium"
                    label="Due Date"
                  />
                </Grid>
                <Grid item sm={12} md={6} lg={4}>
                  <NormalInput
                    name={"invoiceNumber"}
                    isRequired
                    type={"number"}
                    focused={false}
                    sizeval="medium"
                    label="Invoice Number"
                  />
                </Grid>
                <Grid item sm={12} md={6} lg={4}>
                  <NormalInput
                    name={"refNumber"}
                    isRequired
                    type={"number"}
                    focused={false}
                    sizeval="medium"
                    label="Ref Number"
                  />
                </Grid>
                <Grid item sm={12} md={6} lg={4}>
                  Place of Supply Dropdown
                </Grid>
              </Grid>
              <hr className="m-t-20 m-b-20" />
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Products/Service</TableCell>
                    <TableCell>Items</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell>Discount</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell>Amount</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>Dropdown</TableCell>
                    <TableCell>Item Dropdown</TableCell>
                    <TableCell>
                      <NormalInput
                        name={"qty"}
                        isRequired
                        type={"number"}
                        focused={false}
                        sizeval="medium"
                      />
                    </TableCell>
                    <TableCell>
                      <NormalInput
                        name={"discount"}
                        isRequired
                        type={"number"}
                        focused={false}
                        sizeval="medium"
                      />
                    </TableCell>
                    <TableCell>
                      <NormalInput
                        name={"price"}
                        isRequired
                        type={"number"}
                        focused={false}
                        sizeval="medium"
                      />
                    </TableCell>
                    <TableCell>
                      <NormalInput
                        name={"amount"}
                        isRequired
                        type={"number"}
                        focused={false}
                        sizeval="medium"
                      />
                    </TableCell>
                    <TableCell>
                      <a className="pointer">
                        <img src={ADD_CIRCULAR_ICON} title="Add row" />
                        {/* <img src={MINUS_CIRCULAR_ICON} title="Remove row" /> */}
                      </a>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              <hr className="m-t-20 m-b-20" />
              <div className="Dflex sp-bt al-tp">
                <Link className="add-item-link">+ Add Item</Link>
                <div className="price-distribution">
                  <ul>
                    <li>
                      <Typography variant="subtitle1">Sub Total :</Typography>
                      <Typography variant="subtitle1">0</Typography>
                    </li>
                    <li>
                      <Typography variant="subtitle1">Discount :</Typography>
                      <Typography variant="subtitle1">0</Typography>
                    </li>
                    <li>
                      <Typography variant="subtitle1">Tax :</Typography>
                      <Typography variant="subtitle1">0</Typography>
                    </li>
                    <li>
                      <Typography variant="subtitle1">Total Price:</Typography>
                      <Typography variant="subtitle1">0</Typography>
                    </li>
                  </ul>
                </div>
              </div>
              <Grid container rowSpacing={3} columnSpacing={2}>
                <Grid item xs={12}>
                  <Typography className="m-b-10 m-t-20" variant="subtitle1">
                    Notes & terms
                  </Typography>
                  <TextField
                    // label="Notes & Terms"
                    name={"notesAndTerms"}
                    id="description"
                    className="textarea-cover"
                    multiline
                    rows={3}
                  />
                </Grid>
              </Grid>
            </div>
            <Stack direction="row" className="btn-group DFlex al-cnt">
              <NormalButton
                type="submit"
                variant="contained"
                buttonText="CANCEL"
                className="btn-simple"
                disabled={false}
              />
              <NormalButton
                type="submit"
                variant="contained"
                buttonText="SAVE"
                // disabled={true}
                className="btn-purple"
              />
              <NormalButton
                type="submit"
                variant="contained"
                buttonText="SAVE & SEND"
                // disabled={true}
                className="btn-purple"
              />
            </Stack>
          </Form>
        </Formik>
      </div>
    </>
  );
};

export default AddInvoice;
