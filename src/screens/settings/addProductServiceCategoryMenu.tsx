import * as React from "react";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Box from "@mui/material/Box";
import ClickAwayListener from "@mui/material/ClickAwayListener";

function Index({ setType }: any) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClose = (type: any) => {
    setType(type);
    setAnchorEl(null);
  };

  const [opensad, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  const handleClickAway = () => {
    setOpen(false);
  };

  return (
    <div>
      <ClickAwayListener onClickAway={handleClickAway}>
        <Box className="custom-dropdown">
          <Button
            id="fade-button"
            onClick={handleClick}
            className="btn buttonWithIcon create-button"
            endIcon={<KeyboardArrowDownIcon />}
          >
            Create Category
          </Button>
          {opensad ? (
            <div className="drop-list">
              <MenuItem onClick={() => handleClose(1)}>PRODUCT</MenuItem>
              <MenuItem onClick={() => handleClose(2)}>SERVICE</MenuItem>
            </div>
          ) : null}
        </Box>
      </ClickAwayListener>
    </div>
  );
}

export default Index;
