
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