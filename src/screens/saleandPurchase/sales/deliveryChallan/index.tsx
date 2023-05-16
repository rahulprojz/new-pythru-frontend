import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import { getSalePurchaseList, statesList } from "../../action";
import { resetSalePurchase, updateSalePurchase } from "../../salePurchaseSlice";
import AddEstimateButton from "../../../../components/buttons/buttonWithIcon";
import AddFilterDrawer from "../../../../components/drawer";
import Breadcrumbs from "../../../../components/breadcrumb";
import EnhancedTable from "../../../../components/sales/deliveryChallan/table";
import Filter from "../../../../components/sales/common/filter";
import { DeliveryLabel, DOCUMENT_TYPE } from "../../../../constants";
// import "../sales.scss";
import { useSelector } from "react-redux";

const Index = () => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch: any = useDispatch();
  const [state, setState] = useState(false);
  const [filterState, setfilterState] = useState<boolean>(false);

  useEffect(() => {
    document.title = "Delivery Challan | PyThru";
    dispatch(resetSalePurchase());
    dispatch(
      updateSalePurchase({ documentType: DOCUMENT_TYPE.DELIVERY_CHALLAN })
    );
    dispatch(getSalePurchaseList());
    dispatch(statesList());
    return () => {
      dispatch(resetSalePurchase());
    };
  }, [params]);

  const handleAddDeliveryChallan = () => {
    navigate("/sales/delivery/add", DeliveryLabel);
  };
  const { permissions } = useSelector((state: any) => state.commonSlice);
  return (
    <>
      <Breadcrumbs />
      {(permissions && permissions["sales"].add) || !permissions ? (
          <AddEstimateButton
            text="+New Delivery Challan"
            onPress={handleAddDeliveryChallan}
            className="btn-purple"
          />
      ) : (
        <></>
      )}

      <EnhancedTable
        filterPress={() => setfilterState(true)}
        setState={setState}
        labels={DeliveryLabel}
        handleAddDeliveryChallan={handleAddDeliveryChallan}
      />

      <AddFilterDrawer
        state={filterState}
        setState={setfilterState}
        className="filterDrawer"
      >
        <Filter
          type="order"
          documentType={DOCUMENT_TYPE.DELIVERY_CHALLAN}
          stateState={setfilterState}
          label={DeliveryLabel.state}
        />
      </AddFilterDrawer>
    </>
  );
};

export default Index;
