import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import DashboardTable from "../../../../components/sales/dashboard/table";
import { getSaleDashboardList } from "../../action";
import { resetSalePurchase } from "../../salePurchaseSlice";
import AddFilterDrawer from "../../../../components/drawer";
import Breadcrumbs from "../../../../components/breadcrumb";
import Filter from "../../../../components/sales/common/filter";
import CreateMenuDropDown from "../../../../components/menu/createDropDown";
// import "../sales.scss";
import { useSelector } from "react-redux";

const Index = () => {
  const params = useParams();
  const dispatch: any = useDispatch();
  const [state, setState] = useState(false);
  const [filterState, setfilterState] = useState<boolean>(false);

  useEffect(() => {
    document.title = "Sales Dashboard | PyThru";
    dispatch(resetSalePurchase());
    dispatch(getSaleDashboardList());
  }, [params]);
  const { permissions } = useSelector((state: any) => state.commonSlice);
  return (
    <>
      <Breadcrumbs />
      {(permissions && permissions["sales"].add) || !permissions ? (
          <CreateMenuDropDown type="sales" />
      ) : (
        <></>
      )}

      <DashboardTable
        dashboardType="sales"
        filterPress={() => setfilterState(true)}
        setState={setState}
      />

      <AddFilterDrawer
        state={filterState}
        setState={setfilterState}
        className="filterDrawer"
      >
        <Filter type="dashboard" stateState={setfilterState} />
      </AddFilterDrawer>
    </>
  );
};

export default Index;
