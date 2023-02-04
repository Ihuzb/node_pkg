const general = require('./general')
const jinjiang = require('./jinjiang')
const general_list = require("./general_list");
const save_file = require("./save_file");
module.exports = async (url, type) => {
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
        waitUntil: ['domcontentloaded'],
        'timeout': 1000 * 100 //这里超时是60s
    });
    if (!status.ok) {
        throw new Error('cannot open google.com')
    }
    await page.waitForTimeout(1000);
    console.log('打开文章成功！！');
    let bookInfo = {};
    if (type == 2) {
        bookInfo = await general(page);
    } else if (type == 1) {
        bookInfo = await jinjiang(page);
    }
    if (bookInfo.list.length) {
        console.log('获取目录成功！！');
        let bookContent = await general_list(bookInfo, type)
        bookInfo['bookContent'] = bookContent;
        await save_file(bookInfo);
    } else {
        console.log('获取目录失败！！');
    }
    await page.close();
    Promise.resolve();
}