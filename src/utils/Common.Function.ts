import moment from "moment";
import { useSelector } from "react-redux";
import { ToWords } from "to-words";
import {
  billDropdown,
  cashMemoReciptDropdown,
  creditNoteDropdown,
  dashboardDropDown,
  purchaseDashboardDropDown,
  debitNoteDropdown,
  estimateDropdown,
  getDocumentType,
  invoiceDropdown,
  orderDeliveryReceiptNoteDropdown,
  space,
  BANK_TYPE,
  statusEnum,
} from "../constants";

export const currentYear = () => {
  return moment().format("YYYY");
};

export function getStateInSession() {
  return sessionStorage.getItem("state");
}

export function getEmailInSession() {
  return sessionStorage.getItem("email");
}
export function getImageInSession() {
  return sessionStorage.getItem("image");
}

export function setImageInSession(url: string) {
  sessionStorage.setItem("image", url);
}

export function getLogoutConfirmSession() {
  return sessionStorage.getItem("isLogout");
}
export function setLogoutConfirmSession(val: string) {
  return sessionStorage.setItem("isLogout", val);
}

export function getPhoneIdFromLS() {
  return sessionStorage.getItem("phone_id");
}
export function getAuthTokenFromLS() {
  return sessionStorage.getItem("accessToken");
}
export function setIdInLS(id: string) {
  sessionStorage.setItem("id", id);
}

export function setPermissionsInLS(data: any) {
  sessionStorage.setItem("permissions", JSON.stringify(data));
}

export function setStateInSession(name: string) {
  sessionStorage.setItem("state", name);
}
export function setNameInSession(name: string) {
  sessionStorage.setItem("userName", name);
}
export function getNamefromSession() {
  return sessionStorage.getItem("userName");
}
export function setEmailInLS(email: string) {
  sessionStorage.setItem("email", email);
}
export function setPhoneInLS(phone: string) {
  sessionStorage.setItem("phone", phone);
}
export function setAccessTokenInLS(token: string) {
  sessionStorage.setItem("accessToken", token);
}

export function getDeviceIdFromLS() {
  return sessionStorage.getItem("device_id");
}

export const addDefaultSrc = (e: any, img: any) => {
  e.target.src = img;
};

export function elementFromArray(arr: any, item: number) {
  let index = arr.indexOf(item);
  return [...arr.slice(0, index), ...arr.slice(index + 1)];
}

export const updateArrayObject = (arr: any, obj: any, id: string) => {
  return (
    arr?.length &&
    arr.map((item: any) => {
      if (item._id === id) {
        return obj;
      }
      return item;
    })
  );
};

export const updateDeleteObject = (arr: any, id: string) => {
  return arr.filter((item: any) => {
    return item._id !== id;
  });
};

export const setDeviceIdInLS = () => {
  if (getDeviceIdFromLS()) {
    return;
  } else {
    // let deviceId = "xxxxxxxxxxxx-0xxxxxxxx-yxx".replace(
    // 	/[xy]/g,
    // 	(c) => {
    // 		const r = (Math.random() * 16) | 0;
    // 		const v = c === "x" ? r : (r & 0x3) | 0x8;
    // 		return v.toString(16);
    // 	}
    // )
    var navigator_info: any = window.navigator;
    var screen_info: any = window.screen;
    var uid: any = navigator_info.mimeTypes.length;
    uid += navigator_info.userAgent.replace(/\D+/g, "");
    uid += navigator_info.plugins.length;
    uid += screen_info.height || "";
    uid += screen_info.width || "";
    uid += screen_info.pixelDepth || "";
    sessionStorage.setItem("device_id", uid);
  }
};

export const getPhoneId = () => {
  if (getPhoneIdFromLS()) {
    return getPhoneIdFromLS();
  } else {
    let phoneId = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      (c) => {
        const r = (Math.random() * 16) | 0;
        const v = c === "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
    sessionStorage.setItem("phone_id", phoneId);
    return phoneId;
  }
};

export function getTabIdBySesionStorage() {
  return sessionStorage.getItem("tabId");
}

export const getTabId = () => {
  if (getTabIdBySesionStorage()) {
    return getTabIdBySesionStorage();
  } else {
    let tabId = "xxxxxxxx-4xxx".replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0;
      const v = c === "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
    sessionStorage.setItem("tabId", tabId);

    return tabId;
  }
};
export const removeEmptyValues = (data: any) => {
  for (var propName in data) {
    if (!data[propName] || data[propName].length === 0) {
      delete data[propName];
    } else if (typeof data[propName] === "object") {
      removeEmptyValues(data[propName]);
    }
  }
  return data;
};

export const getChildCategoryId = (props: any) => {
  const { id, list } = props;
  var returnData = {};
  for (var index in list) {
    if (list[index]._id === id) {
      returnData = {
        categoryId: list[index]._id,
        categoryName: list[index].categoryName,
        isDefaultExpenseCategory: true,
      };
    }
    var childCat = list[index].userAccounts;

    if (childCat != undefined) {
      if (childCat.length > 0) {
        for (var i in childCat) {
          if (childCat[i]._id === id) {
            returnData = {
              categoryId: childCat[i]._id,
              categoryName: childCat[i].name,
              isDefaultExpenseCategory: false,
            };
          }
        }
      }
    }
  }
  return returnData;
};

export const getParentChildCategory = (list: any, selectedCategories: any) => {
  let returnData = [];
  var childCat = [];

  interface CategroyParam {
    label: string;
    //checked: boolean | false;
    children?: any;
    row_id: any;
    disabled: boolean;
  }
  for (var index = 0; index < list.length; index++) {
    childCat = list[index].userAccounts;
    var children = <any>[];
    if (childCat != undefined) {
      if (childCat.length > 0) {
        for (var i = 0; i < childCat.length; i++) {
          children.push({
            parentCategoryName: list[index].categoryName,
            disabled: false,
            tagLabel: list[index].categoryName + "-" + childCat[i].name,
            row_id: childCat[i]?.customerVendorId
              ? childCat[i]?.customerVendorId
              : childCat[i]?._id,
            id: childCat[i]?._id,
            label: childCat[i]?.name != undefined ? childCat[i].name : "",
            checked: selectedCategories.includes(
              childCat[i]?.customerVendorId
                ? childCat[i]?.customerVendorId
                : childCat[i]?._id
            )
              ? true
              : false,
          });
        }
      }
      returnData.push({
        disabled: true,
        row_id: index + 1,
        label: list[index].categoryName,
        //checked: selectedCategories.includes(list[index]?._id) ? true : false,
        children: children,
      });
    }
  }

  var ArrayOfResult: CategroyParam[] = returnData;
  return ArrayOfResult;
};

export const gitCategoriesIds = (list: any) => {
  let ids = [];
  var childCat = [];
  for (var index = 0; index < list.length; index++) {
    childCat = list[index]._children;
    ids.push(list[index]._id);
    if (childCat != undefined) {
      if (childCat.length > 0) {
        for (var i = 0; i < childCat.length; i++) {
          ids.push(childCat[i]);
        }
      }
    }
  }
  return ids;
};

export const getFormtedDate = (date: any, format: any) => {
  const d = new Date(date);
  return moment(d).zone(0).format(format); //moment(d).zone(0).format(format)
};

export const getLocalFormtedDate = (date: any, format: string) => {
  const gmtDateTime = moment.utc(date, "YYYY-MM-DD HH:mm:ss");
  return gmtDateTime.local().format(format);
};

export const downloadFile = (
  file: string,
  format: string,
  documentType: number
) => {
  try {
    const url = format + file;
    const link = document.createElement("a");
    const fileName = getDocumentType(documentType);
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
  } catch (error) {
    console.log("error in downloading");
  }
};

export const getStateName = (id: string, stateList: any) => {
  return id;
};
export const getCityName = (id: string, cityList: any) => {
  try {
    return cityList.filter((x: any) => x.id == id)[0].name;
  } catch (error) {
    console.log("error in downloading");
  }
};

export const getAmountToWords = (amount: any) => {
  try {
    const toWords = new ToWords({
      localeCode: "en-IN",
      converterOptions: {
        currency: true,
        ignoreDecimal: false,
        ignoreZeroCurrency: false,
        doNotAddOnly: false,
        currencyOptions: {
          name: "Rupee",
          plural: "Rupees",
          symbol: "₹",
          fractionalUnit: {
            name: "Paisa",
            plural: "Paise",
            symbol: "",
          },
        },
      },
    });
    return toWords.convert(amount);
  } catch (error) {
    console.log("error in downloading");
  }
};
export const getFilterFormtedDate = (date: any) => {
  var event = new Date(date);
  return event.toLocaleDateString("fr-CA").slice(0, 10);
};

export const cleanObj = (obj: any) => {
  for (var propName in obj) {
    if (
      obj[propName] === null ||
      obj[propName] === undefined ||
      obj[propName] === ""
    ) {
      delete obj[propName];
    } else if (typeof obj[propName] === "object") {
      cleanObj(obj[propName]);
    }
  }
  return obj;
};

export const getStatusDropDown = (type: string) => {
  switch (type) {
    case "estimate":
      return estimateDropdown;
    case "order":
      return orderDeliveryReceiptNoteDropdown;
    case "invoice":
      return invoiceDropdown;
    case "cashMemo":
      return cashMemoReciptDropdown;
    case "creditNote":
      return creditNoteDropdown;
    case "bill":
      return billDropdown;
    case "debitNote":
      return debitNoteDropdown;
    case "purchaseDashboard":
      return purchaseDashboardDropDown;
    default:
      return dashboardDropDown;
  }
};

export const getListFormtedDate = (date: any) => {
  var event = new Date(date);
  return event.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};
export const getSentDate = (detail: any, status: any) => {
  var date =
    detail?.length &&
    detail.find((data: any) => {
      return data.status == status;
    });

  if (date?.createdAt != undefined) {
    let newDate = getFilterFormtedDate(date.createdAt);
    return getFormtedDate(newDate, "DD-MM-YYYY");
  }
  return "N/A";
};

export const getAuthorization = (
  type: number,
  documentType: number,
  status: string,
  field?: any
) => {
  return true;
};

export const CustomBreadCrumb = (currentPath: any) => {
  const staticPath = [
    "/payment",
    "/payments",
    "/payments/collect",
    "/payments/payout",
    "/payments/payouts",
    "/payments/collect/customers/edit",
    "/payments/payouts/vendor/edit",
    "/accounting",
    "/report",
    "/products-&-services",
    "/purchase/receipt-note/edit",
  ];
  if (currentPath == "/sales") {
    currentPath = "/sales/sales-dashboard";
  }
  if (currentPath == "/purchase") {
    currentPath = "/purchase/purchase-dashboard";
  }
  if (currentPath == "/purchase/receipt") {
    currentPath = "/purchase/receipts";
  }
  if (currentPath == "/products") {
    currentPath = "/products-&-services/products";
  }

  if (staticPath.includes(currentPath)) {
    currentPath = "#";
  }

  return currentPath;
};

export const convertIntegerToDecimal = (val: any) => {
  try {
    if (!val) return "₹0.00";
    return `₹${Number(val)?.toFixed(2)}`;
  } catch (err) {
    return "0.00";
    console.log("convertIntegerToDecimal", err);
  }
};

export const valideWhiteSpace = (input: string) => {
  return space.test(input);
};

export const breadCrumbTitle = (title: any) => {
  switch (title) {
    case "order":
      return "Sales Order";
    case "invoice":
      return "Sales Invoice";
    case "delivery":
      return "Delivery Challan";
    case "purchase":
      return "purchases";
    default:
      return title;
  }
};
export const getUpdatedNameSp = (name: string) => {
  switch (name) {
    case "purchase":
      return "purchases";
    case "purchase dashboard":
      return "purchases dashboard";
    case "invoice":
      return "sales invoice";
    case "order":
      return "sales order";
    case "delivery":
      return "delivery challan";
    default:
      return name;
  }
};
export const getTransType = (value: any) => {
  switch (value) {
    case 5:
      return "Credit Note";
    case 10:
      return "Debit Note";
    default:
      return value;
  }
};

export const getTransId = (data: any) => {
  return data?.addBankAccountType == BANK_TYPE.PERFIOS
    ? data?.accUuid
    : data?._id;
};

export const getBankType = (data: any) => {
  return data?.addBankAccountType == BANK_TYPE.PERFIOS
    ? BANK_TYPE.PERFIOS
    : BANK_TYPE.ICICI;
};

export const getOverDueDays = (detail: any) => {
  return (
    (detail.daysLeft <= 0 &&
      ![
        (statusEnum.NOT_SENT,
        statusEnum.EXPIRED,
        statusEnum.CANCELED,
        statusEnum.EXPIRED),
      ].includes(detail.status) &&
      Math.abs(detail.daysLeft)) ||
    "N/A"
  );
};
export const getId = () => {
  const query = new URLSearchParams(window.location.search);
  return query.get("id");
};

export const getUpdatedBreadcrumb = (pathnames: any) => {
  if (pathnames.includes("edit")) {
    var i = pathnames.indexOf("edit");
    var breadCrumbArray = pathnames.filter((x: any, y: any) => {
      return y <= i;
    });
    return breadCrumbArray;
  }
  if (pathnames.includes("add")) {
    var i = pathnames.indexOf("add");
    var breadCrumbArray = pathnames.filter((x: any, y: any) => {
      return y <= i;
    });
    return breadCrumbArray;
  }
  return pathnames;
};
