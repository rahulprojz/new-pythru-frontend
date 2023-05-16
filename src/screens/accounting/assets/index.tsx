import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

import Breadcrumbs from "../../../components/breadcrumb";
import NormalButton from "../../../components/buttons/buttonWithIcon";
import AssetTable from "../../../components/tables/assetsTable";
import AddProductDrawer from "../../../components/drawer";
import AddAssetsDrawer from "../../../components/drawer/productServicesDrawer";
import { getAssets, getAssetdetail, getAmountRange } from "./action";
import { updateAsset } from "./assetSlice";
import AddAsset from "./addAsset";
import "./assets.scss";
import Filter from "./filter";

const Index = () => {
  const dispatch: any = useDispatch();
  const [state, setState] = useState<boolean>(false);
  const [openAddEdit, setOpenAddEdit] = useState<boolean | string>(false);
  const [filterState, setfilterState] = useState<boolean>(false);
  const [fromDate, setFromDate] = useState<Date | null>(null);
  const [toDate, setToDate] = useState<Date | null>(null);
  const [purchaseFromDate, setPurchaseFromDate] = useState<Date | null>(null);
  const [purchaseToDate, setPurchaseToDate] = useState<Date | null>(null);
  const [filterCount, setFilterCount] = useState<number>(0);

  const { minAmount, maxAmount } = useSelector(
    (state: any) => state.assetSlice
  );

  const [amount, setAmount]: any = useState<number[]>(
    minAmount && maxAmount ? [minAmount, maxAmount] : [0, 1000]
  );

  useEffect(() => {
    dispatch(getAssets());
    dispatch(getAmountRange());
  }, []);

  useEffect(() => {
    minAmount && maxAmount
      ? setAmount([minAmount, maxAmount])
      : setAmount([0, 1000]);
  }, [minAmount, maxAmount]);

  const handleFromDate = (date: any) => {
    setFromDate(date);
    setToDate(null);
  };

  const handlePurchaseFromDate = (date: any) => {
    setPurchaseFromDate(date);
    setPurchaseToDate(null);
  };

  const handleAmountChange = (event: Event, newValue: number | number[]) => {
    setAmount(newValue);
  };

  const handleClearFilter = () => {
    setFilterCount(0);
    minAmount && maxAmount
      ? setAmount([minAmount, maxAmount])
      : setAmount([0, 1000]);

    setFromDate(null);
    setToDate(null);
    setPurchaseFromDate(null);
    setPurchaseToDate(null);

    dispatch(
      updateAsset({
        fromAmount: "",
        toAmount: "",
        fromDate: "",
        toDate: "",
        purchaseFromDate: "",
        purchaseToDate: "",
      })
    );
    dispatch(getAssets());
    setfilterState(false);
  };

  const handleFilter = () => {
    setFilterCount(0);
    if (fromDate && toDate) {
      dispatch(
        updateAsset({
          fromDate: fromDate ? moment(fromDate).format("YYYY-MM-DD") : "",
          toDate: toDate ? moment(toDate).format("YYYY-MM-DD") : "",
        })
      );
      setFilterCount((prevCount) => prevCount + 1);
    } else {
      setFromDate(null);
      setToDate(null);
      dispatch(
        updateAsset({
          fromDate: "",
          toDate: "",
        })
      );
    }

    if (purchaseFromDate && purchaseToDate) {
      dispatch(
        updateAsset({
          purchaseFromDate: purchaseFromDate
            ? moment(purchaseFromDate).format("YYYY-MM-DD")
            : "",
          purchaseToDate: purchaseToDate
            ? moment(purchaseToDate).format("YYYY-MM-DD")
            : "",
        })
      );
      setFilterCount((prevCount) => prevCount + 1);
    } else {
      setPurchaseFromDate(null);
      setPurchaseToDate(null);
      dispatch(
        updateAsset({
          purchaseFromDate: "",
          purchaseToDate: "",
        })
      );
    }
    setFilterCount((prevCount) => prevCount + 1);
    dispatch(
      updateAsset({
        fromAmount: amount[0],
        toAmount: amount[1],
      })
    );
    dispatch(getAssets());
    setfilterState(false);
  };

  return (
    <>
      <Breadcrumbs />

      <NormalButton
        buttonText="+ New assets"
        className="btn-purple"
        onPress={() => {
          setState(true);
          dispatch(
            updateAsset({
              editAsset: "",
            })
          );
        }}
      />
      <AssetTable
        filterPress={() => setfilterState(true)}
        handleEdit={(row: any) => {
          dispatch(getAssetdetail(row?._id, setState));
        }}
        setState={setState}
        count={filterCount}
      />
      <AddAssetsDrawer state={state} setState={setOpenAddEdit}>
        <AddAsset
          setState={setState}
          openAddEdit={openAddEdit}
          setOpenAddEdit={setOpenAddEdit}
        />
      </AddAssetsDrawer>

      <AddProductDrawer
        state={filterState}
        setState={setfilterState}
        className="filterDrawer"
      >
        <Filter
          fromDate={fromDate}
          toDate={toDate}
          purchaseFromDate={purchaseFromDate}
          purchaseToDate={purchaseToDate}
          amount={amount}
          minAmount={minAmount}
          maxAmount={maxAmount}
          setToDate={setToDate}
          setPurchaseToDate={setPurchaseToDate}
          handleFromDate={handleFromDate}
          handlePurchaseFromDate={handlePurchaseFromDate}
          handleAmountChange={handleAmountChange}
          handleClearFilter={handleClearFilter}
          handleFilter={handleFilter}
        />
      </AddProductDrawer>
    </>
  );
};

export default Index;
