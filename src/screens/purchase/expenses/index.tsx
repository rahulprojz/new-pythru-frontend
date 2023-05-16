import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Schema from "../../../schema";
import { useLocation } from "react-router-dom";
import CustomerTable from "../../../components/customersTables/CustomerTable";

import AddCustomerButton from "../../../components/buttons/buttonWithIcon";

import {
  PHONE_WHITE_CURVED,
  MAIL_WHITE_CURVED,
  LOCATION_WHITE_CURVED,
  EDIT_IMG_ICON,
  THANKSSMILE,
  TOTAL_AMOUNT_PAID,
  TOTAL_AMOUNT_DUE,
  TOTAL_TRANSACTIONS,
  deleteIMG,
  statusList,
} from "../../../constants";

import MenuItem from "@mui/material/MenuItem";

import { Formik, Form } from "formik";
import AddProductDrawer from "../../../components/drawer";
import CustomerDetailDrawer from "../../../components/drawer";
import Breadcrumbs from "../../../components/breadcrumb";
import Container from "../../../components/Hoc/container";
import TextField from "@mui/material/TextField";
import NormalButton from "../../../components/buttons/normalButton";
import "./expense.scss";

import "react-datepicker/dist/react-datepicker.css";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getExpensesListing, getCustomerlist, getAmountRage } from "./action";
import { updateExpense } from "../expenseListSlice";
import ExpenseTable from "../../../components/purchasing/expense/ExpenseTable";

import Filter from "../../../components/purchasing/expense/Filter";
import AddProductServicesDrawer from "../../../components/drawer";

import ExpenseAdd from "./expenseAdd";

function Index() {
  // const navigate = useNavigate();
  const pathname = useLocation().pathname;

  //const [state, setState] = React.useState(false);
  const dispatch: any = useDispatch();

  const [open, setOpen] = React.useState(false);
  const [filterState, setfilterState] = React.useState(false);

  const [state, setState] = React.useState(false);

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const [editData, setEditData] = useState({});

  const [openForAddEditExpense, setOpenForAddEditExpense] = useState(false);

  const {
    productServicesCategory,
    salesUnit,
    hsnCodeList,
    addCategories,
    imageUrl,
  } = useSelector((state: any) => state.productServicesSlice);

  useEffect(() => {
    dispatch(getAmountRage());
    dispatch(getExpensesListing());
    dispatch(getCustomerlist());
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [openfilterDrop, setopenfilterDrop] = useState(false);

  const filterhandleClick = () => {
    setopenfilterDrop((prev: any) => !prev);
  };
  const { permissions } = useSelector((state: any) => state.commonSlice);
  return (
    <>
      <Breadcrumbs />
      {(permissions && permissions["purchases"].add) || !permissions ? (
        <AddCustomerButton
          text="+ Create Expenses"
          className="btn-purple"
          onPress={() => {
            dispatch(
              updateExpense({
                type: 1,
              })
            );
            setState(true);
            setEditData({});
          }}
        />
      ) : (
        <></>
      )}
      {pathname.includes("transactions") ? (
        <>
          {(permissions && permissions["purchases"].add) || !permissions ? (
            <AddCustomerButton
              text="+ Create Income"
              className="btn-purple"
              onPress={() => {
                dispatch(
                  updateExpense({
                    type: 2,
                  })
                );
                setState(true);
                setEditData({});
              }}
            />
          ) : (
            <></>
          )}
        </>
      ) : (
        <></>
      )}
      <ExpenseTable
        handleEdit={(data: any) => {
          setState(true);
          setEditData(data);
        }}
        filterPress={() => setfilterState(true)}
      />

      <Filter openModal={filterState} setStates={setfilterState} />

      <AddProductServicesDrawer state={state} setState={setState}>
        <ExpenseAdd
          setState={setState}
          openForAddEditProduct={openForAddEditExpense}
          setOpenForAddEditProduct={setOpenForAddEditExpense}
          editData={editData}
        />
      </AddProductServicesDrawer>
    </>
  );
}
export default Index;
