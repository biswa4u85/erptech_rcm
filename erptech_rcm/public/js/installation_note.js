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
                        frm.set_value('custom_recipe_name', res.message.items[0].item_code);
                        frm.doc.items[0]['custom_bom_no'] = res.message.items[0].custom_bom_no
                        frm.doc.items[0]['custom_recipe_code'] = res.message.items[0].item_code
                        frm.doc.items[0]['custom_sales_order_no'] = res.message.items[0].against_sales_order
                        frm.refresh_field('items');
                        if (res.message.items[0].custom_bom_no) {
                            frappe.call({
                                method: "frappe.client.get",
                                args: {
                                    doctype: "BOM",
                                    name: res.message.items[0].custom_bom_no
                                },
                                callback: function (res) {
                                    frm.doc.custom_installation_note_recipe = []
                                    res.message.custom_items_2.forEach((item) => {
                                        let custom_installation_note_recipe = frm.add_child("custom_installation_note_recipe");
                                        custom_installation_note_recipe.item_code = item.item_code;
                                        custom_installation_note_recipe.item_name = item.item_name;
                                        custom_installation_note_recipe.qty = item.qty;
                                        custom_installation_note_recipe.rate = item.rate;
                                        custom_installation_note_recipe.uom = item.uom;
                                        custom_installation_note_recipe.amount = item.amount;
                                        custom_installation_note_recipe.source_warehouse = item.source_warehouse;
                                    });
                                    frm.refresh_field('custom_installation_note_recipe');
                                }
                            });
                        }
                    }
                }
            });
        }
    },
})