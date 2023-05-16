import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import moment from "moment";
import { routesConstant, BillLabel } from "../../../../constants";
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
  // const pathname = useLocation().pathname;

  useEffect(() => {
    document.title = "Bills | PyThru";
    dispatch(
      updateSalePurchase({
        type: 2,
        documentType: 9,
      })
    );
    // dispatch(resetSalePurchase());
    dispatch(getSalePurchaseList());
    return () => {
      dispatch(resetSalePurchase());
    };
  }, [params]);
  const pathname = useLocation().pathname;

  const handleAddBill = () => {
    navigate(`${pathname}/add`, BillLabel);
  };
  const { permissions } = useSelector((state: any) => state.commonSlice);
  return (
    <>
      <Breadcrumbs />
      {(permissions &&
        (pathname.includes("payment")
          ? permissions["payments"].add
          : permissions["purchases"].add)) ||
      !permissions ? (
        <AddEstimateButton
          text="+ Create Bills"
          className="btn-purple"
          onPress={handleAddBill}
        />
      ) : (
        <></>
      )}
      <EstimateTable
        labels={BillLabel}
        filterPress={() => setfilterState(true)}
        setState={setState}
        handleAddBill={handleAddBill}
      />

      <AddFilterDrawer
        state={filterState}
        setState={setfilterState}
        className="filterDrawer"
      >
        <Filter
          type="bill"
          documentType={9}
          stateState={setfilterState}
          label={BillLabel.state}
        />
      </AddFilterDrawer>
    </>
  );
};

export default Index;
