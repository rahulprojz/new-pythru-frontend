import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import { routesConstant, PurchaseOrderLabel } from "../../../../constants";
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
    // dispatch(resetSalePurchase());
    document.title = "Purchase Order | PyThru";
    dispatch(
      updateSalePurchase({
        type: 2,
        documentType: 7,
      })
    );
    dispatch(getSalePurchaseList());
    return () => {
      dispatch(resetSalePurchase());
    };
  }, [params]);

  const handleAddPurchaseOrder = () => {
    navigate(
      routesConstant.routeConstants.purchaseOrderAdd,
      PurchaseOrderLabel
    );
  };
  const { permissions } = useSelector((state: any) => state.commonSlice);
  return (
    <>
      <Breadcrumbs />
      {(permissions && permissions["purchases"].add) || !permissions ? (
          <AddEstimateButton
            text="+ Create Purchase Order"
            className="btn-purple"
            onPress={handleAddPurchaseOrder}
          />
      ) : (
        <></>
      )}
      <EstimateTable
        filterPress={() => setfilterState(true)}
        labels={PurchaseOrderLabel}
        handleAddPurchaseOrder={handleAddPurchaseOrder}
        setState={setState}
      />

      <AddFilterDrawer
        state={filterState}
        setState={setfilterState}
        className="filterDrawer"
      >
        <Filter
          type="order"
          documentType={7}
          stateState={setfilterState}
          label={PurchaseOrderLabel.state}
        />
      </AddFilterDrawer>
    </>
  );
};

export default Index;
