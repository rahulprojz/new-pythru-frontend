import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";
import "./header.scss";
import {
  Box,
  Button,
  ClickAwayListener,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AddProductDrawer from "../drawer";
import {
  clearNotification,
  getNotificationList,
  notificationCountValue,
} from "./action";
import { updatenotificationList } from "./notificationSlice";
import {
  LOGOBLUE,
  LOGOSM,
  MENUARROW,
  NOTIFICATIONIMG,
  SETTINGIMG,
  LOGOUBLUEIMG,
  routesConstant,
  TEAMIMG,
} from "../../constants";
// import {}
import { getNamefromSession } from "../../utils";
import { logout } from "../../screens/onboarding/login/action";
import IconLabelButtons from "../buttons/buttonWithIcon";
import Notiification from "./notiification";
import useDebounce from "../../hooks/use.debounce";
import NormalButton from "../buttons/normalButton";
import { updatedashboard } from "../../screens/dashborad/dashboardSlice";
interface Props {
  open?: Boolean;
  setOpen?: Function;
  clname: string;
}

export default function Header({ open, setOpen, clname }: Props) {
  const Navigate = useNavigate();
  const [openState, setNotificationState] = React.useState(false);
  const dispatch: any = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const drpopen = Boolean(anchorEl);
  const [notopen, setOpennot] = React.useState(false);
  const { notificationList, notificationCount } = useSelector(
    (state: any) => state.notificationSlice
  );

  const { reloadDashboard } = useSelector((state: any) => state.dashboardSlice);

  const location: any = useLocation();

  useEffect(() => {
    if ((permissions && permissions["notification"]?.view) || !permissions) {
      dispatch(notificationCountValue());
    }
  }, [location]);
  const { organizationDeatil } = useSelector(
    (state: any) => state.settingSlice
  );
  //Conditions for overflow hidden in body
  useEffect(() => {
    if (notopen) {
      document.body.classList.add("hidden_noti");
    }
    if (!notopen) {
      document.body.classList.remove("hidden_noti");
    }
  }, [notopen]);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    document.body.classList.add("inherit-scroller");
  };

  const handleClose = () => {
    setAnchorEl(null);
    document.body.classList.remove("inherit-scroller");
  };

  const handlemenuIcon = () => {
    dispatch(updatedashboard({ reloadDashboard: !reloadDashboard }));

    if (setOpen) setOpen(!open);
  };

  const handlemenuNoti = () => {
    if (!notopen) {
      dispatch(getNotificationList());
    }
    setOpennot((prev) => !prev);
  };

  const handleClickAway = () => {
    setOpennot(false);
  };

  const handleLogout = () => {
    dispatch(logout(Navigate));
  };

  const handleClearNotification = () => {
    dispatch(clearNotification());
  };
  const { permissions } = useSelector((state: any) => state.commonSlice);

  return (
    <header className={clname}>
      <div className="lt">
        <Box className="lg_wrap">
          <Link to="/dashboard">
            <img src={LOGOBLUE} alt="Pythru" className="lgb" />
            <img src={LOGOSM} className="lgsm" alt="" />
          </Link>
          <Box className="ar_nv" onClick={handlemenuIcon}>
            <img src={MENUARROW} alt="" />
          </Box>
        </Box>
      </div>
      <div className="rt">
        <div className="header_user_del">
          {sessionStorage.getItem("lastLogin") ? (
            <div className="last-login" style={{ fontSize: 10, marginRight: 10 }}>
              Last Login:{" "}
              {moment(sessionStorage.getItem("lastLogin")).format("DD-MM-YYYY")}
              <br />
              Ip address: {sessionStorage.getItem("ipAddress")}
            </div>
          ) : (
            <React.Fragment></React.Fragment>
          )}
          {(permissions && permissions["notification"]?.view) ||
          !permissions ? (
            <div className="notification_wrapper">
              <ClickAwayListener
                mouseEvent="onMouseDown"
                touchEvent="onTouchStart"
                onClickAway={handleClickAway}
              >
                <Box sx={{ position: "relative" }}>
                  <Button className="notification" onClick={handlemenuNoti}>
                    <img src={NOTIFICATIONIMG} alt="Notification" />
                    {notificationCount > 0 && (
                      <span className="num">
                        {notificationCount ? notificationCount : ""}
                      </span>
                    )}
                  </Button>
                  {notopen ? (
                    <div
                      className="notification_listing_box"
                      id="notificationBx"
                    >
                      <div className="noti_head">
                        Notifications
                        {(permissions && permissions["notification"].clear) ||
                        !permissions ? (
                          <div className="btn_grp">
                            <Button
                              variant="text"
                              disabled={
                                notificationList && notificationList.length > 0
                                  ? false
                                  : true
                              }
                              onClick={handleClearNotification}
                            >
                              clear all
                            </Button>
                          </div>
                        ) : (
                          <></>
                        )}
                      </div>
                      <Notiification
                        notificationList={notificationList}
                        endIndex={10}
                        setState={setOpennot}
                      />
                      {notificationList && notificationList.length > 0 && (
                        <div className="noti_foot">
                          <NormalButton
                            variant="text"
                            buttonText="View All"
                            onPress={() => {
                              setNotificationState(true);
                              setOpennot(false);
                            }}
                          />
                        </div>
                      )}
                    </div>
                  ) : null}
                </Box>
              </ClickAwayListener>
            </div>
          ) : (
            <></>
          )}
          <Button
            className="user_del"
            aria-controls={drpopen ? "acSetting-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={drpopen ? "true" : undefined}
            onClick={handleClick}
          >
            <div className="srtName">
              {organizationDeatil?.companyLogoUrl ? (
                <img src={organizationDeatil?.companyLogoUrl} alt="Pythru" />
              ) : (
                <>
                  {getNamefromSession()
                    ?.split(" ")
                    .splice(0, 2)
                    .map((item: any) => item?.charAt(0))}
                </>
              )}
            </div>
            <Typography variant="subtitle1" className="semi-bold">
              {getNamefromSession()}
            </Typography>
            <ArrowDropDownOutlinedIcon />
          </Button>
          <Menu
            id="acSetting-menu"
            anchorEl={anchorEl}
            open={drpopen}
            onClose={handleClose}
            className="setting-menu-popper"
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                mt: -1,
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
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            {((permissions && permissions["settings"]?.view) ||
              !permissions) && (
              <MenuItem
                onClick={() => {
                  handleClose();
                  Navigate(routesConstant.routeConstants.settings);
                }}
              >
                <img src={SETTINGIMG} alt="" />{" "}
                <Typography variant="subtitle2" className="m-l-10">
                  Settings
                </Typography>
              </MenuItem>
            )}

            {!permissions && (
              <MenuItem
                onClick={() => {
                  handleClose();
                  Navigate(routesConstant.routeConstants.userManagement);
                }}
              >
                <img src={TEAMIMG} alt="" />{" "}
                <Typography variant="subtitle2" className="m-l-10">
                  Team Mangement
                </Typography>
              </MenuItem>
            )}

            <MenuItem onClick={handleLogout}>
              <img src={LOGOUBLUEIMG} alt="" />{" "}
              <Typography variant="subtitle2" className="m-l-10">
                Logout
              </Typography>
            </MenuItem>
          </Menu>
        </div>
      </div>
      <AddProductDrawer
        state={openState}
        setState={setNotificationState}
        className="notificationDrawer"
      >
        <div className="niti_header">
          <Typography variant="body2" className="semi-bold">
            Notification
          </Typography>
          {notificationList && notificationList.length > 0 && (
            <NormalButton
              buttonText="Clear All"
              className="btn-purple detailsEdit"
              onPress={handleClearNotification}
            >
              Clear All
            </NormalButton>
          )}
        </div>
        <Notiification
          notificationList={notificationList}
          setState={setNotificationState}
        />
      </AddProductDrawer>
    </header>
  );
}
