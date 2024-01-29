// Copyright (c) 2024, erptech and contributors
// For license information, please see license.txt

frappe.ui.form.on("Quotation Entry", {
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
    let field1 = frm.get_field("address");
    field1.$input.prop("readonly", true);
    let field3 = frm.get_field("job_site_address");
    field3.$input.prop("readonly", true);
  },
  party_name: async function (frm) {
    // Set Address
    let address = await frappe.db.get_value(
      "Ledger Master",
      frm.doc.party_name,
      "address"
    );
    if (address && address?.message)
      frm.set_value("address", address?.message?.address);

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
  job_site_name: async function (frm) {
    // Set Address
    let address = await frappe.db.get_value(
      "Job Site Master",
      frm.doc.job_site_name,
      "address"
    );
    if (address && address?.message)
      frm.set_value("job_site_address", address?.message?.address);
  },
});
