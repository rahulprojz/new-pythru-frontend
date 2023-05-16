import React, { useEffect, useState } from "react";

import { useIdleTimer } from "react-idle-timer";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import Sidebar from "../../sidebar";
import Header from "../../header";
import "./container.scss";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
// import { getProductAndServicesCategory } from "../../../screens/productandServices/action";
import GlobalLoader from "../../../components/backdrop";
// const drawerWidth = 260;
import {
  getAuthTokenFromLS,
  getLogoutConfirmSession,
  setLogoutConfirmSession,
} from "../../../utils";
import { statesList } from "../../../screens/payments/customers/action";
import { getChartOfAccoutMasterData } from "../../../screens/accounting/accountsChart/action";
import { getOrganizationDetail } from "../../../screens/settings/action";
import { updateCommonData } from "../../../app/commonSlice";
import Dialog from "../../dialog/index";
import { deleteIMG, LOGOUBLUEIMG } from "../../../constants";
import { getIpAddress, logout } from "../../../screens/onboarding/login/action";
import Login from "../../dialog/login/login";
import Timer from "../../dialog/timer";
const openedMixin = (theme: Theme): CSSObject => ({
  // width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)})`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(7)})`,
  },
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  // width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

function Container({ children }: any) {
  const NavigatePath = useNavigate();
  const dispatch: any = useDispatch();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [isTimeOut, setIsTimeOut] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [timeVal, setTimeVal] = useState<number>(0);
  //console.log(open);

  // const { permissions } = useSelector((state: any) => state.commonSlice);
  if (!getAuthTokenFromLS()) {
    document.title = "";
    return <Navigate to={"/"} replace />;
  }
  useEffect(() => {
    if (getLogoutConfirmSession() && getLogoutConfirmSession() === "true") {
      setLogoutConfirmSession("false");
      dispatch(logout(Navigate));
    } else {
      dispatch(statesList());
      dispatch(getChartOfAccoutMasterData());
      dispatch(getOrganizationDetail());
      dispatch(getIpAddress());
      // dispatch(getProductAndServicesCategory());
      // console.log(JSON.parse(sessionStorage.getItem("permissions")), "shashan");
      let dataPermision = sessionStorage.getItem("permissions");
      dispatch(
        updateCommonData({
          permissions: dataPermision
            ? JSON.parse(dataPermision ? dataPermision : "")
            : "",
        })
      );
    }
  }, []);
  const onIdle = (e: any) => {
    setLogoutConfirmSession("true");
    setShowModal(true);
  };

  const { getRemainingTime } = useIdleTimer({
    timeout: 1000 * 60 * 5,
    onIdle,
  });

  // Declare timer that will store the remaining time
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeVal(getRemainingTime());
    }, 1000);
  }, []);

  const handleDialogClose = () => {
    // dispatch(logout(NavigatePath));
    setLogoutConfirmSession("false");
    setShowModal(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <GlobalLoader />
      <div className={`main_container ${!open ? "collapse" : "collapsed"}`}>
        <Header open={open} setOpen={setOpen} clname="af_login_header" />
        <Drawer variant="permanent" open={!open} className="menuBar">
          <Sidebar />
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <div className="rightContainer ">
            <Outlet />
          </div>
        </Box>
      </div>

      <Login open={showModal} handleClose={handleDialogClose} />

      {!showModal && timeVal > 0 && timeVal < 60000 && (
        <Timer
          dialogOpen={true}
          time={(timeVal / 1000).toFixed(0)}
          dialogPara={`To stay logged in, "move your cursor"`}
        />
      )}
    </Box>
  );
}

export default React.memo(Container);
