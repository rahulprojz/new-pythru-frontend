interface MenuDropDownLinks {
  [key: string]: string[];
}
export const menuLinksForInvoice: MenuDropDownLinks = {
  1: ["Cancel", "Download", "Send Invoice"],
  5: [
    "Cancel",
    "Download",
    "Send Reminder",
    "Mark as Paid",
    "Mark as Partial Paid",
  ],
  6: [
    "Cancel",
    "Download",
    "Send Invoice",
    "Convert to Credit Note",
    "Mark as Paid",
    "Mark as Partial Paid",
  ],
  7: ["Download", "Convert to Credit Note"],
  8: ["Download"],
  9: ["Download"],
};
