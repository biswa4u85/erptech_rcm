// Copyright (c) 2024, erptech and contributors
// For license information, please see license.txt

frappe.ui.form.on("Weight Bridge Master", {
    async refresh(frm) {
        document.querySelector('input[data-fieldname="display_data"]').readOnly = true;
        document.querySelector('input[data-fieldname="gross_weight"]').readOnly = true;
        document.querySelector('input[data-fieldname="tare_weight"]').readOnly = true;
        document.querySelector('button[data-fieldname="gross"]').disabled = true;
        document.querySelector('button[data-fieldname="tare"]').disabled = true;
        if (frm.doc.wbslip_type === "In-Ward") {
            document.querySelector('button[data-fieldname="tare"]').disabled = false;
        }
        if (frm.doc.wbslip_type === "Out-Ward") {
            document.querySelector('button[data-fieldname="gross"]').disabled = false;
        }
        if (frm.doc.wbslip_type === "Other") {
            document.querySelector('button[data-fieldname="gross"]').disabled = false;
            document.querySelector('button[data-fieldname="tare"]').disabled = false;
        }

        doc = await frappe.db.get_doc('RCM Settings', 'enable_weigh_scale')
        if (doc.enable_weigh_scale == 1) {
            if ("serial" in navigator) {
                var ports = await navigator.serial.getPorts();
                if (ports.length == 0) {
                    frappe.confirm(
                        'Please provide permission to connect to the weigh device',
                        async function () {
                            let port = await navigator.serial.requestPort();
                            await port.open({ baudRate: Number(doc.baud_rate) });
                            await listenToPort(port, doc);
                        },

                    );
                } else {
                    await ports[0].open({ baudRate: Number(doc.baud_rate) });
                    await listenToPort(ports[0], doc);
                }
            }
            else {
                frappe.msgprint("Your browser does not support serial device connection. Please switch to a supported browser to connect to your weigh device");
            }

        }
    },
    wbslip_type: async function (frm) {
        if (frm.doc.wbslip_type) {
            document.querySelector('button[data-fieldname="gross"]').disabled = true;
            document.querySelector('button[data-fieldname="tare"]').disabled = true;
            if (frm.doc.wbslip_type === "In-Ward") {
                if (frm.doc.name.includes("new-weight-bridge-maste")) {
                    document.querySelector('button[data-fieldname="gross"]').disabled = false;
                } else {
                    document.querySelector('button[data-fieldname="tare"]').disabled = false;
                }
            }
            if (frm.doc.wbslip_type === "Out-Ward") {
                if (frm.doc.name.includes("new-weight-bridge-maste")) {
                    document.querySelector('button[data-fieldname="tare"]').disabled = false;
                } else {
                    document.querySelector('button[data-fieldname="gross"]').disabled = false;
                }
            }
            if (frm.doc.wbslip_type === "Other") {
                document.querySelector('button[data-fieldname="gross"]').disabled = false;
                document.querySelector('button[data-fieldname="tare"]').disabled = false;
            }
        }
    },
    gross: async function (frm) {
        let value = document.querySelector('input[data-fieldname="display_data"]').value;
        frm.set_value('gross_weight', value);
    },
    tare: async function (frm) {
        let value = document.querySelector('input[data-fieldname="display_data"]').value;
        frm.set_value('tare_weight', value);
    },
});

async function listenToPort(port, settings) {
    const outputDiv = document.querySelector('input[data-fieldname="display_data"]');
    const textDecoder = new TextDecoderStream();
    const readableStreamClosed = port.readable.pipeTo(textDecoder.writable);
    const reader = textDecoder.readable.getReader();

    // Listen to data coming from the serial device.
    let tempValue = 0
    while (true) {
        const { value, done } = await reader.read();
        if (done) {
            reader.releaseLock();
            break;
        }
        // value is a string.
        let newValue = String(value).includes(settings.split_character) ? String(value).replace(settings.split_character, "") : String(value)
        if (tempValue != Number(newValue)) {
            tempValue = Number(newValue)
            outputDiv.value = String(Number(newValue))
        }
    }
}