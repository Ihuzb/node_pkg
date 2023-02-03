module.exports = (url) => {
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
            waitUntil: ['load', 'domcontentloaded', 'networkidle0'],
            'timeout': 1000 * 100 //这里超时是60s
        });
        if (!status.ok) {
            throw new Error('cannot open google.com')
        }

        let text = await page.evaluate(async () => {
            return document.querySelector("#content").innerText;
        });
        await page.close();

        re(text);
    })
}