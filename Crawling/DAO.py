# DB 연동 모듈
import pymysql.cursors
import pymysql

# DAO 클래스
# 추가구현 필요
class DAO:
    connection=None
    
    def __init__(self):
        self.connection = None

    def get_connection(self):
        return pymysql.connect(host='18.117.197.254',
                             user='ssossotable',
                             password='Mysql7968!',
                             database='ssossotable_food',
                             cursorclass=pymysql.cursors.DictCursor)
                    
