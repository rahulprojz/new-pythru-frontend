import React, { useEffect } from "react";
import Breadcrumbs from "../../../components/breadcrumb";
import "./aged.scss";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch } from "react-redux";
import { getAgedData } from "./action";
// import NormalSelect from "../../../components/select/normalSelect";
import { updateAged, resetAdged } from "./agedSlice";

import AgedTablePayable from "./table";

function Index() {
  //const [state, setState] = React.useState(false);
  const dispatch: any = useDispatch();

  useEffect(() => {
    dispatch(updateAged({ documentType: 3, tableList: [] }));
    dispatch(getAgedData());
    return () => {
      dispatch(resetAdged());
    };
    // dispatch(getExpensesListing());
    // dispatch(getCustomerlist());
  }, []);

  return (
    <>
      <Breadcrumbs />

      <AgedTablePayable />
    </>
  );
}
export default Index;
