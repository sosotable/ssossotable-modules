# main 실행

import pandas as pd
import numpy as np

import time

import DAO
import crawler

# DB연결
connection=(DAO.DAO()).get_connection()

# 크롤러 모듈 지정
crawler=crawler.Crawler()
crawler.driver=crawler.set_chrome_driver()

# DB 작업 수행
# with를 통해 연결을 1회만 수립함
# 연결이 올바르게 해제되지 않을 경우 프로세스에 남아있어 락이 걸리는 상황 방지하기 위함
with connection as conn:
    with connection.cursor() as cursor:
        # DB동작 수행
        sql = "SELECT * FROM `food`"
        cursor.execute(sql)
        food=cursor.fetchall()
        food=pd.DataFrame(food)
        for idx in food.index:
            # 특정 음식 이름을 셀레니움을 통해 검색
            data=crawler.search_image_metadata_pinterest(food.loc[idx,'name'])
            time.sleep(1)

            # UPDATE를 통해 food의 image갱신
            sql = "UPDATE food SET image='{0}' WHERE id={1}".format(data,food.loc[idx,'id'])
            cursor.execute(sql)
        # 반복 이후 커밋을 통한 DB저장
        conn.commit()
