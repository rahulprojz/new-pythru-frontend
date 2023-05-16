import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";

import { getSalePurchaseList, statesList } from "../../action";
import { resetSalePurchase, updateSalePurchase } from "../../salePurchaseSlice";
import AddEstimateButton from "../../../../components/buttons/buttonWithIcon";
import AddFilterDrawer from "../../../../components/drawer";
import Breadcrumbs from "../../../../components/breadcrumb";
import EnhancedTable from "../../../../components/sales/salesInvoice/table";
import Filter from "../../../../components/sales/common/filter";
import { DOCUMENT_TYPE, SalesInvoiceLabel } from "../../../../constants";
// import "../sales.scss";
import { useSelector } from "react-redux";

const Index = () => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch: any = useDispatch();
  const [state, setState] = useState(false);
  const [filterState, setfilterState] = useState<boolean>(false);
  const pathname = useLocation().pathname;

  useEffect(() => {
    document.title = "Sales Invoice | PyThru";
    dispatch(resetSalePurchase());

    dispatch(updateSalePurchase({ documentType: DOCUMENT_TYPE.INVOICE }));
    dispatch(getSalePurchaseList());
    dispatch(statesList());
    return () => {
      dispatch(resetSalePurchase());
    };
  }, [params]);
  console.log(pathname, "navigate");

  const handleAddInvoice = () => {
    navigate(`${pathname}/add`, SalesInvoiceLabel);
  };
  const { permissions } = useSelector((state: any) => state.commonSlice);

  return (
    <>
      <Breadcrumbs />
      {(permissions && pathname.includes("payment")
        ? permissions && permissions["payments"]?.add
        : permissions && permissions["sales"]?.add) || !permissions ? (
        <AddEstimateButton
          text="+ New Invoices"
          className="btn-purple"
          onPress={handleAddInvoice}
        />
      ) : (
        <></>
      )}
      <EnhancedTable
        filterPress={() => setfilterState(true)}
        setState={setState}
        labels={SalesInvoiceLabel}
        handleAddInvoice={handleAddInvoice}
      />

      <AddFilterDrawer
        state={filterState}
        setState={setfilterState}
        className="filterDrawer"
      >
        <Filter
          type="invoice"
          documentType={DOCUMENT_TYPE.INVOICE}
          stateState={setfilterState}
          label={SalesInvoiceLabel.state}
        />
      </AddFilterDrawer>
    </>
  );
};

export default Index;
