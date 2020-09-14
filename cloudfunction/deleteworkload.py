# -*- coding: utf8 -*-
import json
import pymysql

def main(event, context):
    workload_id = event['workload_id']

    sql = "delete from project_workload where id = " + workload_id
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