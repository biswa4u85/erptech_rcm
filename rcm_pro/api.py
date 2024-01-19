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