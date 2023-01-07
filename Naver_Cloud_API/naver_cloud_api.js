const naverCloudSignature = require('./naver_cloud_signature')
require('dotenv').config();

module.exports = {
    mailer: async (sendData) => {
        const timeStamp = Date.now().toString()
        const signature = await naverCloudSignature.makeSignature(timeStamp)
        const header = {
            "Content-Type": "application/json",
            "x-ncp-apigw-timestamp": timeStamp,
            "x-ncp-iam-access-key": process.env.NAVER_CLOUD_ACCESS_KEY,
            "x-ncp-apigw-signature-v2": signature
        }
        const data = {
            "senderAddress": sendData.senderAddress,
            "title":sendData.title,
            "body":sendData.body,
            "recipients":[
                {
                    "address":sendData.recipients.address,
                    "type":sendData.recipients.type
                }
            ]
        }
        const returnStatus = await fetch('https://mail.apigw.ntruss.com/api/v1/mails', {
            method: 'POST',
            headers: header,
            body: JSON.stringify(data)
        });
        if(returnStatus.error !== undefined) {
            return returnStatus.error
        }
        else {
            return await returnStatus.json()
        }
    }
}