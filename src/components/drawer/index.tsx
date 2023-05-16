import * as React from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import "./drawer.scss";
import { Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch } from "react-redux";
import { updateProductAndServices } from "../../screens/productandServices/productServiceSlice";
type Anchor = "top" | "left" | "bottom" | "right";

export default function SwipeableTemporaryDrawer({
  state,
  setState,
  children,
  className,
  togalDrawrr,
  isProductDetail,
}: any) {
  const dispatch = useDispatch();
  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      if (setState) {
        setState(!state);
        if (state && isProductDetail) {
          setState(false);
          dispatch(
            updateProductAndServices({
              productServiceDetail: {},
            })
          );
        }
      } else {
        togalDrawrr();
      }
    };

  const list = () => (
    <Box className={`drawer_wrap ${className}`} role="presentation">
      <Button
        variant="contained"
        className="close for-desktop"
        color="error"
        onClick={toggleDrawer(false)}
        onKeyDown={toggleDrawer(false)}
      >
        <CloseIcon />
      </Button>
      <div className="drawer_wrap_content">
        <Button
          variant="contained"
          className="close for-mob"
          color="error"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <CloseIcon />
        </Button>
        {children}
      </div>
    </Box>
  );

  return (
    <React.Fragment key={"right"}>
      <SwipeableDrawer
        anchor={"right"}
        open={state}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        {list()}
      </SwipeableDrawer>
    </React.Fragment>
  );
}
