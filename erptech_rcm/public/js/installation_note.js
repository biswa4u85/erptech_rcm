frappe.ui.form.on('Installation Note', {
    refresh: function (frm) {
        console.log(frm.doc)
        if (frm.doc.items[0] && frm.doc.items[0].against_sales_order) {
            frappe.call({
                method: "frappe.client.get",
                args: {
                    doctype: "Sales Order",
                    name: frm.doc.items[0].against_sales_order
                },
                callback: function (res) {
                    if (res.message) {
                        frm.doc.items[0]['custom_bom_no'] = res.message.items[0] ? res.message.items[0].bom_no : ""
                        frm.refresh_field('items');
                    }
                }
            });
        }
    },
})