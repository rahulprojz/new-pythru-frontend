import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import { routesConstant, ReceiptNoteLabel } from "../../../../constants";
import Filter from "../../../../components/sales/common/filter";

import EstimateTable from "./table";
import { getSalePurchaseList } from "../../action";
import { resetSalePurchase, updateSalePurchase } from "../../salePurchaseSlice";
import AddEstimateButton from "../../../../components/buttons/buttonWithIcon";
import AddFilterDrawer from "../../../../components/drawer";

import Breadcrumbs from "../../../../components/breadcrumb";
// import "../purchase.scss";

const Index = () => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch: any = useDispatch();

  const [state, setState] = useState(false);
  const [filterState, setfilterState] = useState<boolean>(false);

  useEffect(() => {
    document.title = "Receipt Note | PyThru";
    dispatch(
      updateSalePurchase({
        type: 2,
        documentType: 8,
      })
    );
    dispatch(getSalePurchaseList());
    return () => {
      dispatch(resetSalePurchase());
    };
  }, [params]);

  const handleAddReceiptNote = () => {
    navigate(routesConstant.routeConstants.receiptNoteAdd, ReceiptNoteLabel);
  };
  const { permissions } = useSelector((state: any) => state.commonSlice);
  return (
    <>
      <Breadcrumbs />

      {(permissions && permissions["purchases"].add) || !permissions ? (
          <AddEstimateButton
            text="+ Create Receipt Note"
            className="btn-purple"
            onPress={handleAddReceiptNote}
          />
      ) : (
        <></>
      )}
      <EstimateTable
        labels={ReceiptNoteLabel}
        filterPress={() => setfilterState(true)}
        handleAddReceiptNote={handleAddReceiptNote}
        setState={setState}
      />

      <AddFilterDrawer
        state={filterState}
        setState={setfilterState}
        className="filterDrawer"
      >
        <Filter
          type="order"
          documentType={8}
          stateState={setfilterState}
          label={ReceiptNoteLabel.state}
        />
      </AddFilterDrawer>
    </>
  );
};

export default Index;
