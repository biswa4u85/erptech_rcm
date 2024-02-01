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
    let schedule = await frappe.db.get_value(
      "Schedule Master",
      frm.doc.schedule_no,
      ["order_no", "grade_name"]
    );
    if (schedule && schedule.message) {
      frm.set_value("order_no", schedule.message.order_no);
      frm.set_value("grade_name", schedule.message.grade_name);
    }
  },
  // validate: function (frm) {
  //   if (frm.doc.remaining_qty < frm.doc.schedule_qty) {
  //     frappe.msgprint(__("You can not add more then remaining qty"));
  //     frappe.validated = false;
  //   }
  // },
});
