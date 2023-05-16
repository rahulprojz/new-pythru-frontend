import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import { routesConstant, DebitNoteLabel } from "../../../../constants";
import EstimateTable from "./table";
import { getSalePurchaseList } from "../../action";
import { resetSalePurchase, updateSalePurchase } from "../../salePurchaseSlice";
import AddEstimateButton from "../../../../components/buttons/buttonWithIcon";
import AddFilterDrawer from "../../../../components/drawer";
import Filter from "../../../../components/sales/common/filter";

import Breadcrumbs from "../../../../components/breadcrumb";
// import "../purchase.scss";
// import EstimateFilter from "./estimateFilter";

const Index = () => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch: any = useDispatch();

  const [state, setState] = useState(false);
  const [filterState, setfilterState] = useState<boolean>(false);

  useEffect(() => {
    document.title = "Debit Note | PyThru";
    dispatch(
      updateSalePurchase({
        type: 2,
        documentType: 10,
      })
    );
    dispatch(getSalePurchaseList());
    return () => {
      dispatch(resetSalePurchase());
    };
  }, [params]);

  const handleAddDebitNote = () => {
    navigate(routesConstant.routeConstants.debitNoteAdd, DebitNoteLabel);
  };
  const { permissions } = useSelector((state: any) => state.commonSlice);

  return (
    <>
      <Breadcrumbs />
      {(permissions && permissions["purchases"].add) || !permissions ? (
          <AddEstimateButton
            text="+ Create Debit Note"
            className="btn-purple"
            onPress={handleAddDebitNote}
          />
      ) : (
        <></>
      )}
      <EstimateTable
        labels={DebitNoteLabel}
        filterPress={() => setfilterState(true)}
        handleAddDebitNote={handleAddDebitNote}
        setState={setState}
      />

      <AddFilterDrawer
        state={filterState}
        setState={setfilterState}
        className="filterDrawer"
      >
        <Filter
          type="debitNote"
          documentType={10}
          stateState={setfilterState}
          label={DebitNoteLabel.state}
        />
      </AddFilterDrawer>
    </>
  );
};

export default Index;
