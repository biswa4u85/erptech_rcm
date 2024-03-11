// frappe.ui.form.on('Sales Order', {
//     refresh(frm) {
//         frm.add_custom_button(__('Schedule Master'), function () {
//             frappe.new_doc('Schedule Master', frm.doc);
//         }, __("Create"));
//         setTimeout(() => {
//             frm.remove_custom_button('Pick List', 'Create');
//             frm.remove_custom_button('Work Order', 'Create');
//             frm.remove_custom_button('Material Request', 'Create');
//             frm.remove_custom_button('Request for Raw Materials', 'Create');
//             frm.remove_custom_button('Purchase Order', 'Create');
//             frm.remove_custom_button('Project', 'Create');
//             frm.remove_custom_button('Payment Request', 'Create');
//         }, 200);
//         const elementsToDelete = document.querySelectorAll('[data-doctype="Pick List"], [data-doctype="Maintenance Visit"], [data-doctype="Work Order"], [data-doctype="Material Request"], [data-doctype="Purchase Order"], [data-doctype="Project"]');
//         elementsToDelete.forEach(element => {
//             element.remove();
//         });
//     },
//     onload(frm) {
//         if (frm.doc.docstatus === 0) {
//             frm.set_value("custom_entry_by", frappe.session.user);
//         }
//         if (frm.doc.status === 'Draft') {
//             frm.set_value("custom_authorozed_by", frappe.session.user);
//         }
//     },
//     customer: async function (frm) {
//         frm.set_value('custom_buyer_name', frm.doc.customer);
//     },
//     custom_buyer_name: async function (frm) {
//         let address = await frappe.db.get_value("Customer", frm.doc.custom_buyer_name, ["*"]);
//         if (address?.message) {
//             frm.set_value('shipping_address_name', address.message.customer_primary_address);
//         }
//     },
//     custom_site_name: async function (frm) {
//         let address = await frappe.db.get_value("Job Site Master", frm.doc.custom_site_name, ["address"]);
//         if (address?.message) {
//             frm.set_value('dispatch_address_name', address.message.address);
//         }
//     }
// })


// frappe.ui.form.on('Schedule Master', {
//     refresh(frm) {
//         if (frm.doc.docstatus === 1) {
//             frm.add_custom_button(__('Delivery Note'), function () {
//                 frappe.new_doc('Delivery Note', frm.doc);
//             }, __("Create"));
//         }
//     },
//     onload(frm) {
//         if (frm.doc.docstatus === 0) {
//             frm.set_value("entry_by", frappe.session.user);
//         }
//         if (frm.doc.status === 'Draft') {
//             frm.set_value("supervisor", frappe.session.user);
//         }
//     },
//     order_no: async function (frm) {
//         let orderDetail = await frappe.db.get_value("Sales Order", frm.doc.order_no, ["customer", "custom_site_name", "total_qty", "total"]);
//         if (orderDetail.message) {
//             frm.set_value('party_name', orderDetail.message.customer);
//             frm.set_value('site_name', orderDetail.message.custom_site_name);
//             frm.set_value('remaining_qty', orderDetail.message.total_qty);
//             frm.set_value('grade_name', "");
//             frm.set_value('rmc_rate', orderDetail.message.total);
//         }
//         let deliveryNotes = await frappe.db.get_list("Delivery Note", {
//             fields: ["custom_grand_total_qty"],
//             filters: { custom_sales_order_no: frm.doc.order_no },
//             limit: 100,
//         });
//         console.log(deliveryNotes)
//     },
//     schedule_qty: async function (frm) {
//         let orderDetail = await frappe.db.get_value("Sales Order", frm.doc.order_no, ["total_qty"]);
//         if (frm.doc.schedule_qty < orderDetail.message.total_qty) {
//             frm.set_value('remaining_qty', orderDetail.message.total_qty - frm.doc.schedule_qty);
//         }
//     },
//     validate: function (frm) {
//         if (frm.doc.remaining_qty < frm.doc.schedule_qty) {
//             frappe.msgprint(__("You can not add more then remaining qty"));
//             frappe.validated = false;
//         }
//     },
// })