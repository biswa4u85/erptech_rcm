// Copyright (c) 2024, erptech and contributors
// For license information, please see license.txt

frappe.ui.form.on("Delivery Challan", {
  refresh: function (frm) {
    if (frm.doc.docstatus === 0) {
      let field1 = frm.get_field("schedule_no");
      field1.$input.prop("readonly", true);
      let field2 = frm.get_field("order_no");
      field2.$input.prop("readonly", true);
      let field3 = frm.get_field("grade_name");
      field3.$input.prop("readonly", true);
      const currentDate = new Date();
      frm.set_value("date", currentDate);
    }
  },
  date: async function (frm) {
    let field = frm.get_field("schedule_no");
    field.$input.prop("readonly", false);
    frm.set_query("schedule_no", function () {
      return {
        filters: {
          date: ["=", frm.doc.date],
        },
      };
    });
  },
  schedule_no: async function (frm) {
    let field = frm.get_field("order_no");
    field.$input.prop("readonly", false);
    let field1 = frm.get_field("grade_name");
    field1.$input.prop("readonly", false);
    let challans = await frappe.db.get_list("Delivery Challan", {
      fields: ["qty"],
      filters: {
        schedule_no: frm.doc.schedule_no,
      },
      limit: 100,
    });
    let schedule = await frappe.db.get_value(
      "Schedule Master",
      frm.doc.schedule_no,
      ["order_no", "grade_name", "party_name", "site_name", "schedule_qty"]
    );

    let serial_no = challans.length + 1;
    let total_opening = challans
      .map((obj) => obj.qty)
      .reduce((acc, qty) => acc + qty, 0);
    let remaining_qty = schedule.message.schedule_qty - total_opening;

    if (schedule && schedule.message) {
      frm.set_value("order_no", schedule.message.order_no);
      frm.set_value("grade_name", schedule.message.grade_name);
      frm.set_value("party_name", schedule.message.party_name);
      frm.set_value("site_name", schedule.message.site_name);
      frm.set_value("serial_no", serial_no);
      frm.set_value("total_opening", total_opening);
      frm.set_value("grand_total_qty", total_opening);
      frm.set_value("remaining_qty", remaining_qty);
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
      let address = await frappe.db.get_value(
        "Address Master",
        addressName?.message?.address,
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
  qty: async function (frm) {
    frm.set_value("grand_total_qty", frm.doc.total_opening + frm.doc.qty);
  },
  validate: function (frm) {
    if (frm.doc.remaining_qty < frm.doc.qty) {
      frappe.msgprint(__("You can not add more then remaining qty"));
      frappe.validated = false;
    }
  },
});
