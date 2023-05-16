import React, { useState } from "react";
import Tooltip from "@mui/material/Tooltip";
import { NavLink } from "react-router-dom";
import { NavList } from "../../constants";
import { Box, ListItemIcon, Typography } from "@mui/material";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Collapse from "@material-ui/core/Collapse";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { useLocation, useNavigate } from "react-router-dom";
import "./sidebar.scss";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logout } from "../../screens/onboarding/login/action";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

function hasChildren(item: any) {
  const { items: children } = item;
  const location = useLocation();

  if (children === undefined) {
    return false;
  }

  if (children.constructor !== Array) {
    return false;
  }

  if (children.length === 0) {
    return false;
  }

  return true;
}

const navAttribute = {
  disableGutters: true,
};

interface navProps {
  item: any;
  id?: any;
}

const MenuItem = (props: navProps) => {
  const { item } = props;
  const Component = hasChildren(item) ? MultiLevel : SingleLevel;
  return <Component item={item} />;
};

const SingleLevel = (props: navProps) => {
  const { item } = props;
  const { permissions } = useSelector((state: any) => state.commonSlice);
  const Navigate = useNavigate();
  const dispatch: any = useDispatch();
  return (
    <Box
      className="navi_dp"
      sx={
        permissions && item?.id && permissions[item?.id]?.view
          ? {}
          : !item?.id || !permissions
          ? {}
          : { display: "none" }
      }
    >
      <ListItem {...navAttribute}>
        <NavLink
          to={item.href}
          className="nvBx"
          onClick={(e: any) => {
            if (item.title == "Logout") {
              e.preventDefault();
              dispatch(logout(Navigate));
            }
          }}
        >
          {item?.icon ? (
            <ListItemIcon>
              <img src={item.icon} alt="" />
              
            </ListItemIcon>
          ) : (
            <></>
          )}
          <Typography variant="subtitle2">{item.title}</Typography>
          {item?.add ? (
              <AddCircleOutlineIcon className="add-icon" titleAccess="Add" />
          ) : (
            <></>
          )}
        </NavLink>
      </ListItem>
    </Box>
  );
};

const MultiLevel = (props: navProps) => {
  const { permissions } = useSelector((state: any) => state.commonSlice);
  const { item } = props;
  const { items: children } = item;

  const [open, setOpen] = useState(
    item.routes
      ? item.routes.includes(
          location.pathname.split("/").filter((x) => x != "")[0]
        )
      : false
  );

  const handleClick = () => {
    setOpen((prev: any) => !prev);
  };

  return (
    <Box
      className="prt_drop"
      sx={
        permissions && item?.id && permissions[item?.id]?.view
          ? {}
          : !item?.id || !permissions
          ? {}
          : { display: "none" }
      }
    >
      <ListItem {...navAttribute} onClick={handleClick}>
        <Box className="nvBx">
          {item?.icon ? (
            <ListItemIcon>
              <img src={item.icon} alt="" />
            </ListItemIcon>
          ) : (
            <></>
          )}
          <Typography variant="subtitle2">{item.title}</Typography>
          <i className="nv_icon">
            {open && true ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </i>
        </Box>
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="ul" className="inside_nv_list" disablePadding>
          {children.map((child: any, key: any) => (
            <MenuItem key={key} item={child} />
          ))}
        </List>
      </Collapse>
    </Box>
  );
};

export default function Sidebar() {
  return (
    <List className="listContainer">
      {NavList.map((item, index) => (
        <MenuItem key={index} item={item} />
      ))}
    </List>
  );
}
