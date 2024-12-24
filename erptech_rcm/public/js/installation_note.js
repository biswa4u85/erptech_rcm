frappe.ui.form.on('Installation Note', {
    refresh: function (frm) {
        if (frm.doc.items[0] && frm.doc.items[0].prevdoc_docname) {
            frappe.call({
                method: "frappe.client.get",
                args: {
                    doctype: "Delivery Note",
                    name: frm.doc.items[0].prevdoc_docname
                },
                callback: function (res) {
                    if (res.message) {
                        frm.set_value('inst_time', res.message.posting_time);
                        frm.set_value('custom_vehicle_no', res.message.custom_vehicle);
                        frm.set_value('custom_driver_name', res.message.driver);
                        frm.set_value('custom_recipe_code', res.message.items[0].custom_bom_no);
                        frm.set_value('custom_recipe_name', res.message.items[0].item_code);
                        // frm.doc.items[0]['custom_bom_no'] = res.message.items[0] ? res.message.items[0].bom_no : ""
                        // frm.refresh_field('items');
                    }
                }
            });
        }
    },
})