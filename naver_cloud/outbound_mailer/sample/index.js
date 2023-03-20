import axios from 'axios'

(async ()=>{
    await axios.post('https://vxpskt0u99.execute-api.us-east-2.amazonaws.com/default/outbound_mailer', {
        api: 'mail',
        sendData: {
            senderAddress: 'no_reply@sample.com',
            title: 'sample mail',
            body: '1234',
            recipients: {
                address: 'egnachio@naver.com',
                type: 'R'
            }
        }
    })
})()