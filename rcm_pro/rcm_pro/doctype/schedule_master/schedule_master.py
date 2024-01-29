# Copyright (c) 2024, erptech and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document
import json

class ScheduleMaster(Document):
	pass

@frappe.whitelist()	
def get_items(doc):
    doc = json.loads(doc)
    if(doc.get("order_no")):
        items=frappe.get_all("Order Item", filters={"parent": doc.get("order_no")}, fields=["grade_name"])
        return items 
    
@frappe.whitelist()	
def get_item(doc):
    doc = json.loads(doc)
    if(doc.get("order_no") and doc.get("grade_name")):
        schedules=frappe.get_all("Schedule Master", filters={"order_no": doc.get("order_no")}, fields=["schedule_qty"])
        items=frappe.get_all("Order Item", filters={"parent": doc.get("order_no"), "grade_name": doc.get("grade_name")}, fields=["*"])
        return items[0], schedules