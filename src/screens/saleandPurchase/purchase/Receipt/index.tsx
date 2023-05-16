import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import { routesConstant, ReceiptLabel } from "../../../../constants";
import Filter from "../../../../components/sales/common/filter";

import EstimateTable from "./table";
import { getSalePurchaseList } from "../../action";
import { resetSalePurchase, updateSalePurchase } from "../../salePurchaseSlice";
import AddEstimateButton from "../../../../components/buttons/buttonWithIcon";
import AddFilterDrawer from "../../../../components/drawer";

import Breadcrumbs from "../../../../components/breadcrumb";

const Index = () => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch: any = useDispatch();

  const [state, setState] = useState(false);
  const [filterState, setfilterState] = useState<boolean>(false);

  useEffect(() => {
    document.title = "Receipt | PyThru";
    dispatch(
      updateSalePurchase({
        type: 2,
        documentType: 11,
      })
    );

    dispatch(getSalePurchaseList());
    return () => {
      dispatch(resetSalePurchase());
    };
  }, [params]);

  const handleAddReceipt = () => {
    navigate(routesConstant.routeConstants.receiptAdd, ReceiptLabel);
  };
  const { permissions } = useSelector((state: any) => state.commonSlice);
  return (
    <>
      <Breadcrumbs />

      {(permissions && permissions["purchases"].add) || !permissions ? (
          <AddEstimateButton
            text="+ Create Receipt"
            className="btn-purple"
            onPress={handleAddReceipt}
          />
      ) : (
        <></>
      )}
      <EstimateTable
        filterPress={() => setfilterState(true)}
        labels={ReceiptLabel}
        setState={setState}
        handleAddReceipt={handleAddReceipt}
      />

      <AddFilterDrawer
        state={filterState}
        setState={setfilterState}
        className="filterDrawer"
      >
        <Filter
          type="cashMemo"
          documentType={11}
          stateState={setfilterState}
          label={ReceiptLabel.state}
        />
      </AddFilterDrawer>
    </>
  );
};

export default Index;
