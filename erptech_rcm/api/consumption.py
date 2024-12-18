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
            cursor.execute(f"SELECT * FROM {consumptionSettings.do_table}") 
        else:
            count = frappe.db.count(db_name)
            cursor.execute(f"SELECT * FROM {consumptionSettings.do_table} WHERE Batch_No > {count}")

        # Fetch and print the results
        results = cursor.fetchall()

        for result in results:
            # TO DO
            data = {
                    "batch_no": result["Batch_No"],
                    "batch_date": result["batch_date"],
                    "batch_end_time": result["batch_end_time"],
                    "cust_id": result["cust_id"],
                    "recipe_name": result["recipe_name"],
                    "truck_id": result["Truck_ID"],
                    "prod_adj": result["Prod_Adj"],
                    "driver_name": result["driver_name"],
                    "mixing_time": result["mixing_time"],
                    "mixet_cap": result["mixet_cap"],
                    "consistancy": result["consistancy"],
                    "batch_size": result["batch_size"],
                    "sch_id": result["Sch_Id"],
                    "batch_end_time_txt": result["batch_end_time_txt"],
                    "weighed_net_weight": result["weighed_net_weight"],
                    "bcp_flag": result["BCP_Flag"],
                    "ds_flag": result["DS_Flag"],
                    "batch_no_serial": result["batch_no_serial"],
                    "batch_start_time": result["batch_start_time"],
                    "user_id": result["user_id"],
                    "recipe_id": result["recipe_id"],
                    "site": result["site"],
                    "production_qty": result["Production_Qty"],
                    "ordered_qty": result["ordered_qty"],
                    "pre_mixing_time": result["pre_mixing_time"],
                    "strength": result["strength"],
                    "load_send_qty": result["load_send_qty"],
                    "order_id": result["Order_Id"],
                    "batch_start_time_txt": result["batch_start_time_txt"],
                    "v_print": result["v_Print"],
                    "weigh_bridge_stat": result["Weigh_bridge_stat"],
                    "batch_c_flag": result["Batch_C_Flag"],
                    "bt1_id": result["BT1_ID"]
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
            cursor.execute(f"SELECT * FROM {consumptionSettings.consumption_table}") 
        else:
            count = frappe.db.count(db_name)
            cursor.execute(f"SELECT * FROM {consumptionSettings.consumption_table} WHERE Batch_No > {count}")

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
                    "batch_index": item['batch_index'], 
                    "batch_date": item['batch_date'], 
                    "batch_size": item['batch_size'], 
                    "prod_adj": item['Prod_Adj'], 
                    "prod1_agg_name": item['Prod1_Agg_Name'], 
                    "prod1_agg_stwt": item['Prod1_Agg_Stwt'], 
                    "prod1_agg_atwt": item['Prod1_Agg_Atwt'], 
                    "prod1_agg_moi": item['Prod1_Agg_Moi'], 
                    "prod2_agg_name": item['Prod2_Agg_Name'], 
                    "prod2_agg_stwt": item['Prod2_Agg_Stwt'], 
                    "prod2_agg_atwt": item['Prod2_Agg_Atwt'], 
                    "prod2_agg_moi": item['Prod2_Agg_Moi'], 
                    "prod3_agg_name": item['Prod3_Agg_Name'], 
                    "prod3_agg_stwt": item['Prod3_Agg_Stwt'], 
                    "prod3_agg_atwt": item['Prod3_Agg_Atwt'], 
                    "prod3_agg_moi": item['Prod3_Agg_Moi'], 
                    "prod4_agg_name": item['Prod4_Agg_Name'], 
                    "prod4_agg_stwt": item['Prod4_Agg_Stwt'], 
                    "prod4_agg_atwt": item['Prod4_Agg_Atwt'], 
                    "prod4_agg_moi": item['Prod4_Agg_Moi'], 
                    "prod5_agg_name": item['Prod5_Agg_Name'], 
                    "prod5_agg_stwt": item['Prod5_Agg_Stwt'], 
                    "prod5_agg_atwt": item['Prod5_Agg_Atwt'], 
                    "prod5_agg_moi": item['Prod5_Agg_Moi'], 
                    "prod6_agg_name": item['Prod6_Agg_Name'], 
                    "prod6_agg_stwt": item['Prod6_Agg_Stwt'], 
                    "prod6_agg_atwt": item['Prod6_Agg_Atwt'], 
                    "prod6_agg_moi": item['Prod6_Agg_Moi'], 
                    "prod7_cem_name": item['Prod7_Cem_Name'], 
                    "prod7_cem_stwt": item['Prod7_Cem_Stwt'], 
                    "prod7_cem_atwt": item['Prod7_Cem_Atwt'], 
                    "prod7_cem_corr": item['Prod7_Cem_Corr'], 
                    "prod8_cem_name": item['Prod8_Cem_Name'], 
                    "prod8_cem_stwt": item['Prod8_Cem_Stwt'], 
                    "prod8_cem_atwt": item['Prod8_Cem_Atwt'], 
                    "prod8_cem_corr": item['Prod8_Cem_Corr'], 
                    "prod9_cem_name": item['Prod9_Cem_Name'], 
                    "prod9_cem_stwt": item['Prod9_Cem_Stwt'], 
                    "prod9_cem_atwt": item['Prod9_Cem_Atwt'], 
                    "prod9_cem_corr": item['Prod9_Cem_Corr'], 
                    "prod10_cem_name": item['Prod10_Cem_Name'], 
                    "prod10_cem_stwt": item['Prod10_Cem_Stwt'], 
                    "prod10_cem_atwt": item['Prod10_Cem_Atwt'], 
                    "prod10_cem_corr": item['Prod10_Cem_Corr'], 
                    "prod11_cem_name": item['Prod11_Cem_Name'], 
                    "prod11_cem_stwt": item['Prod11_Cem_Stwt'], 
                    "prod11_cem_atwt": item['Prod11_Cem_Atwt'], 
                    "prod11_cem_corr": item['Prod11_Cem_Corr'], 
                    "prod12_wtr_name": item['Prod12_Wtr_Name'], 
                    "prod12_wtr_stwt": item['Prod12_Wtr_Stwt'], 
                    "prod12_wtr_atwt": item['Prod12_Wtr_Atwt'], 
                    "prod12_wtr_corr": item['Prod12_Wtr_Corr'], 
                    "prod13_wtr_name": item['Prod13_Wtr_Name'], 
                    "prod13_wtr_stwt": item['Prod13_Wtr_Stwt'], 
                    "prod13_wtr_atwt": item['Prod13_Wtr_Atwt'], 
                    "prod13_wtr_corr": item['Prod13_Wtr_Corr'], 
                    "prod14_wtr_name": item['Prod14_Wtr_Name'], 
                    "prod14_wtr_stwt": item['Prod14_Wtr_Stwt'], 
                    "prod14_wtr_atwt": item['Prod14_Wtr_Atwt'], 
                    "prod15_adm_name": item['Prod15_Adm_Name'], 
                    "prod15_adm_stwt": item['Prod15_Adm_Stwt'], 
                    "prod15_adm_atwt": item['Prod15_Adm_Atwt'], 
                    "prod15_adm_corr": item['Prod15_Adm_Corr'], 
                    "prod16_adm_name": item['Prod16_Adm_Name'], 
                    "prod16_adm_stwt": item['Prod16_Adm_Stwt'], 
                    "prod16_adm_atwt": item['Prod16_Adm_Atwt'], 
                    "prod16_adm_corr": item['Prod16_Adm_Corr'], 
                    "prod17_adm_name": item['Prod17_Adm_Name'], 
                    "prod17_adm_stwt": item['Prod17_Adm_Stwt'], 
                    "prod17_adm_agwt": item['Prod17_Adm_Agwt'], 
                    "prod17_adm_corr": item['Prod17_Adm_Corr'], 
                    "prod18_adm_name": item['Prod18_Adm_Name'], 
                    "prod18_adm_stwt": item['Prod18_Adm_Stwt'], 
                    "prod18_adm_atwt": item['Prod18_Adm_Atwt'], 
                    "prod18_adm_corr": item['Prod18_Adm_Corr'], 
                    "prod19_sil_name": item['Prod19_Sil_Name'], 
                    "prod19_sil_stwt": item['Prod19_Sil_Stwt'], 
                    "prod19_sil_atwt": item['Prod19_Sil_Atwt'], 
                    "prod19_sil_corr": item['Prod19_Sil_Corr'], 
                    "prod20_add_name": item['Prod20_Add_Name'], 
                    "prod20_add_stwt": item['Prod20_Add_Stwt'], 
                    "prod20_add_atwt": item['Prod20_Add_Atwt'], 
                    "prod21_add_name": item['Prod21_Add_Name'], 
                    "prod21_add_stwt": item['Prod21_Add_Stwt'], 
                    "prod21_add_atwt": item['Prod21_Add_Atwt'], 
                    "prod22_add_name": item['Prod22_Add_Name'], 
                    "prod22_add_stwt": item['Prod22_Add_Stwt'], 
                    "prod22_add_atwt": item['Prod22_Add_Atwt'], 
                    "prod23_add_name": item['Prod23_Add_Name'], 
                    "prod23_add_stwt": item['Prod23_Add_Stwt'], 
                    "prod23_add_atwt": item['Prod23_Add_Atwt'], 
                    "truck_trip": item['Truck_Trip'], 
                    "prod1_agg_moi_ab": item['Prod1_Agg_Moi_Ab'], 
                    "prod2_agg_moi_ab": item['Prod2_Agg_Moi_Ab'], 
                    "prod3_agg_moi_ab": item['Prod3_Agg_Moi_Ab'], 
                    "prod4_agg_moi_ab": item['Prod4_Agg_Moi_Ab'], 
                    "prod5_agg_moi_ab": item['Prod5_Agg_Moi_Ab'], 
                    "prod6_agg_moi_ab": item['Prod6_Agg_Moi_Ab'], 
                    "batch_st": item['Batch_St'], 
                    "batch_et": item['Batch_Et'], 
                    "bt2_id": item['BT2_ID']
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