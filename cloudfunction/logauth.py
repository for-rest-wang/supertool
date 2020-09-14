# -*- coding: utf8 -*-
import json
import pymysql

def main(event, context):
    conn=pymysql.connect(host='22.23.24.25',port=3306,user='root',passwd='xxxxxx',db='ebmp',charset='utf8')
    cur = conn.cursor()
    try:
        cur.execute("select user_id,user_name,mail,company,department,subdepartment,(select dept_id from system_department where dept_name = system_otheruser.subdepartment) as dept_id , (select `type` from system_department where dept_name = system_otheruser.subdepartment) as dept_type from system_otheruser where status='1' and user_id='%s' and password='%s'" %(event['user_id'], event['password']))
        d = cur.fetchone()

        userInfo = {}
        userInfo['userid'] = d[0]
        userInfo['username'] = d[1]
        userInfo['mail'] = d[2]
        userInfo['company'] = d[3]
        userInfo['department'] = d[4]
        userInfo['subdepartment'] = d[5]
        userInfo['deptid'] =  d[6]
        userInfo['depttype'] =  d[7]

        result = {
            'status': True,
            'logInfo': userInfo
        }
    except:
        result = {
            'status': False,
            'logInfo':''
        }    
    
    cur.close()  # 关闭游标
    conn.close()  # 释放数据库资源

    print("Received event: " + json.dumps(event, indent = 2)) 
    print("Received context: " + str(context))
    print("Hello world")
    return(result)
