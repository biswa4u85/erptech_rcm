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
    frm.set_query("order_no", function () {
      return {
        filters: {
          site_name: " ",
        },
      };
    });
    frm.set_query("schedule_no", function () {
      return {
        filters: {
          order_no: " ",
        },
      };
    });
    frm.set_query("challan_no", function () {
      return {
        filters: {
          schedule_no: " ",
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
      const currentDate = new Date();
      frm.set_value("invoice_date", currentDate);
    }
  },
  invoice_date: async function (frm) {
    // Set pay date
    let invoiceDate = new Date(frm.doc.invoice_date)
    invoiceDate.setDate(invoiceDate.getDate() + 10)
    frm.set_value("pay_date", invoiceDate);
  },
  party_name: async function (frm) {
    if (frm.doc.party_name) {
      // Set Address
      let addressName = await frappe.db.get_value(
        "Ledger Master",
        frm.doc.party_name,
        ["address", "gst_no"]
      );
      if (addressName && addressName?.message?.address) {
        frm.set_value("party_address", addressName?.message?.address);
      }
      if (addressName && addressName?.message?.gst_no) {
        frm.set_value("party_gst_no", addressName?.message?.gst_no);
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
    }
  },
  buyer_name: async function (frm) {
    if (frm.doc.buyer_name) {
      // Set Address
      let addressName = await frappe.db.get_value(
        "Ledger Master",
        frm.doc.buyer_name,
        ["address", "gst_no"]
      );
      if (addressName && addressName?.message?.address) {
        frm.set_value("buyer_address", addressName?.message?.address);
      }
      if (addressName && addressName?.message?.gst_no) {
        frm.set_value("buyer_gst_no", addressName?.message?.gst_no);
      }
    }
  },
  site_name: async function (frm) {
    if (frm.doc.site_name) {
      // Set Address
      let addressName = await frappe.db.get_value(
        "Job Site Master",
        frm.doc.site_name,
        "address"
      );
      if (addressName && addressName?.message?.address) {
        frm.set_value("site_address", addressName?.message?.address);
      }
      // Set Job Sites
      frm.set_value("order_no", null);
      frm.set_query("order_no", function () {
        return {
          filters: {
            party_name: frm.doc.party_name,
            site_name: frm.doc.site_name,
          },
        };
      });
    }
  },
  order_no: async function (frm) {
    if (frm.doc.order_no) {
      // Set Job Sites
      frm.set_value("schedule_no", null);
      frm.set_query("schedule_no", function () {
        return {
          filters: {
            order_no: frm.doc.order_no,
          },
        };
      });
    }
  },
  schedule_no: async function (frm) {
    if (frm.doc.schedule_no) {
      // Set Job Sites vehicle
      frm.set_value("challan_no", null);
      frm.set_query("challan_no", function () {
        return {
          filters: {
            schedule_no: frm.doc.schedule_no,
          },
        };
      });
    }
  },
  challan_no: async function (frm) {
    if (frm.doc.challan_no) {
      // Set Vehicle No
      let challan = await frappe.db.get_value(
        "Delivery Challan",
        frm.doc.challan_no,
        ["vehicle", "driver_name"]
      );
      if (challan && challan?.message?.vehicle) {
        frm.set_value("vehicle_no", challan?.message?.vehicle);
      }
      if (challan && challan?.message?.driver_name) {
        frm.set_value("driver_name", challan?.message?.driver_name);
      }
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
