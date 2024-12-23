
import frappe
import requests
from erptech_rcm.api.custom import get_child_items

@frappe.whitelist()
def create_stock_entry(doc, method):
	# Check some conditions or add any custom validation logic before creating a Stock Entry
    if not doc.docstatus == 1:
        frappe.throw("Some field is missing, cannot proceed with the Stock Entry creation.")
    
    # Create Stock Entry document
    stock_entry = frappe.new_doc("Stock Entry")
    
    # Populate the fields of the Stock Entry document
    stock_entry.stock_entry_type = "Material Issue"  # Example, use appropriate entry type
    stock_entry.company = doc.company  # Assume the custom doctype has a company field
    stock_entry.from_bom = True
    stock_entry.use_multi_level_bom = True
    stock_entry.bom_no = doc.items[0].custom_bom_no
    stock_entry.fg_completed_qty = doc.items[0].qty
    
    # Assuming you have child table "items" in the custom doctype and need to transfer items to stock
    if(doc.items[0].custom_bom_no):
        items = get_child_items(doc.items[0].custom_bom_no, "BOM", "BOM Item")
        for item in items:
            stock_entry.append("items", {
                "item_code": item.item_code,
                "qty": item.qty,
                "rate": item.rate,
                "uom": item.uom,
                "allow_zero_valuation_rate": 1 if item["item_name"] == "Water" else 0,
                "s_warehouse": item.source_warehouse,
                "t_warehouse": item.source_warehouse
            })
    
    # Submit the Stock Entry document to record the transaction
    stock_entry.submit()
    
    # Optional: Log or add any more business logic here
    
    frappe.msgprint(f"Stock Entry {stock_entry.name} has been created successfully.")
