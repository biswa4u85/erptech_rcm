// Copyright (c) 2024, erptech and contributors
// For license information, please see license.txt

frappe.ui.form.on("Schedule Master", {
  refresh: function (frm) {
    if (frm.doc.docstatus === 0) {
      let field1 = frm.get_field("party_name");
      field1.$input.prop("readonly", true);
      let field2 = frm.get_field("site_name");
      field2.$input.prop("readonly", true);
      let field3 = frm.get_field("order_no");
      field3.$input.prop("readonly", true);
      let field4 = frm.get_field("grade_name");
      field4.$input.prop("readonly", true);
      let field5 = frm.get_field("remaining_qty");
      field5.$input.prop("readonly", true);
      const currentDate = new Date();
      frm.set_value("date", currentDate);
    }
  },
  date: async function (frm) {
    // frm.set_value("party_name", null);
    let orders = await frappe.db.get_list("Rcm Sales Order", {
      fields: ["party_name"],
      filters: {
        valid_date: [">=", frm.doc.date],
      },
      limit: 100,
    });
    let field = frm.get_field("party_name");
    field.$input.prop("readonly", false);
    let orderIds = orders.map((obj) => obj.party_name);
    frm.set_query("party_name", function () {
      return {
        filters: {
          name: ["in", orderIds],
        },
      };
    });
  },
  party_name: async function (frm) {
    frm.set_value("site_name", null);
    let orders = await frappe.db.get_list("Rcm Sales Order", {
      fields: ["party_name", "site_name"],
      filters: {
        valid_date: [">=", frm.doc.date],
        party_name: frm.doc.party_name,
      },
      limit: 100,
    });
    let field = frm.get_field("site_name");
    field.$input.prop("readonly", false);
    let siteIds = orders.map((obj) => obj.site_name);
    frm.set_query("site_name", function () {
      return {
        filters: {
          ledger_name: frm.doc.party_name,
          name: ["in", siteIds],
        },
      };
    });
  },
  site_name: async function (frm) {
    frm.set_value("order_no", null);
    let field = frm.get_field("order_no");
    field.$input.prop("readonly", false);
    frm.set_query("order_no", function () {
      return {
        filters: {
          valid_date: [">=", frm.doc.date],
          party_name: frm.doc.party_name,
          site_name: frm.doc.site_name,
        },
      };
    });
  },
  order_no: async function (frm) {
    frm.set_value("grade_name", null);
    frappe.call({
      method:
        "rcm_pro.rcm_pro.doctype.schedule_master.schedule_master.get_items",
      args: {
        doc: frm.doc,
      },
      callback: function (r) {
        if (r.message) {
          let field = frm.get_field("grade_name");
          field.$input.prop("readonly", false);
          let orderIds = r.message.map((obj) => obj.grade_name);
          frm.set_query("grade_name", function () {
            return {
              filters: {
                name: ["in", orderIds],
              },
            };
          });
        }
      },
    });
  },
  grade_name: async function (frm) {
    frappe.call({
      method:
        "rcm_pro.rcm_pro.doctype.schedule_master.schedule_master.get_item",
      args: {
        doc: frm.doc,
      },
      callback: function (r) {
        if (r.message && r.message && r.message[0] && r.message[1]) {
          const totalQty = r.message[1].reduce((accumulator, currentObject) => {
            return accumulator + currentObject.schedule_qty;
          }, 0);
          frm.set_value("rmc_rate", r.message[0].rate);
          frm.set_value("remaining_qty", Number(r.message[0].qty) - totalQty);
        }
      },
    });
  },
  validate: function (frm) {
    if (frm.doc.remaining_qty < frm.doc.schedule_qty) {
      frappe.msgprint(__("You can not add more then remaining qty"));
      frappe.validated = false;
    }
  },
});