import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import { getSalePurchaseList, statesList } from "../../action";
import { resetSalePurchase, updateSalePurchase } from "../../salePurchaseSlice";
import AddEstimateButton from "../../../../components/buttons/buttonWithIcon";
import AddFilterDrawer from "../../../../components/drawer";
import Breadcrumbs from "../../../../components/breadcrumb";
import EnhancedTable from "../../../../components/sales/salesOrder/table";
import Filter from "../../../../components/sales/common/filter";
import { DOCUMENT_TYPE, SalesOrderLabel } from "../../../../constants";
// import "../sales.scss";
import { useSelector } from "react-redux";
const Index = () => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch: any = useDispatch();
  const [state, setState] = useState(false);
  const [filterState, setfilterState] = useState<boolean>(false);

  useEffect(() => {
    document.title = "Sales Order | PyThru";
    dispatch(resetSalePurchase());
    dispatch(updateSalePurchase({ documentType: DOCUMENT_TYPE.SALES_ORDER }));
    dispatch(getSalePurchaseList());
    dispatch(statesList());
    return () => {
      dispatch(resetSalePurchase());
    };
  }, [params]);

  const handleAddSalesOrder = () => {
    navigate("/sales/order/add", SalesOrderLabel);
  };
  const { permissions } = useSelector((state: any) => state.commonSlice);
  return (
    <>
      <Breadcrumbs />
      {(permissions && permissions["sales"].add) || !permissions ? (
          <AddEstimateButton
            text="+ Add Sales Order"
            className="btn-purple"
            onPress={handleAddSalesOrder}
          />
      ) : (
        <></>
      )}

      <EnhancedTable
        filterPress={() => setfilterState(true)}
        setState={setState}
        labels={SalesOrderLabel}
        handleAddSalesOrder={handleAddSalesOrder}
      />
      <AddFilterDrawer
        state={filterState}
        setState={setfilterState}
        className="filterDrawer"
      >
        <Filter
          type="order"
          documentType={DOCUMENT_TYPE.SALES_ORDER}
          stateState={setfilterState}
          label={SalesOrderLabel.state}
        />
      </AddFilterDrawer>
    </>
  );
};

export default Index;
