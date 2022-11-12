import modules

connection=(modules.DAO()).get_connection()
crawler=modules.Crawler()
crawler.driver=crawler.set_chrome_driver()

with connection as conn:
    with connection.cursor() as cursor:
        # Read a single record
        sql = "SELECT * FROM `food`"
        cursor.execute(sql)
        food=cursor.fetchall()
        food=pd.DataFrame(food)
        for idx in food.index:
            data=crawler.search_image_metadata_pinterest(food.loc[idx,'name'])
            time.sleep(1)
            sql = "UPDATE food SET image='{0}' WHERE id={1}".format(data,food.loc[idx,'id'])
            print(sql)
            cursor.execute(sql)
        conn.commit()
