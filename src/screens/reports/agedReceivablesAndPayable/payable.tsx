import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Breadcrumbs from "../../../components/breadcrumb";
import "./aged.scss";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch } from "react-redux";
import { getAgedData } from "./action";
import { updateAged } from "./agedSlice";
import AgedTablePayable from "./table";

// import ExpenseAdd from "./expenseAdd";

function Index() {
  const navigate = useNavigate();
  //const [state, setState] = React.useState(false);
  const dispatch: any = useDispatch();

  useEffect(() => {
    document.title = "Aged Payables | PyThru";
    dispatch(updateAged({ documentType: 9, tableList: [] }));
    dispatch(getAgedData());
  }, []);

  // const { permissions } = useSelector((state: any) => state.commonSlice);
  return (
    <>
      <Breadcrumbs />

      <AgedTablePayable />
    </>
  );
}
export default Index;
