# -*- coding: utf8 -*-
import json
import pymysql

def main(event, context):
    if 'id' in event.keys():
        print("value1 = " + event['id'])

    conn=pymysql.connect(host='22.23.24.25',port=3306,user='root',passwd='xxxxxx',db='ebmp',charset='utf8')
	cur = conn.cursor()
    cur.execute("select id, project_id, project_name, work_type, delivery_center, days, is_pre from project_workload where id = " + event['id'])
    d = cur.fetchone()
    data = {'id':d[0],'project_id':d[1],'project_name':d[2],'work_type':d[3],'delivery_center':d[4],'days':d[5],'is_pre':d[6]}
    cur.close()  # 关闭游标
    conn.close()  # 释放数据库资源
    return(data)