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
        let tb2 = await page.$("#tb2");
        if (tb2) {
            await page.waitForSelector("#buy_content #buy");
            let buy = await page.$("#buy_content #buy");
            await buy.click();
            await page.waitForSelector(".blockUI.blockMsg #question #yes");
            let yes = await page.$(".blockUI.blockMsg #question #yes");
            if (yes) {
                await yes.click();
            }
        } else {
            console.log('已包月！！');
        }
        await page.close();
        re();
    })
}