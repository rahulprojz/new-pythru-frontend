import React, { useEffect, useState } from "react";
import Breadcrumbs from "../../../components/breadcrumb";
import Grid from "@mui/material/Grid";
import {
  PURPLE_OUTLINE_EDIT,
  INCOMING_WHITE_ICON,
  EXPENSIVE_WHITE_ICON,
  ASSET_WHITE_ICON,
  LIABILITY_WHITE_ICON,
  JOINT_WHITE_ICON,
} from "../../../constants";
import AddCategoryDrower from "../../../components/drawer/productServicesDrawer";
import AddCategory from "./addCategory";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FolderOutlinedIcon from "@mui/icons-material/FolderOutlined";
import Typography from "@mui/material/Typography";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import "./accountsChart.scss";
import { useDispatch, useSelector } from "react-redux";
import AddIncomeButton from "../../../components/buttons/buttonWithIcon";
import { getChartOfAccoutMasterData } from "./action";
const AccountsChart = (data: any) => {
  const dispatch: any = useDispatch();
  const [state, setState] = useState(false);
  const { permissions } = useSelector((state: any) => state.commonSlice);

  const [editData, setEditData]: any = useState();
  const [openConfirmation, setOpenConfirmation] = useState();
  useEffect(() => {
    document.title = "Chart of account | PyThru";
    dispatch(getChartOfAccoutMasterData());
  }, []);
  const { chartOfAccountMasterData } = useSelector(
    (state: any) => state.commonSlice
  );
  const listOfAccount = (type: any, chartOfAccountType: any) => {
    return (
      <div>
        {chartOfAccountMasterData[+type]?.categories.map(
          (item: any, index: any) => {
            return (
              <li key={index}>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <div className="Dflex">
                      <FolderOutlinedIcon />
                      <Typography variant="subtitle2" className="m-l-10">
                        {item.categoryName}{" "}
                        {`${`(${
                          item?.userAccounts?.length
                            ? item?.userAccounts?.length
                            : 0
                        })`}`}
                      </Typography>
                    </div>
                  </AccordionSummary>
                  <AccordionDetails>
                    <ul>
                      {item?.userAccounts?.length ? (
                        item?.userAccounts?.map((data: any, i: any) => (
                          <li key={data._id}>
                            <Typography variant="subtitle2">
                              {data?.name}
                            </Typography>
                            {(permissions && permissions["accounting"].edit) ||
                            !permissions ? (
                              <>
                                {data?.isEditable ? (
                                  <img
                                    src={PURPLE_OUTLINE_EDIT}
                                    alt="Edit"
                                    title="Edit"
                                    className="pointer m-l-10"
                                    onClick={() => {
                                      console.log(item, data, "data");
                                      setEditData({
                                        name: data?.name,
                                        id: data._id,
                                        type: chartOfAccountType,
                                        chartOfAccountId: item._id,
                                      });
                                      setState(true);
                                    }}
                                  />
                                ) : (
                                  <></>
                                )}
                              </>
                            ) : (
                              <></>
                            )}
                          </li>
                        ))
                      ) : (
                        <></>
                      )}
                    </ul>
                  </AccordionDetails>
                </Accordion>
              </li>
            );
          }
        )}
      </div>
    );
  };
  return (
    <>
      <Breadcrumbs />
      {(permissions && permissions["accounting"].add) || !permissions ? (
        <AddIncomeButton
          text="+ Add Account"
          className="btn-purple m-b-20"
          onPress={() => {
            setState(true);
          }}
        />
      ) : (
        <></>
      )}
      <div className="page-accounts-chart">
        <Grid
          container
          rowSpacing={3}
          columnSpacing={{ xs: 0.5, sm: 1.5, md: 1.5, lg: 2, xl: 3 }}
        >
          <Grid item xs={12} sm={6} md={4} lg={2.4} xl={2.4}>
            <div className="sub-account-head">
              <Typography variant="body2" className="color-white">
                INCOME (
                {chartOfAccountMasterData?.length &&
                  chartOfAccountMasterData.filter(
                    (x: any) => x.chartOfAccountType === 1
                  )[0]?.categories?.length}
                )
              </Typography>
              <img src={INCOMING_WHITE_ICON} />
            </div>

            <ul>
              {listOfAccount(
                chartOfAccountMasterData?.length &&
                  chartOfAccountMasterData.findIndex(
                    (x: any) => x.chartOfAccountType === 1
                  ),
                1
              )}
            </ul>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={2.4} xl={2.4}>
            <div className="sub-account-head">
              <Typography variant="body2" className="color-white">
                EXPENSE (
                {chartOfAccountMasterData?.length &&
                  chartOfAccountMasterData.filter(
                    (x: any) => x.chartOfAccountType === 2
                  )[0]?.categories?.length}
                )
              </Typography>
              <img src={EXPENSIVE_WHITE_ICON} />
            </div>
            <ul>
              {listOfAccount(
                chartOfAccountMasterData?.length &&
                  chartOfAccountMasterData.findIndex(
                    (x: any) => x.chartOfAccountType === 2
                  ),
                2
              )}
            </ul>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={2.4} xl={2.4}>
            <div className="sub-account-head">
              <Typography variant="body2" className="color-white">
                ASSET (
                {chartOfAccountMasterData?.length &&
                  chartOfAccountMasterData.filter(
                    (x: any) => x.chartOfAccountType === 3
                  )[0]?.categories?.length}
                )
              </Typography>
              <img src={ASSET_WHITE_ICON} />
            </div>
            <ul>
              {listOfAccount(
                chartOfAccountMasterData?.length &&
                  chartOfAccountMasterData.findIndex(
                    (x: any) => x.chartOfAccountType === 3
                  ),
                3
              )}
            </ul>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={2.4} xl={2.4}>
            <div className="sub-account-head">
              <Typography variant="body2" className="color-white">
                LIABILITY (
                {chartOfAccountMasterData?.length &&
                  chartOfAccountMasterData.filter(
                    (x: any) => x.chartOfAccountType === 4
                  )[0]?.categories?.length}
                )
              </Typography>
              <img src={LIABILITY_WHITE_ICON} />
            </div>
            <ul>
              {listOfAccount(
                chartOfAccountMasterData?.length &&
                  chartOfAccountMasterData.findIndex(
                    (x: any) => x.chartOfAccountType === 4
                  ),
                4
              )}
            </ul>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={2.4} xl={2.4}>
            <div className="sub-account-head">
              <Typography variant="body2" className="color-white">
                EQUITY (
                {chartOfAccountMasterData?.length &&
                  chartOfAccountMasterData.filter(
                    (x: any) => x.chartOfAccountType === 5
                  )[0]?.categories?.length}
                )
              </Typography>
              <img src={JOINT_WHITE_ICON} />
            </div>
            <ul>
              {listOfAccount(
                chartOfAccountMasterData?.length &&
                  chartOfAccountMasterData.findIndex(
                    (x: any) => x.chartOfAccountType === 5
                  ),
                5
              )}
            </ul>
          </Grid>
        </Grid>
        <AddCategoryDrower
          state={state}
          setState={setOpenConfirmation}
          className="filterDrawer"
        >
          <AddCategory
            editData={editData}
            setState={setState}
            state={state}
            openConfirmation={openConfirmation}
            setOpenConfirmation={setOpenConfirmation}
            setEditData={setEditData}
          />
        </AddCategoryDrower>
      </div>
    </>
  );
};

export default AccountsChart;
