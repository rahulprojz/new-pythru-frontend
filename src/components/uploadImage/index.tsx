import { Fragment, useState } from "react";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import "./uploadImage.scss";
import { UPLOAD_IMG } from "../../constants";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteDialog from "./../dialog/index";
import { deleteIMG } from "../../constants";
import { updateProductAndServices } from "../../screens/productandServices/productServiceSlice";
import { updateCustomer } from "../../screens/payments/customerListSlice";
import { useDispatch } from "react-redux";

export default function UploadImage({
  onChange,
  file,
  type = "customer",
  label,
  placeholder,
  className,
  onDelete,
}: any) {
  const [open, setOpen] = useState(false);
  const dispatch: any = useDispatch();
  const editImage = () => {
    document.getElementById("uploadImage")?.click();
  };
  return (
    <div className={className}>
      <Typography variant="subtitle2" className="upload-text">
        {label ? label : "Upload Image"}
      </Typography>
      <div className="upload-img-cover">
        <Button variant="contained" component="label">
          <img
            src={file ? file : placeholder ? placeholder : UPLOAD_IMG}
            alt="upload-image"
            className="upload-img"
          />
          <input
            hidden
            accept="image/*"
            //multiple
            id="uploadImage"
            type="file"
            onChange={onChange}
            onClick={(event: any) => {
              event.target.value = null;
            }}
          />
        </Button>
        {file ? (
          <div className="uploadEditEel">
            <DeleteIcon onClick={() => setOpen(true)} titleAccess="Delete" />
            <EditIcon onClick={editImage} titleAccess="Edit" />
          </div>
        ) : (
          <Fragment></Fragment>
        )}
      </div>
      <DeleteDialog
        dialogOpen={open}
        popimg={deleteIMG}
        dialogTitle="Remove Image"
        yesHandle={() => {
          if (onDelete) {
            onDelete();
          }
          if (type == "customer") {
            dispatch(updateCustomer({ imageUrl: "" }));
          } else {
            dispatch(updateProductAndServices({ imageUrl: "" }));
          }

          setOpen(false);
        }}
        handleDialogClose={() => setOpen(false)}
        dialogPara="Are you sure you want to Remove this Image?"
        nvCancel="Cancel"
        nvYes="Yes"
      />
    </div>
  );
}
