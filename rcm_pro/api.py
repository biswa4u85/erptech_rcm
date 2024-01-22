import frappe
from frappe import _

@frappe.whitelist()
def get_workspace_sidebar_items():
	"""Get list of sidebar items for desk"""
	has_access = "Workspace Manager" in frappe.get_roles()

	# don't get domain restricted pages
	blocked_modules = frappe.get_doc("User", frappe.session.user).get_blocked_modules()
	blocked_modules.append("Dummy Module")

	filters = {
		"restrict_to_domain": ["in", frappe.get_active_domains()],
		"module": ["not in", blocked_modules],
	}

	if has_access:
		filters = []

	# pages sorted based on sequence id
	order_by = "sequence_id asc"
	fields = [
		"name",
		"title",
		"for_user",
		"parent_page",
		"content",
		"public",
		"module",
		"icon",
		"indicator_color",
		"is_hidden",
	]
	all_pages = frappe.get_all(
		"Workspace", fields=fields, filters=filters, order_by=order_by, ignore_permissions=True
	)
	pages = []

	# Filter Page
	for page in all_pages:
		try:
			if page.name == "Home":
				print(page.content)
				page['content'] = "[]"
				pages.append(page)
		except frappe.PermissionError:
			pass

	return {"pages": pages, "has_access": True}


def create_new_sales_order(order, method):
	if order.get("available_po") == 1:	
		sales_order = frappe.new_doc("Rcm Order")
		sales_order.title= order.get("name")
		sales_order.plant = order.get("plant")
		sales_order.customer_primary_address= order.get("customer_primary_address")
		sales_order.po_date= order.get("po_date")
		sales_order.valid_till= order.get("valid_till")
		sales_order.credit_date= order.get("credit_date")
		sales_order.po_number= order.get("po_number")
		sales_order.marketing_person= order.get("marketing_person")

		for item in order.get("items"):
			grade, quantity, rate = frappe.db.get_value(item.doctype, item.get("name"), ['grade', 'quantity','rate'])
			print(grade)
			sales_order.append("items", {
			'grade': grade,
			'quantity': quantity,
			'rate': rate,
		})

		print(sales_order)
		sales_order.insert()
		# sales_order.save()
		pass