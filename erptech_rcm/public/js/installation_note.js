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
                                    frm.doc.custom_bom_recipe_items = []
                                    res.message.custom_items_2.forEach((item) => {
                                        let custom_bom_recipe_items = frm.add_child("custom_bom_recipe_items");
                                        custom_bom_recipe_items.item_code = item.item_code;
                                        custom_bom_recipe_items.item_name = item.item_name;
                                        custom_bom_recipe_items.qty = item.qty;
                                        custom_bom_recipe_items.rate = item.rate;
                                        custom_bom_recipe_items.uom = item.uom;
                                        custom_bom_recipe_items.amount = item.amount;
                                        custom_bom_recipe_items.source_warehouse = item.source_warehouse;
                                    });
                                    frm.refresh_field('custom_bom_recipe_items');
                                }
                            });
                        }
                    }
                }
            });
        }
    },
})