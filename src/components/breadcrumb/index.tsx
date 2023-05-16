// import {
//   Box,
//   Breadcrumbs as MUIBreadcrumbs,
//   ,
//   ,
// } from "@mui/material";
import Box from "@mui/material/Box";
import { Breadcrumbs as MUIBreadcrumbs } from "@mui/material";

import Link from "@mui/material/Link";

import Typography from "@mui/material/Typography";

import { useLocation, useNavigate } from "react-router-dom";
import {
  breadCrumbTitle,
  getUpdatedNameSp,
  CustomBreadCrumb,
  getUpdatedBreadcrumb,
} from "../../utils";
import "./breadcrumb.scss";

const Breadcrumbs = (props: any) => {
  const { navigate: any } = props;
  const pathname = useLocation().pathname;
  const pathnames = pathname.split("/").filter((x: any) => x);
  const navigate = useNavigate();
  var title =
    pathnames &&
    pathnames.length > 0 &&
    (pathnames[pathnames.length - 1] === "add" ||
      pathnames[pathnames.length - 2] === "add" ||
      pathnames[pathnames.length - 2] === "edit")
      ? pathnames[pathnames.length - 1] === "add"
        ? pathnames[pathnames.length - 2].replace(/-/g, " ")
        : pathnames[pathnames.length - 3].replace(/-/g, " ")
      : pathnames[pathnames.length - 1].replace(/-/g, " ");

  var breadcrumbArray = getUpdatedBreadcrumb(pathnames);

  return (
    <Box className="top-bar Dflex sp-bt al-cnt">
      <Typography variant="h1">{breadCrumbTitle(title)}</Typography>
      <MUIBreadcrumbs aria-label="breadcrumb" separator="/">
        {pathnames && pathnames.length > 0 ? (
          <Link onClick={() => navigate("/dashboard")}>
            <Typography variant="subtitle2">Dashboard</Typography>
          </Link>
        ) : (
          <Typography variant="subtitle2">Dashboard</Typography>
        )}

        {breadcrumbArray.map((name: any, index: any) => {
          var routeTo = `/${breadcrumbArray.slice(0, index + 1).join("/")}`;

          routeTo = CustomBreadCrumb(routeTo);
          const isLast = index === breadcrumbArray.length - 1;
          const nameSp = name.split("-").join(" ");
          return isLast ? (
            <Typography key={name} variant="subtitle2">
              {getUpdatedNameSp(nameSp)}
            </Typography>
          ) : (
            <Link key={name} onClick={() => navigate(routeTo)}>
              <Typography variant="subtitle2">
                {getUpdatedNameSp(nameSp)}
              </Typography>
            </Link>
          );
        })}
      </MUIBreadcrumbs>
    </Box>
  );
};

export default Breadcrumbs;
