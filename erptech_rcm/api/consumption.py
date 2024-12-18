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
            cursor.execute("SELECT * FROM Batch_Trans1 WHERE Batch_No > %s", (count,))

        # Fetch and print the results
        results = cursor.fetchall()

        for result in results:
            # TO DO
            data = {
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
            }

            exists = frappe.db.exists(db_name, {"batch_no": result["Batch_No"]})
            if exists:
                batch = frappe.get_doc(db_name, {"batch_no": result["Batch_No"]})

                # Updtae doc object
                for field, value in data.items():
                    batch.set(field, value)

                batch.save()
            else:

                # Create a new doc object
                doc = frappe.get_doc({**{'doctype': db_name}, **data})

                doc.insert()

        # Commit the changes to save the records
        frappe.db.commit()

        return {"message":f"Successfully inserted/update {len(results)} records into {db_name}"}
        connection.close()
    except pymysql.MySQLError as e:
        return {"message":e}

@frappe.whitelist()
def fetch_consumption_data(type):
    db_name = "Material Consumption"
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
            cursor.execute("SELECT * FROM Batch_trans2") 
        else:
            count = frappe.db.count(db_name)
            cursor.execute("SELECT * FROM Batch_trans2 WHERE Batch_No > %s", (count,))

        # Fetch and print the results
        results = cursor.fetchall()

        grouped = {}
        # Loop through each record in data
        for item in results:
            # If the id is not already in the dictionary, add it with an empty list
            if item['Batch_No'] not in grouped:
                grouped[item['Batch_No']] = []
            # Append the current item to the list of the corresponding id
            grouped[item['Batch_No']].append(item)

        for key, group in grouped.items():

            data = {
                    "batch_no": group[0]["Batch_No"],
                    "batch_no_serial" :group[0]["batch_no_serial"],
            }

            items = []
            for item in group:
                # TO DO
                items.append({
                    "item": item['Prod1_Agg_Name'], 
                    "tar": item['Prod1_Agg_Stwt'], 
                    "act": item['Prod3_Agg_Stwt'],
                })

            exists = frappe.db.exists(db_name, {"batch_no": group[0]["Batch_No"]})
            if exists:
                batch = frappe.get_doc(db_name, {"batch_no": group[0]["Batch_No"]})

                # Updtae doc object
                for field, value in data.items():
                    batch.set(field, value)
                    batch.items.clear()
                    for item in items:
                        batch.append('items', item)

                batch.save()
            else:
                pass
                # Create a new doc object
                doc = frappe.get_doc({**{'doctype': db_name}, **data})
                for item in items:
                    doc.append('items', item)
                
                doc.insert()

        # Commit the changes to save the records
        frappe.db.commit()

        return {"message":f"Successfully inserted/update {len(grouped)} records into {db_name}"}
        connection.close()
    except pymysql.MySQLError as e:
        return {"message":e}