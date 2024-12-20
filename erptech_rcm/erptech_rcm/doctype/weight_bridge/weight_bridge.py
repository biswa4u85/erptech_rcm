# Copyright (c) 2024, erptech and contributors
# For license information, please see license.txt

# import frappe
from frappe.model.document import Document


class WeightBridge(Document):
	def after_submit(self):
		print("aaa")
		print(self)
		# Create a new Purchase Receipt
		purchase_receipt = frappe.get_doc({
			"doctype": "Purchase Receipt",
			"supplier": self.supplier,  # Assuming your custom doctype has a supplier field
			"posting_date": frappe.utils.nowdate(),
			"items": []
		})

		# Copy items from the custom doctype to the Purchase Receipt
		for item in self.items:  # Assuming your custom doctype has an 'items' child table
			purchase_receipt.append("items", {
				"item_code": item.item_code,
				"qty": item.qty,
				"rate": item.rate,
				"warehouse": item.warehouse  # Ensure warehouse is set
			})

		# Save and submit the new Purchase Receipt
		purchase_receipt.insert()
		purchase_receipt.submit()

		# Notify the user
		frappe.msgprint(_("Purchase Receipt {0} created successfully.").format(purchase_receipt.name))
