import { mailSender } from './libs/modules.mjs'
export const handler = async(event) => {
// MAKR: static 객체 지정
    if(event.httpMethod == 'GET') {
        const response = {
            statusCode: 200,
            body: JSON.stringify('naver cloud api Lambda'),
        };
        return response;
    }
    else if(event.httpMethod == 'POST') {
        const body = JSON.parse(event.body)
        const api = body.api
        switch (api) {
            case 'auth':
                try {
                    await mailSender(body.sendData)
                    const response = {
                        statusCode: 200,
                        headers: {
                            "Access-Control-Allow-Headers" : "Content-Type",
                            "Access-Control-Allow-Origin": "*",
                            "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
                        },
                        body: JSON.stringify('api call success'),
                    };
                    return response;
                }
                catch (e) {
                    const response = {
                        statusCode: 500,
                        headers: {
                            "Access-Control-Allow-Headers" : "Content-Type",
                            "Access-Control-Allow-Origin": "*",
                            "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
                        },
                        body: JSON.stringify(e),
                    };
                    return response;
                }
                break
            case 'mail':
                try {
                    await mailSender([1, body.sendData])
                    const response = {
                        statusCode: 200,
                        headers: {
                            "Access-Control-Allow-Headers" : "Content-Type",
                            "Access-Control-Allow-Origin": "*",
                            "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
                        },
                        body: JSON.stringify('api call success'),
                    };
                    return response;
                }
                catch (e) {
                    const response = {
                        statusCode: 500,
                        headers: {
                            "Access-Control-Allow-Headers" : "Content-Type",
                            "Access-Control-Allow-Origin": "*",
                            "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
                        },
                        body: JSON.stringify(e),
                    };
                    return response;
                }
                    break
            default:
                break
        }

    }
}