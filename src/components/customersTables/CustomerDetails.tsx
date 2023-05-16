import React, { useEffect, useState } from "react";
import CustomerDetailDrawer from "../drawer";
import Grid from "@mui/material/Grid";
import Typography from "@material-ui/core/Typography";
import EnhancedTable from "../tables/customerInvoiceTable";

import AddFilterDrawer from "../drawer";
import Filter from "./CustomerInvoiceFilter";
import {
  PHONE_WHITE_CURVED,
  MAIL_WHITE_CURVED,
  LOCATION_WHITE_CURVED,
  EDIT_IMG_ICON,
  THANKSSMILE,
  TOTAL_AMOUNT_PAID,
  TOTAL_AMOUNT_DUE,
  TOTAL_TRANSACTIONS,
  DOCUMENT_TYPE,
} from "../../constants";
import { boolean } from "yup";
import { useDispatch } from "react-redux";
import { getCustomerTransactionDetail } from "../../screens/saleandPurchase/action";
import { updateSalePurchase } from "../../screens/saleandPurchase/salePurchaseSlice";
import { useSelector } from "react-redux";
import { convertIntegerToDecimal } from "../../utils";

interface detailsProps {
  initialState?: boolean;
  custDetailState: any;
  details: any;
  filterPress: any;
}

const CustomerDetails = (props: detailsProps) => {
  const { initialState, custDetailState, details, filterPress } = props;
  const [filterState, setfilterState] = useState<boolean>(false);
  const [documentNumber, setDocumentNumber] = useState<any>(1);
  const [state, setState] = useState(false);
  const dispatch: any = useDispatch();
  const { customerTransactionAmount } = useSelector(
    (state: any) => state.salePurchaseSlice
  );
  useEffect(() => {
    if (details._id) {
      dispatch(
        updateSalePurchase({ limit: 5, type: details.isCustomerVendor })
      );
      //dispatch(getCustomerTransactionDetail(details?._id, 1));
    }
  }, [details._id]);

  return (
    <CustomerDetailDrawer state={initialState} setState={custDetailState}>
      <div className="customer-detail">
        <div className="customer-detail-header color-white">
          <Grid container rowSpacing={3} columnSpacing={2}>
            <Grid item xs={12} sm={5}>
              <div className="customer-img-cover">
                <img
                  src={details.image ? details.image : THANKSSMILE}
                  className="customer-img"
                />
              </div>
              <Typography variant="h5" className="m-t-10">
                {details.displayName}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={7}>
              <ul>
                <li className="Dflex al-cnt">
                  <img src={PHONE_WHITE_CURVED} alt="phone" />
                  <Typography variant="subtitle2" className="m-l-10">
                    {details.phoneNumber}
                  </Typography>
                </li>
                <li className="Dflex al-cnt">
                  <img src={MAIL_WHITE_CURVED} alt="mail" />
                  <Typography variant="subtitle2" className="m-l-10">
                    {details.email}
                  </Typography>
                </li>
                <li className="Dflex al-cnt">
                  <img src={LOCATION_WHITE_CURVED} alt="location" />
                  <Typography variant="subtitle2" className="m-l-10">
                    {details?.billingAddress?.addressLine1}{" "}
                    {details?.billingAddress?.addressLine2}
                    {","}
                    {details?.billingAddress?.state}
                  </Typography>
                </li>
              </ul>
            </Grid>
          </Grid>
        </div>

        <>
          {details?._id && (
            <EnhancedTable
              filterPress={() => setfilterState(true)}
              setState={setState}
              details={details}
              getTabIndex={(id: any) => {
                setDocumentNumber(id);
              }}
            />
          )}
          <AddFilterDrawer
            state={filterState}
            setState={setfilterState}
            className="filterDrawer"
          >
            <Filter
              id={details?._id}
              stateState={setfilterState}
              documentNumber={documentNumber}
            />
          </AddFilterDrawer>
        </>
      </div>
    </CustomerDetailDrawer>
  );
};

export default CustomerDetails;
