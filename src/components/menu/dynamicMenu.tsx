import React from "react";
import { Menu, MenuItem, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import { deepPurple } from "@mui/material/colors";
import Typography from "@mui/material/Typography";
import { MoreHoriz } from "@material-ui/icons";

import './menu.scss';
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
  showDelete: boolean;
  product: any;
  values: any;
}

const DynamicMenu = (props: MenuProps) => {
  const { id, handleDelete, showDelete, handleEdit, product, values } = props;

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const drpopen = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDeleteItem = (event: any, id: string) => {
    setAnchorEl(null);
    handleDelete(id);
  };

  const handleEditItem = (id: string) => {
    setAnchorEl(null);
    handleEdit(product, values);
  };
  return (
    <div className="dynamic-menu">
      <Button
        className={
          product?.productId || showDelete ? "threedot lineDropdown" : "disable"
        }
        aria-controls={drpopen ? "acSetting-menu" : undefined}
        aria-haspopup='true'
        aria-expanded={drpopen ? "true" : undefined}
        onClick={handleClick}
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
        {product?.productId && (
          <MenuItem onClick={() => handleEditItem(product)}>
            <EditIcon
              sx={{ color: deepPurple[500] }}
              className={"icons priviewIcon"}
            />{" "}
            <Typography
              variant='inherit'
              sx={{
                color: deepPurple[500],
                fontSize: "14px",
                ml: 1,
              }}
            >
              Edit
            </Typography>
          </MenuItem>
        )}
        {showDelete && (
          <MenuItem onClick={(event) => handleDeleteItem(event, id)}>
            <DeleteIcon color='error' className={"icons priviewIcon"} />{" "}
            <Typography
              color='error'
              variant='inherit'
              sx={{ fontSize: "14px", ml: 1 }}
            >
              Delete
            </Typography>
          </MenuItem>
        )}
      </Menu>
    </div>
  );
};

export default DynamicMenu;
