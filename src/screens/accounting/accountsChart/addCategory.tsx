import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import NormalInput from "../../../components/inputs/normalInput";
import { Formik, Form } from "formik";
import DeleteDialog from "../../../components/dialog";

import NormalButton from "../../../components/buttons/normalButton";
import NormalSelect from "../../../components/select/normalSelect";
import { useSelector } from "react-redux";
import Autocomplete from "../../../components/autocomplete";
import { Box } from "@mui/system";
import Schema from "../../../schema";
import { addChartOfAcc, updateChartOfAcc } from "./action";
import { useDispatch } from "react-redux";
const Index = ({
  editData,
  setState,
  setEditData,
  openConfirmation,
  setOpenConfirmation,
  state,
}: any) => {
  const initialValue = {
    name: editData ? editData.name : "",
    parentCategoryId: editData ? editData.chartOfAccountId : "",
    chartOfAccountId: editData ? editData.id : "",
    chartOfAccountType: editData ? editData.type : "",
  };
  const dispatch: any = useDispatch();
  const { chartOfAccountMasterData } = useSelector(
    (state: any) => state.commonSlice
  );
  return (
    <div className="page-addcategory">
      <h3 className="hd">{editData ? "Edit" : "Create"} Account Category</h3>
      <br />
      <Formik
        enableReinitialize
        initialValues={initialValue}
        validationSchema={Schema.chartOfAccountCategorySchema}
        onSubmit={(values, { resetForm }) => {
          if (editData) {
            dispatch(
              updateChartOfAcc(values, setState, setEditData, resetForm)
            );
          } else {
            dispatch(addChartOfAcc(values, setState, resetForm));
          }
        }}
      >
        {({
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
          touched,
          values,
          setFieldValue,
          isValid,
        }) => (
          <Form>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <NormalInput
                  name={"name"}
                  isRequired
                  values={values.name}
                  type={"text"}
                  onChange={handleChange}
                  focused={false}
                  sizeval="medium"
                  label="Category Name"
                  error={Boolean(touched.name && errors.name)}
                  helperText={touched.name && errors.name}
                />
              </Grid>
              <Grid item xs={12}>
                <NormalSelect
                  disabled={editData}
                  values={values.chartOfAccountType}
                  label="L1 Parent Category"
                  options={chartOfAccountMasterData.map((item: any) => (
                    <MenuItem value={item?.chartOfAccountType}>
                      {item?.chartOfAccountName}
                    </MenuItem>
                  ))}
                  handleChange={handleChange}
                  name={"chartOfAccountType"}
                  error={
                    touched.chartOfAccountType && errors.chartOfAccountType
                  }
                />
              </Grid>
              {/* {values.parentCategoryId ? ( */}
              <Grid
                item
                xs={12}
                key={"parentCategoryId" + values.parentCategoryId}
              >
                <Autocomplete
                  disabled={!values.chartOfAccountType || editData}
                  value={values.parentCategoryId}
                  label={"L2 Parent Category"}
                  onChange={(_e: any, newValue: any) => {
                    setFieldValue("parentCategoryId", newValue?._id);
                  }}
                  defaultValue={() => {
                    const index = chartOfAccountMasterData[
                      chartOfAccountMasterData?.length &&
                        chartOfAccountMasterData.findIndex(
                          (x: any) =>
                            x.chartOfAccountType === values.chartOfAccountType
                        )
                    ]?.categories?.findIndex(
                      (x: any) => x?._id === values.parentCategoryId
                    );
                    //

                    return chartOfAccountMasterData[
                      chartOfAccountMasterData?.length &&
                        chartOfAccountMasterData.findIndex(
                          (x: any) =>
                            x.chartOfAccountType === values.chartOfAccountType
                        )
                    ]?.categories[index];
                  }}
                  onBlur={handleBlur}
                  size="small"
                  name="parentCategoryId"
                  error={Boolean(
                    touched.parentCategoryId && errors.parentCategoryId
                  )}
                  helperText={
                    touched.parentCategoryId && errors.parentCategoryId
                  }
                  options={
                    chartOfAccountMasterData[
                      chartOfAccountMasterData?.length &&
                        chartOfAccountMasterData.findIndex(
                          (x: any) =>
                            x.chartOfAccountType === values.chartOfAccountType
                        )
                    ]?.categories
                  }
                  // isOptionEqualToValue={(option: any, value: any) => option.parentCategoryId === value?.parentCategoryId}
                  getOptionLabel={(option: any) => option.categoryName || ""}
                  renderOption={(props: any, option: any) => {
                    return (
                      <Box
                        component="li"
                        sx={{
                          "& > img": { mr: 2, flexShrink: 0 },
                          fontFamily: "Poppins",
                        }}
                        {...props}
                        key={option._id}
                      >
                        {option.categoryName}
                      </Box>
                    );
                  }}
                />
              </Grid>
              {/* ) : ( */}
              {/* <></> */}
              {/* )} */}
              <Grid item xs={12}>
                <Grid container rowSpacing={3} columnSpacing={2}>
                  <Grid item xs={6}>
                    <NormalButton
                      onPress={() => setOpenConfirmation("cancel")}
                      variant="contained"
                      buttonText="Cancel"
                      className="btn-simple w-100"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <NormalButton
                      type="submit"
                      variant="contained"
                      buttonText="Submit"
                      className="btn-purple w-100"
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
      <DeleteDialog
        dialogOpen={openConfirmation}
        dialogTitle="Category"
        yesHandle={() => {
          if (openConfirmation == "cancel") {
            setState(false);
            setEditData(false);
            setOpenConfirmation(false);
          }
        }}
        handleDialogClose={() => setOpenConfirmation()}
        dialogPara={`Are you sure you want to close without update/add this Category?`}
        nvCancel="Cancel"
        nvYes="Yes"
      />
    </div>
  );
};
export default Index;
