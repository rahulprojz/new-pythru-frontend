import React from "react";
import { Menu, MenuItem, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import BlockIcon from "@mui/icons-material/Block";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { deepPurple, green, red } from "@mui/material/colors";
import Typography from "@mui/material/Typography";
import { MoreHoriz } from "@material-ui/icons";
import { useNavigate } from "react-router-dom";
import { getProductServiceMenu } from "../../constants";
import DownloadIcon from "@mui/icons-material/Download";
import PreviewIcon from "@mui/icons-material/Preview";
interface MenuProps {
  id?: string | any;
  handleDelete?: any;
  handleEdit?: any;
  pageEdit?: Boolean | false;
  redirectLink?: string;
  status?: number;
  handleStatus?: any;
  changeStatus?: Boolean | false;
  type?: string;
  data?: any;
  isEdit?: any;
  isDelete?: any;
  handlePreview?: any;
  isPreview?: Boolean | false;
  handleDownload?: any;
  customerStatus?: number;
  disabled?: any;
  //isEditabel?: any;
}

const index = (props: MenuProps) => {
  const {
    id,
    handleDelete,
    pageEdit = false,
    redirectLink,
    status,
    handleStatus,
    changeStatus = false,
    type,
    data,
    isDelete = true,
    isEdit = true,
    handlePreview,
    isPreview = false,
    handleDownload,
    customerStatus,
    disabled,
  } = props;

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const drpopen = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDeleteItem = (event: any, id: string) => {
    event.stopPropagation();
    setAnchorEl(null);
    handleDelete(id);
  };
  //const editable = props.isEditabel(status);
  const handlepdfDownload = () => {
    setAnchorEl(null);
    handleDownload();
  };
  const handleRowPreview = () => {
    setAnchorEl(null);
    handlePreview();
  };
  return (
    <>
      <Button
        className="threedot"
        aria-controls={drpopen ? "acSetting-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={drpopen ? "true" : undefined}
        onClick={handleClick}
        disabled={!isEdit && !changeStatus && !isDelete && !isPreview}
      >
        <MoreHoriz />
      </Button>

      <Menu
        id={"acSetting-menu"}
        anchorEl={anchorEl}
        open={drpopen}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.05))",
            mt: 0,
            ml: 0.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{
          horizontal: "right",
          vertical: "top",
        }}
        anchorOrigin={{
          horizontal: "right",
          vertical: "bottom",
        }}
      >
        {data?.state?.documentType ? (
          isEdit ? (
            <MenuItem
              onClick={(event) => {
                if (pageEdit) {
                  navigate(redirectLink + "/" + id, data);
                  return;
                } else {
                  event.stopPropagation();
                  props.handleEdit();
                  setAnchorEl(null);
                }
              }}
            >
              <EditIcon sx={{ color: deepPurple[500] }} />
              <Typography
                variant="subtitle2"
                sx={{
                  color: deepPurple[500],
                  ml: 1,
                }}
              >
                Edit
              </Typography>
            </MenuItem>
          ) : (
            ""
          )
        ) : isEdit ? (
          <MenuItem
            onClick={(event) => {
              if (pageEdit) {
                navigate(redirectLink + "/" + id, data);
                return;
              } else {
                event.stopPropagation();
                props.handleEdit();
                setAnchorEl(null);
              }
            }}
          >
            <EditIcon sx={{ color: deepPurple[500] }} />
            <Typography
              variant="subtitle2"
              sx={{
                color: deepPurple[500],
                ml: 1,
              }}
            >
              Edit
            </Typography>
          </MenuItem>
        ) : (
          ""
        )}
        {changeStatus && (
          <MenuItem
            onClick={props.handleStatus}
            onBlur={(event: any) => {
              event.stopPropagation();
              setAnchorEl(null);
            }}
          >
            {status && type ? (
              type === "productservice" && status === 1 ? (
                <BlockIcon
                  sx={{
                    color: red[400],
                  }}
                />
              ) : (
                <CheckCircleOutlineIcon
                  sx={{
                    color: green[400],
                  }}
                />
              )
            ) : (
              ""
            )}
            <Typography
              variant="subtitle2"
              sx={{
                color:
                  status && type
                    ? type === "productservice" && status === 1
                      ? red[400]
                      : green[400]
                    : "",
                ml: 1,
              }}
            >
              {status && type
                ? type === "productservice"
                  ? getProductServiceMenu(status)
                  : "Change Status"
                : ""}
            </Typography>
          </MenuItem>
        )}

        {isDelete ? (
          <MenuItem onClick={(event) => handleDeleteItem(event, id)}>
            <DeleteIcon color="error" />
            <Typography color="error" variant="subtitle2" sx={{ ml: 1 }}>
              Delete
            </Typography>
          </MenuItem>
        ) : (
          ""
        )}
        {isPreview ? (
          <div>
            <MenuItem onClick={handleRowPreview}>
              <PreviewIcon sx={{ color: deepPurple[500] }} />
              <Typography
                color="success"
                variant="subtitle2"
                sx={{ fontSize: "14px", ml: 1 }}
              >
                Preview
              </Typography>
            </MenuItem>
            <MenuItem onClick={handlepdfDownload}>
              <DownloadIcon sx={{ color: deepPurple[500] }} />
              <Typography color="success" variant="subtitle2" sx={{ ml: 1 }}>
                Download
              </Typography>
            </MenuItem>
          </div>
        ) : (
          ""
        )}
      </Menu>
    </>
  );
};

export default index;
