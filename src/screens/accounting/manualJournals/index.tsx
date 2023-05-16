import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import NormalButton from "../../../components/buttons/normalButton";

import AddFilterDrawer from "../../../components/drawer";
import Breadcrumbs from "../../../components/breadcrumb";
import EnhancedTable from "../../../components/tables/manualJournal";
import Filter from "./filter";
import { CashMemoLabel, DOCUMENT_TYPE } from "../../../constants";
import "./manualJournal.scss";
import { useSelector } from "react-redux";
import { getManualJournalList } from "./action";
import { resetManualJournal } from "./manualJournalSlice";
import { array } from "yup/lib/locale";
import { getParentChildCategory } from "../../../utils";
import AddProductServicesDrawer from "../../../components/drawer";
import Add from "./addManualJournal";

interface Props {
  dashboardHide?: boolean;
}

const Index = ({ dashboardHide }: Props) => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch: any = useDispatch();

  const [state, setState] = useState(false);
  const [filterState, setfilterState] = useState<boolean>(false);
  const [rowData, setRowData] = useState<any>();

  const { chartOfAccountMasterData } = useSelector(
    (state: any) => state.commonSlice
  );

  var categoryies = chartOfAccountMasterData.map((v: any) => v.categories);
  var manualJournalCategory = categoryies.flat();

  var data = getParentChildCategory(manualJournalCategory, []);

  useEffect(() => {
    dispatch(resetManualJournal());
    if (dashboardHide) {
      let limit = 5;
      dispatch(getManualJournalList(limit));
    } else {
      document.title = "Manual-Journals | PyThru";
      dispatch(getManualJournalList());
    }
  }, []);

  return (
    <>
      {!dashboardHide && <Breadcrumbs />}
      {!dashboardHide && (
        <NormalButton
          buttonText="+ New Manual Journal"
          className="btn-purple"
          onPress={() => {
            setState(true);
            setRowData("");
          }}
        />
      )}

      <EnhancedTable
        dashboardHide={dashboardHide}
        filterPress={() => setfilterState(true)}
        getRowData={(data) => {
          setRowData(data);
          setState(true);
        }}
        setState={setState}
        handleAddManualJournal={() => {
          setState(true);
          setRowData("");
        }}
      />

      <AddFilterDrawer
        state={filterState}
        setState={setfilterState}
        className="filterDrawer"
      >
        <Filter
          categoryData={manualJournalCategory}
          stateState={setfilterState}
        />
      </AddFilterDrawer>

      <AddProductServicesDrawer state={state} setState={setState}>
        <Add
          categories={manualJournalCategory}
          setState={setState}
          editData={rowData}
        />
      </AddProductServicesDrawer>
    </>
  );
};

export default Index;
