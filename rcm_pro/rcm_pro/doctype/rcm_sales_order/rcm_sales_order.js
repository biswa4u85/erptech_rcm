// Copyright (c) 2024, erptech and contributors
// For license information, please see license.txt

frappe.ui.form.on("Rcm Sales Order", {
  onload(frm) {
    console.log("frm", frm);
    // frm.set_df_property("order_no", "“read_only”", 1);
  },
//   party_name: function (frm) {
//     cur_frm.set_query("party_address", function () {
//       return {
//         filters: {
//           ledger_name: frm.doc.party_name,
//         },
//       };
//     });
//   },
  refresh(frm) {
    console.log("frm", frm);
  },
});
