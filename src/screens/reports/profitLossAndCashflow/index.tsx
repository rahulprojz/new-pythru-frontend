import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";
import Breadcrumbs from "../../../components/breadcrumb";
import "../general/general.scss";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
} from "@mui/material";
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";
import "react-datepicker/dist/react-datepicker.css";
import Typography from "@material-ui/core/Typography";

function Index() {
  const navigate = useNavigate();
  //const [state, setState] = React.useState(false);

  return (
    <>
      <Breadcrumbs />

      <div className="page-report">

      <Accordion className="profitLossAccordion">
        <AccordionSummary aria-controls="panel1a-content" id="panel1a-header">
          <div className="Dflex sp-bt al-cnt">
            <ArrowDropDownOutlinedIcon />
            <Typography variant="subtitle1" className="bold">
              Income
            </Typography>
          </div>
          <Typography variant="subtitle1" className="color-label bold">
            Credit
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <ul>
            <li>
              <Typography variant="subtitle2">Design Income</Typography>
              <Typography variant="subtitle2">₹61,02,299.85</Typography>
            </li>
            <li>
              <Typography variant="subtitle2">Net Income</Typography>
              <Typography variant="subtitle2" className="color-red">₹61,02,299.85</Typography>
            </li>
          </ul>
          <Accordion>
            <AccordionSummary
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <div className="Dflex sp-bt al-cnt">
                <ArrowDropDownOutlinedIcon />
                <Typography variant="subtitle1" className="bold">
                  Job Materials
                </Typography>
              </div>
            </AccordionSummary>
            <AccordionDetails>
              <ul>
                <li>
                  <Typography variant="subtitle2">Fountains and Garden Lighting</Typography>
                  <Typography variant="subtitle2">₹55,440.00</Typography>
                </li>
                <li>
                  <Typography variant="subtitle2">Fountains and Garden Lighting</Typography>
                  <Typography variant="subtitle2">₹55,440.00</Typography>
                </li>
              </ul>
            </AccordionDetails>
          </Accordion>
          <ul>
            <li>
              <Typography variant="subtitle2" className="bold">Total Landscaping Services</Typography>
              <Typography variant="subtitle2" className="bold">₹61,02,299.85</Typography>
            </li>
            <li>
              <Typography variant="subtitle2">Net Income</Typography>
              <Typography variant="subtitle2">₹61,02,299.85</Typography>
            </li>
            <li>
              <Typography variant="subtitle2">Net Income</Typography>
              <Typography variant="subtitle2">₹61,02,299.85</Typography>
            </li>
            <li>
              <Typography variant="subtitle2">Net Income</Typography>
              <Typography variant="subtitle2">₹61,02,299.85</Typography>
            </li>
          </ul>
        </AccordionDetails>
      </Accordion>
      </div>
    </>
  );
}
export default Index;
