# 크롤링 관련 모듈
from bs4 import BeautifulSoup 
from selenium import webdriver
from selenium.webdriver.common.by import By 
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager

import time

# DB 연동 모듈
import pymysql.cursors
import pymysql
import pandas as pd
import numpy as np

# DAO 클래스
# 추가구현 필요
class DAO:
    connection=None
    
    def __init__(self):
        self.connection = None

    def get_connection(self):
        return pymysql.connect(host='*',
                             user='*',
                             password='*',
                             database='*',
                             cursorclass=pymysql.cursors.DictCursor)

# 크롤링 클래스
class Crawler:
    driver=None
    def __init__(self):
        self.driver = None

    # 크롬 드라이버
    def set_chrome_driver(self):
        if self.driver is None:
            chrome_options = webdriver.ChromeOptions()
            return webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=chrome_options)
        else:
            return self.driver

    # 팝업창 처리
    def change_window(self, target: str):
        if target == 'parent':
            # child window close
            self.driver.close()
            self.driver.switch_to.window(self.driver.window_handles[0])
        elif target == 'child':
            self.driver.switch_to.window(self.driver.window_handles[1])
        else:
            print("Wrong target!")
            
    def search_image_metadata_pixabay(self, query_txt):
        self.driver.get("https://pixabay.com/")
        # 위 페이지가 모두 열릴 때 까지 2초 기다립니다.
        time.sleep(2)

        #Step 2. 검색창의 이름을 찾아서 검색어를 입력합니다
        self.driver.find_element(By.XPATH,'//*[@id="hero"]/div[4]/form/div/span/input').click()
        element = self.driver.find_element(By.XPATH,'//*[@id="hero"]/div[4]/form/div/span/input')
        element.send_keys(query_txt)
        self.driver.find_element(By.XPATH,'//*[@id="hero"]/div[4]/form/div/input[2]').click()

        # 이미지 검색 결과의 첫 이미지로 이동
        self.driver.find_element(By.CLASS_NAME,'search-results').find_element(By.CLASS_NAME,'row-masonry-cell').click()

        # 이미지의 메타데이터를 불러온다
        element=self.driver.find_element(By.TAG_NAME,'picture').find_element(By.TAG_NAME,'img')
        data=element.get_dom_attribute('src')

        return data
    
    def search_image_metadata_pinterest(self, query_txt):
        data='http://ssossotable.com/src/food_placeholder.png'
        self.driver.get("https://www.pinterest.co.kr/ideas/")
        # 위 페이지가 모두 열릴 때 까지 2초 기다립니다.
        time.sleep(2)

        try :
            # 로그인 화면
            self.driver.find_element(By.XPATH,'//*[@id="__PWS_ROOT__"]/div[1]/div/div/div[1]/div/div[3]/div[1]/button').click()

            # 로그인 화면 생성을 위해 2초 기다림
            time.sleep(2)
            # 로그인 정보 입력
            self.driver.find_element(By.XPATH,'//*[@id="email"]').send_keys('ssossotable@gmail.com')
            self.driver.find_element(By.XPATH,'//*[@id="password"]').send_keys('kiter7968')
            self.driver.find_element(By.XPATH,'//*[@id="__PWS_ROOT__"]/div[1]/div/div[2]/div/div/div/div/div/div[4]/form/div[7]/button').click()
            # 로그인 이후 창 갱신 위해 2초 기다림
            time.sleep(2)
        except:
            # 이미 로그인 되어 있음
            pass
        finally:
            try:
                # Step 2. 검색창의 이름을 찾아서 검색어를 입력합니다
                self.driver.find_element(By.CLASS_NAME,'ujU').click()
                self.driver.find_element(By.CLASS_NAME,'ujU').find_element(By.TAG_NAME,'input').send_keys(query_txt)
                self.driver.find_element(By.CLASS_NAME,'ujU').find_element(By.TAG_NAME,'input').send_keys(Keys.RETURN)

                self.driver.find_element(By.CLASS_NAME,'hCL').click()
                data=self.driver.find_element(By.CLASS_NAME,'hCL').get_attribute('src')
            except:
                pass
            finally:
                return data
