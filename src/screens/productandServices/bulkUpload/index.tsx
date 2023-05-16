import { Typography } from "@material-ui/core";
import Grid from "@mui/material/Grid";
import Breadcrumbs from "../../../components/breadcrumb";
import DownloadIcon from "@mui/icons-material/Download";
import NormalButton from "../../../components/buttons/normalButton";
import IconLabelButtons from "../../../components/buttons/buttonWithIcon";
import MessageDialog from "../../../components/dialog/index";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import "./bulkUpload.scss";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  bulkExcelUpload,
  downloadProductExcel,
  getProductAndServicesPresignedurl,
} from "../action";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { updateGlobalLoader } from "../../../components/backdrop/backdropSlice";
import { useSelector } from "react-redux";
function index() {
  const location = useLocation();
  const dispatch: any = useDispatch();
  const navigate = useNavigate();

  const { fileUrl } = useSelector((state: any) => state.productServicesSlice);

  const q = new URLSearchParams(location.search);

  const category_id = q.get("category_id");
  const template = q.get("template");
  const type = q.get("type");
  const fileNameConstant = q.get("fileNameConstant");

  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  const [fileName, setFileName] = useState("");

  const [fileData, setFileData] = useState({
    fileName: "",
    filePath: "",
    type: type,
  });

  const [errorList, setErrorList] = useState<any>({});

  const handleFile = (event: any) => {
    dispatch(updateGlobalLoader(true));
    const file = event.target.files[0];
    const key = Math.floor(Date.now() / 1000);
    const ext = event.target.files[0].type.split("/")[1];
    dispatch(
      getProductAndServicesPresignedurl(
        key,
        ext,
        event.target.files[0],
        (filePath: string) => {
          setFileData((prev) => ({ ...prev, filePath: filePath }));
        }
      )
    );
    //var base64: any = await convertBase64(file);
    event.target.value = null;
    setFileName(file.name);
    setFileData((prev) => ({ ...prev, fileName: key + "." + ext }));
  };

  const convertBase64 = (file: any) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        dispatch(updateGlobalLoader(false));
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };
  const downloadExcel = (e: any) => {
    e.preventDefault();
    dispatch(downloadProductExcel(category_id, fileNameConstant));
  };

  const downloadTemplateExcel = (e: any) => {
    e.preventDefault();
    dispatch(downloadProductExcel(template, 20));
  };

  const handleSubmit = () => {
    // const baseEncode = fileData.replace(
    //   "data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,",
    //   ""
    // );
    dispatch(
      bulkExcelUpload(fileData, setDialogOpen, (response: any) => {
        setErrorList(response);
      })
    );
    setFileData({
      fileName: "",
      filePath: "",
      type: type,
    });
  };
  return (
    <>
      <Breadcrumbs />
      <Grid container spacing={3}>
        <Grid item sm={6} md={6}>
          <div className="bg-white">
            <Typography variant="subtitle1" className="bold">
              Download File for :{" "}
              <a href="#" onClick={downloadExcel}>
                {category_id == "1" ? "Product" : "Service"} Categories
              </a>
            </Typography>
            {/* <ul className="file-for">
              <li></li>
            </ul> */}
            <Typography
              variant="body1"
              className="bold m-t-10 m-b-20 uppercase"
            >
              UPLOAD EXCEL FILE(.xlsx)
            </Typography>

            <div className="choose-file" title="Click to add files">
              {!fileName && <CloudDownloadIcon fontSize="large" />}
              <Typography variant="body1" className="semi-bold mt-10">
                {!fileName ? "Choose a file" : fileName}
              </Typography>
              <input
                type="file"
                onChange={handleFile}
                accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
              />
            </div>

            <div className="center m-t-20">
              <IconLabelButtons
                ButtonIcon={<DownloadIcon />}
                text={"Download Template"}
                className="btn-purple-border c-purple"
                onPress={downloadTemplateExcel}
              />
            </div>
            <div className="Dflex al-cnt js-cnt">
              <NormalButton
                className="btn-simple m-t-20 m-r-20"
                buttonText="Cancel"
                onPress={() => {
                  navigate("/products-&-services/products");
                }}
              />
              <NormalButton
                disabled={!fileData}
                className="btn-purple m-t-20"
                buttonText="Submit"
                onPress={handleSubmit}
              />
            </div>
          </div>
        </Grid>
        <Grid item sm={6} md={6}>
          <div className="bg-white">
            <Typography variant="subtitle1" className="bold m-b-10">
              Bulk Upload Instructions:
            </Typography>
            <ul className="note">
              <li>
                <b>M-</b>Mandatory Field
              </li>
              <li>
                <b>U-</b>Unique Field
              </li>
              <li>
                <b>MU-</b>Mandatory and Unique Field
              </li>
              <li>
                <b>O-</b>Optional Field
              </li>

              <li>
                Select the predefined values from the dropdown in the sheet
              </li>
              <li>
                Please download the {category_id == "1" ? "Product" : "Service"}{" "}
                Categories Excel File to enter the data in the sheet.
              </li>
            </ul>
          </div>
        </Grid>
      </Grid>
      <Dialog open={dialogOpen} className="dialog_pop" maxWidth="sm" fullWidth>
        <DialogTitle>Error/Success Messages</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Typography
              variant="subtitle1"
              className="m-b-10"
              style={{ color: "green" }}
            >
              {errorList?.success}
            </Typography>
            {errorList?.errors?.length > 0 && (
              <ul className="error-messages">
                {errorList?.errors?.map((val: any, i: number) => {
                  return <li>{val}</li>;
                })}
              </ul>
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <NormalButton
            buttonText="Close"
            onPress={() => {
              setFileName("");
              setDialogOpen(false);
            }}
            className="btn-simple"
          />
        </DialogActions>
      </Dialog>
    </>
  );
}
export default index;
