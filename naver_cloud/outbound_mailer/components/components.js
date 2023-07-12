export function mailForm(authNum) {
    return `
    <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <script></script defer>
        </head>
        <body>
            <div style="display: flex; flex-direction: column; width: 320px; margin: auto; border: 1px solid gray; padding: 30px; text-align: center">
                <h1>Daedongyourjido</h1>
                <h3 style="display:block;">인증을 위해 아래 링크를 클릭해주세요</h3>
                <h3 style="display:block;">
                <a href='https://9g7pnujbse.execute-api.us-east-2.amazonaws.com/default/2023-c-capstone-signin-confirm?id=${authNum}'>
                인증하기
                </a>
                </h3>
            </div>
        </body>
    </html>
    `
}