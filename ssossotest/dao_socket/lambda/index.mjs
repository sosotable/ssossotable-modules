import AWS from 'aws-sdk'

const api = new AWS.ApiGatewayManagementApi({
    endpoint: '26qu7nodpd.execute-api.us-east-2.amazonaws.com/production'
})

const options = ['Yes', 'No', 'Maybe', 'Probably', 'Probably Not']

export const handler = async(event) => {
    console.log(event)

    let route, connectionId
    try {
        route = event.requestContext.routeKey
    }
    catch (e) {
        console.log(e)
    }
    try {
        connectionId = event.requestContext.connectionId
    }
    catch (e) {
        console.log(e)
    }

    switch (route) {
        case '$connect':
            console.log('Connection occurred')
            break
        case '$disconnect':
            console.log('Disconnection occurred')
            break
        case 'message':
            console.log('Received message:', event.body)
            await replyToMessage(options[Math.floor(Math.random() * options.length)], connectionId)
            break
        default:
            console.log('Received unknown route:', route)
    }

    return {
        statusCode: 200
    }
}

async function replyToMessage(response, connectionId) {
    const data = { message: response }
    const params = {
        ConnectionId: connectionId,
        Data: Buffer.from(JSON.stringify(data))
    }

    return api.postToConnection(params).promise()
}