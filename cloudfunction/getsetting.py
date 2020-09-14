# -*- coding: utf8 -*-
import json
import pymysql

def main(event, context):
        conn=pymysql.connect(host='22.23.24.25',port=3306,user='root',passwd='xxxxxx',db='ebmp',charset='utf8')
    cur = conn.cursor()
    cur.execute("SELECT setting_value FROM system_setting where setting_key = '%s'" %(event['key']))
    d = cur.fetchone()
    data = d[0]
    cur.close()  # 关闭游标
    conn.close()  # 释放数据库资源
    return(data)