// 현재 사용하고 있는 sql문을 기준으로 만들어둠

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

