module.exports = (url, type) => {
    return new Promise(async (re, rj) => {
        let browser = global.browser;
        if (!browser) {
            console.log('浏览器框架失效！！');
            return null;
        }
        const page = await browser.newPage();
        await page.setExtraHTTPHeaders({
            'Accept-Encoding': 'gzip'
        });
        const status = await page.goto(url, {
            waitUntil: ['load', 'domcontentloaded'],
            'timeout': 1000 * 100 //这里超时是60s
        });
        if (!status.ok) {
            throw new Error('cannot open google.com')
        }
        let text = '';
        if (type == 2) {
            text = await page.evaluate(async () => {
                return document.querySelector("#content").innerText;
            });
        } else if (type == 1) {
            text = await page.evaluate(async () => {
                let readsmall = document.querySelector(".noveltext .readsmall")
                if (readsmall) {
                    readsmall.remove();
                }
                return document.querySelector(".noveltext").innerText;
            });
        }
        await page.close();
        re(text);
    })
}