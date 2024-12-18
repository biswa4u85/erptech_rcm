import frappe
import requests
import pymysql

@frappe.whitelist()
def fetch_do_data(type):
    db_name = "DO Data"
    try:
        consumptionSettings = frappe.get_cached_doc('Consumption Settings')
        connection = pymysql.connect(
            host=consumptionSettings.db_host,
            user=consumptionSettings.db_user,
            password=consumptionSettings.db_password,
            database=consumptionSettings.database,
            cursorclass=pymysql.cursors.DictCursor 
        )

        # Create a cursor object to interact with the database
        cursor = connection.cursor()

        # Example: Query the database
        if(type == "all"):
            cursor.execute("SELECT * FROM Batch_Trans1") 
        else:
            count = frappe.db.count(db_name)
            cursor.execute("SELECT * FROM Batch_Trans1 WHERE batch_no > %s", (count,))

        # Fetch and print the results
        results = cursor.fetchall()

        for result in results:

            exists = frappe.db.exists(db_name, {"batch_no": result["Batch_No"]})
            if exists:
                batch = frappe.get_doc(db_name, {"batch_no": result["Batch_No"]})

                # Updtae doc object
                batch.batch_no_serial = result["batch_no_serial"]
                batch.truck_id = result["Truck_ID"]
                batch.rec_id = result["recipe_id"]
                batch.rec_name = result["recipe_name"]
                batch.qty = result["Production_Qty"]
                batch.cust_id = result["cust_id"]
                batch.site_id = result["site"]
                batch.driver = result["driver_name"]
                batch.start = result["batch_start_time"]
                batch.end = result["batch_end_time"]

                batch.save()
            else:

                # Create a new doc object
                doc = frappe.get_doc({
                    'doctype': db_name,  # Custom DocType in ERPNext
                    "batch_no": result["Batch_No"],
                    "batch_no_serial" :result["batch_no_serial"],
                    "truck_id":result["Truck_ID"],
                    "rec_id" :result["recipe_id"],
                    "rec_name": result["recipe_name"],
                    "qty" :result["Production_Qty"],
                    "cust_id" :result["cust_id"],
                    "site_id" :result["site"],
                    "driver" :result["driver_name"],
                    "start" :result["batch_start_time"],
                    "end" :result["batch_end_time"]
                })

                doc.insert()

        # Commit the changes to save the records
        frappe.db.commit()

        return {"message":f"Successfully inserted/update {len(results)} records into {db_name}"}
        connection.close()
    except pymysql.MySQLError as e:
        return {"message":e}