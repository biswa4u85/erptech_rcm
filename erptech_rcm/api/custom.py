
import frappe
import requests

@frappe.whitelist()
def gst_info(keyword,uniqueId):
	url = "https://blog-backend.mastersindia.co/api/v1/custom/search/gstin/?keyword="+keyword+"&unique_id="+uniqueId
	payload = {}
	headers = {
	'origin': 'https://www.mastersindia.co'
	}
	response = requests.request("GET", url, headers=headers, data=payload)
	return response.text

@frappe.whitelist()
def get_customer_address(customer_name):
	addresses = frappe.db.sql("""
        SELECT
            addr.name
        FROM
            `tabAddress` AS addr
        INNER JOIN
            `tabDynamic Link` AS link
        ON
            link.parent = addr.name
        WHERE
            link.link_doctype = 'Customer' AND link.link_name = %s
    """, (customer_name), as_dict=True)
	return addresses

@frappe.whitelist()
def get_recipe_items(parent_doc_name):
	
    # SQL query to fetch data from parent and child tables
    query = """
        SELECT ri.item_code, ri.item_name, ri.qty, ri.rate, ri.uom, ri.amount
        FROM `tabRecipe Items` ri
        INNER JOIN `tabRecipe` r ON ri.parent = r.name
        WHERE r.name = %s
    """
  
    # Execute the query
    results = frappe.db.sql(query, (parent_doc_name,), as_dict=True)
    return results

@frappe.whitelist()
def get_child_items(parent_name, parent, child):
	
    # SQL query to fetch data from parent and child tables
    query = f"""
        SELECT 
           ri.name, ri.item_code, ri.item_name, ri.qty, ri.rate, ri.uom, ri.amount
        FROM 
            `tab{child}` ri
        INNER JOIN 
            `tab{parent}` r ON ri.parent = r.name
        WHERE 
            r.name = %s
    """
  
    # Execute the query
    results = frappe.db.sql(query, (parent_name,), as_dict=True)
    return results

@frappe.whitelist()
def unlink_customer_address(customer_name, address_name):
    dynamic_links = frappe.get_all(
        "Dynamic Link",
        filters={
            "link_doctype": "Customer",
            "link_name": customer_name,
            "parenttype": "Address",
            "parent": address_name,
        }
    )
    if dynamic_links:
        for link in dynamic_links:
            frappe.delete_doc("Dynamic Link", link.name)
            frappe.db.commit()
            
        return f"Address '{address_name}' has been removed from Customer '{customer_name}'."
    else:
        return f"No address found linked to Customer '{customer_name}' with the name '{address_name}'."
