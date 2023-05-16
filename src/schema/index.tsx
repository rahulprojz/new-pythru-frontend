import axios from "axios";
import * as Yup from "yup";
import {
  phoneRegExp,
  adharRegExp,
  panRegExp,
  gstRegExp,
  zipRegExp,
  websiteRegex,
} from "../constants";
import request from "../utils/axios.instance";
/* forgot password screen schema validation */

const LoginSchema = (t: any) => {
  return Yup.object().shape({
    // email: Yup.string()
    //   .trim()
    //   .required("Email or mobile number is required")
    //   .max(60, "Email or mobile number is maximum 60 characters")
    //   .min(3, "Email or mobile number is minimum 3 characters"),
    password: Yup.string().required("Password is Required"),
    // .matches(
    //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
    //   "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    // ),
  });
};

/**forgot password */

const forgotPasswordSchema = () => {
  return Yup.object().shape({
    email: Yup.string()
      .trim()
      .required("Email or mobile number is required")
      .max(60, "Email or mobile number is maximum 60 characters")
      .min(3, "Email or mobile number is minimum 3 characters")
      .nullable(),
  });
};
// const phoneVerificationSchema = () => {
//   return Yup.object().shape({
//     phoneNumber: Yup.string()
//       .trim()
//       .required("Mobile Number is required")
//       .max(10, "Mobile number is maximum 10 characters")
//       .min(10, "Mobile number is minimum 10 characters")
//       .nullable()
//       .test("Phone number is not valid", (value: any, testContext: any) => {
//         // Use function
//         // if (!navigator.onLine) return;
//         return request
//           .post("user/check-phone-availability", {
//             phoneNumber: value,
//             countryCode: "+91",
//           })
//           .then((res) => {
//             const message = res;
//             // console.log("API Response:", message, message.data.responseMsg);
//             return true;
//             // return Promise.resolve(this.createError({ message: message })); // This also works
//           })
//           .catch((error: any) => {
//             return testContext.createError({
//               message: error?.response?.data?.responseMsg,
//             });
//             // console.log(e);
//           });
//       })
//       .nullable(),
//   });
// };

/*****Signup schema */
const SignupSchema = (e: any) => {
  return Yup.object().shape({
    fullName: Yup.string()
      .trim()
      .required("Full Name is required")
      .max(30, "Full Name must be at most 30 characters")
      .min(4, "Full Name must be at least 4 characters"),

    password: Yup.string()
      .required("Password is Required")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
      ),
    confirmPassword: Yup.string()
      .required("Password is Required")
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
    termAndCondition: Yup.boolean().oneOf(
      [true],
      "You must accept the terms and conditions"
    ),
  });
};

/* Manage Master Tasks Lists and Wages Screen */
const ResetPasswordSchema = () => {
  return Yup.object().shape({
    password: Yup.string()
      .required("Password is Required")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
      ),
    confirmPassword: Yup.string()
      .required("Password is Required")
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
  });
};

/* Support plans and screen  */
const SupportPlanSchema = () => {
  return Yup.object().shape({
    planName: Yup.string().trim().required("This Field is required"),
    weekdayAmount: Yup.number().required("This Field is required"),
    weekendAmount: Yup.number().required("This Field is required"),
    holidayAmount: Yup.number().required("This Field is required"),
    stateWedges: Yup.array().of(
      Yup.object().shape({
        state: Yup.string().required("This Field is required"),
        wedges: Yup.number().required("This Field is required"),
      })
    ),
  });
};

const AssetSchema = () => {
  return Yup.object().shape({
    name: Yup.string().trim().required("Name is required"),
    amount: Yup.number()
      .required("Amount is required")
      .test(
        "Is positive?",
        "Amount must be greater than 0",
        (value) => value === undefined || value === null || value > 0
      ),
    purchasedDate: Yup.string()
      .trim()
      .nullable(true)
      .required("Purchased Date is required"),
    supportedDate: Yup.string()
      .trim()
      .nullable(true)
      .required("Supported Date is required"),
  });
};

const EstimateSchema = () => {
  return Yup.object().shape({
    fromDate: Yup.date().nullable(true).required("Date is required"),
    dueDate: Yup.string().nullable(true).required("Date is required"),
    customerVendorId: Yup.string().required("Customer is required"),
    placeOfSupply: Yup.string().required("Place of supply is required"),
    referenceNumber: Yup.string().required("Ref Id is required"),
    description: Yup.string()
      .nullable(true)
      .max(300, "Description text should not be more than 300 characters."),
    productDetails: Yup.array().of(
      Yup.object().shape({
        productId: Yup.string().required("Item is required"),
        // quantity: Yup.number()
        //   .required("Quantity is required")
        //   .integer("integer")
        //   .test("Is positive?", "Quantity must be greater than 0", (value) => {
        //     return value === undefined || value === null || value > 0;
        //   }),
        amount: Yup.number().test(
          "Is positive?",
          "Amount must be postive",
          (value) => {
            return value === undefined || value === null || value > -1;
          }
        ),
        // discount: Yup.string().matches(
        //   /^(\d{1,5}|\d{0,5}\.\d{1,2})$/,
        //   "decimal upto 2 places"
        // ),
        // .moreThan(-1, "Discount should not be zero or less than zero")
        // .lessThan(101, "Discount should not be more than 100%").,
      })
    ),
  });
};

const AddProductSchema = () => {
  return Yup.object().shape({
    purchasePrice: Yup.number().required("Purchase Price is required"),
    salePrice: Yup.number().required("Sale Price is required"),
    // hsnCode: Yup.string().when("isGstApplicable", {
    //   is: "yes",
    //   then: Yup.string().required("HSN Code is required"),
    //   // otherwise: Yup.string(),
    // }),
    // cess: Yup.string()
    //   .trim()
    //   .when(["taxability", "isGstApplicable"], {
    //     is: (taxability: any, isGstApplicable: any) => {
    //       if (+taxability == 1 && isGstApplicable === "yes") {
    //         return true;
    //       }
    //     },
    //     then: Yup.string().required("Cess is required"),
    //     otherwise: Yup.string(),
    //   }),
    taxability: Yup.string().when("isGstApplicable", {
      is: "yes",
      then: Yup.string().required("Taxability is required").nullable(),
      // otherwise: Yup.string(),
    }),
    gstRate: Yup.string()
      .trim()
      .when(["taxability", "isGstApplicable"], {
        is: (taxability: any, isGstApplicable: any) => {
          if (+taxability === 1 && isGstApplicable === "yes") {
            return true;
          }
        },
        then: Yup.string().required("GST rate is required"),
        otherwise: Yup.string(),
      }),
    openingStock: Yup.string().when("trackInventory", {
      is: true,
      then: Yup.string().required("Opening Stock is required").nullable(),
      // otherwise: Yup.string(),
    }),
    lowstockAlert: Yup.string().when("trackInventory", {
      is: true,
      then: Yup.string().required("Lowstock Alert is required").nullable(),
      otherwise: Yup.string(),
    }),
    description: Yup.string()
      .nullable(true)
      .trim()
      .max(300, "Description text should not be more than 300 characters."),
  });
};

const AddServiceSchema = () => {
  return Yup.object().shape({
    // purchasePrice: Yup.number().required("Purchase Price is required"),
    salePrice: Yup.number().required("Sale Price is required"),
    // hsnCode: Yup.string().when("isGstApplicable", {
    //   is: "yes",
    //   then: Yup.string().required("SAC Code is required"),
    //   // otherwise: Yup.string(),
    // }),
    // cess: Yup.string()
    //   .trim()
    //   .when(["taxability", "isGstApplicable"], {
    //     is: (taxability: any, isGstApplicable: any) => {
    //       if (+taxability == 1 && isGstApplicable === "yes") {
    //         return true;
    //       }
    //     },
    //     then: Yup.string().required("Cess is required"),
    //     otherwise: Yup.string(),
    //   }),
    taxability: Yup.string().when("isGstApplicable", {
      is: "yes",
      then: Yup.string().required("Taxability is required").nullable(),
      // otherwise: Yup.string(),
    }),
    gstRate: Yup.string()
      .trim()
      .when(["taxability", "isGstApplicable"], {
        is: (taxability: any, isGstApplicable: any) => {
          if (+taxability === 1 && isGstApplicable === "yes") {
            return true;
          }
        },
        then: Yup.string().required("GST rate is required"),
        otherwise: Yup.string(),
      }),
    openingStock: Yup.string().when("trackInventory", {
      is: true,
      then: Yup.string().required("Opening Stock is required").nullable(),
      // otherwise: Yup.string(),
    }),
    lowstockAlert: Yup.string().when("trackInventory", {
      is: true,
      then: Yup.string().required("Lowstock Alert is required").nullable(),
      otherwise: Yup.string(),
    }),
    description: Yup.string()
      .nullable(true)
      .trim()
      .max(300, "Description text should not be more than 300 characters."),
  });
};

/* Category Add screen schema validation */

const CategoryAddSchema = (t: any) => {
  return Yup.object().shape({
    categoryName: Yup.string()
      .trim()
      .required("Category name is required")
      .min(3, "Category name is minimum 2 characters"),
  });
};

const CustomerSchema = (t: any) => {
  return Yup.object().shape({
    displayName: Yup.string()
      .trim()
      .required("Please provide a name in input field!")
      .max(60, "Name must not contain more than 60 characters")
      .min(3, "Name must contain at least 3 character "),
    primaryContactName: Yup.string()
      .trim()
      .required("Please provide a primary contact name!")
      .max(60, "Primary must not contain more than 60 characters")
      .min(3, "Primary contact must contain at least 3 character"),
    phoneNumber: Yup.string()
      .trim()
      .required("Please provide a phone number!")
      .min(10, "Phone must contain at least 10 character")
      .max(10, "Phone number must not contain more than 10 characters"),
    email: Yup.string()
      .trim()
      .email("Please enter valid email")
      .required("Please provide a email!")
      .min(2, "email must contain at least 2 character")
      .max(50),
    addressLine1: Yup.string()
      .trim()
      .required("Please provide a address Line1!"),
    zip: Yup.string()
      .trim()
      .required("Please provide a zip!")
      .min(6, "Zip code  must contain at least 6 character")
      .max(10, "Zip code must not contain more than 10 characters"),
    townCity: Yup.string().trim().required("Please provide a town city!"),
    state: Yup.string().trim().required("Please provide a state!"),
    shippingAddress1: Yup.string()
      .trim()
      .when("isBillingAndShippingAddressSame", {
        is: false,
        then: Yup.string().required("Shipping Address is required"),
        otherwise: Yup.string().nullable(),
      }),
    shippingState: Yup.string()
      .trim()
      .when("isBillingAndShippingAddressSame", {
        is: false,
        then: Yup.string().required("Shipping state is required"),
        otherwise: Yup.string().nullable(),
      }),
    shippingTownCity: Yup.string()
      .trim()
      .when("isBillingAndShippingAddressSame", {
        is: false,
        then: Yup.string().required("Shipping city is required"),
        otherwise: Yup.string().nullable(),
      }),
    shippingZipCode: Yup.string()
      .trim()
      .when("isBillingAndShippingAddressSame", {
        is: false,
        then: Yup.string()
          .min(6, "Zip code  must contain at least 6 character")
          .max(10, "Zip code must not contain more than 10 characters")
          .required("Zip code is required"),
        otherwise: Yup.string().nullable(),
      }),
    website: Yup.string()
      .trim()
      .nullable(true)
      .matches(websiteRegex, "Website should be a valid URL"),
    accountNumber: Yup.string()
      .trim()
      .nullable(true)
      .matches(/^[0-9]+$/, "Only number allowed")
      .min(11, "Account number must contain at least 11 character")
      .max(16, "Account number  must not contain more than 16 characters"),
    ifscCode: Yup.string()
      .trim()
      .nullable(true)
      .min(11, "Ifsc code must contain at least 11 character")
      .max(11, "Ifsc code must not contain more than 11 characters"),
    bankName: Yup.string()
      .trim()
      .nullable(true)
      .min(3, "Bank name  must contain at least 3 character")
      .max(60, "Bank name must not contain more than 60 characters"),
    branchName: Yup.string()
      .trim()
      .nullable(true)
      .min(3, "Branch name must contain at least 3 character")
      .max(60, "Branch name must not contain more than 60 characters"),
    panCard: Yup.string()
      .trim()
      .nullable(true)
      .matches(panRegExp, "Please enter valid pan number")
      .min(10, "Pan card must contain at least 10 character")
      .max(10, "Pan card must not contain more than 10 characters"),
    gstin: Yup.string()
      .trim()
      .nullable(true)
      .matches(gstRegExp, "Please enter valid GST number"),
  });
};

const chartOfAccountCategorySchema = () => {
  return Yup.object().shape({
    name: Yup.string()
      .trim()
      .required("Category name is required")
      .max(60, "Category name is maximum 60 characters")
      .min(3, "Category name is minimum 3 characters"),
    parentCategoryId: Yup.string()
      .trim()
      .required("L2 Parent Category is required"),
    chartOfAccountType: Yup.string()
      .trim()
      .required("L1 Parent Category is required"),
  });
};

const addCategorySchema = () => {
  return Yup.object().shape({
    name: Yup.string()
      .trim()
      .required("Category name is required")
      .max(60, "Category name is maximum 60 characters")
      .min(3, "Category name is minimum 3 characters"),
    description: Yup.string()
      .trim()
      .required("Description is required")
      .nullable(true)
      .max(300, "Description text should not be more than 300 characters."),
  });
};
const ExpenseSchema = (t: any) => {
  return Yup.object().shape({
    amount: Yup.string()
      .trim()
      .required("Please provide a amount")
      .max(15, "Amount is maximum 15 characters")
      .min(1, "Amount is minimum 1 characters"),
    expenseCategoryId: Yup.string()
      .trim()
      .required("Please provide a expense category"),
    customerVendor: Yup.string().required(
      "Please provide a customer vendor from suggestion list only"
    ),
    referenceId: Yup.string()
      .trim()
      .required("Please provide a Refid!")
      .max(15, "Refid is maximum 15 characters")
      .min(1, "Refid is minimum 1 characters"),
    transactionDate: Yup.string()
      .trim()
      .required("Transaction date is required"),
  });
};

const ChangePasswordSchema = (t: any) => {
  return Yup.object().shape({
    currentPassword: Yup.string().required("Current Password is Required"),
    // .matches(
    //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
    //   "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    // ),
    newPassword: Yup.string()
      .required("New Password is Required")
      .test(
        "isLarger",
        "New password should be unique",
        (value: any, testContext) => {
          if (value === testContext.parent.currentPassword) {
            return false;
          }
          return true;
        }
      )

      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
      ),
    confirmPassword: Yup.string()
      .required("Confirm Password is Required")
      .oneOf(
        [Yup.ref("newPassword"), null],
        "New and confirm Passwords must  match"
      ),
  });
};

// email
// contact
// companyLogoUrl
// pan
// gst
// aadhar;
// addressLine1;
// addressLine2;
// townCity;
// state;
// zipCode;
const organizationSchema = () => {
  return Yup.object().shape({
    companyName: Yup.string()
      .trim()
      .required("Company Name is required")
      .max(30, "Company Name must be at most 30 characters")
      .min(4, "Company Name must be at least 4 characters"),
    // website: Yup.string().required("This Field is required"),
    pan: Yup.string()
      .required("Pan No is required")
      .matches(panRegExp, "Please enter valid pan number"),
    gst: Yup.string()
      .required("Gst No is required")
      .matches(gstRegExp, "Please enter valid GST number"),
    aadhar: Yup.string()
      .required("Aadhaar no is required")
      .matches(adharRegExp, "Please enter valid aadhaar number")
      .nullable(true)
      .max(12, "Please enter valid aadhaar number")
      .min(12, "Aadhaar no is maximum 12 digit"),
    serviceTaxNo: Yup.string().trim().required("Service Tax No is required"),
    addressLine1: Yup.string().required("Address Line 1 is required").max(60),
    addressLine2: Yup.string().required("Address Line 2 is required").max(60),
    townCity: Yup.string().required("City is required"),
    state: Yup.string().required("State is required"),
    zipCode: Yup.string()
      .required("Zip Code is required")
      .matches(zipRegExp, "Please enter valid Zip number"),
  });
};

const ManualJournalSchema = () => {
  return Yup.object().shape({
    transactionDate: Yup.string()
      .trim()
      .nullable(true)
      .required("Transaction Date is required"),
    creditAccount: Yup.array().of(
      Yup.object().shape({
        categoryId: Yup.string().required("Category is required"),
        amount: Yup.number().required("Amount is required"),
      })
    ),
    debitAccount: Yup.array().of(
      Yup.object().shape({
        categoryId: Yup.string().required("Category is required"),
        amount: Yup.number().required("Amount is required"),
      })
    ),
  });
};

const markAsParitalPaidSchema = () => {
  return Yup.object().shape({
    amount: Yup.mixed()
      .required("Amount is required")
      .test(
        "isLarger",
        "Amount must be a less than total amount",
        (value, testContext) => {
          if (parseInt(value) > parseInt(testContext.parent.totalPrice)) {
            return false;
          }
          return true;
        }
      ),
    transactionDate: Yup.string()
      .trim()
      .required("Transaction date is required"),
    totalPrice: Yup.number().required("Total Price is required"),
    paymentMode: Yup.string().trim().required("Mode is required"),
    bankAccount: Yup.string()
      .trim()
      .when("paymentMode", {
        is: "2",
        then: Yup.string().required("Bank account is required"),
        otherwise: Yup.string().nullable(),
      }),
    notes: Yup.string().nullable(true).max(30, "Only 30 characters allowed"),
  });
};

const TeamMemberSchema = () => {
  return Yup.object().shape({
    fullName: Yup.string()
      .trim()
      .required("Full Name is required")
      .max(30, "Full Name must be at most 30 characters")
      .min(4, "Full Name must be at least 4 characters"),

    email: Yup.string()
      .trim()
      .email("Please enter valid email")
      .required("Please provide a email!")
      .min(2, "email must contain at least 2 character")
      .max(50),

    phoneNumber: Yup.string()
      .trim()
      .required("Please provide a phone number!")
      .min(10, "Phone must contain at least 10 character")
      .max(10, "Phone number must not contain more than 10 characters"),

    roleId: Yup.string().required("Role is required"),
  });
};

const RoleAddSchema = () => {
  return Yup.object().shape({
    name: Yup.string()
      .trim()
      .required("Full Name is required")
      .max(30, "Full Name must be at most 30 characters")
      .min(4, "Full Name must be at least 4 characters"),
  });
};

const LinkToAccountSchema = () => {
  return Yup.object().shape({
    CORPID: Yup.string()
      .trim()
      .matches(/^[A-Za-z0-9 ]*$/, "Only alphanumeric alllowed")
      .min(4, "Corporate Id must contain at least 4 character")
      .max(16, "Corporate Id must not contain more than 16 characters")
      .required("Corporate Id is required"),
    USERID: Yup.string()
      .trim()
      .matches(/^[A-Za-z0-9 ]*$/, "Only alphanumeric alllowed")
      .min(4, "User Id must contain at least 4 character")
      .max(16, "User Id must not contain more than 16 characters")
      .required("User Id is required"),
    ACCOUNTNO: Yup.string()
      .trim()
      .matches(/^[0-9 ]*$/, "Only numeric alllowed")
      .required("Account Number is required")
      .min(12, "Account Number must be at least  12 digit")
      .max(20, "Account Number must be at most 20 digit"),
    ACCOUNTHOLDERNAME: Yup.string()
      .trim()
      .required("Account holder name is required")
      .matches(/^[A-Za-z ]*$/, "Only alphabetic alllowed")
      .min(4, "Account holder name must contain at least 4 character")
      .max(16, "Account holder name must not contain more than 16 characters"),
    IFSC: Yup.string()
      .trim()
      .required("IFSC code is required")
      .matches(/^[A-Za-z0-9 ]*$/, "Only alphanumeric alllowed")
      .min(11, "IFSC code must contain at least 11 character")
      .max(11, "IFSC code must not contain more than 11 characters"),
  });
};

const Schema = {
  LoginSchema,
  SignupSchema,
  ResetPasswordSchema,
  SupportPlanSchema,
  forgotPasswordSchema,
  // phoneVerificationSchema,
  AddProductSchema,
  AddServiceSchema,
  CategoryAddSchema,
  CustomerSchema,
  AssetSchema,
  chartOfAccountCategorySchema,
  ExpenseSchema,
  EstimateSchema,
  addCategorySchema,
  ChangePasswordSchema,
  organizationSchema,
  ManualJournalSchema,
  markAsParitalPaidSchema,
  TeamMemberSchema,
  RoleAddSchema,
  LinkToAccountSchema,
};

export default Schema;
