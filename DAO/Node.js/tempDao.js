// 현재 사용하고 있는 sql문을 기준으로 만들어둠

/**
 * FIXME
 * 현재 require만 해도 에러가 나요
 * 첨부한 asyncCrypto.js(비동기 해싱에 사용하려고 만들어놓은 모듈이에요) 참조해서 새롭게 구현해 보세요
 * 쿼리문의 결과에 따른 값(select라면 결과문 나머지라면 성공했는지 실패했는지 여부) 등을 비동기 처리를 통해 반환받을 수 있도록 하세요
 * **/

/**select문 -where을 사용하는 것만 고려함**/
async function daoSelect(tableName, field, whereParameter, connection) {
    const query = `select ${field} from ${tableName} where ${whereParameter}`
    try {
        await connection.query(query)
        console.log('Select Success')
    }catch (e){
        console.log(e)
    }
}

/**insert문 -field를 사용하는 것만 고려함**/
async function daoInsert(tableName, field, value, connection) {
    const query = `insert into ${tableName}(${field}) values(${value}) `
    try {
        await connection.query(query)
        console.log('Insert Success')
    }catch (e){
        console.log(e)
    }
}

/**update문 -where을 사용하는 것만 고려함**/
async function daoUpdate(tableName, setParameter, whereParameter, connection) {
    const query = `update ${tableName} set ${setParameter} where ${whereParameter}`
    try {
        await connection.query(query)
        console.log('Update Success')
    }catch (e){
        console.log(e)
    }
}

/**delete문 -where을 사용하는 것만 고려함**/
async function daoDelete(tableName, whereParameter, connection) {
    const query = `delete from ${tableName} where ${whereParameter}`
    try {
        await connection.query(query)
        console.log('Delete Success')
    }catch (e){
        console.log(e)
    }
}

export {
    daoSelect, daoUpdate, daoInsert, daoDelete
}



