import Schema from "../../schema";
import Grid from "@mui/material/Grid";

import NormalInput from "../../components/inputs/normalInput";
import { Formik, Form } from "formik";
import TextField from "@mui/material/TextField";
import NormalButton from "../../components/buttons/normalButton";

import { addCategories, updateCategory } from "./action";
import DeleteDialog from "../../components/dialog";
import { updateSettingsState } from "./settingSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import { Box } from "@mui/system";
interface EnhancedCategoryProps {
  setState: any;
  openForAddEditProduct: any;
  setOpenForAddEditProduct: any;
}

function Index({
  setState,
  openForAddEditProduct,
  setOpenForAddEditProduct,
}: EnhancedCategoryProps) {
  const dispatch: any = useDispatch();

  const { editData } = useSelector((state: any) => state.settingSlice);
  const initialValues = {
    name: editData ? editData?.categoryName : "",
    description: editData ? editData?.description : "",
  };

  //********Add Validation on ProductName*/

  return (
    <Box>
      <h3 className="hd">{`${editData ? "Edit" : "Create New"}`} Category</h3>
      <br />
      <Formik
        initialValues={initialValues}
        enableReinitialize
        validationSchema={Schema.addCategorySchema}
        onSubmit={(values, { resetForm, setSubmitting }) => {
          if (editData) {
            dispatch(
              updateCategory(values, editData?._id, (res: any) => {
                setState(false);
                setOpenForAddEditProduct(false);
                dispatch(
                  updateSettingsState({
                    editData: null,
                  })
                );
              })
            );
          } else {
            dispatch(
              addCategories(values, (res: any) => {
                setState(false);
                setOpenForAddEditProduct(false);
                dispatch(
                  updateSettingsState({
                    editData: null,
                  })
                );
                resetForm();
              })
            );
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
                <TextField
                  label="Description"
                  name={"description"}
                  required
                  value={values.description}
                  id="description"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={Boolean(touched.description && errors.description)}
                  helperText={
                    touched.description &&
                    `${errors.description ? errors.description : ""}`
                  }
                  multiline
                  className="textarea-cover"
                  rows={2}
                />
              </Grid>
              <Grid item xs={12}>
                <Grid container rowSpacing={3} columnSpacing={2}>
                  <Grid item xs={6}>
                    <NormalButton
                      onPress={() => setOpenForAddEditProduct("cancel")}
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
        dialogOpen={openForAddEditProduct}
        dialogTitle="Category"
        yesHandle={() => {
          if (openForAddEditProduct == "cancel") {
            setState(false);
            setOpenForAddEditProduct(false);
            dispatch(
              updateSettingsState({
                editData: "",
              })
            );
          }
        }}
        handleDialogClose={() => {
          setOpenForAddEditProduct(false);
          // dispatch(
          //   updateSettingsState({
          //     editData: "",
          //   })
          // );
        }}
        dialogPara={`Are you sure you want to close ${
          openForAddEditProduct == "cancel"
            ? " without update/add this Category?"
            : editData
            ? "update this Category?"
            : "add this Category?"
        }`}
        nvCancel="Cancel"
        nvYes="Yes"
      />
    </Box>
  );
}

export default Index;
