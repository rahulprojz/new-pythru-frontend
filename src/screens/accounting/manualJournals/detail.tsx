import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import "./manualJournal.scss";
import { Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { getFormtedDate } from "../../../utils";

function index(props: any) {
  const { dialogOpen, setOpenDetail, rowDetails } = props;

  const handleClose = () => {
    setOpenDetail(false);
  };

  return (
    <>
      <Dialog
        open={dialogOpen}
        fullWidth={true}
        maxWidth="md"
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        className="preview-transaction-dialog-cover"
      >
        <Button
          onClick={handleClose}
          autoFocus
          variant="contained"
          className="close"
          color="error"
        >
          <CloseIcon />
        </Button>
        <DialogTitle style={{ borderBottom: "1px solid #e5e5e5" }}>
          <Typography
            variant="subtitle1"
            className="color-purple bold center"
            component="span"
          >
            Preview Transaction
          </Typography>
        </DialogTitle>
        <div className="dialog-cover">
          {rowDetails?.transactionDate && (
            <DialogContent>
              <div className="Dflex al-tp sp-bt m-b-10 m-t-20">
                <Typography variant="body2" className="bold">
                  Description:
                </Typography>
                <Typography variant="subtitle1" className="color-label p-l-5">
                  {rowDetails.description}
                </Typography>
              </div>
              <div className="Dflex al-tp sp-bt m-b-20">
                <Typography variant="body2" className="bold">
                  Date:
                </Typography>
                <Typography variant="subtitle1" className="color-label p-l-5">
                  {getFormtedDate(rowDetails.transactionDate, "DD-MM-YYYY")}
                </Typography>
              </div>
              <div className="preview-table">
                <table>
                  <tr>
                    <th>Account</th>
                    <th>Credit</th>
                    <th>Debit</th>
                  </tr>
                  <tbody>
                    {rowDetails &&
                      rowDetails.creditAccount.map((row: any, i: number) => {
                        return (
                          <tr key={i}>
                            <td>
                              {row.parentCategoryName +
                                " - " +
                                row.categoryName}
                            </td>
                            <td> {row.amount}</td>
                            <td> 0.00</td>
                          </tr>
                        );
                      })}
                    {rowDetails &&
                      rowDetails.debitAccount.map((row: any, i: number) => {
                        return (
                          <tr key={i}>
                            <td>
                              {row.parentCategoryName +
                                " - " +
                                row.categoryName}
                            </td>
                            <td> 0.00</td>
                            <td> {row.amount}</td>
                          </tr>
                        );
                      })}
                    <tr>
                      <td>Total</td>
                      <td>₹{rowDetails.amount}</td>
                      <td>₹{rowDetails.amount}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </DialogContent>
          )}
        </div>
      </Dialog>
    </>
  );
}

export default index;
