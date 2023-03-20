import { makeSignature } from './config/configs.mjs'
import { mailForm } from "../components/components.js";

export async function mailSender(sendData) {
    const timeStamp = Date.now().toString();
    const signature = makeSignature(timeStamp);
    const header = {
        "Content-Type": "application/json",
        "x-ncp-apigw-timestamp": timeStamp,
        "x-ncp-iam-access-key": process.env.NAVER_CLOUD_ACCESS_KEY,
        "x-ncp-apigw-signature-v2": signature,
    };
    const data = {
        senderAddress: sendData.senderAddress,
        title: sendData.title,
        body: mailForm(sendData.body),
        recipients: [
            {
                address: sendData.recipients.address,
                type: sendData.recipients.type,
            },
        ],
        individual:true
    };
    return new Promise(async (resolve, reject)=>{
        let returnValue
        try {
            returnValue = await fetch("https://mail.apigw.ntruss.com/api/v1/mails",
                {
                    method: "POST",
                    headers: header,
                    body: JSON.stringify(data),
                })
            resolve(returnValue)
        }
        catch (e) {
            reject(e)
        }
    })
}