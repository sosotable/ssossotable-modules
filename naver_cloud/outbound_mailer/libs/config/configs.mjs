import CryptoJS from "crypto-js"
export function makeSignature(timeStamp) {
    const space = " ";				// one space
    const newLine = "\n";				// new line
    const method = "POST";				// method
    const url = "/api/v1/mails";	// url (include query string)

    let hmac = CryptoJS.algo.HMAC.create(
        CryptoJS.algo.SHA256,
        process.env.NAVER_CLOUD_SECRET_KEY
    );
    hmac.update(method);
    hmac.update(space);
    hmac.update(url);
    hmac.update(newLine);
    hmac.update(timeStamp);
    hmac.update(newLine);
    hmac.update(process.env.NAVER_CLOUD_ACCESS_KEY);

    const hash = hmac.finalize();

    return hash.toString(CryptoJS.enc.Base64);
}