// Copyright (c) 2024, erptech and contributors
// For license information, please see license.txt

frappe.listview_settings["Schedule Master"] = {
  formatters: {
    party_name(value, field, doc) {
      return doc.party_name_ledger_name;
    },
  },
};