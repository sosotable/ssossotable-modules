export function mailForm(authNum) {
    return `
    <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
        </head>
        <body>
            <div style="display: flex; flex-direction: column; width: 320px; margin: auto; border: 1px solid gray; padding: 30px; text-align: center">
                <h1>Daedongyourjido</h1>
                <h3 style="display:block;">인증 번호를 입력해주세요</h3>
                <h3 style="display:block;">${authNum}</h3>
            </div>
        </body>
    </html>
    `
}