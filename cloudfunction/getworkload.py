# -*- coding: utf8 -*-
import json
import pymysql

def main(event, context):
    conn=pymysql.connect(host='22.23.24.25',port=3306,user='root',passwd='xxxxxx',db='ebmp',charset='utf8')
    cur = conn.cursor()
    cur.execute("select id, project_name, days, work_type from project_workload where user_id = '%s' and `year_month` = '%s'" %(event['user_id'],event['workload_month']))
    data = cur.fetchall()
    data_list = list()
    for d in data:
        data = {'id':d[0],'project_name':d[1],'days':d[2],'work_type':d[3]}
        data_list.append(data)
    cur.close()  # 关闭游标
    conn.close()  # 释放数据库资源
    return(data_list)