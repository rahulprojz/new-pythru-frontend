import { useState } from "react";

import FormControlLabel from "@mui/material/FormControlLabel";
import Paper from "@mui/material/Paper";
import AddProductDrawer from "../../components/drawer";
import Button from "../../components/buttons/normalButton";
import { productServices } from "../../constants";
import { getProductAndServicesCategory } from "./action";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Checkbox,
  FormGroup,
  Grid,
} from "@mui/material";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import "react-datepicker/dist/react-datepicker.css";
import { updateSettingsState } from "./settingSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { elementFromArray } from "../../utils/Common.Function";

function Index() {
  const dispatch: any = useDispatch();
  const [category, setCategory] = useState<any>([]);
  let { filterState } = useSelector((state: any) => state.settingSlice);
  const handleCategoryChange = (e: any) => {
    if (e.target.checked) {
      setCategory([...category, +e.target.name]);
    } else {
      setCategory(elementFromArray(category, +e.target.name));
    }
  };
  const handleAllCategoryChange = (e: any) => {
    if (e.target.checked) {
      if (productServices && productServices.length > 0) {
        let ids = productServices.map(({ key }: any) => key);
        setCategory(ids);
      }
    } else {
      setCategory([]);
    }
  };

  const handleClearFilter = () => {
    setCategory([]);
    dispatch(
      updateSettingsState({
        filterState: false,
        filterCount: 0,
        categories: [],
      })
    );
    dispatch(getProductAndServicesCategory());
  };
  const handleFilter = () => {
    dispatch(updateSettingsState({ categories: [], filterCount: 0 }));
    if (category.length > 0) {
      dispatch(
        updateSettingsState({
          categories: category,
          filterCount: 1,
        })
      );
    }
    dispatch(getProductAndServicesCategory());
    dispatch(updateSettingsState({ filterState: false }));
  };

  return (
    <>
      <AddProductDrawer
        state={filterState}
        togalDrawrr={() => {
          dispatch(updateSettingsState({ filterState: !filterState }));
        }}
        className="filterDrawer"
      >
        <h3 className="hd">Filter</h3>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            Category
          </AccordionSummary>
          <AccordionDetails>
            <Paper elevation={3} className="categoryList">
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      name={"All"}
                      onChange={handleAllCategoryChange}
                      checked={
                        category && productServices
                          ? category.length === productServices.length
                          : false
                      }
                    />
                  }
                  label={"All"}
                  labelPlacement="start"
                />

                {productServices &&
                  productServices.length > 0 &&
                  productServices.map((item: any) => (
                    <FormControlLabel
                      control={
                        <Checkbox
                          name={item?.key}
                          onChange={handleCategoryChange}
                          checked={category.includes(+item?.key)}
                        />
                      }
                      label={item?.title}
                      labelPlacement="start"
                      key={item?.key}
                    />
                  ))}
              </FormGroup>
            </Paper>
          </AccordionDetails>
        </Accordion>

        <Grid container rowSpacing={3} columnSpacing={2}>
          <Grid item xs={6}>
            <Button
              className="btn btn-simple w-100 m-t-20"
              buttonText="Clear"
              onPress={handleClearFilter}
            />
          </Grid>
          <Grid item xs={6}>
            <Button
              className="btn btn-purple w-100 m-t-20"
              buttonText="Apply"
              onPress={handleFilter}
            />
          </Grid>
        </Grid>
      </AddProductDrawer>
    </>
  );
}

export default Index;
