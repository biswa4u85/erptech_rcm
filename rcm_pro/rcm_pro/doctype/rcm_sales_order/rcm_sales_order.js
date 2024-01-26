// Copyright (c) 2024, erptech and contributors
// For license information, please see license.txt

frappe.ui.form.on("Rcm Sales Order", {
  onload(frm) {
    frm.set_query("job_site_name", function () {
      return {
        filters: {
          ledger_name: "",
        },
      };
    });
  },
  refresh: function (frm) {
    let field1 = frm.get_field("party_address");
    field1.$input.prop("readonly", true);
    let field2 = frm.get_field("buyer_address");
    field2.$input.prop("readonly", true);
  },
  party_name: async function (frm) {
    // Set Address
    let address = await frappe.db.get_value(
      "Ledger Master",
      frm.doc.party_name,
      "address"
    );
    if (address && address?.message)
      frm.set_value("party_address", address?.message?.address);

    // Set Buyer Name
    frm.set_value("buyer_name", frm.doc.party_name);

    // Set Job Sites
    frm.set_value("job_site_name", null);
    frm.set_query("job_site_name", function () {
      return {
        filters: {
          ledger_name: frm.doc.party_name,
        },
      };
    });
  },
  buyer_name: async function (frm) {
    // Set Address
    let address = await frappe.db.get_value(
      "Ledger Master",
      frm.doc.buyer_name,
      "address"
    );
    if (address && address?.message)
      frm.set_value("buyer_address", address?.message?.address);
  },
});
