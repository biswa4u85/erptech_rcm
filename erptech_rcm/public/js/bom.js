frappe.ui.form.on('BOM', {
    setup: function (frm) {
        frm.set_query('item', function () {
            return {
                filters: {
                    'item_group': 'Products'
                }
            };
        });
    }
})