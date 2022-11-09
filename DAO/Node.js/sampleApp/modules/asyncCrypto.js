const crypto=require('crypto')

module.exports = {
    getHashCodeBase64:(key)=>{
        return new Promise((resolve, reject) => {
            const hashedKey=crypto.createHash('sha512').update(key).digest('base64')
            resolve(hashedKey)
        })
    },
    getHashCodeHex:(key)=>{
        return new Promise((resolve, reject) => {
            const hashedKey=crypto.createHash('sha512').update(key).digest('hex')
            resolve(hashedKey)
        })
    }
}
