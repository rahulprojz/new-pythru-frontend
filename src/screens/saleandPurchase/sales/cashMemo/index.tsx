import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import { getSalePurchaseList, statesList } from "../../action";
import { resetSalePurchase, updateSalePurchase } from "../../salePurchaseSlice";
import AddEstimateButton from "../../../../components/buttons/buttonWithIcon";
import AddFilterDrawer from "../../../../components/drawer";
import Breadcrumbs from "../../../../components/breadcrumb";
import EnhancedTable from "../../../../components/sales/cashMemo/table";
import Filter from "../../../../components/sales/common/filter";
import { CashMemoLabel, DOCUMENT_TYPE } from "../../../../constants";
// import "../sales.scss";
import { useSelector } from "react-redux";

const Index = () => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch: any = useDispatch();

  const [state, setState] = useState(false);
  const [filterState, setfilterState] = useState<boolean>(false);
  useEffect(() => {
    document.title = "Cash Memo | PyThru";
    dispatch(resetSalePurchase());
    dispatch(updateSalePurchase({ documentType: DOCUMENT_TYPE.CASH_MEMO }));
    dispatch(getSalePurchaseList());
    dispatch(statesList());
    return () => {
      dispatch(resetSalePurchase());
    };
  }, [params]);

  const handleAddCashMemo = () => {
    navigate("/sales/cash-memo/add", CashMemoLabel);
  };
  const { permissions } = useSelector((state: any) => state.commonSlice);
  return (
    <>
      <Breadcrumbs />
      {(permissions && permissions["sales"].add) || !permissions ? (
          <AddEstimateButton
            text="+ Create Cash Memo"
            className="btn-purple"
            onPress={handleAddCashMemo}
          />
      ) : (
        <></>
      )}

      <EnhancedTable
        filterPress={() => setfilterState(true)}
        setState={setState}
        labels={CashMemoLabel}
        handleAddCashMemo={handleAddCashMemo}
      />

      <AddFilterDrawer
        state={filterState}
        setState={setfilterState}
        className="filterDrawer"
      >
        <Filter
          type="cashMemo"
          documentType={DOCUMENT_TYPE.CASH_MEMO}
          stateState={setfilterState}
          label={CashMemoLabel.state}
        />
      </AddFilterDrawer>
    </>
  );
};

export default Index;
