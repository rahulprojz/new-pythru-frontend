import { useMemo, useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
} from "@mui/material";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import NormalButton from "../../../../components/buttons/normalButton";
import { calenderIMG } from "../../../../constants";
import { getParentChildCategory } from "../../../../utils";
import DropdownTreeSelect from "react-dropdown-tree-select";
import { updateGeneralAndTrail } from "../trailAndgeneralSlice";
import { getGeneralLedgerList } from "../action";

interface filterProps {
  categoryData: any;
  stateState: React.Dispatch<React.SetStateAction<boolean>>;
}

const Filter = (props: filterProps) => {
  const dispatch: any = useDispatch();
  const newDate = new Date();
  const firstDay = new Date(newDate.getFullYear(), newDate.getMonth(), 1);
  const { categoryData, stateState } = props;
  const { fromDate, toDate, selectedCategories } = useSelector(
    (state: any) => state.generalAndTrail
  );
  const categories = getParentChildCategory(categoryData, selectedCategories);

  let formValues = {
    fromDate: fromDate || firstDay,
    toDate: toDate || new Date(),
  };

  const [values, setValues] = useState(formValues);

  const handleFilter = () => {
    const val = {
      ...values,
      filterCount: handleFilterCount(values),
    };

    dispatch(updateGeneralAndTrail(val));
    dispatch(getGeneralLedgerList());
    stateState(false);
  };

  const handleClearFilter = () => {
    const val = {
      fromDate: "",
      toDate: "",
      selectedCategories: [],
      filterCount: 0,
    };
    setValues(val);
    dispatch(updateGeneralAndTrail(val));
    dispatch(getGeneralLedgerList());
    stateState(false);
  };

  const handleFilterCount = (values: any) => {
    let count = 0;
    if (values.toDate || values.fromDate) {
      count = count + 1;
    }
    if (selectedCategories.length > 0) {
      count = count + 1;
    }
    return count;
  };

  const onChangeCategoryDrop = (currentNode: any, selectedNodes: any) => {
    if (currentNode?.matchInChildren) {
      dispatch(
        updateGeneralAndTrail({
          selectedCategories: currentNode._children,
        })
      );
    } else {
      dispatch(
        updateGeneralAndTrail({
          selectedCategories: selectedNodes.map((v: any) => v.row_id),
        })
      );
    }
  };

  const categoryMemo = useMemo(() => {
    return (
      <DropdownTreeSelect
        onChange={onChangeCategoryDrop}
        data={categories}
        //showPartiallySelected={true}
        className='mdl-demo'
        keepTreeOnSearch
        keepChildrenOnSearch
      />
    );
  }, []);

  return (
    <>
      <h3 className='hd'>Filter</h3>

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls='panel1a-content'
          id='panel1a-header'
        >
          Select Category
        </AccordionSummary>
        <AccordionDetails>{categoryMemo}</AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls='panel1a-content'
          id='panel1a-header'
        >
          Date Range
        </AccordionSummary>
        <AccordionDetails>
          <div className='filter-range-picker'>
            <div className='filterDate m-b-20'>
              <i>
                <img src={calenderIMG} alt='' />
              </i>
              <DatePicker
                dateFormat='dd-MM-yyyy'
                selected={values?.fromDate}
                onChange={(date) => {
                  setValues((prev: any) => ({
                    ...prev,
                    fromDate: date || "",
                    toDate: "",
                  }));
                }}
                placeholderText='From'
                maxDate={new Date()}
              />
            </div>
            <div className='filterDate'>
              <i>
                <img src={calenderIMG} alt='' />
              </i>
              <DatePicker
                dateFormat='dd-MM-yyyy'
                selected={values.toDate}
                onChange={(date) => {
                  setValues((prev: any) => ({
                    ...prev,
                    toDate: date || "",
                  }));
                }}
                minDate={values.fromDate || new Date()}
                maxDate={new Date()}
                placeholderText='To'
              />
            </div>
          </div>
        </AccordionDetails>
      </Accordion>

      <Grid container rowSpacing={3} columnSpacing={2}>
        <Grid item xs={6}>
          <NormalButton
            className='btn-simple w-100 m-t-20'
            buttonText='Clear'
            onPress={handleClearFilter}
          />
        </Grid>
        <Grid item xs={6}>
          <NormalButton
            className='btn-purple w-100 m-t-20'
            buttonText='Apply'
            onPress={handleFilter}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default Filter;
