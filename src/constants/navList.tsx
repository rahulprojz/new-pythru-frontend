import {
  DASHBOARDIMG,
  PRODUCTSIMG,
  PAYMENTSIMG,
  SALESIMG,
  PURCHASEIMG,
  BANKINGIMG,
  ACCOUNTINGIMG,
  REPORTSIMG,
  SETTINGIMG,
  LOGOUTIMG,
  TEAMIMG,
} from "../constants";

export const NavList = [
  {
    routes: ["dashboard"],
    href: "/dashboard",
    icon: DASHBOARDIMG,
    id: "dashboard",
    title: "Dashboard",
    items: [],
  },
  {
    routes: ["payroll"],
    href: "/payroll",
    icon: DASHBOARDIMG,
    id: "dashboard",
    title: "Payroll",
  },

  {
    href: "/",
    id: "productAndServices",
    routes: ["products", "services"],
    icon: PRODUCTSIMG,
    title: "Products & Services",
    items: [
      {
        title: "Products",
        href: "/products-&-services/products",
      },
      {
        title: "Services",
        href: "/products-&-services/services",
      },
    ],
  },
  {
    href: "/",
    routes: ["payment", "vendor", "payouts"],
    icon: PAYMENTSIMG,
    parentId: 1,
    id: "payments",
    title: "Payments",
    items: [
      {
        title: "Collect",
        href: "/",
        routes: ["payment"],
        parentId: 1,
        items: [
          {
            title: "Customers",
            href: "/payments/collect/customers",
            add: true
          },
          {
            title: "Invoices",
            href: "/payments/collect/invoices",
            add: true
          },
          // {
            //   title: "Payment Links",
            //   href: "/payment-links",
            // },
            // {
              //   title: "Bulk Payment Links",
              //   href: "/bulk-payment-links",
              // },
            ],
          },
          {
            title: "Payouts",
            href: "/",
            parentId: 1,
            routes: ["payouts"],
            items: [
              {
                title: "Vendor",
                href: "payments/payouts/vendor",
                add: true
              },
              // {
                //   title: "Fund Transfer",
                //   href: "/fund-transfer",
                // },
                // paymentInvoice: "/payment/collect/invoice",
          // paymentBill: "/payment/payout/bill",
          // {
            //   title: "Bulk Transfer",
            //   href: "/bulk-transfer",
            // },
            {
              title: "Bills",
              href: "payments/payouts/bills",
              add: true
            },
          ],
        },
    ],
  },
  {
    routes: ["banking"],
    href: "/banking",
    icon: BANKINGIMG,
    id: "banking",
    title: "Banking",
    items: [],
  },
  {
    href: "/",
    icon: SALESIMG,
    routes: ["sales", "customers"],
    title: "Sales",
    id: "sales",
    items: [
      {
        title: "Sales Dashboard",
        href: "/sales/sales-dashboard",
      },
      {
        title: "Customers",
        href: "/sales/customers",
        add: true
      },
      {
        title: "Estimate",
        href: "/sales/estimate",
        add: true
      },
      {
        title: "Sales Order",
        href: "/sales/order",
        add: true
      },
      {
        title: "Sales Invoice",
        href: "/sales/invoice",
        add: true
      },
      {
        title: "Delivery Challan",
        href: "/sales/delivery",
        add: true
      },
      {
        title: "Cash Memo",
        href: "/sales/cash-memo",
        add: true
      },
      {
        title: "Credit Note",
        href: "/sales/credit-note",
        add: true
      },
      // {
        //   title: "Reconcile",
        //   href: "/reconcile",
        // },
      ],
  },
  {
    href: "/",
    icon: PURCHASEIMG,
    routes: ["purchase", "expenses", "vendor"],
    title: "Purchases",
    id: "purchases",
    items: [
      {
        title: "Purchases Dashboard",
        href: "/purchase/purchase-dashboard",
      },
      // {
      //   title: "Expenses",
      //   href: "/expenses",
      // },
      {
        title: "Vendor",
        href: "/purchase/vendor",
        add: true
      },
      {
        title: "Purchase Order",
        href: "/purchase/purchase-order",
        add: true
      },
      
      {
        title: "Receipt Note",
        href: "/purchase/receipt-note",
        add: true
      },
      {
        title: "Bills",
        href: "/purchase/bills",
        add: true
      },
      {
        title: "Debit Note",
        href: "/purchase/debit-note",
        add: true
      },
      {
        title: "Receipts",
        href: "/purchase/receipts",
        add: true
      },

      // {
      //   title: "Reconcile",
      //   href: "/reconcile",
      // },
    ],
  },
  // {
  //   href: "/banking",
  //   icon: BANKINGIMG,
  //   title: "Banking",
  // },
  // {
  //   href: "/",
  //   icon: PAYMENTSIMG,
  //   title: "Payment Getaway",
  //   items: [
  //     {
  //       title: "Transactions",
  //       href: "/transactions",
  //     },
  //     {
  //       title: "Settlement",
  //       href: "/settlement",
  //     },
  //   ],
  // },
  {
    href: "/",
    routes: ["manual-journals", "transactions", "accounting", "assets"],
    icon: ACCOUNTINGIMG,
    title: "Accounting",
    id: "accounting",
    items: [
      {
        title: "Manual Journals",
        href: "/accounting/manual-journals",
      },
      // {
      //   title: "Transactions",
      //   href: "/accounting/transactions",
      // },
      {
        title: "Chart of Accounts",
        href: "/accounting/chart-of-accounts",
      },
      // {
      //   title: "Assets",
      //   href: "/assets",
      //   id: "assets",
      // },
    ],
  },
  {
    href: "/",
    icon: REPORTSIMG,
    id: "reports",
    routes: [
      "cashflow",
      "general",
      "profit-loss",
      "aged-receivables",
      "trial-balance",
      "balance-sheet",
      "reports",
      "customer-report",
    ],
    title: "Reports",
    items: [
      {
        title: "Cashflow",
        href: "/reports/cash-flow",
      },
      {
        title: "General Ledger",
        href: "/reports/general-ledger",
      },
      {
        title: "Profit Loss",
        href: "/reports/profit-loss",
      },
      {
        title: "Aged Receivables",
        href: "/reports/aged-reveivables",
      },
      {
        title: "Aged Payables",
        href: "/reports/aged-payables",
      },
      {
        title: "Trial Balance",
        href: "/reports/trial-balance",
      },
      {
        title: "Balance Sheet",
        href: "/reports/balance-sheet",
      },
      // {
      //   title: "Customers",
      //   href: "/customer-report",
      // },
      // {
      //   title: "Sales",
      //   href: "/reports/sales",
      // },
    ],
  },
  // {
  //   href: "/",
  //   routes: ["role", "team-member"],
  //   icon: TEAMIMG,
  //   title: "Team Management",
  //   id: "teamManagement",
  //   items: [
  //     {
  //       title: "Role",
  //       href: "/role",
  //     },
  //     {
  //       title: "Team Member",
  //       href: "/team-member",
  //     },
  //   ],
  // },
  {
    href: "/settings",
    icon: SETTINGIMG,
    title: "Settings",
    id: "settings",
    routes: ["settings"],
  },
  {
    href: "/login",
    icon: LOGOUTIMG,
    title: "Logout",
  },
];
