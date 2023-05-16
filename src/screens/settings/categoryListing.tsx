import React, { useEffect, useState } from "react";
// import Grid from "@mui/material/Grid";
import SettingCategoryTable from "../../components/tables/settingCategoryTable";
import MenuForAdd from "./addProductServiceCategoryMenu";
import AddProductServicesDrawer from "../../components/drawer/productServicesDrawer";
import AddProduct from "./addCategory";
import FilterCategory from "./categoryFilter";
import "react-datepicker/dist/react-datepicker.css";
import { updateSettingsState } from "./settingSlice";
import { useDispatch } from "react-redux";
import { getProductAndServicesCategory } from "./action";
import { useSelector } from "react-redux";
function Index() {
  const [state, setState] = React.useState(false);
  const dispatch: any = useDispatch();
  const [openForAddEditCategory, setOpenForAddEditCategory] = useState(false);

  useEffect(() => {
    dispatch(getProductAndServicesCategory());

    // return () => {
    //   dispatch(resetSettings());
    // };
  }, []);
  const { permissions } = useSelector((state: any) => state.commonSlice);
  return (
    <>
      {(permissions && permissions["settings"].add) || !permissions ? (
        <MenuForAdd
          setType={(type: any) => {
            setState(true);
            dispatch(updateSettingsState({ type }));
          }}
        />
      ) : (
        <></>
      )}
      <SettingCategoryTable
        filterPress={() => {
          dispatch(updateSettingsState({ filterState: true }));
        }}
        handleEdit={(row: any) => {
          dispatch(updateSettingsState({ editData: row, type: row.type }));

          setState(true);
        }}
        setState={setOpenForAddEditCategory}
        // setState={setState}
        // count={filterCount}
      />
      <AddProductServicesDrawer
        state={state}
        setState={setOpenForAddEditCategory}
      >
        <AddProduct
          setState={setState}
          openForAddEditProduct={openForAddEditCategory}
          setOpenForAddEditProduct={setOpenForAddEditCategory}
        />
      </AddProductServicesDrawer>
      <FilterCategory />
    </>
  );
}

export default Index;
