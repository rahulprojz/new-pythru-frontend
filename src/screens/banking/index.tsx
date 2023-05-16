import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import {
  CONNECT_NOW,
  EDIT_WHITE_CIRCULAR,
  ICICI_BANK_LOGO,
  ProductPlaceholder,
  PYTHRU_WHITE,
  TOP_UP_ICON,
  WITHDRAW_ICON,
  YES_BANK_LOGO,
  NODATA_6,
  BANKINGIMG,
  // NODATA_6,
  BANKINGNEWIMG,
  CUSTOM_BANK_LIST,
  PRIMARY_WALLET,
  ADD_MONEY_BANNER,
  OTHER_BANK_ACCOUNT_BANNER,
  ICICI_CONNECTED_LOGO,
} from "../../constants";
import CloseIcon from "@mui/icons-material/Close";
import LoopOutlinedIcon from "@mui/icons-material/LoopOutlined";
import Typography from "@mui/material/Typography";
import ConnectNowDrawer from "../../components/drawer";
import ConnectOtherBankAccountDrawer from "../../components/drawer";
import IframeDrawer from "../../components/drawer";

import AddFilterDrawer from "../../components/drawer";
import AddMoneyDrawer from "../../components/drawer";

import Breadcrumbs from "../../components/breadcrumb";

import NormalButton from "../../components/buttons/normalButton";

import EnhancedTable from "../../components/tables/userTranscation";

import LinkYourAccount from "./linkYourAccount";

import "./banking.scss";

import "react-datepicker/dist/react-datepicker.css";
import { useSelector, useDispatch } from "react-redux";
import {
  accountSummery,
  getAggrigatorWidget,
  getBankingList,
  getUserAccountList,
  getUserAccountTransactionsList,
  getUserBalanceAmount,
} from "./action";
import { Button, TextField } from "@mui/material";
import { resetBanking, updateBanking } from "./bankingSlice";

import Dialog from "@material-ui/core/Dialog";
import { getBankType, getTransId } from "../../utils";

function Index() {
  const Navigate = useNavigate();
  const dispatch: any = useDispatch();

  const [search, setSearch] = useState("");

  var { list, iframeUrl, userAccountList, userBalance, userNewBalance } =
    useSelector((state: any) => state.bankingSlice);

  var transactionList: [] = [];

  useEffect(() => {
    document.title = "Banking | PyThru";
    dispatch(resetBanking());
    dispatch(getBankingList());
    dispatch(getUserAccountList());
  }, []);

  const [state, setState] = React.useState(false);
  const [openForConnectNow, setOpenForConnectNow] = React.useState(false);
  const [openIframe, setOpenIframe] = React.useState(false);
  const [userViewBalance, setUserViewBalance] = React.useState<any>("");
  const [userViewStatement, setUserViewStatement] = React.useState<any>({});
  const [listData, setListData] = React.useState<any>(list);

  const [openForAddMoney, setOpenForAddMoney] = React.useState(false);
  const [openForConnectOtherAccount, setOpenForConnectOtherAccount] =
    React.useState(false);

  const [userAccountDetaill, setUserAccountDetaill] = React.useState<any>({});

  const [openPreviewTransaction, setOpenPreviewTransaction] = useState(false);
  const [openLinkYourAccount, setOpenLinkYourAccount] = useState(false);
  const [openSelfWithdrawl, setOpenSelfWithdrawl] = useState(false);

  useEffect(() => {
    setListData(list);
  }, [list]);

  const handleRow = (e: any, data: any) => {
    dispatch(
      updateBanking({
        iframeUrl: "",
      })
    );
    dispatch(getAggrigatorWidget(data.instCode));
  };

  const viewBalance = (e: any, data: any) => {
    var transactionId = getTransId(data);
    var bankType = getBankType(data);
    setUserViewBalance(data);
    dispatch(accountSummery(transactionId, data?.id, bankType));
  };

  const userViewStmnt = (e: any, data: any) => {
    setUserViewBalance("");
    setUserAccountDetaill(data);
    var transactionId = getTransId(data);
    var bankType = getBankType(data);
    dispatch(
      updateBanking({
        transactionId: transactionId,
        addBankAccountType: bankType,
      })
    );

    dispatch(accountSummery(transactionId, data?.id, bankType));
    dispatch(getUserBalanceAmount(transactionId, data?.id, bankType));
    dispatch(getUserAccountTransactionsList());
  };

  useEffect(() => {
    if (userAccountList[0]) {
      var bankAccType = getBankType(userAccountList[0]);
      var tansId = getTransId(userAccountList[0]);
      dispatch(
        updateBanking({
          transactionId: tansId,
          addBankAccountType: bankAccType,
        })
      );
      dispatch(
        getUserBalanceAmount(tansId, userAccountList[0]?.id, bankAccType)
      );
      dispatch(accountSummery(tansId, userAccountList[0]?.id, bankAccType));
      dispatch(getUserAccountTransactionsList());
      setUserAccountDetaill(userAccountList[0]);
    }
  }, [userAccountList]);

  const balanceRefreshHandler = (e: any, data: any) => {
    e.preventDefault();
    var transId = getTransId(data);
    var bankType = getBankType(data);
    dispatch(getUserBalanceAmount(transId, data?.id, bankType));
  };

  const handleCustomBank = () => {
    setOpenLinkYourAccount(true);
  };

  return (
    <>
      <Breadcrumbs />
      {list.length && (
        <div className="page-banking">
          <Grid container rowSpacing={2} columnSpacing={2}>
            <Grid item xs={12} sm={6} md={5} lg={4} xl={3.5} className="sticky">
              <div className="connect-now-card bg-white Dflex sp-bt">
                <div>
                  <Typography variant="subtitle1" className="semi-bold">
                    Link your bank account to initiate seamless banking
                    operations on India's finest Neobanking Platform
                  </Typography>
                  <NormalButton
                    className="btn-purple m-t-20"
                    buttonText="Connect now"
                    onPress={() => {
                      setOpenForConnectNow(true);
                    }}
                  />
                </div>
                <img src={CONNECT_NOW} />
              </div>

              <Typography variant="subtitle1" className="m-b-10 m-t-10 bold">
                Connected Account
              </Typography>

              {userAccountList.length > 0 && (
                <ul>
                  {userAccountList?.map((data: any, i: number) => {
                    return (
                      <li
                        className={`connected-account-card bg-white`}
                        key={data.id}
                      >
                        <div
                          className="Dflex al-cnt sp-bt"
                          onClick={(e: any) => viewBalance(e, data)}
                        >
                          <img
                            src={
                              data?.instLogo != "NA"
                                ? data?.instLogo
                                : BANKINGIMG
                            }
                            style={{ width: "30px" }}
                          />
                          <a href="#" title="Refresh">
                            <LoopOutlinedIcon />
                          </a>
                        </div>

                        <Typography
                          variant="body2"
                          className="bold m-b-5 m-t-10 color-purple"
                        >
                          {data?.name}
                        </Typography>

                        <Typography variant="body2" className="bold m-b-5">
                          {userViewBalance != "" &&
                          userViewBalance &&
                          userViewBalance?.id == data.id
                            ? userBalance
                            : "₹ ****"}
                        </Typography>
                        <Typography variant="caption" className="m-b-10 Dflex">
                          <span className="nowrap">A/c No: N/A</span>

                          <span className="nowrap">&emsp;IFSC: N/A</span>
                        </Typography>
                        <Grid container rowSpacing={2} columnSpacing={2}>
                          <Grid item xs={12}>
                            <div className="Dflex al-cnt">
                              <NormalButton
                                onPress={(e: any) => viewBalance(e, data)}
                                className="btn-purple m-t-10 m-r-5 btn-small"
                                buttonText="View Balance"
                              />
                              <NormalButton
                                onPress={(e: any) => userViewStmnt(e, data)}
                                className="btn-purple-border m-t-10 m-r-5 btn-small"
                                buttonText="View Statement"
                              />
                            </div>
                          </Grid>
                        </Grid>
                      </li>
                    );
                  })}
                </ul>
              )}
              {userAccountList == undefined ||
                (Object.keys(userAccountList).length == 0 && (
                  <div className="no_data_fnd">
                    <img src={NODATA_6} className="pointer" />
                    <i>Oops!</i>
                    <p>Account not added yet!</p>
                  </div>
                ))}
            </Grid>
            <Grid item xs={12} sm={6} md={7} lg={8} xl={8.5} className="sticky">
              {userAccountDetaill?.name && (
                <div className="account-head">
                  <Grid container rowSpacing={1} columnSpacing={2}>
                    <Grid item xs={12} lg={5}>
                      <div className="Dflex al-cnt h-100 card-holder">
                        <img src={BANKINGNEWIMG} />
                        <div>
                          <Typography variant="body2">
                            {userAccountDetaill?.name}
                          </Typography>
                          <Typography variant="subtitle2">
                            A/C No: N/A
                          </Typography>
                        </div>
                      </div>
                    </Grid>
                    <Grid item xs={12} lg={7}>
                      <Grid container rowSpacing={1} columnSpacing={2}>
                        <Grid item xs={5} sm={12} md={5}>
                          <Typography variant="body2"></Typography>
                          <Typography variant="subtitle2">IFSC: N/A</Typography>
                        </Grid>
                        <Grid item xs={7} sm={12} md={7}>
                          <div className="Dflex al-cnt fl-end h-100 wrap">
                            <Typography variant="h5" className="bold nowrap">
                              {userNewBalance}
                            </Typography>
                            <a
                              href="#"
                              onClick={(e: any) =>
                                balanceRefreshHandler(e, userAccountDetaill)
                              }
                              title="Refresh"
                              className="white m-l-10"
                            >
                              <LoopOutlinedIcon />
                            </a>
                          </div>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </div>
              )}
              <div className="bg-white account-body">
                <EnhancedTable data={userAccountDetaill} />
              </div>
            </Grid>
          </Grid>

          <ConnectNowDrawer
            state={openForConnectNow}
            setState={setOpenForConnectNow}
          >
            <h3 className="hd">Connect your bank account</h3>
            <Grid container rowSpacing={3} columnSpacing={2}>
              <Grid item xs={12}>
                <TextField
                  value={search}
                  focused={true}
                  name={"search"}
                  id="search"
                  label="Search the bank here"
                  placeholder="Search the bank here..."
                  className="border small-radius no-shadow"
                  onChange={(v: any) => {
                    setSearch(v.target.value);
                    if (v.target.value) {
                      transactionList = listData.filter((v: any) =>
                        v.instName.toLowerCase().includes(search.toLowerCase())
                      );
                      setListData(transactionList);
                    } else {
                      setListData(list);
                    }
                  }}
                  onBlur={(v: any) => {}}
                />
              </Grid>

              <Grid item xs={12}>
                <ul className="bank-list">
                  {CUSTOM_BANK_LIST &&
                    CUSTOM_BANK_LIST.map((data: any, i: number) => {
                      return (
                        <li
                          className="single-bank-card"
                          key={data.instId}
                          onClick={handleCustomBank}
                        >
                          <img
                            src={
                              import.meta.env.VITE_IMAGE_URL?.split(
                                "images"
                              )[0]?.slice(0, -1) + data.logo
                            }
                            alt={data.instName}
                          />
                        </li>
                      );
                    })}
                </ul>

                <p className="hd"></p>
                <ul className="bank-list">
                  {listData &&
                    listData.map((data: any, i: number) => {
                      return (
                        <li
                          className="single-bank-card"
                          key={data?._id}
                          onClick={(e: any) => {
                            handleRow(e, data);
                            setOpenIframe(true);
                          }}
                        >
                          <img
                            src={
                              import.meta.env.VITE_IMAGE_URL?.split(
                                "images"
                              )[0]?.slice(0, -1) + data.logo
                            }
                            alt={data.instName}
                          />
                        </li>
                      );
                    })}
                </ul>
                {listData?.length == 0 && (
                  <>
                    <div className="no_data_fnd">
                      <img src={NODATA_6} className="pointer" />
                      <i>Oops!</i>
                      <p>There is nothing here yet!</p>
                    </div>
                  </>
                )}
              </Grid>
            </Grid>
          </ConnectNowDrawer>

          <IframeDrawer state={openIframe} setState={setOpenIframe}>
            <h3 className="hd">Add your bank account</h3>
            {iframeUrl && (
              <Grid container rowSpacing={3} columnSpacing={2}>
                <Grid item xs={12}>
                  <iframe src={iframeUrl} height="650" width="100%" />
                </Grid>

                <Grid item xs={12}>
                  <NormalButton
                    className="btn-purple m-t-20"
                    buttonText="Go to Linked Account"
                    onPress={() => {
                      setOpenIframe(false);
                      setOpenForConnectNow(false);
                      dispatch(getUserAccountList());
                    }}
                  />
                </Grid>
              </Grid>
            )}
          </IframeDrawer>

          <LinkYourAccount
            setOpenLinkYourAccount={setOpenLinkYourAccount}
            openLinkYourAccount={openLinkYourAccount}
          />
        </div>
      )}
    </>
  );
}

export default Index;
