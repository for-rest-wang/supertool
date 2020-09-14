# -*- coding: utf8 -*-
import json
import pymysql

def main(event, context):
    id = event['id']

    project_id = event['project_id']
    project_name = event['project_name']
    delivery_center = event['delivery_center']
    work_type = event['work_type']
    days = event['days']
    is_pre = event['is_pre']

    sql = "update project_workload set project_id='%s',project_name='%s',delivery_center='%s',work_type='%s',days='%s',is_pre='%s' where id=%s" %(project_id,project_name,delivery_center,work_type,days,is_pre,id)
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