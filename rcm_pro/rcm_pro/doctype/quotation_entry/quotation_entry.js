// Copyright (c) 2024, erptech and contributors
// For license information, please see license.txt

frappe.ui.form.on("Quotation Entry", {
  setup: function (frm) {
    
    frm.custom_make_buttons = {
      'Sales Order': 'Sales Order'
    }

      // frm.set_query("quotation_to", function () {
      //   return {
      //     "filters": {
      //       "name": ["in", ["Customer", "Lead", "Prospect"]],
      //     }
      //   }
      // });

    // frm.set_df_property('packed_items', 'cannot_add_rows', true);
    // frm.set_df_property('packed_items', 'cannot_delete_rows', true);

    // frm.set_query('company_address', function (doc) {
    //   if (!doc.company) {
    //     frappe.throw(__('Please set Company'));
    //   }

    //   return {
    //     query: 'frappe.contacts.doctype.address.address.address_query',
    //     filters: {
    //       link_doctype: 'Company',
    //       link_name: doc.company
    //     }
    //   };
    // });

    // frm.set_query("serial_and_batch_bundle", "packed_items", (doc, cdt, cdn) => {
    //   let row = locals[cdt][cdn];
    //   return {
    //     filters: {
    //       'item_code': row.item_code,
    //       'voucher_type': doc.doctype,
    //       'voucher_no': ["in", [doc.name, ""]],
    //       'is_cancelled': 0,
    //     }
    //   }
    // });
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
    let field1 = frm.get_field("address");
    field1.$input.prop("readonly", true);
    let field3 = frm.get_field("job_site_address");
    field3.$input.prop("readonly", true);
  },
  party_name: async function (frm) {
    if (frm.doc.party_name) {
      // Set Address
      let addressName = await frappe.db.get_value(
        "Ledger Master",
        frm.doc.party_name,
        "address"
      );
      if (addressName && addressName?.message?.address) {
        let address = await frappe.db.get_value(
          "Address Master",
          addressName?.message?.address,
          ["address", "address_1", "address_2", "city", "state", "country", "pin"]
        );
        frm.set_value(
          "address",
          `${address.message.address ?? ""} ${address.message.address_1 ?? ""} ${address.message.address_2 ?? ""
          } ${address.message.city ?? ""} ${address.message.state ?? ""} ${address.message.country ?? ""
          } ${address.message.pin ?? ""}`
        );
      }

      // Set Job Sites
      frm.set_value("site_name", null);
      frm.set_query("site_name", function () {
        return {
          filters: {
            ledger_name: frm.doc.party_name,
          },
        };
      });
    }
  },
  site_name: async function (frm) {
    if (frm.doc.site_name) {
      // Set Address
      let addressName = await frappe.db.get_value(
        "Job Site Master",
        frm.doc.party_name,
        "address"
      );
      if (addressName && addressName?.message?.address) {
        let address = await frappe.db.get_value(
          "Address Master",
          addressName?.message?.address,
          ["address", "address_1", "address_2", "city", "state", "country", "pin"]
        );
        frm.set_value(
          "job_site_address",
          `${address.message.address ?? ""} ${address.message.address_1 ?? ""} ${address.message.address_2 ?? ""
          } ${address.message.city ?? ""} ${address.message.state ?? ""} ${address.message.country ?? ""
          } ${address.message.pin ?? ""}`
        );
      }
    }
  },
});
