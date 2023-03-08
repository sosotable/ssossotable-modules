import {DAO} from './lib/DAO.js'

export const handler = async(event) => {
    // method type 확인
    const method = event.httpMethod
    switch (method) {
        case 'GET':
            const response = {
                statusCode: 200,
                headers: {
                    "Access-Control-Allow-Headers" : "Content-Type",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
                },
                body: JSON.stringify('aws lambda'),
            };
            return response;
        case 'POST':
            const dao = new DAO()
            await dao.init()
            const body = JSON.parse(event.body)
            const DML = body.DML
            let responseData, statusCode
            try {
                switch (DML) {
                    case "INSERT":
                        await dao.insert(body.table, body.columns, body.values);
                        break;
                    case "SELECT":
                        responseData = await dao.select(body.columns, body.table, body.where);
                        break;
                    case "UPDATE":
                        await dao.update(body.table, body.set, body.where);
                        break;
                    case "DELETE":
                        await dao.delete(body.table, body.where);
                        break;
                }
                await dao.end()
                statusCode = 200
            }
            catch(e) {
                responseData = e
                statusCode = 400
            }
            finally {
                const response = {
                    statusCode: statusCode,
                    // MARK: cors 헤더 추가
                    headers: {
                        "Access-Control-Allow-Headers" : "Content-Type",
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
                    },
                    body: JSON.stringify(responseData),
                };
                return response;
            }
    }

};