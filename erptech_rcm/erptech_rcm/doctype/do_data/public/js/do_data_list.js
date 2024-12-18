frappe.listview_settings['DO Data'] = {
    onload: function (listview) {

        // Add custom button to the list view toolbar
        listview.page.add_inner_button("Fetch latest Data", function () {
            frappe.call({
                method: 'erptech_rcm.api.consumption.fetch_do_data',
                args: {
                    'type': "latest",
                },
                callback: async (r) => {
                    if (r.message) {
                        frappe.msgprint(r.message);
                    }
                }
            })
        })

        listview.page.add_inner_button("Fetch all Data", function () {
            frappe.call({
                method: 'erptech_rcm.api.consumption.fetch_do_data',
                args: {
                    'type': "all",
                },
                callback: async (r) => {
                    if (r.message) {
                        frappe.msgprint(r.message);
                    }
                }
            })
        })


    },

};