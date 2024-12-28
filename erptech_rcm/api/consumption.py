import frappe
import requests
import pymysql
import json
from datetime import datetime
import pyodbc

@frappe.whitelist(allow_guest=True)
def consumption_settings():
    db_name = "Material Consumption"
    count = frappe.db.count(db_name)
    settings = frappe.get_cached_doc('Consumption Settings').as_dict()
    settings['count'] = count
    return settings

@frappe.whitelist(allow_guest=True)
def consumption_set_data():
    db_name = "Material Consumption"
    stringified_data = frappe.local.form_dict.get("payload")
    if not stringified_data:
        return {"status": "error", "message": "No data received"}
    results = json.loads(stringified_data)
    for result in results:
        # TO DO
        items = []
        for item in result["items"]:
            items.append({
                "batch_index": item['name'], 
                # "batch_date": item['batch_date'], 
                # "batch_size": item['batch_size'], 
                # "prod_adj": item['Prod_Adj'], 
                # "prod1_agg_name": item['Prod1_Agg_Name'], 
                # "prod1_agg_stwt": item['Prod1_Agg_Stwt'], 
                # "prod1_agg_atwt": item['Prod1_Agg_Atwt'], 
                # "prod1_agg_moi": item['Prod1_Agg_Moi'], 
                # "prod2_agg_name": item['Prod2_Agg_Name'], 
                # "prod2_agg_stwt": item['Prod2_Agg_Stwt'], 
                # "prod2_agg_atwt": item['Prod2_Agg_Atwt'], 
                # "prod2_agg_moi": item['Prod2_Agg_Moi'], 
                # "prod3_agg_name": item['Prod3_Agg_Name'], 
                # "prod3_agg_stwt": item['Prod3_Agg_Stwt'], 
                # "prod3_agg_atwt": item['Prod3_Agg_Atwt'], 
                # "prod3_agg_moi": item['Prod3_Agg_Moi'], 
                # "prod4_agg_name": item['Prod4_Agg_Name'], 
                # "prod4_agg_stwt": item['Prod4_Agg_Stwt'], 
                # "prod4_agg_atwt": item['Prod4_Agg_Atwt'], 
                # "prod4_agg_moi": item['Prod4_Agg_Moi'], 
                # "prod5_agg_name": item['Prod5_Agg_Name'], 
                # "prod5_agg_stwt": item['Prod5_Agg_Stwt'], 
                # "prod5_agg_atwt": item['Prod5_Agg_Atwt'], 
                # "prod5_agg_moi": item['Prod5_Agg_Moi'], 
                # "prod6_agg_name": item['Prod6_Agg_Name'], 
                # "prod6_agg_stwt": item['Prod6_Agg_Stwt'], 
                # "prod6_agg_atwt": item['Prod6_Agg_Atwt'], 
                # "prod6_agg_moi": item['Prod6_Agg_Moi'], 
                # "prod7_cem_name": item['Prod7_Cem_Name'], 
                # "prod7_cem_stwt": item['Prod7_Cem_Stwt'], 
                # "prod7_cem_atwt": item['Prod7_Cem_Atwt'], 
                # "prod7_cem_corr": item['Prod7_Cem_Corr'], 
                # "prod8_cem_name": item['Prod8_Cem_Name'], 
                # "prod8_cem_stwt": item['Prod8_Cem_Stwt'], 
                # "prod8_cem_atwt": item['Prod8_Cem_Atwt'], 
                # "prod8_cem_corr": item['Prod8_Cem_Corr'], 
                # "prod9_cem_name": item['Prod9_Cem_Name'], 
                # "prod9_cem_stwt": item['Prod9_Cem_Stwt'], 
                # "prod9_cem_atwt": item['Prod9_Cem_Atwt'], 
                # "prod9_cem_corr": item['Prod9_Cem_Corr'], 
                # "prod10_cem_name": item['Prod10_Cem_Name'], 
                # "prod10_cem_stwt": item['Prod10_Cem_Stwt'], 
                # "prod10_cem_atwt": item['Prod10_Cem_Atwt'], 
                # "prod10_cem_corr": item['Prod10_Cem_Corr'], 
                # "prod11_cem_name": item['Prod11_Cem_Name'], 
                # "prod11_cem_stwt": item['Prod11_Cem_Stwt'], 
                # "prod11_cem_atwt": item['Prod11_Cem_Atwt'], 
                # "prod11_cem_corr": item['Prod11_Cem_Corr'], 
                # "prod12_wtr_name": item['Prod12_Wtr_Name'], 
                # "prod12_wtr_stwt": item['Prod12_Wtr_Stwt'], 
                # "prod12_wtr_atwt": item['Prod12_Wtr_Atwt'], 
                # "prod12_wtr_corr": item['Prod12_Wtr_Corr'], 
                # "prod13_wtr_name": item['Prod13_Wtr_Name'], 
                # "prod13_wtr_stwt": item['Prod13_Wtr_Stwt'], 
                # "prod13_wtr_atwt": item['Prod13_Wtr_Atwt'], 
                # "prod13_wtr_corr": item['Prod13_Wtr_Corr'], 
                # "prod14_wtr_name": item['Prod14_Wtr_Name'], 
                # "prod14_wtr_stwt": item['Prod14_Wtr_Stwt'], 
                # "prod14_wtr_atwt": item['Prod14_Wtr_Atwt'], 
                # "prod15_adm_name": item['Prod15_Adm_Name'], 
                # "prod15_adm_stwt": item['Prod15_Adm_Stwt'], 
                # "prod15_adm_atwt": item['Prod15_Adm_Atwt'], 
                # "prod15_adm_corr": item['Prod15_Adm_Corr'], 
                # "prod16_adm_name": item['Prod16_Adm_Name'], 
                # "prod16_adm_stwt": item['Prod16_Adm_Stwt'], 
                # "prod16_adm_atwt": item['Prod16_Adm_Atwt'], 
                # "prod16_adm_corr": item['Prod16_Adm_Corr'], 
                # "prod17_adm_name": item['Prod17_Adm_Name'], 
                # "prod17_adm_stwt": item['Prod17_Adm_Stwt'], 
                # "prod17_adm_agwt": item['Prod17_Adm_Agwt'], 
                # "prod17_adm_corr": item['Prod17_Adm_Corr'], 
                # "prod18_adm_name": item['Prod18_Adm_Name'], 
                # "prod18_adm_stwt": item['Prod18_Adm_Stwt'], 
                # "prod18_adm_atwt": item['Prod18_Adm_Atwt'], 
                # "prod18_adm_corr": item['Prod18_Adm_Corr'], 
                # "prod19_sil_name": item['Prod19_Sil_Name'], 
                # "prod19_sil_stwt": item['Prod19_Sil_Stwt'], 
                # "prod19_sil_atwt": item['Prod19_Sil_Atwt'], 
                # "prod19_sil_corr": item['Prod19_Sil_Corr'], 
                # "prod20_add_name": item['Prod20_Add_Name'], 
                # "prod20_add_stwt": item['Prod20_Add_Stwt'], 
                # "prod20_add_atwt": item['Prod20_Add_Atwt'], 
                # "prod21_add_name": item['Prod21_Add_Name'], 
                # "prod21_add_stwt": item['Prod21_Add_Stwt'], 
                # "prod21_add_atwt": item['Prod21_Add_Atwt'], 
                # "prod22_add_name": item['Prod22_Add_Name'], 
                # "prod22_add_stwt": item['Prod22_Add_Stwt'], 
                # "prod22_add_atwt": item['Prod22_Add_Atwt'], 
                # "prod23_add_name": item['Prod23_Add_Name'], 
                # "prod23_add_stwt": item['Prod23_Add_Stwt'], 
                # "prod23_add_atwt": item['Prod23_Add_Atwt'], 
                # "truck_trip": item['Truck_Trip'], 
                # "prod1_agg_moi_ab": item['Prod1_Agg_Moi_Ab'], 
                # "prod2_agg_moi_ab": item['Prod2_Agg_Moi_Ab'], 
                # "prod3_agg_moi_ab": item['Prod3_Agg_Moi_Ab'], 
                # "prod4_agg_moi_ab": item['Prod4_Agg_Moi_Ab'], 
                # "prod5_agg_moi_ab": item['Prod5_Agg_Moi_Ab'], 
                # "prod6_agg_moi_ab": item['Prod6_Agg_Moi_Ab'], 
                # "batch_st": item['Batch_St'], 
                # "batch_et": item['Batch_Et'], 
                # "bt2_id": item['BT2_ID']
            })
        data = {
            "batch_no": result["name"],
            "batch_no_serial": result["email"],
            # "batch_date": result["batch_date"],
            # "batch_end_time": result["batch_end_time"],
            # "cust_id": result["cust_id"],
            # "recipe_name": result["recipe_name"],
            # "truck_id": result["Truck_ID"],
            # "prod_adj": result["Prod_Adj"],
            # "driver_name": result["driver_name"],
            # "mixing_time": result["mixing_time"],
            # "mixet_cap": result["mixet_cap"],
            # "consistancy": result["consistancy"],
            # "batch_size": result["batch_size"],
            # "sch_id": result["Sch_Id"],
            # "batch_end_time_txt": result["batch_end_time_txt"],
            # "weighed_net_weight": result["weighed_net_weight"],
            # "bcp_flag": result["BCP_Flag"],
            # "ds_flag": result["DS_Flag"],
            # "batch_start_time": result["batch_start_time"],
            # "user_id": result["user_id"],
            # "recipe_id": result["recipe_id"],
            # "site": result["site"],
            # "production_qty": result["Production_Qty"],
            # "ordered_qty": result["ordered_qty"],
            # "pre_mixing_time": result["pre_mixing_time"],
            # "strength": result["strength"],
            # "load_send_qty": result["load_send_qty"],
            # "order_id": result["Order_Id"],
            # "batch_start_time_txt": result["batch_start_time_txt"],
            # "v_print": result["v_Print"],
            # "weigh_bridge_stat": result["Weigh_bridge_stat"],
            # "batch_c_flag": result["Batch_C_Flag"],
            # "bt1_id": result["BT1_ID"],
            "items": items,
            
        }
        exists = frappe.db.exists(db_name, {"batch_no": result["name"]})
        if exists:
            batch = frappe.get_doc(db_name, {"batch_no": result["name"]})

            # Updtae doc object
            for field, value in data.items():
                if field != "items":
                    batch.set(field, value)
            
                # Updtae child doc object
                if "items" in data:
                    batch.items.clear()
                    for child_item in data["items"]:
                        batch.append('items', child_item)
            batch.save(ignore_permissions=True)
        else:

            # Create a new doc object
            doc = frappe.get_doc({**{'doctype': db_name}, **data})

            doc.insert(ignore_permissions=True)

    # Commit the changes to save the records
    frappe.db.commit()
    return  {"status": "success", "message": "Data fetched successfully"}

@frappe.whitelist()
def fetch_consumption_data(type):
    """Function to make an API call and handle the response."""
    # Replace with your API endpoint and API key if required
    url = "http://localhost:8000/api/method/"
    headers = {
        # "Authorization": "Bearer YOUR_API_KEY",  # Replace with your API key if needed
        "Content-Type": "application/json"
    }

    try:
        # Make the GET request
        consumption_settings = requests.get(url+"erptech_rcm.api.consumption.consumption_settings", headers=headers)
        consumption_settings.raise_for_status()  # Raise an HTTPError for bad responses (4xx and 5xx)
        
        # Process the response
        consumption = consumption_settings.json()  # Assuming the API returns JSON
        settings = consumption['message']
        if(settings):

            # Make connection
            connection = None
            if(settings['sql_server'] == 1):
                pass
                connection = pyodbc.connect(f"Driver={{{settings['db_driver']}}};Server={settings['db_host']};Database={settings['database']};UID={settings['db_user']};PWD={settings['db_password']};")
            else:
                connection = pymysql.connect(host=settings['db_host'],user=settings['db_user'],password=settings['db_password'],database=settings['database'],cursorclass=pymysql.cursors.DictCursor)

            # Create a cursor object to interact with the database
            do_data = connection.cursor()
            consumption_data = connection.cursor()

            # Example: Query the database
            do_table = settings['do_table']
            consumption_table = settings['consumption_table']
            if(type == "all"):
                do_data.execute(f"SELECT * FROM `{do_table}`") 
                consumption_data.execute(f"SELECT * FROM `{consumption_table}`") 
            else:
                do_data.execute(f"SELECT * FROM `{do_table} WHERE Batch_No > {settings['count']}")
                consumption_data.execute(f"SELECT * FROM `{consumption_table}` WHERE Batch_No > {settings['count']}")
                pass
            do_results = do_data.fetchall()
            consumption_results = consumption_data.fetchall()

            # Loop through each record in data
            grouped = {}
            for item in consumption_results:
                if item['parent'] not in grouped:
                    grouped[item['parent']] = []
                filtered_item = {key: value for key, value in item.items() if not isinstance(value, datetime)}
                grouped[item['parent']].append(filtered_item)
            
            results = []
            for do_result in do_results:
                do_result["items"] = []
                for key, group in grouped.items():
                    if(do_result["email"] == group[0]["parent"]):
                        do_result["items"] = group
                filtered_result = {key: value for key, value in do_result.items() if not isinstance(value, datetime)}
                results.append(filtered_result)
             
            # Make the POST request
            consumption_set_data = requests.post(url+"erptech_rcm.api.consumption.consumption_set_data", json={"payload": json.dumps(results)}, headers=headers)
            consumption_set_data.raise_for_status()  # Raise an HTTPError for bad responses (4xx and 5xx)
            
            # Process the response
            consumption = consumption_set_data.json()  # Assuming the API returns JSON

            if(consumption['message']['status'] == "success"):
                frappe.msgprint(consumption['message']['message'])
            do_data.close()
            consumption_data.close()
    except requests.exceptions.RequestException as e:
        # Handle any exceptions
        print("An error occurred:", e)