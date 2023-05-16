import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import EstimateTable from "../../../../components/sales/estimate/table";
import { getSalePurchaseList, statesList } from "../../action";
import { resetSalePurchase } from "../../salePurchaseSlice";
import AddEstimateButton from "../../../../components/buttons/buttonWithIcon";
import AddFilterDrawer from "../../../../components/drawer";
import Filter from "../../../../components/sales/common/filter";
import Breadcrumbs from "../../../../components/breadcrumb";
import { DOCUMENT_TYPE, EstimateLabel } from "../../../../constants";
// import "../sales.scss";
import { useSelector } from "react-redux";
const Index = () => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch: any = useDispatch();
  const [state, setState] = useState(false);
  const [filterState, setfilterState] = useState<boolean>(false);

  useEffect(() => {
    document.title = "Estimate | PyThru";
    dispatch(resetSalePurchase());
    dispatch(getSalePurchaseList());
    dispatch(statesList());
    return () => {
      dispatch(resetSalePurchase());
    };
  }, [params]);

  const handleAddEstimate = () => {
    navigate("/sales/estimate/add", EstimateLabel);
  };
  const { permissions } = useSelector((state: any) => state.commonSlice);
  return (
    <>
      <Breadcrumbs />

      {(permissions && permissions["sales"].add) || !permissions ? (
          <AddEstimateButton
            text="+ Add Estimate"
            className="btn-purple"
            onPress={handleAddEstimate}
          />
      ) : (
        <></>
      )}

      <EstimateTable
        filterPress={() => setfilterState(true)}
        labels={EstimateLabel}
        setState={setState}
        handleAddEstimate={handleAddEstimate}
      />

      <AddFilterDrawer
        state={filterState}
        setState={setfilterState}
        className="filterDrawer"
      >
        <Filter
          type="estimate"
          documentType={DOCUMENT_TYPE.ESTIMATES}
          stateState={setfilterState}
          label={EstimateLabel.state}
        />
      </AddFilterDrawer>
    </>
  );
};

export default Index;
