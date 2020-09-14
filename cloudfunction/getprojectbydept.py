# -*- coding: utf8 -*-
import json
import pymysql

def main(event, context):
        conn=pymysql.connect(host='22.23.24.25',port=3306,user='root',passwd='xxxxxx',db='ebmp',charset='utf8')
    cur = conn.cursor()

    dept_id = event['dept_id']
    dept_type = event['dept_type']
    if (dept_type=='3'):
        sql = "select id, project_name, delivery_center_id, is_pre, sign_date from project_project where need_support=1 and (id in (select project_id from project_project_product_dept where department_id = '%s') or product_center_id='%s')" %(dept_id,dept_id)
    else:
        sql = "SELECT id, project_name, delivery_center_id, is_pre, sign_date FROM project_project where need_support=1"

    cur.execute(sql)
    data = cur.fetchall()
    data_list = list()
    for d in data:
        data = {'id':d[0],'project_name':d[1],'delivery_center_id':d[2],'is_pre':d[3]}
        data_list.append(data)
    cur.close()  # 关闭游标
    conn.close()  # 释放数据库资源
    print("Received event: " + json.dumps(event, indent = 2)) 
    print("Received context: " + str(context))
    print("Hello world")
    return(data_list)