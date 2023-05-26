import AWS from 'aws-sdk'
import {DAO} from './lib/DAO.js'

const api = new AWS.ApiGatewayManagementApi({
    endpoint: process.env.ENDPOINT
})

export const handler = async(event) => {
    let route, connectionId
    const body = JSON.parse(event.body)
    const dao = new DAO()
    await dao.init()
    try { route = event.requestContext.routeKey }
    catch (e) { console.log(e) }
    try { connectionId = event.requestContext.connectionId }
    catch (e) { console.log(e) }

    switch (route) {
        case '$connect':
            console.log('Connection occurred')
            break
        case '$disconnect':
            console.log('Disconnection occurred')
            break
        case 'INSERT':
            await dao.insert(body.table, body.columns, body.values);
            break;
        case 'SELECT':
            await replyToMessage(dao, body, connectionId)
            break
        case "UPDATE":
            await dao.update(body.table, body.set, body.where);
            break;
        case "DELETE":
            await dao.delete(body.table, body.where);
            break;
        default:
            console.log('Received unknown route:', route)
    }

    return {
        statusCode: 200
    }
}

async function replyToMessage(dao, body, connectionId) {
    const data = await dao.select(body.columns, body.table, body.where);
    const responseData = { message: data }
    const params = {
        ConnectionId: connectionId,
        Data: Buffer.from(JSON.stringify(responseData))
    }

    return api.postToConnection(params).promise()
}