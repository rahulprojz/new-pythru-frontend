import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";
import Breadcrumbs from "../../../components/breadcrumb";
import "../trailAndgeneral/general.scss";

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
        <div className="table-cover">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Transaction Type</th>
                <th>No</th>
                <th>Product/Service</th>
                <th>Qty</th>
                <th>Sales Price</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={7}>
                  <Accordion>
                    <AccordionSummary
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <div className="Dflex sp-bt al-cnt">
                        <ArrowDropDownOutlinedIcon />
                        <Typography variant="subtitle1" className="bold">
                          Aryan
                        </Typography>
                      </div>
                    </AccordionSummary>
                    <AccordionDetails>
                      <div className="table-cover nested">
                        <table>
                          <tr>
                            <td>
                              <Typography variant="subtitle2">
                                17/11/2021
                              </Typography>
                              <Typography variant="subtitle1" className="bold">
                                Total for Aryan
                              </Typography>
                            </td>
                            <td>
                              <Typography variant="subtitle2">
                                Invoice
                              </Typography>
                            </td>
                            <td>
                              <Typography variant="subtitle2">1</Typography>
                            </td>
                            <td>
                              <Typography variant="subtitle2">
                                Services
                              </Typography>
                            </td>
                            <td>1.00</td>
                            <td>
                              <Typography
                                variant="subtitle2"
                                className="color-red"
                              >
                                -₹18,000.00
                              </Typography>
                              <Typography variant="subtitle1" className="bold">
                                -₹18,000.00
                              </Typography>
                            </td>
                            <td>
                              <Typography variant="subtitle2">
                                ₹58,345.10
                              </Typography>
                            </td>
                          </tr>
                        </table>
                      </div>
                    </AccordionDetails>
                  </Accordion>
                </td>
              </tr>
              <tr>
                <td colSpan={7}>
                  <Accordion>
                    <AccordionSummary
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <div className="Dflex sp-bt al-cnt">
                        <ArrowDropDownOutlinedIcon />
                        <Typography variant="subtitle1" className="bold">
                          Avinash
                        </Typography>
                      </div>
                    </AccordionSummary>
                    <AccordionDetails>
                      <div className="table-cover nested">
                        <table>
                          <tr>
                            <td>
                              <Typography variant="subtitle2">
                                17/11/2021
                              </Typography>
                              <Typography variant="subtitle1" className="bold">
                                Total for Avinash
                              </Typography>
                            </td>
                            <td>
                              <Typography variant="subtitle2">
                                Invoice
                              </Typography>
                            </td>
                            <td>
                              <Typography variant="subtitle2">1</Typography>
                            </td>
                            <td>
                              <Typography variant="subtitle2">
                                Services
                              </Typography>
                            </td>
                            <td>1.00</td>
                            <td>
                              <Typography
                                variant="subtitle2"
                                className="color-red"
                              >
                                -₹18,000.00
                              </Typography>
                              <Typography variant="subtitle1" className="bold">
                                -₹18,000.00
                              </Typography>
                            </td>
                            <td>
                              <Typography variant="subtitle2">
                                ₹58,345.10
                              </Typography>
                            </td>
                          </tr>
                        </table>
                      </div>
                    </AccordionDetails>
                  </Accordion>
                </td>
              </tr>
              <tr>
                <td colSpan={7}>
                  <Accordion>
                    <AccordionSummary
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <div className="Dflex sp-bt al-cnt">
                        <ArrowDropDownOutlinedIcon />
                        <Typography variant="subtitle1" className="bold">
                          Firoz
                        </Typography>
                      </div>
                    </AccordionSummary>
                    <AccordionDetails>
                      <div className="table-cover nested">
                        <table>
                          <tr>
                            <td>
                              <Typography variant="subtitle2">
                                17/11/2021
                              </Typography>
                              <Typography variant="subtitle1" className="bold">
                                Total for Firoz
                              </Typography>
                            </td>
                            <td>
                              <Typography variant="subtitle2">
                                Invoice
                              </Typography>
                            </td>
                            <td>
                              <Typography variant="subtitle2">1</Typography>
                            </td>
                            <td>
                              <Typography variant="subtitle2">
                                Services
                              </Typography>
                            </td>
                            <td>1.00</td>
                            <td>
                              <Typography
                                variant="subtitle2"
                                className="color-red"
                              >
                                -₹18,000.00
                              </Typography>
                              <Typography variant="subtitle1" className="bold">
                                -₹18,000.00
                              </Typography>
                            </td>
                            <td>
                              <Typography variant="subtitle2">
                                ₹58,345.10
                              </Typography>
                            </td>
                          </tr>
                        </table>
                      </div>
                    </AccordionDetails>
                  </Accordion>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
export default Index;
