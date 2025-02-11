import frappe
import json


@frappe.whitelist(allow_guest=True)
def consumption_settings():
    settings = frappe.get_cached_doc("Consumption Settings").as_dict()
    count = frappe.db.count(settings.consumption_table_to)
    settings["count"] = count
    return settings


# Stetter
@frappe.whitelist(allow_guest=True)
def consumption_set_data_stetter():
    settings = frappe.get_cached_doc("Consumption Settings").as_dict()
    db_name = settings.consumption_table_to
    stringified_data = frappe.local.form_dict.get("payload")
    if not stringified_data:
        return {"status": "error", "message": "No data received"}
    results = json.loads(stringified_data)
    for result in results:
        # TO DO
        items = []
        for item in result["items"]:
            items.append(
                {
                    "batch_index": item["batch_index"],
                    "batch_date": item["batch_date"],
                    "batch_size": item["batch_size"],
                    "prod_adj": item["Prod_Adj"],
                    "prod1_agg_name": item["Prod1_Agg_Name"],
                    "prod1_agg_stwt": item["Prod1_Agg_Stwt"],
                    "prod1_agg_atwt": item["Prod1_Agg_Atwt"],
                    "prod1_agg_moi": item["Prod1_Agg_Moi"],
                    "prod2_agg_name": item["Prod2_Agg_Name"],
                    "prod2_agg_stwt": item["Prod2_Agg_Stwt"],
                    "prod2_agg_atwt": item["Prod2_Agg_Atwt"],
                    "prod2_agg_moi": item["Prod2_Agg_Moi"],
                    "prod3_agg_name": item["Prod3_Agg_Name"],
                    "prod3_agg_stwt": item["Prod3_Agg_Stwt"],
                    "prod3_agg_atwt": item["Prod3_Agg_Atwt"],
                    "prod3_agg_moi": item["Prod3_Agg_Moi"],
                    "prod4_agg_name": item["Prod4_Agg_Name"],
                    "prod4_agg_stwt": item["Prod4_Agg_Stwt"],
                    "prod4_agg_atwt": item["Prod4_Agg_Atwt"],
                    "prod4_agg_moi": item["Prod4_Agg_Moi"],
                    "prod5_agg_name": item["Prod5_Agg_Name"],
                    "prod5_agg_stwt": item["Prod5_Agg_Stwt"],
                    "prod5_agg_atwt": item["Prod5_Agg_Atwt"],
                    "prod5_agg_moi": item["Prod5_Agg_Moi"],
                    "prod6_agg_name": item["Prod6_Agg_Name"],
                    "prod6_agg_stwt": item["Prod6_Agg_Stwt"],
                    "prod6_agg_atwt": item["Prod6_Agg_Atwt"],
                    "prod6_agg_moi": item["Prod6_Agg_Moi"],
                    "prod7_cem_name": item["Prod7_Cem_Name"],
                    "prod7_cem_stwt": item["Prod7_Cem_Stwt"],
                    "prod7_cem_atwt": item["Prod7_Cem_Atwt"],
                    "prod7_cem_corr": item["Prod7_Cem_Corr"],
                    "prod8_cem_name": item["Prod8_Cem_Name"],
                    "prod8_cem_stwt": item["Prod8_Cem_Stwt"],
                    "prod8_cem_atwt": item["Prod8_Cem_Atwt"],
                    "prod8_cem_corr": item["Prod8_Cem_Corr"],
                    "prod9_cem_name": item["Prod9_Cem_Name"],
                    "prod9_cem_stwt": item["Prod9_Cem_Stwt"],
                    "prod9_cem_atwt": item["Prod9_Cem_Atwt"],
                    "prod9_cem_corr": item["Prod9_Cem_Corr"],
                    "prod10_cem_name": item["Prod10_Cem_Name"],
                    "prod10_cem_stwt": item["Prod10_Cem_Stwt"],
                    "prod10_cem_atwt": item["Prod10_Cem_Atwt"],
                    "prod10_cem_corr": item["Prod10_Cem_Corr"],
                    "prod11_cem_name": item["Prod11_Cem_Name"],
                    "prod11_cem_stwt": item["Prod11_Cem_Stwt"],
                    "prod11_cem_atwt": item["Prod11_Cem_Atwt"],
                    "prod11_cem_corr": item["Prod11_Cem_Corr"],
                    "prod12_wtr_name": item["Prod12_Wtr_Name"],
                    "prod12_wtr_stwt": item["Prod12_Wtr_Stwt"],
                    "prod12_wtr_atwt": item["Prod12_Wtr_Atwt"],
                    "prod12_wtr_corr": item["Prod12_Wtr_Corr"],
                    "prod13_wtr_name": item["Prod13_Wtr_Name"],
                    "prod13_wtr_stwt": item["Prod13_Wtr_Stwt"],
                    "prod13_wtr_atwt": item["Prod13_Wtr_Atwt"],
                    "prod13_wtr_corr": item["Prod13_Wtr_Corr"],
                    "prod14_wtr_name": item["Prod14_Wtr_Name"],
                    "prod14_wtr_stwt": item["Prod14_Wtr_Stwt"],
                    "prod14_wtr_atwt": item["Prod14_Wtr_Atwt"],
                    "prod15_adm_name": item["Prod15_Adm_Name"],
                    "prod15_adm_stwt": item["Prod15_Adm_Stwt"],
                    "prod15_adm_atwt": item["Prod15_Adm_Atwt"],
                    "prod15_adm_corr": item["Prod15_Adm_Corr"],
                    "prod16_adm_name": item["Prod16_Adm_Name"],
                    "prod16_adm_stwt": item["Prod16_Adm_Stwt"],
                    "prod16_adm_atwt": item["Prod16_Adm_Atwt"],
                    "prod16_adm_corr": item["Prod16_Adm_Corr"],
                    "prod17_adm_name": item["Prod17_Adm_Name"],
                    "prod17_adm_stwt": item["Prod17_Adm_Stwt"],
                    "prod17_adm_agwt": item["Prod17_Adm_Agwt"],
                    "prod17_adm_corr": item["Prod17_Adm_Corr"],
                    "prod18_adm_name": item["Prod18_Adm_Name"],
                    "prod18_adm_stwt": item["Prod18_Adm_Stwt"],
                    "prod18_adm_atwt": item["Prod18_Adm_Atwt"],
                    "prod18_adm_corr": item["Prod18_Adm_Corr"],
                    "prod19_sil_name": item["Prod19_Sil_Name"],
                    "prod19_sil_stwt": item["Prod19_Sil_Stwt"],
                    "prod19_sil_atwt": item["Prod19_Sil_Atwt"],
                    "prod19_sil_corr": item["Prod19_Sil_Corr"],
                    "prod20_add_name": item["Prod20_Add_Name"],
                    "prod20_add_stwt": item["Prod20_Add_Stwt"],
                    "prod20_add_atwt": item["Prod20_Add_Atwt"],
                    "prod21_add_name": item["Prod21_Add_Name"],
                    "prod21_add_stwt": item["Prod21_Add_Stwt"],
                    "prod21_add_atwt": item["Prod21_Add_Atwt"],
                    "prod22_add_name": item["Prod22_Add_Name"],
                    "prod22_add_stwt": item["Prod22_Add_Stwt"],
                    "prod22_add_atwt": item["Prod22_Add_Atwt"],
                    "prod23_add_name": item["Prod23_Add_Name"],
                    "prod23_add_stwt": item["Prod23_Add_Stwt"],
                    "prod23_add_atwt": item["Prod23_Add_Atwt"],
                    "truck_trip": item["Truck_Trip"],
                    "prod1_agg_moi_ab": item["Prod1_Agg_Moi_Ab"],
                    "prod2_agg_moi_ab": item["Prod2_Agg_Moi_Ab"],
                    "prod3_agg_moi_ab": item["Prod3_Agg_Moi_Ab"],
                    "prod4_agg_moi_ab": item["Prod4_Agg_Moi_Ab"],
                    "prod5_agg_moi_ab": item["Prod5_Agg_Moi_Ab"],
                    "prod6_agg_moi_ab": item["Prod6_Agg_Moi_Ab"],
                    "batch_st": item["Batch_St"],
                    "batch_et": item["Batch_Et"],
                    "bt2_id": item["BT2_ID"],
                }
            )
        data = {
            "batch_no": result["Batch_No"],
            "batch_no_serial": result["batch_no_serial"],
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
            "bt1_id": result["BT1_ID"],
            "items": items,
        }
        exists = frappe.db.exists(db_name, {"batch_no": result["Batch_No"]})
        if exists:
            batch = frappe.get_doc(db_name, {"batch_no": result["Batch_No"]})

            # Updtae doc object
            for field, value in data.items():
                if field != "items":
                    batch.set(field, value)

                # Updtae child doc object
                if "items" in data:
                    batch.items.clear()
                    for child_item in data["items"]:
                        batch.append("items", child_item)
            batch.save(ignore_permissions=True)
        else:

            # Create a new doc object
            doc = frappe.get_doc({**{"doctype": db_name}, **data})
            for item in data["items"]:
                doc.append("items", item)

            doc.insert(ignore_permissions=True)

    # Commit the changes to save the records
    frappe.db.commit()
    return {"status": "success", "message": "Data fetched successfully"}


# KYB
@frappe.whitelist(allow_guest=True)
def consumption_set_data_kyb():
    settings = frappe.get_cached_doc("Consumption Settings").as_dict()
    db_name = settings.consumption_table_to
    stringified_data = frappe.local.form_dict.get("payload")

    # stringified_data
    if not stringified_data:
        return {"status": "error", "message": "No data received"}
    results = json.loads(stringified_data)
    for result in results:
        # Filter customers by customer_name
        customers = frappe.get_all(
            "Customer",
            filters={"customer_name": result["CUSTOMER_NAME_VAL0"]},
            fields=["name"],
        )
        data = {
            "customer_name_val0": customers[0].name if customers else None,
            "sequence_number": result["sequence_number"],
            "timestamp_utc": result["timestamp_utc"],
            "timestamp": result["timestamp"],
            "plant_address_val0": result["PLANT_ADDRESS_VAL0"],
            "plant_no_val0": result["PLANT_NO_VAL0"],
            "customer_address_val0": result["CUSTOMER_ADDRESS_VAL0"],
            "site_name_val0": result["SITE_NAME_VAL0"],
            "site_address_val0": result["SITE_ADDRESS_VAL0"],
            "tm_no_val0": result["TM_NO_VAL0"],
            "driver_name_val0": result["DRIVER_NAME_VAL0"],
            "order_qty_val0": result["ORDER_QTY_VAL0"],
            "batch_size_val0": result["BATCH_SIZE_VAL0"],
            "pro_qty_val0": result["PRO_QTY_VAL0"],
            "recipe_name_val0": result["RECIPE_NAME_VAL0"],
            "recipe_grade_val0": result["RECIPE_GRADE_VAL0"],
            "recipe_density_val0": result["RECIPE_DENSITY_VAL0"],
            "adm_1_name_val0": result["ADM_1_NAME_VAL0"],
            "adm_2_name_val0": result["ADM_2_NAME_VAL0"],
            "adm_3_name_val0": result["ADM_3_NAME_VAL0"],
            "adm_4_name_val0": result["ADM_4_NAME_VAL0"],
            "adm_5_name_val0": result["ADM_5_NAME_VAL0"],
            "admixer_1_val0": result["ADMIXER_1_VAL0"],
            "admixer_2_val0": result["ADMIXER_2_VAL0"],
            "admixer_3_val0": result["ADMIXER_3_VAL0"],
            "admixer_4_val0": result["ADMIXER_4_VAL0"],
            "admixer_5_val0": result["ADMIXER_5_VAL0"],
            "adm1_act_log_val0": result["ADM1_ACT_LOG_VAL0"],
            "adm1_set_log_val0": result["ADM1_SET_LOG_VAL0"],
            "adm2_act_log_val0": result["ADM2_ACT_LOG_VAL0"],
            "adm2_set_log_val0": result["ADM2_SET_LOG_VAL0"],
            "adm3_act_log_val0": result["ADM3_ACT_LOG_VAL0"],
            "adm3_set_log_val0": result["ADM3_SET_LOG_VAL0"],
            "adm4_act_log_val0": result["ADM4_ACT_LOG_VAL0"],
            "adm4_set_log_val0": result["ADM4_SET_LOG_VAL0"],
            "adm5_act_log_val0": result["ADM5_ACT_LOG_VAL0"],
            "adm5_set_log_val0": result["ADM5_SET_LOG_VAL0"],
            "agg_1_name_val0": result["AGG_1_NAME_VAL0"],
            "agg_1_val0": result["AGG_1_VAL0"],
            "agg_2_name_val0": result["AGG_2_NAME_VAL0"],
            "agg_2_val0": result["AGG_2_VAL0"],
            "agg_3_name_val0": result["AGG_3_NAME_VAL0"],
            "agg_3_val0": result["AGG_3_VAL0"],
            "agg_4_name_val0": result["AGG_4_NAME_VAL0"],
            "agg_4_val0": result["AGG_4_VAL0"],
            "agg_5_name_val0": result["AGG_5_NAME_VAL0"],
            "agg_5_val0": result["AGG_5_VAL0"],
            "agg_6_name_val0": result["AGG_6_NAME_VAL0"],
            "agg_6_val0": result["AGG_6_VAL0"],
            "agg1_act_log_val0": result["AGG1_ACT_LOG_VAL0"],
            "agg1_mos_log_val0": result["AGG1_MOS_LOG_VAL0"],
            "agg1_set_log_val0": result["AGG1_SET_LOG_VAL0"],
            "agg2_act_log_val0": result["AGG2_ACT_LOG_VAL0"],
            "agg2_mos_log_val0": result["AGG2_MOS_LOG_VAL0"],
            "agg2_set_log_val0": result["AGG2_SET_LOG_VAL0"],
            "agg3_act_log_val0": result["AGG3_ACT_LOG_VAL0"],
            "agg3_mos_log_val0": result["AGG3_MOS_LOG_VAL0"],
            "agg3_set_log_val0": result["AGG3_SET_LOG_VAL0"],
            "agg4_act_log_val0": result["AGG4_ACT_LOG_VAL0"],
            "agg4_mos_log_val0": result["AGG4_MOS_LOG_VAL0"],
            "agg4_set_log_val0": result["AGG4_SET_LOG_VAL0"],
            "agg5_act_log_val0": result["AGG5_ACT_LOG_VAL0"],
            "agg5_mos_log_val0": result["AGG5_MOS_LOG_VAL0"],
            "agg5_set_log_val0": result["AGG5_SET_LOG_VAL0"],
            "agg6_act_log_val0": result["AGG6_ACT_LOG_VAL0"],
            "agg6_mos_log_val0": result["AGG6_MOS_LOG_VAL0"],
            "agg6_set_log_val0": result["AGG6_SET_LOG_VAL0"],
            "cmt_1_name_val0": result["CMT_1_NAME_VAL0"],
            "cmt_2_name_val0": result["CMT_2_NAME_VAL0"],
            "cmt_3_name_val0": result["CMT_3_NAME_VAL0"],
            "cmt_4_name_val0": result["CMT_4_NAME_VAL0"],
            "cmt_5_name_val0": result["CMT_5_NAME_VAL0"],
            "cmt_6_name_val0": result["CMT_6_NAME_VAL0"],
            "cement_1_val0": result["CEMENT_1_VAL0"],
            "cement_2_val0": result["CEMENT_2_VAL0"],
            "cement_3_val0": result["CEMENT_3_VAL0"],
            "cement_4_val0": result["CEMENT_4_VAL0"],
            "cement_5_val0": result["CEMENT_5_VAL0"],
            "cement_6_val0": result["CEMENT_6_VAL0"],
            "cmt1_act_log_val0": result["CMT1_ACT_LOG_VAL0"],
            "cmt1_set_log_val0": result["CMT1_SET_LOG_VAL0"],
            "cmt2_act_log_val0": result["CMT2_ACT_LOG_VAL0"],
            "cmt2_set_log_val0": result["CMT2_SET_LOG_VAL0"],
            "cmt3_act_log_val0": result["CMT3_ACT_LOG_VAL0"],
            "cmt3_set_log_val0": result["CMT3_SET_LOG_VAL0"],
            "cmt4_act_log_val0": result["CMT4_ACT_LOG_VAL0"],
            "cmt4_set_log_val0": result["CMT4_SET_LOG_VAL0"],
            "cmt5_act_log_val0": result["CMT5_ACT_LOG_VAL0"],
            "cmt5_set_log_val0": result["CMT5_SET_LOG_VAL0"],
            "cmt6_act_log_val0": result["CMT6_ACT_LOG_VAL0"],
            "cmt6_set_log_val0": result["CMT6_SET_LOG_VAL0"],
            "wtr_1_name_val0": result["WTR_1_NAME_VAL0"],
            "wtr_2_name_val0": result["WTR_2_NAME_VAL0"],
            "water_1_val0": result["WATER_1_VAL0"],
            "water_1_val0": result["WATER_2_VAL0"],
            "wtr1_act_log_val0": result["WTR1_ACT_LOG_VAL0"],
            "wtr1_set_log_val0": result["WTR1_SET_LOG_VAL0"],
            "wtr2_act_log_val0": result["WTR2_ACT_LOG_VAL0"],
            "wtr2_set_log_val0": result["WTR2_SET_LOG_VAL0"],
            "wtr_adj_log_val0": result["WTR_ADJ_LOG_VAL0"],
            "deliery_no_val0": result["DELIERY_NO_VAL0"],
            "addinfo23": result["AddInfo23"],
            "ticket_id_val0": result["TICKET_ID_VAL0"],
            "batching_plant": result["batching_plant"],
        }
        exists = frappe.db.exists(
            db_name, {"sequence_number": result["sequence_number"]}
        )
        if exists:
            batch = frappe.get_doc(
                db_name, {"sequence_number": result["sequence_number"]}
            )

            # Updtae doc object
            for field, value in data.items():
                batch.set(field, value)
            batch.save(ignore_permissions=True)
        else:

            # Create a new doc object
            doc = frappe.get_doc({**{"doctype": db_name}, **data})
            doc.insert(ignore_permissions=True)

    # Commit the changes to save the records
    frappe.db.commit()
    return {"status": "success", "message": "Data fetched successfully"}
