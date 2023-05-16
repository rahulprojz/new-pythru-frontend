import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import DashboardTable from "../../../../components/sales/dashboard/table";
import { getSaleDashboardList } from "../../action";
import { resetSalePurchase, updateSalePurchase } from "../../salePurchaseSlice";
import AddEstimateButton from "../../../../components/buttons/buttonWithIcon";
import AddFilterDrawer from "../../../../components/drawer";

import Breadcrumbs from "../../../../components/breadcrumb";
import "./index.scss";

import Filter from "../../../../components/sales/common/filter";
import CreateMenuDropDown from "../../../../components/menu/createDropDown";

const Index = () => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch: any = useDispatch();

  const [state, setState] = useState(false);
  const [filterState, setfilterState] = useState<boolean>(false);

  useEffect(() => {
    dispatch(updateSalePurchase({ page:1 }));
  } , [])

  useEffect(() => {
    document.title = "Purchase Dashboard | PyThru";
    dispatch(updateSalePurchase({ type: 2 }));
    dispatch(getSaleDashboardList());
  }, [params]);
  const { permissions } = useSelector((state: any) => state.commonSlice);

  return (
    <>
      <Breadcrumbs />
      {(permissions && permissions["purchases"].add) || !permissions ? (
          <CreateMenuDropDown type="purchase" />
      ) : (
        <></>
      )}

      <DashboardTable
        dashboardType="purchase"
        filterPress={() => setfilterState(true)}
        setState={setState}
      />

      <AddFilterDrawer
        state={filterState}
        setState={setfilterState}
        className="filterDrawer"
      >
        <Filter type="purchaseDashboard" stateState={setfilterState} />
      </AddFilterDrawer>
    </>
  );
};

export default Index;
