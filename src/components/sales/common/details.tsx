import React, { SetStateAction, Dispatch, useEffect } from "react";
import Grid from "@mui/material/Grid";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import StockStatus from "../../stock";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import { TableCell, TableHead, TableRow } from "@mui/material";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { useSelector, useDispatch } from "react-redux";
import PO from "../statusConversion/po";
import Bill from "../statusConversion/bill";
import Receipt from "../statusConversion/receipt";
import ReveiptNote from "../statusConversion/receiptNote";
import DebitNote from "../statusConversion/debitNotes";
import Typography from "@mui/material/Typography";
import {
  PHONE_ICON_OUTLINE,
  MAIL_ICON_OUTLINE,
  LOGOBLUE,
  getEstimateStatus,
  statusEnum,
  EDIT_WHITE_CIRCULAR,
  getEstimateStatusCss,
  DOCUMENT_TYPE,
} from "../../../constants";
import EstimateMenuDropDown from "../../menu/estimateDropDownMenu";
import {
  convertIntegerToDecimal,
  getFormtedDate,
  getLocalFormtedDate,
  getTransType,
} from "../../../utils";
import SalesOrder from "../statusConversion/SalesOrder";
import Estimate from "../statusConversion/estimate";
import DeliveryChallan from "../statusConversion/DeliveryChallan";
import CashMemo from "../statusConversion/CashMemo";
import CreditNote from "../statusConversion/CreditNote";

import SalesInvoice from "../statusConversion/salseInvoice";
import { useNavigate } from "react-router-dom";

interface detailProp {
  detail: any;
  setOpenDetail: Dispatch<SetStateAction<boolean>>;
  setState?: Dispatch<SetStateAction<boolean>>;
  labels: any;
}

const Details = (props: detailProp) => {
  // const dispatch = useDispatch();
  const navigate: any = useNavigate();
  const { detail, labels, setOpenDetail } = props;
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const { permissions } = useSelector((state: any) => state.commonSlice);

  const { organizationDeatil } = useSelector(
    (state: any) => state.settingSlice
  );

  const navigateOnEditPage = (e: any) => {
    e.preventDefault();
    const type = labels?.state?.type == 1 ? "/sales" : "/purchase";
    navigate(
      `${type}/${labels?.state?.redirect}` + "/edit/" + detail._id,
      labels
    );
  };

  let stvalue = 3;

  const finalTransactionList = () => {
    const transPaymentListArray =
      detail?.statusHistory != undefined &&
      detail?.statusHistory.filter((v: any) =>
        [statusEnum.PARTIALLY_PAID, statusEnum.PAID].includes(v.status)
      );
    const linkTrans =
      detail?.linkTransaction && detail.linkTransaction != undefined
        ? detail?.linkTransaction
        : [];
    if (transPaymentListArray.length > 0) {
      return transPaymentListArray
        .concat(linkTrans)
        .sort((a: any, b: any) =>
          new Date(a.createdAt) > new Date(b.createdAt) ? -1 : 1
        );
    } else {
      return linkTrans;
    }
  };

  const changeStatusAndConvert = () => {
    switch (labels?.state?.documentType) {
      case 9:
        return (
          <Bill
            detail={detail}
            setOpenDetail={setOpenDetail}
            permission={
              (permissions && permissions["purchases"]?.add) || !permissions
            }
          />
        );
      case 11:
        return (
          <Receipt
            detail={detail}
            setOpenDetail={setOpenDetail}
            permission={
              (permissions && permissions["purchases"]?.add) || !permissions
            }
          />
        );
      case 8:
        return (
          <ReveiptNote
            detail={detail}
            setOpenDetail={setOpenDetail}
            permission={
              (permissions && permissions["purchases"]?.add) || !permissions
            }
          />
        );
      case 10:
        return (
          <DebitNote
            detail={detail}
            setOpenDetail={setOpenDetail}
            permission={
              (permissions && permissions["purchases"]?.add) || !permissions
            }
          />
        );
      case 7:
        return (
          <PO
            detail={detail}
            setOpenDetail={setOpenDetail}
            permission={
              (permissions && permissions["purchases"]?.add) || !permissions
            }
          />
        );
      case 2:
        return (
          <SalesOrder
            detail={detail}
            setOpenDetail={setOpenDetail}
            permission={
              (permissions && permissions["sales"]?.add) || !permissions
            }
          />
        );
      case 1:
        return (
          <Estimate
            detail={detail}
            setOpenDetail={setOpenDetail}
            permission={
              (permissions && permissions["sales"]?.add) || !permissions
            }
          />
        );
      case 6:
        return (
          <CashMemo
            detail={detail}
            setOpenDetail={setOpenDetail}
            permission={
              (permissions && permissions["sales"]?.add) || !permissions
            }
          />
        );
      case 5:
        return (
          <CreditNote
            detail={detail}
            setOpenDetail={setOpenDetail}
            permission={
              (permissions && permissions["sales"]?.add) || !permissions
            }
          />
        );
      case 3:
        return (
          <SalesInvoice
            detail={detail}
            setOpenDetail={setOpenDetail}
            permission={
              (permissions && permissions["sales"]?.add) || !permissions
            }
          />
        );
        break;
      case 4:
        return (
          <DeliveryChallan
            detail={detail}
            setOpenDetail={setOpenDetail}
            permission={
              (permissions && permissions["sales"]?.add) || !permissions
            }
          />
        );

      default:
        return (
          <div className="invoice-detail-card m-b-20">
            <div className="Dflex al-cnt sp-bt m-b-10 wrap">
              <Typography variant="subtitle2" className="m-b-10">
                Collection Activity :
                <span className="bold">{detail?.documentNumber}</span>
              </Typography>
              <Typography variant="h5" className="m-b-10">
                <EstimateMenuDropDown type={labels?.state?.type} />
              </Typography>
            </div>
            <div className="stockContainer Dflex al-cnt">
              <StockStatus
                text="Current Due"
                stvalue={getFormtedDate(detail?.dueDate, "DD-MM-YYYY")}
                classname="flex-wrap due normal-info"
              />
              <StockStatus
                text="Total Amount"
                stvalue={convertIntegerToDecimal(detail?.totalPrice)}
                classname="flex-wrap paid normal-info"
              />
              <StockStatus
                text="Date Sent"
                stvalue={stvalue}
                classname="flex-wrap gray normal-info"
              />
              <StockStatus
                text="Overdue Days"
                stvalue={stvalue}
                classname="flex-wrap gray normal-info"
              />
            </div>
            <span
              className={`${getEstimateStatusCss(
                detail.status
              )} status-cover  m-t-20`}
            >
              {" "}
              {/* Classes are closed, pending, paid, cancelled */}
              {detail?.status ? getEstimateStatus(detail.status) : "N/A"}
            </span>
          </div>
        );
    }
  };

  return (
    <>
      <div className="invoice-detail">
        {organizationDeatil && (
          <div className="invoice-detail-header color-white">
            <div className="Dflex al-tp sp-bt m-b-20">
              <div>
                <Typography variant="h3">
                  {labels?.state?.documentText}
                </Typography>
                <Typography variant="subtitle2" className="m-t-30">
                  {organizationDeatil.companyName}
                </Typography>
              </div>

              {(permissions &&
                permissions[labels?.state?.type == 1 ? "sales" : "purchases"]
                  ?.edit) ||
              !permissions
                ? [
                    statusEnum.NOT_SENT,
                    statusEnum.PENDING,
                    statusEnum.PAYMENT_DUE,
                  ].includes(detail.status) && (
                    // labels?.state?.type < 2 && (
                    <a href="#" onClick={navigateOnEditPage} title="Edit">
                      <img src={EDIT_WHITE_CIRCULAR} />
                    </a>
                  )
                : // )
                  false}
            </div>
            <Grid container rowSpacing={3} columnSpacing={2}>
              <Grid item xs={12} sm={6}>
                <ul>
                  <li className="Dflex al-cnt">
                    <img src={MAIL_ICON_OUTLINE} alt="phone" />
                    <Typography variant="subtitle2" className="m-l-10">
                      {organizationDeatil.email}
                    </Typography>
                  </li>
                  <li className="Dflex al-cnt">
                    <img
                      src={PHONE_ICON_OUTLINE}
                      alt="phone"
                      className="m-l-5"
                    />
                    <Typography variant="subtitle2" className="m-l-10">
                      {organizationDeatil.phoneNumber}
                    </Typography>
                  </li>
                </ul>
              </Grid>
              <Grid item xs={12} sm={6} style={{ textAlign: "right" }}>
                <Typography variant="subtitle2" className="m-b-10">
                  GSTIN : {organizationDeatil?.documentInfo?.gst || "N/A"}
                </Typography>
                <Typography variant="subtitle2">
                  Address : {organizationDeatil?.address?.addressLine1 || "N/A"}{" "}
                  {organizationDeatil?.address?.addressLine2 || "N/A"}{" "}
                  {organizationDeatil?.address?.state || "N/A"}
                </Typography>
              </Grid>
            </Grid>
          </div>
        )}
        {changeStatusAndConvert()}
        <div className="invoice-detail-card">
          <Grid container rowSpacing={3} columnSpacing={2}>
            <Grid item xs={12} md={6} lg={3}>
              <Typography variant="subtitle2" className="color-label">
                {labels?.state?.salesOrderDate}
              </Typography>
              <Typography variant="subtitle2" className="color-purple bold">
                {getFormtedDate(detail?.fromDate, "DD-MM-YYYY")}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <Typography variant="subtitle2" className="color-label">
                {labels?.state?.salesOrderNo}
              </Typography>
              <Typography variant="subtitle2" className="color-purple bold">
                {detail?.documentNumber || "N/A"}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <Typography variant="subtitle2" className="color-label">
                Due Date
              </Typography>
              <Typography variant="subtitle2" className="color-purple bold">
                {getFormtedDate(detail?.dueDate, "DD-MM-YYYY")}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <Typography variant="subtitle2" className="color-label">
                Reference ID
              </Typography>
              <Typography variant="subtitle2" className="color-purple bold">
                {detail?.referenceNumber || "N/A"}
              </Typography>
            </Grid>
          </Grid>
          <hr className="m-t-20 m-b-20" />
          <Grid container rowSpacing={3} columnSpacing={2}>
            <Grid item xs={12} md={6} lg={4}>
              <Typography variant="subtitle2" className="color-label">
                Bill {labels?.state?.type === 1 ? "To" : "From"}
              </Typography>
              <Typography variant="subtitle2" className="color-purple bold">
                {detail?.customerVendorDetails?.displayName || "N/A"}
              </Typography>
              <Typography variant="subtitle2" className="color-label">
                {detail?.billingAddress?.addressLine1 || "N/A"}
              </Typography>

              <Typography variant="subtitle2" className="color-label">
                {`${detail?.billingAddress?.zipCode} `}
                {detail?.billingAddress?.state || "N/A"}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <Typography variant="subtitle2" className="color-label">
                Ship {labels?.state?.type === 1 ? "To" : "From"}
              </Typography>
              <Typography variant="subtitle2" className="color-purple bold">
                {detail?.customerVendorDetails?.displayName || "N/A"}
              </Typography>
              <Typography variant="subtitle2" className="color-label">
                {detail?.shippingAddress?.addressLine1 || "N/A"}
              </Typography>
              <Typography variant="subtitle2" className="color-label">
                {`${detail?.shippingAddress?.zipCode} `}
                {detail?.shippingAddress?.state || "N/A"}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <Typography variant="subtitle2" className="color-label">
                Place of Supply
              </Typography>
              <Typography variant="subtitle2" className="color-purple bold">
                {detail.placeOfSupply || "N/A"}
              </Typography>
            </Grid>
          </Grid>
          <hr className="m-t-20 m-b-20" />

          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography
                className="color-cell-head bold"
                variant="subtitle1"
                sx={{ pb: 2 }}
              >
                Show Status History
              </Typography>
            </AccordionSummary>

            <AccordionDetails>
              <Table className="details_table">
                <TableHead>
                  <TableRow>
                    <TableCell>Status</TableCell>
                    <TableCell>Amount</TableCell>
                    <TableCell>Notes</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {detail?.statusHistory &&
                    detail?.statusHistory?.length > 0 &&
                    detail?.statusHistory?.map((product: any, index: any) => (
                      <TableRow key={index}>
                        <TableCell>
                          <span
                            className={`${getEstimateStatusCss(
                              product?.status
                            )} status-cover`}
                          >
                            {getEstimateStatus(product?.status) || "N/A"}
                          </span>
                        </TableCell>
                        <TableCell>
                          {convertIntegerToDecimal(
                            product?.amount || detail?.totalPrice
                          )}
                          <br />(
                          {`Date: ${getLocalFormtedDate(
                            product.createdAt,
                            "DD-MM-YYYY h:mm:ss A"
                          )}`}
                          )
                        </TableCell>
                        <TableCell>{product?.notes || "N/A"}</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </AccordionDetails>
          </Accordion>
          <br></br>
          {[DOCUMENT_TYPE.BILLS, DOCUMENT_TYPE.INVOICE].includes(
            labels?.state?.documentType
          ) && (
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography
                  className="color-cell-head bold"
                  variant="subtitle1"
                  sx={{ pb: 2 }}
                >
                  Transaction History
                </Typography>
              </AccordionSummary>

              <AccordionDetails>
                <Table className="details_table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Type</TableCell>
                      <TableCell>Amount</TableCell>
                      <TableCell>Notes</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {finalTransactionList() != undefined &&
                    finalTransactionList()?.length > 0 ? (
                      finalTransactionList()?.map((item: any, index: any) => (
                        <TableRow key={index}>
                          <TableCell>
                            <span>
                              {item?.documentType
                                ? getTransType(item?.documentType)
                                : item?.paymentMode == 1
                                ? "Cash"
                                : item?.bankAccount}
                            </span>
                          </TableCell>
                          <TableCell>
                            {convertIntegerToDecimal(item?.amount)}
                            <br />(
                            {`Date: ${getLocalFormtedDate(
                              item.createdAt,
                              "DD-MM-YYYY h:mm:ss A"
                            )}`}
                            )
                          </TableCell>
                          <TableCell>{item?.notes || "N/A"}</TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell className="no-record" colSpan={3}>
                          <div className="no_data_fnd">
                            <i>Oops!</i>
                            <p>There is nothing here yet!</p>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </AccordionDetails>
            </Accordion>
          )}
          <br></br>
          <div className="table-cover">
            <Table className="details_table">
              <TableHead>
                <TableRow>
                  <TableCell>Product</TableCell>
                  <TableCell>Item Name</TableCell>
                  <TableCell>Rate</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Disc(%)</TableCell>
                  <TableCell>CESS(%)</TableCell>
                  {detail?.productDetails?.length &&
                  detail?.productDetails[0].isInterStateTaxApplied ? (
                    <TableCell>IGST(%)</TableCell>
                  ) : (
                    <>
                      <TableCell>CGST(%)</TableCell>
                      <TableCell>SGST(%)</TableCell>
                    </>
                  )}

                  <TableCell>Price</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {detail?.productDetails &&
                  detail?.productDetails?.length > 0 &&
                  detail?.productDetails?.map((product: any, index: any) => (
                    <TableRow key={index}>
                      <TableCell>
                        {product.detailType == 1 ? "Product" : "Service"}
                      </TableCell>
                      <TableCell>{product?.productName || "N/A"}</TableCell>
                      <TableCell className="nowrap">
                        {convertIntegerToDecimal(product?.rate)}
                      </TableCell>
                      <TableCell>
                        {product?.quantity
                          ? `${product?.quantity} ${
                              product?.productUnit || "QTY"
                            }`
                          : "N/A"}
                      </TableCell>
                      <TableCell>
                        {product?.discount ? `${product?.discount}%` : "0%"}
                      </TableCell>
                      <TableCell>{product?.cessPercent || "0"}%</TableCell>
                      {product?.isInterStateTaxApplied ? (
                        <TableCell>{product?.iGstPercent || "0"}%</TableCell>
                      ) : (
                        <>
                          <TableCell>{product?.cGstPercent || "0"}%</TableCell>
                          <TableCell>{product.sGstPercent || "0"}%</TableCell>
                        </>
                      )}

                      <TableCell className="nowrap">
                        {convertIntegerToDecimal(product?.amount)}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </div>
          <div className="table-cover">
            <Table className="details_table">
              <TableHead>
                <TableRow>
                  <TableCell>Subtotal</TableCell>
                  <TableCell>Total</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>
                    {convertIntegerToDecimal(detail?.subTotal)}
                  </TableCell>
                  <TableCell>
                    {" "}
                    {convertIntegerToDecimal(detail?.totalPrice)}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
          <hr className="m-t-20 m-b-20" />
          <Typography className="m-b-20 color-purple bold" variant="body2">
            Note & Terms
          </Typography>
          <Typography variant="subtitle2">
            {detail?.description || "N/A"}
          </Typography>
          <div className="Dflex al-cnt js-cnt m-t-20">
            <img src={LOGOBLUE} alt="logo" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Details;
