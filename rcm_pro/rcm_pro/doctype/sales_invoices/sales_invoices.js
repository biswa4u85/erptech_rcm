// Copyright (c) 2024, erptech and contributors
// For license information, please see license.txt

frappe.ui.form.on("Sales Invoices", {
  setup: function (frm) {
    frm.custom_make_buttons = {
      "Schedule Master": "Schedule Master",
    };
  },
  onload(frm) {
    frm.set_query("site_name", function () {
      return {
        filters: {
          ledger_name: "",
        },
      };
    });
  },
  refresh: function (frm) {
    if (frm.doc.docstatus === 0) {
      let field1 = frm.get_field("party_address");
      field1.$input.prop("readonly", true);
      let field2 = frm.get_field("buyer_address");
      field2.$input.prop("readonly", true);
      let field3 = frm.get_field("site_address");
      field3.$input.prop("readonly", true);
    }
  },
  party_name: async function (frm) {
    debugger;
    // Set Address
    let addressName = await frappe.db.get_value(
      "Ledger Master",
      frm.doc.party_name,
      "address"
    );
    if (addressName && addressName?.message?.address) {
      frm.set_value("party_address", addressName?.message?.address);
    }

    // Set Buyer Name
    frm.set_value("buyer_name", frm.doc.party_name);

    // Set Job Sites
    frm.set_value("site_name", null);
    frm.set_value("site_address", null);
    frm.set_query("site_name", function () {
      return {
        filters: {
          ledger_name: frm.doc.party_name,
        },
      };
    });
  },
  buyer_name: async function (frm) {
    // Set Address
    let addressName = await frappe.db.get_value(
      "Ledger Master",
      frm.doc.buyer_name,
      "address"
    );
    if (addressName && addressName?.message?.address) {
        frm.set_value("buyer_address", addressName?.message?.address);
    }
  },
  site_name: async function (frm) {
    // Set Address
    let addressName = await frappe.db.get_value(
      "Job Site Master",
      frm.doc.site_name,
      "address"
    );
    if (addressName && addressName?.message?.address) {
        frm.set_value("site_address", addressName?.message?.address);
    }
  },
});

frappe.ui.form.on("Order Item", {
  refresh: function (frm) {
    let field1 = frm.get_field("for_rate");
    field1.$input.prop("readonly", true);
    let field2 = frm.get_field("amount");
    field2.$input.prop("readonly", true);
  },
  grade_name: async function (frm, cdt, cdn) {
    let item = locals[cdt][cdn];
    item.item_name = item.grade_name;
    frm.refresh_field("table_zqjd");
  },
  qty: async function (frm, cdt, cdn) {
    let item = locals[cdt][cdn];
    item.for_rate =
      item.rate && item.tax ? Number(item.rate) + Number(item.tax) : "";
    item.amount =
      item.rate && item.qty ? Number(item.rate) * Number(item.qty) : "";
    frm.refresh_field("table_zqjd");
  },
  rate: async function (frm, cdt, cdn) {
    let item = locals[cdt][cdn];
    item.for_rate =
      item.rate && item.tax ? Number(item.rate) + Number(item.tax) : "";
    item.amount =
      item.rate && item.qty ? Number(item.rate) * Number(item.qty) : "";
    frm.refresh_field("table_zqjd");
  },
  tax: async function (frm, cdt, cdn) {
    let item = locals[cdt][cdn];
    item.for_rate =
      item.rate && item.tax ? Number(item.rate) + Number(item.tax) : "";
    item.amount =
      item.rate && item.qty ? Number(item.rate) * Number(item.qty) : "";
    frm.refresh_field("table_zqjd");
  },
});
