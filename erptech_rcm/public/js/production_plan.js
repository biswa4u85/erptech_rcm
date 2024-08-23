frappe.ui.form.on('Production Plan', {
    refresh: function (frm) {
        frm.add_custom_button(__('Create Delivery Note'), function () {
            let salesOrder = (frm.doc.sales_orders && frm.doc.sales_orders[0] && frm.doc.sales_orders[0].sales_order) ? frm.doc.sales_orders[0].sales_order : null
            frappe.model.open_mapped_doc({
                method: "erpnext.selling.doctype.sales_order.sales_order.make_delivery_note",
                frm: { ...frm, docname: salesOrder, get_selected: () => { }, doc: { ...frm.doc, name: salesOrder } },
                args: {
                    delivery_dates: [],
                    for_reserved_stock: false,
                },
                freeze: true,
                freeze_message: __("Creating Delivery Note ..."),
            });
        }, __('Create'));
    },
})