import * as React from "react";
import { useDispatch } from "react-redux";
import { styled, alpha } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Menu, { MenuProps } from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { DOWNLOAD_ICON } from "../../constants";
import "./../buttons/button.scss";

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

interface DownloadMenuProps {
  generateExcel: () => (dispatch: any, getState: any) => void;
  generatePdf: () => (dispatch: any, getState: any) => void;
  documentType?: number;
}

const DownloadDropDown = (props: any) => {
  const dispatch: any = useDispatch();
  const { generateExcel, generatePdf, documentType } = props;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    document.body.classList.add("inherit-scroller");
  };
  const handleClose = () => {
    setAnchorEl(null);
    document.body.classList.remove("inherit-scroller");
  };

  const handlePdf = () => {
    dispatch(generatePdf(documentType));
    setAnchorEl(null);
  };

  const handleExcel = () => {
    dispatch(generateExcel(documentType));
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        id="demo-customized-button"
        aria-controls={open ? "demo-customized-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        variant="contained"
        disableElevation
        className="btn btn-download buttonWithIcon"
        onClick={handleClick}
        title="Download"
        endIcon={<KeyboardArrowDownIcon />}
      >
        <img src={DOWNLOAD_ICON} alt="download" />
      </Button>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          "aria-labelledby": "demo-customized-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={handlePdf} disableRipple>
          Download Pdf
        </MenuItem>
        <MenuItem onClick={handleExcel} disableRipple>
          Download Excel
        </MenuItem>
      </StyledMenu>
    </>
  );
};

export default DownloadDropDown;
