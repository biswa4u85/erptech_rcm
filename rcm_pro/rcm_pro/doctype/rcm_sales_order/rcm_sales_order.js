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
    let field3 = frm.get_field("site_address");
    field3.$input.prop("readonly", true);
  },
  party_name: async function (frm) {
    // Set Address
    let addressName = await frappe.db.get_value(
      "Ledger Master",
      frm.doc.party_name,
      "address"
    );
    if (addressName && addressName?.message) {
      let address = await frappe.db.get_value(
        "Address Master",
        addressName?.message?.address,
        ["address", "address_1", "address_2", "city", "state", "country", "pin"]
      );
      frm.set_value(
        "party_address",
        `${address.message.address ?? ""} ${address.message.address_1 ?? ""} ${
          address.message.address_2 ?? ""
        } ${address.message.city ?? ""} ${address.message.state ?? ""} ${
          address.message.country ?? ""
        } ${address.message.pin ?? ""}`
      );
    }

    // Set Buyer Name
    frm.set_value("buyer_name", frm.doc.party_name);

    // Set Job Sites
    frm.set_value("job_site_name", null);
    frm.set_value("site_address", null);
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
    let addressName = await frappe.db.get_value(
      "Ledger Master",
      frm.doc.buyer_name,
      "address"
    );
    if (addressName && addressName?.message) {
      let address = await frappe.db.get_value(
        "Address Master",
        addressName?.message?.address,
        ["address", "address_1", "address_2", "city", "state", "country", "pin"]
      );
      frm.set_value(
        "buyer_address",
        `${address.message.address ?? ""} ${address.message.address_1 ?? ""} ${
          address.message.address_2 ?? ""
        } ${address.message.city ?? ""} ${address.message.state ?? ""} ${
          address.message.country ?? ""
        } ${address.message.pin ?? ""}`
      );
    }
  },
  job_site_name: async function (frm) {
    // Set Address
    let addressName2 = await frappe.db.get_value(
      "Job Site Master",
      frm.doc.job_site_name,
      "address"
    );
    if (addressName2 && addressName2?.message) {
      let address = await frappe.db.get_value(
        "Address Master",
        addressName2?.message?.address,
        ["address", "address_1", "address_2", "city", "state", "country", "pin"]
      );
      frm.set_value(
        "site_address",
        `${address.message.address ?? ""} ${address.message.address_1 ?? ""} ${
          address.message.address_2 ?? ""
        } ${address.message.city ?? ""} ${address.message.state ?? ""} ${
          address.message.country ?? ""
        } ${address.message.pin ?? ""}`
      );
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
