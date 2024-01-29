# Copyright (c) 2024, erptech and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document
import json

class RcmSalesOrder(Document):
	pass


@frappe.whitelist()	
def get_adresss(doc):
    doc = json.loads(doc)
    if doc.get("address"):
       address=frappe.db.get_value("Address",{"name":doc.get("address")},["address_type","address_line1","address_line2","city","pincode","state","country"])
       Address_list=' '.join(i for i in address if i is not None)
       return Address_list 