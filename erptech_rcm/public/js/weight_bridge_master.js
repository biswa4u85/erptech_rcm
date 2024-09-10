frappe.ui.form.on('Weight Bridge Master', {
    custom_purchase_order: function (frm) {
        let totalAmount = 0;
        frm.doc.items.forEach(item => {
            totalAmount += (item.quantity * item.rate);
        });
        frm.set_value('total_amount', totalAmount);
    }
})