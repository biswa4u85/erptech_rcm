// Copyright (c) 2024, erptech and contributors
// For license information, please see license.txt

frappe.listview_settings["Rcm Sales Order"] = {
  formatters: {
    party_name(value, field, doc) {
      return doc.party_name_ledger_name;
    },
  },
};