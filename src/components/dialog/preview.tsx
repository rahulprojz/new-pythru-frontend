import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import Grid from "@mui/material/Grid";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import "./preview.scss";
import Typography from "@mui/material/Typography";
import { emailIMG, LOGOBLUE } from "../../constants";
import CloseIcon from "@mui/icons-material/Close";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Button from "@mui/material/Button";
import { getAmountToWords, getFormtedDate } from "../../utils";
import { useReactToPrint } from "react-to-print";

import { productServices } from "../../constants";
const Preview = (props: any) => {
  const {
    openModal,
    setState,
    data,
    calculateValues,
    label,
    calculateSubToatalValues,
    isSameState,
  } = props;
  const handleClose = () => {
    setState(false);
  };
  const { organizationDeatil } = useSelector(
    (state: any) => state.settingSlice
  );

  const [print, setPrint] = useState("none");

  const { state } = useSelector((state: any) => state.commonSlice);

  const componentRef: any = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <>
      <Dialog
        open={openModal}
        onClose={handleClose}
        maxWidth={"lg"}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className="preview-dialog-cover"
      >
        <DialogContent id="alert-dialog-description">
          <Button
            onClick={handleClose}
            autoFocus
            variant="contained"
            className="close"
            color="error"
          >
            <CloseIcon />
          </Button>

          <div className="preview-dialog">
            <div className="Dflex al-cnt sp-bt">
              <img
                style={{ width: "140px", maxWidth: "25vw" }}
                src={LOGOBLUE}
                alt="Image"
              />
              <div className="Dflex al-cnt fl-end">
                <Button
                  onClick={(e: any) => {
                    e.preventDefault;
                    setPrint("block");

                    handlePrint();
                  }}
                  autoFocus
                  variant="contained"
                  color="info"
                  className="btn btn-purple"
                >
                  Print
                </Button>

                <Typography variant="h4" className="color-purple m-l-20">
                  {label.state.documentText}
                </Typography>
              </div>
            </div>
            <hr className="m-t-20 m-b-20" />
            <Grid container rowSpacing={3} columnSpacing={2}>
              <Grid item xs={12} md={6} lg={7}>
                <Typography variant="h6" className="m-b-10">
                  {organizationDeatil?.companyName || "N/A"}
                </Typography>
                <Typography variant="subtitle2" className="bl m-b-5">
                  {organizationDeatil?.address?.addressLine1}{" "}
                  {organizationDeatil?.address?.addressLine2}
                </Typography>
                <Typography variant="subtitle2" className="bl m-b-5">
                  GSTIN : {organizationDeatil?.documentInfo?.gst || "N/A"}
                </Typography>
                <div className="Dflex bl al-cnt">
                  <img src={emailIMG} alt="email" style={{ maxWidth: "4vw" }} />
                  <Typography
                    component="p"
                    variant="subtitle2"
                    className="bl m-l-10"
                  >
                    {organizationDeatil?.email || "N/A"}
                  </Typography>
                </div>
              </Grid>
              <Grid item xs={12} md={6} lg={5} className="right">
                <Typography variant="subtitle1" className="m-b-10 bold bl">
                  {label.state.salesOrderNo}:{" "}
                  <span className="color-label lbl">
                    {data?.documentNumber}{" "}
                  </span>
                </Typography>
                <Typography variant="subtitle1" className="m-b-10 bold bl">
                  {label.state.salesOrderDate}:{" "}
                  <span className="color-label lbl">
                    {getFormtedDate(data?.fromDate, "DD/MM/YYYY")}
                  </span>
                </Typography>
                <Typography variant="subtitle1" className="bold bl">
                  {label.state.dueDate}:{" "}
                  <span className="color-label lbl ">
                    {getFormtedDate(data?.dueDate, "DD/MM/YYYY")}
                  </span>
                </Typography>
              </Grid>
            </Grid>
            <hr className="m-t-20 m-b-20" />
            <Grid container rowSpacing={3} columnSpacing={2} className="m-b-20">
              <Grid item xs={12} md={6} lg={4.5}>
                <Typography variant="body2" className="semi-bold bl m-b-15">
                  Bill {label?.state?.type === 1 ? "To" : "From"}
                </Typography>
                <Typography variant="subtitle1" className="bl">
                  {data.customerVendor?.displayName}{" "}
                </Typography>
                <Typography variant="subtitle1" className="color-label lbl">
                  {data?.billingAddress?.addressLine1 || "N/A"}
                  {", "}
                  {data?.billingAddress?.addressLine2}
                  {"  "}
                  {data.billingAddress?.townCity || "N/A"}
                  {", "}
                  {data?.billingAddress?.state || "N/A"}
                  {", "}
                  {data?.billingAddress?.zipCode || "N/A"}
                </Typography>
              </Grid>
              <Grid item xs={12} md={6} lg={4.5}>
                <Typography variant="body2" className="bold bl m-b-15">
                  Ship {label?.state?.type === 1 ? "To" : "From"}
                </Typography>
                <Typography variant="subtitle1" className="bl">
                  {data.customerVendor?.displayName}{" "}
                </Typography>
                <Typography variant="subtitle1" className="color-label lbl">
                  {data.shippingAddress?.addressLine1 || "N/A"}
                  {", "}
                  {data.shippingAddress?.addressLine2}{" "}
                  {data?.shippingAddress?.townCity || "N/A"}
                  {", "}
                  {data?.shippingAddress?.state || "N/A"}
                  {", "}
                  {data?.shippingAddress?.zipCode || "N/A"}
                </Typography>
              </Grid>
              <Grid item xs={12} md={6} lg={3}>
                <Typography variant="body2" className="semi-bold bl m-b-15">
                  Place of Supply:
                </Typography>
                <Typography variant="subtitle1" className="color-label lbl">
                  {data?.placeOfSupply || "N/A"}
                </Typography>
                <Typography
                  variant="body2"
                  className="bl semi-bold m-t-15 m-b-10"
                >
                  Ref ID:
                </Typography>
                <Typography variant="subtitle1" className="color-label lbl">
                  {data?.referenceNumber}
                </Typography>
              </Grid>
            </Grid>
            <Accordion className="priview_accordian">
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography
                  component="span"
                  className="color-cell-head bold"
                  variant="subtitle1"
                >
                  Show Product Detail
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <div className="table-cover">
                  <table className="history-table">
                    <thead>
                      <tr>
                        <th>Product</th>
                        <th>Item Name</th>
                        <th>Rate</th>
                        <th>Quantity</th>
                        <th>Discount</th>
                        <th>Amount</th>
                        <th>Tax</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.productDetails &&
                        data.productDetails.length > 0 &&
                        data.productDetails.map((item: any, index: any) => (
                          <tr key={index}>
                            <td>
                              {item.detailType == 1 ? "Product" : "Service"}
                            </td>
                            <td>{item.productName}</td>
                            <td>{`₹${item.rate}`}</td>
                            <td>
                              {item.quantity} {item?.productUnit || "QTY"}
                            </td>
                            <td>{item.discount}%</td>
                            <td>{`₹${item.amount}`}</td>
                            <td>
                              {" "}
                              <React.Fragment>
                                {isSameState ? (
                                  <>
                                    <Typography
                                      variant="subtitle2"
                                      className="nowrap"
                                    >
                                      CGST @ {item.iGstPercent / 2 || 0}% : ₹
                                      {(
                                        (item.amount * item?.iGstPercent || 0) /
                                        200
                                      )?.toFixed(2) || 0}
                                    </Typography>
                                    <Typography
                                      variant="subtitle2"
                                      className="nowrap"
                                    >
                                      SGST @ {item?.iGstPercent || 0 / 2}% : ₹
                                      {(
                                        (item?.amount * item?.iGstPercent ||
                                          0) / 200
                                      )?.toFixed(2) || 0}
                                    </Typography>
                                  </>
                                ) : (
                                  <>
                                    <Typography
                                      variant="subtitle2"
                                      className="nowrap"
                                    >
                                      IGST @ {item.iGstPercent || 0}% : ₹
                                      {(
                                        (item.amount * item?.iGstPercent || 0) /
                                        100
                                      )?.toFixed(2) || 0}
                                    </Typography>
                                  </>
                                )}
                                <Typography
                                  variant="subtitle2"
                                  className="nowrap"
                                >
                                  CESS @ {item?.cessPercent || 0}% : ₹
                                  {(
                                    (item?.amount * item?.cessPercent || 0) /
                                    100
                                  )?.toFixed(2)}
                                </Typography>
                              </React.Fragment>{" "}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </AccordionDetails>
            </Accordion>
            <hr className="m-t-20 m-b-20" />
            <Grid container spacing={2}>
              <Grid item xs={12} md={6} lg={7}>
                <Typography variant="subtitle2" className="Dflex al-tp m-b-10">
                  <span className="color-label white-space lbl">
                    Total Amount in Words :
                  </span>
                  <span className="bl amount-in-words">
                    {getAmountToWords(
                      calculateValues(data?.productDetails, "amount")
                    )}
                  </span>
                </Typography>
                <Typography
                  component="p"
                  variant="subtitle2"
                  className="Dflex al-tp"
                >
                  <span className="color-label white-space lbl">
                    {label.state.salesOrderDesc} :
                  </span>
                  <span className="bl amount-in-words">
                    {data?.description || "N/A"}
                  </span>
                </Typography>
              </Grid>
              <Grid item xs={12} md={6} lg={5}>
                <div style={{ background: "#F8F9FA", padding: "20px" }}>
                  <div className="Dflex al-cnt sp-bt">
                    <Typography
                      component="span"
                      variant="subtitle2"
                      className="bold bl"
                    >
                      Sub Total {": "}
                    </Typography>
                    <Typography
                      component="span"
                      variant="subtitle2"
                      className="bold bl"
                    >
                      ₹
                      {calculateSubToatalValues(data?.productDetails, "amount")}
                    </Typography>
                  </div>
                  <div className="Dflex al-cnt sp-bt m-t-20">
                    <Typography
                      component="span"
                      variant="subtitle2"
                      className="bold bl"
                    >
                      Tax
                    </Typography>

                    <Typography
                      component="span"
                      variant="subtitle2"
                      className="bold bl"
                    >
                      ₹
                      {(
                        +calculateValues(data?.productDetails, "amount") -
                        +calculateSubToatalValues(
                          data?.productDetails,
                          "amount"
                        )
                      )?.toFixed(2) ||
                        data?.tax?.toFixed(2) ||
                        "0.00"}
                    </Typography>
                  </div>
                  <div className="Dflex al-cnt sp-bt m-t-20">
                    <Typography
                      component="span"
                      variant="subtitle2"
                      className="bold bl"
                    >
                      Total{": "}
                    </Typography>
                    <Typography
                      component="span"
                      variant="subtitle2"
                      className="bold bl"
                      align="right"
                    >
                      ₹{calculateValues(data?.productDetails, "amount")}
                    </Typography>
                  </div>
                </div>
              </Grid>
            </Grid>
            <div className="Dflex al-cnt js-cnt fl-end m-t-50">
              <Typography
                component="span"
                variant="subtitle2"
                className="bl bold"
              >
                Powered By :
              </Typography>
              <img src={LOGOBLUE} alt="logo" style={{ width: "80px" }} />
            </div>
          </div>
        </DialogContent>
        <table
          ref={componentRef}
          style={{
            width: "100%",
            borderCollapse: "collapse",
            fontFamily: "Lato, sans-serif",
            backgroundColor: "#eeeeee",
          }}
        >
          <td style={{ backgroundColor: "#eeeeee", padding: "15px" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <td style={{ padding: "30px", backgroundColor: "white" }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <tr>
                    <td>
                      <table
                        style={{
                          width: "100%",
                          borderBottom: "1px solid #E5E5E5",
                        }}
                      >
                        <tr>
                          <td style={{ paddingBottom: "30px" }}>
                            <img
                              style={{ width: "140px" }}
                              src={LOGOBLUE}
                              alt="Logo"
                            />
                          </td>
                          <td
                            style={{
                              textAlign: "right",
                              paddingBottom: "30px",
                            }}
                          >
                            <h2
                              style={{
                                fontSize: "30px",
                                margin: "0",
                                color: "#5910EC",
                              }}
                            >
                              {label.state.documentText}
                            </h2>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <table
                        style={{
                          width: "100%",
                          borderBottom: "1px solid #E5E5E5",
                          //   width: "100%",
                        }}
                      >
                        <tr>
                          <td
                            style={{
                              padding: "30px 20px 20px 0",
                              width: "65%",
                            }}
                          >
                            <p
                              style={{
                                margin: "0 0 15px 0",
                                fontWeight: "700",
                                fontSize: "18px",
                              }}
                            >
                              {organizationDeatil?.companyName || "N/A"}
                            </p>
                            <p
                              style={{ margin: "0 0 15px 0", fontSize: "14px" }}
                            >
                              {organizationDeatil?.address?.addressLine1}{" "}
                              {organizationDeatil?.address?.addressLine2}
                            </p>
                            <p
                              style={{ margin: " 0 0 10px", fontSize: "14px" }}
                            >
                              GSTIN :{" "}
                              {organizationDeatil?.documentInfo?.gst || "N/A"}
                            </p>
                            <table style={{ width: "100%" }}>
                              <tr>
                                <td style={{ width: "30px" }}>
                                  <img src={emailIMG} alt="" />
                                </td>
                                <td
                                  style={{
                                    fontSize: "14px",
                                    verticalAlign: "middle",
                                  }}
                                >
                                  {organizationDeatil?.email || "N/A"}
                                </td>
                              </tr>
                            </table>
                          </td>
                          <td
                            style={{
                              padding: "30px 0 20px 20px",
                              width: "35%",
                              fontWeight: "700",
                              fontSize: "18px",
                              verticalAlign: "top",
                            }}
                          >
                            <p style={{ margin: "0 0 15px 0" }}>
                              {label.state.salesOrderNo}:{" "}
                              <span
                                style={{ fontSize: "16px", color: "#949494" }}
                              >
                                {data?.documentNumber}{" "}
                              </span>
                            </p>
                            <p style={{ margin: "0 0 15px 0" }}>
                              {label.state.salesOrderDate}:{" "}
                              <span
                                style={{ fontSize: "16px", color: "#949494" }}
                              >
                                {getFormtedDate(data?.fromDate, "DD/MM/YYYY")}
                              </span>
                            </p>
                            <p style={{ margin: "0 0 15px 0" }}>
                              {label.state.dueDate}:{" "}
                              <span
                                style={{ fontSize: "16px", color: "#949494" }}
                              >
                                {getFormtedDate(data?.dueDate, "DD/MM/YYYY")}
                              </span>
                            </p>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ paddingBottom: "20px" }}>
                      <table
                        style={{ width: "100%", borderCollapse: "collapse" }}
                      >
                        <tr>
                          <td
                            style={{
                              padding: "30px 20px 20px 0",
                              width: "35%",
                              fontWeight: "700",
                              fontSize: "18px",
                            }}
                          >
                            Bill {label?.state?.type === 1 ? "To" : "From"}
                          </td>
                          <td
                            style={{
                              padding: "30px 20px 20px 20px",
                              width: "35%",
                              fontWeight: "700",
                              fontSize: "18px",
                            }}
                          >
                            Ship To
                          </td>
                          <td
                            style={{
                              padding: "30px 0 20px 20px",
                              width: "30%",
                              fontWeight: "700",
                              fontSize: "18px",
                            }}
                          >
                            Place of Supply :
                          </td>
                        </tr>
                        <tr>
                          <td
                            style={{
                              padding: "0 20px 0 0",
                              width: "35%",
                              verticalAlign: "top",
                            }}
                          >
                            <p
                              style={{
                                margin: "0",
                                lineHeight: "1.8",
                                fontSize: "16px",
                              }}
                            >
                              {data.customerVendor?.displayName}{" "}
                            </p>
                            <p
                              style={{
                                margin: "0",
                                lineHeight: "1.8",
                                fontSize: "16px",
                                color: "#949494",
                              }}
                            >
                              {data?.billingAddress?.addressLine1 || "N/A"}
                              {", "}
                              {data?.billingAddress?.addressLine2}
                              {"  "}
                              {data.billingAddress?.townCity || "N/A"}
                              {", "}
                              {data?.billingAddress?.state || "N/A"}
                              {", "}
                              {data?.billingAddress?.zipCode || "N/A"}
                            </p>
                          </td>
                          <td
                            style={{
                              padding: "0 20px 0 20px",
                              width: "35%",
                              verticalAlign: "top",
                            }}
                          >
                            <p
                              style={{
                                margin: "0",
                                lineHeight: "1.8",
                                fontSize: "16px",
                              }}
                            >
                              {data.customerVendor?.displayName}{" "}
                            </p>
                            <p
                              style={{
                                margin: "0",
                                lineHeight: "1.8",
                                fontSize: "16px",
                                color: "#949494",
                              }}
                            >
                              {data.shippingAddress?.addressLine1 || "N/A"}
                              {", "}
                              {data.shippingAddress?.addressLine2}{" "}
                              {data?.shippingAddress?.townCity || "N/A"}
                              {", "}
                              {data?.shippingAddress?.state || "N/A"}
                              {", "}
                              {data?.shippingAddress?.zipCode || "N/A"}
                            </p>
                          </td>
                          <td
                            style={{
                              padding: "0 0 20px 20px",
                              width: "30%",
                              verticalAlign: "top",
                            }}
                          >
                            <p
                              style={{
                                margin: "0",
                                lineHeight: "1.8",
                                fontSize: "16px",
                                color: "#949494",
                              }}
                            >
                              {data?.placeOfSupply || "N/A"}
                            </p>
                            <p
                              style={{
                                margin: "20px 0 20",
                                lineHeight: "1.8",
                                fontWeight: "700",
                                fontSize: "18px",
                              }}
                            >
                              Ref ID :
                            </p>
                            <p
                              style={{
                                margin: "0",
                                lineHeight: "1.8",
                                fontSize: "16px",
                                color: "#949494",
                              }}
                            >
                              {data?.referenceNumber}
                            </p>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <table
                        style={{
                          borderCollapse: "collapse",
                          width: "100%",
                          textAlign: "left",
                          marginBottom: "25px",
                        }}
                      >
                        <thead>
                          <tr>
                            <th
                              style={{
                                color: "#757575",
                                padding: "15px 10px 15px 30px",
                                backgroundColor: "#F8F9FA",
                                fontSize: "14px",
                              }}
                            >
                              Product
                            </th>
                            <th
                              style={{
                                color: "#757575",
                                padding: " 15px 10px",
                                backgroundColor: "#F8F9FA",
                                fontSize: "14px",
                              }}
                            >
                              Item Name
                            </th>
                            <th
                              style={{
                                color: "#757575",
                                padding: " 15px 10px",
                                backgroundColor: "#F8F9FA",
                                fontSize: "14px",
                              }}
                            >
                              Rate
                            </th>
                            <th
                              style={{
                                color: "#757575",
                                padding: " 15px 10px",
                                backgroundColor: "#F8F9FA",
                                fontSize: "14px",
                              }}
                            >
                              Quantity
                            </th>
                            <th
                              style={{
                                color: "#757575",
                                padding: " 15px 10px",
                                backgroundColor: "#F8F9FA",
                                fontSize: "14px",
                              }}
                            >
                              Discount%
                            </th>
                            <th
                              style={{
                                color: "#757575",
                                padding: "15px 30px 15px 10px",
                                backgroundColor: "#F8F9FA",
                                fontSize: "14px",
                              }}
                            >
                              Amount
                            </th>
                            <th
                              style={{
                                color: "#757575",
                                padding: "15px 30px 15px 10px",
                                backgroundColor: "#F8F9FA",
                                fontSize: "14px",
                              }}
                            >
                              Tax
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {data.productDetails &&
                            data.productDetails.length > 0 &&
                            data.productDetails.map((item: any, index: any) => (
                              <tr key={index}>
                                <td
                                  style={{
                                    fontSize: "18px",
                                    padding: "25px 10px 20px 30px",
                                    borderBottom: "1px solid #E5E5E5",
                                  }}
                                >
                                  {item.detailType == 1 ? "Product" : "Service"}
                                </td>
                                <td
                                  style={{
                                    fontSize: "18px",
                                    padding: "25px 10px",
                                    borderBottom: "1px solid #E5E5E5",
                                  }}
                                >
                                  {item.productName}
                                </td>
                                <td
                                  style={{
                                    fontSize: "18px",
                                    padding: "25px 10px",
                                    borderBottom: "1px solid #E5E5E5",
                                    whiteSpace: "nowrap",
                                  }}
                                >{`₹${item.rate}`}</td>
                                <td
                                  style={{
                                    fontSize: "18px",
                                    padding: "25px 10px",
                                    borderBottom: "1px solid #E5E5E5",
                                    whiteSpace: "nowrap",
                                  }}
                                >
                                  {item.quantity} {item?.productUnit || "QTY"}
                                </td>
                                <td
                                  style={{
                                    fontSize: "18px",
                                    padding: "25px 10px",
                                    borderBottom: "1px solid #E5E5E5",
                                    whiteSpace: "nowrap",
                                  }}
                                >
                                  {item.discount}%
                                </td>
                                <td
                                  style={{
                                    fontSize: "18px",
                                    padding: "25px 10px",
                                    borderBottom: "1px solid #E5E5E5",
                                    whiteSpace: "nowrap",
                                  }}
                                >{`₹${item.amount}`}</td>
                                <td
                                  style={{
                                    fontSize: "18px",
                                    padding: "25px 10px",
                                    borderBottom: "1px solid #E5E5E5",
                                    whiteSpace: "nowrap",
                                  }}
                                >
                                  {" "}
                                  <React.Fragment>
                                    {isSameState ? (
                                      <>
                                        <Typography
                                          variant="subtitle2"
                                          className="nowrap"
                                        >
                                          CGST @ {item.iGstPercent / 2 || 0}% :
                                          ₹
                                          {(
                                            (item.amount * item?.iGstPercent ||
                                              0) / 200
                                          )?.toFixed(2) || 0}
                                        </Typography>
                                        <Typography
                                          variant="subtitle2"
                                          className="nowrap"
                                        >
                                          SGST @ {item?.iGstPercent || 0 / 2}% :
                                          ₹
                                          {(
                                            (item?.amount * item?.iGstPercent ||
                                              0) / 200
                                          )?.toFixed(2) || 0}
                                        </Typography>
                                      </>
                                    ) : (
                                      <>
                                        <Typography
                                          variant="subtitle2"
                                          className="nowrap"
                                        >
                                          IGST @ {item.iGstPercent || 0}% : ₹
                                          {(
                                            (item.amount * item?.iGstPercent ||
                                              0) / 100
                                          )?.toFixed(2) || 0}
                                        </Typography>
                                      </>
                                    )}
                                    <Typography
                                      variant="subtitle2"
                                      className="nowrap"
                                    >
                                      CESS @ {item?.cessPercent || 0}% : ₹
                                      {(
                                        (item?.amount * item?.cessPercent ||
                                          0) / 100
                                      )?.toFixed(2)}
                                    </Typography>
                                  </React.Fragment>{" "}
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ backgroundColor: "#F8F9FA", padding: "20px" }}>
                      <table
                        style={{ width: "100%", borderCollapse: "collapse" }}
                      >
                        <tr>
                          <td style={{ width: "65%", paddingRight: "20px" }}>
                            <p
                              style={{
                                margin: "0",
                                lineHeight: "1.8",
                                fontSize: "16px",
                              }}
                            >
                              <span style={{ color: "#949494" }}>
                                Total Amount in Words :
                              </span>
                              {getAmountToWords(
                                calculateValues(data?.productDetails, "amount")
                              )}
                            </p>
                            <p
                              style={{
                                margin: "0",
                                lineHeight: "1.8",
                                fontSize: "16px",
                              }}
                            >
                              <span style={{ color: "#949494" }}>
                                {label.state.salesOrderDesc} :
                              </span>
                              {data?.description || "N/A"}
                            </p>
                          </td>
                          <td style={{ width: "35%" }}>
                            <table
                              style={{
                                width: "100%",
                                borderCollapse: "collapse",
                                fontWeight: "700",
                              }}
                            >
                              <tr>
                                <td
                                  style={{
                                    paddingBottom: "20px",
                                    textAlign: "left",
                                  }}
                                >
                                  Sub Total :
                                </td>
                                <td
                                  style={{
                                    paddingBottom: "20px",
                                    textAlign: "right",
                                  }}
                                >
                                  ₹
                                  {calculateSubToatalValues(
                                    data?.productDetails,
                                    "amount"
                                  )}
                                </td>
                              </tr>
                              <tr>
                                <td
                                  style={{
                                    paddingBottom: "20px",
                                    textAlign: "left",
                                  }}
                                >
                                  Tax :
                                </td>
                                <td
                                  style={{
                                    paddingBottom: "20px",
                                    textAlign: "right",
                                  }}
                                >
                                  ₹
                                  {(
                                    +calculateValues(
                                      data?.productDetails,
                                      "amount"
                                    ) -
                                    +calculateSubToatalValues(
                                      data?.productDetails,
                                      "amount"
                                    )
                                  )?.toFixed(2) ||
                                    data?.tax?.toFixed(2) ||
                                    "0.00"}
                                </td>
                              </tr>
                              <tr>
                                <td style={{ textAlign: "left" }}>Total :</td>
                                <td style={{ textAlign: "right" }}>
                                  ₹
                                  {calculateValues(
                                    data?.productDetails,
                                    "amount"
                                  )}
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ paddingTop: "20px" }}>
                      <table
                        style={{ width: "100%", borderCollapse: "collapse" }}
                      >
                        <tr>
                          <td
                            style={{
                              width: "30%",
                              paddingLeft: "20px",
                              lineHeight: "1.8",
                              textAlign: "right",
                              fontSize: "16px",
                              verticalAlign: "top",
                              color: "#949494",
                            }}
                          >
                            Authorized Signature
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        paddingTop: "40px",
                        textAlign: "right",
                        fontSize: "14px",
                        fontWeight: "700",
                        verticalAlign: "bottom",
                      }}
                    >
                      <table style={{ width: "170px", marginLeft: "auto" }}>
                        <tr>
                          <td
                            style={{
                              textAlign: "right",
                              fontSize: "14px",
                              fontWeight: "700",
                            }}
                          >
                            Powered By :
                          </td>
                          <td>
                            <img
                              style={{ width: "60px", marginLeft: "10px" }}
                              src={LOGOBLUE}
                              alt="Logo"
                            />
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </table>
          </td>
        </table>
      </Dialog>
    </>
  );
};

export default Preview;
