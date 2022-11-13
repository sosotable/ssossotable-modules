/**
 * FIXME
 * 현재 require만 해도 에러가 나요
 * 첨부한 asyncCrypto.js(비동기 해싱에 사용하려고 만들어놓은 모듈이에요) 참조해서 새롭게 구현해 보세요
 * 쿼리문의 결과에 따른 값(select라면 결과문 나머지라면 성공했는지 실패했는지 여부) 등을 비동기 처리를 통해 반환받을 수 있도록 하세요
 * **/
module.exports = {
    daoInsert:(tableName, field, value, connection)=>{
        return new Promise((resolve, reject) => {
            const query = `insert into ${tableName}(${field}) values(${value}) `
            if (tableName&&field&&value&&connection){
                resolve(connection.query(query))
            }
            else {
                reject('dao error')
            }
        })
    },
    daoSelect:(tableName, field, whereParameter, connection)=>{
        return new Promise((resolve, reject) => {
            const query = `select ${field} from ${tableName} where ${whereParameter}`
            if (tableName&&field&&whereParameter&&connection){
                resolve(connection.query(query))
            }
            else {
                reject('dao error')
            }
        })
    },
    daoUpdate:(tableName, setParameter, whereParameter, connection)=>{
        return new Promise((resolve, reject) => {
            const query = `update ${tableName} set ${setParameter} where ${whereParameter}`
            if (tableName&&setParameter&&whereParameter&&connection){
                resolve(connection.query(query))
            }
            else {
                reject('dao error')
            }
        })
    },
    daoDelete:(tableName, whereParameter, connection)=>{
        return new Promise((resolve, reject) => {
            const query = `delete from ${tableName} where ${whereParameter}`
            if (tableName&&whereParameter&&connection){
                resolve(connection.query(query))
            }
            else {
                reject('dao error')
            }
        })
    }
}


