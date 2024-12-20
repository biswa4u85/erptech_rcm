
import frappe
import requests

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
    
    # Assuming you have child table "items" in the custom doctype and need to transfer items to stock
    for item in doc.items:
        stock_entry.append("items", {
            "item_code": item.item_code,
            "qty": item.qty,
            "rate": item.rate,
            "s_warehouse": item.warehouse
        })
    
    # Submit the Stock Entry document to record the transaction
    stock_entry.submit()
    
    # Optional: Log or add any more business logic here
    
    frappe.msgprint(f"Stock Entry {stock_entry.name} has been created successfully.")
