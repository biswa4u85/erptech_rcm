
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