# -*- coding: utf8 -*-
import json
import pymysql

def main(event, context):
    user_id = event['user_id']
    user_name = event['user_name']
    dept_id = event['dept_id']
    workload_month = event['workload_month']
    project_id = event['project_id']
    project_name = event['project_name']
    delivery_center = event['delivery_center']
    is_pre = event['is_pre']
    work_type = event['work_type']
    days = event['days']
    fill_in_time = event['fill_in_time']

    sql = "insert into project_workload(user_id, user_name, department, `year_month`, project_id, project_name, delivery_center, is_pre, work_type, days, fill_in_time) values('%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s')" %(user_id, user_name, dept_id, workload_month, project_id, project_name, delivery_center, is_pre, work_type, days, fill_in_time)
    conn=pymysql.connect(host='22.23.24.25',port=3306,user='root',passwd='xxxxxx',db='ebmp',charset='utf8')
    cur = conn.cursor()
    cur.execute(sql)
    conn.commit()
    # try:
    #     cur.execute(sql)
    #     conn.commit()
    # except:
        
    #     conn.rollback()
    conn.close()  # 释放数据库资源
    print("Received event: " + json.dumps(event, indent = 2)) 
    print("Received context: " + str(context))
    print("Hello world")
    return(sql)