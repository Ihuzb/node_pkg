const {urlList, userInfo} = require("../config/config");

module.exports = async (pool, type) => {
    let page = global.page;
    if (page) await page.close();
    return new Promise(async (re, rj) => {
        await pool.use(async (browser) => {
            const page = await browser.newPage();
            await page.setExtraHTTPHeaders({
                'Accept-Encoding': 'gzip'
            });
            // await page.authenticate(agencyIp);
            await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36')
            await page.evaluateOnNewDocument(() => {
                Object.defineProperty(navigator, 'webdriver', {
                    get: () => undefined
                })
            });
            const status = await page.goto(urlList[type], {
                waitUntil: ['load', 'domcontentloaded', 'networkidle0'],
                'timeout': 1000 * 100 //这里超时是60s
            });
            if (!status.ok) {
                throw new Error('cannot open google.com')
            }
            // await page.waitForNavigation();
            if (type == 1) {
                const readerid = await page.$(".readerid");
                if (!readerid) {
                    await page.waitForSelector("#jj_login");
                    const jj_login = await page.$("#jj_login");
                    await jj_login.click();
                    await page.waitForTimeout(1000);
                    await page.type('#login_form_ajax input[name="loginname"]', userInfo.username);
                    await page.type('#login_form_ajax input[name="loginpassword"]', userInfo.password);
                    const check = await page.$("#login_registerRule");
                    await check.click();
                    await page.waitForSelector(".readerid");
                }
                re();
            } else {
                re();
            }
            global.browser = browser;
            global.page = page;
        })
    })

}