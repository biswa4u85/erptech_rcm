frappe.ui.form.on('Quotation', {
    setup: function (frm) {
        if (frm.doc.name.includes("new-quotation")) {
            frm.set_value('custom_site', null);
            frm.set_value('shipping_address_name', null);
        }
        frm.set_query('custom_site', function () {
            return {
                filters: {
                    'address_type': ''
                }
            };
        });
    },
    party_name: function (frm) {
        if (frm.doc.party_name) {
            frm.set_value('custom_site', null);
            frappe.call({
                method: 'erptech_rcm.api.custom.get_customer_address',
                args: {
                    'customer_name': frm.doc.party_name,
                },
                callback: async (r) => {
                    if (r.message) {
                        frm.set_query('custom_site', function () {
                            return {
                                filters: {
                                    'name': ['in', (r.message).map(item => item.name)]
                                }
                            };
                        });
                    }
                    frm.set_value('shipping_address_name', null);
                }
            })
        }
    },
    custom_site: function (frm) {
        frm.set_value('shipping_address_name', frm.doc.custom_site);
    }
})