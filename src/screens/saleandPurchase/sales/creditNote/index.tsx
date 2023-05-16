import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import { getSalePurchaseList, statesList } from "../../action";
import { resetSalePurchase, updateSalePurchase } from "../../salePurchaseSlice";
import AddEstimateButton from "../../../../components/buttons/buttonWithIcon";
import AddFilterDrawer from "../../../../components/drawer";
import Breadcrumbs from "../../../../components/breadcrumb";
import EnhancedTable from "../../../../components/sales/creditNote/table";
import Filter from "../../../../components/sales/common/filter";
import { CreditNoteLabel, DOCUMENT_TYPE, TYPE } from "../../../../constants";
// import "../sales.scss";
import { useSelector } from "react-redux";

const Index = () => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch: any = useDispatch();
  const [state, setState] = useState(false);
  const [filterState, setfilterState] = useState<boolean>(false);

  useEffect(() => {
    document.title = "Credit Note | PyThru";
    dispatch(resetSalePurchase());
    dispatch(updateSalePurchase({ documentType: DOCUMENT_TYPE.CREDIT_NOTE }));
    dispatch(getSalePurchaseList());
    dispatch(statesList());
    return () => {
      dispatch(resetSalePurchase());
    };
  }, [params]);

  const handleAddCreditNote = () => {
    navigate("/sales/credit-note/add", CreditNoteLabel);
  };
  const { permissions } = useSelector((state: any) => state.commonSlice);
  return (
    <>
      <Breadcrumbs />
      {(permissions && permissions["sales"].add) || !permissions ? (
          <AddEstimateButton
            text="+ Create Credit Note"
            className="btn-purple"
            onPress={handleAddCreditNote}
          />
      ) : (
        <></>
      )}

      <EnhancedTable
        filterPress={() => setfilterState(true)}
        setState={setState}
        labels={CreditNoteLabel}
        handleAddCreditNote={handleAddCreditNote}
      />

      <AddFilterDrawer
        state={filterState}
        setState={setfilterState}
        className="filterDrawer"
      >
        <Filter
          type="creditNote"
          documentType={DOCUMENT_TYPE.CREDIT_NOTE}
          stateState={setfilterState}
          label={CreditNoteLabel.state}
        />
      </AddFilterDrawer>
    </>
  );
};

export default Index;
