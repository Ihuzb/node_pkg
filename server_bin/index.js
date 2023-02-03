const initPuppeteerPool = require('../config/puppeteer_pool');
const login = require('../server/login')
const get_content = require("../server/get_content");
const pool = initPuppeteerPool({ // 全局只应该被初始化一次
    puppeteerArgs: {
        ignoreHTTPSErrors: true,
        headless: true,
        args: [
            '-–disable-dev-shm-usage',
            '-–disable-setuid-sandbox',
            '-–no-first-run',
            '--no-sandbox',
            '-–no-zygote',
            '-–single-process',
            // `--proxy-server=${proxyUrl}`
        ],
        //pipe: true, // 不使用 websocket
    }
});
let test = async () => {
    await login(pool, 2)
    await get_content('https://www.qqxsnew.net/10/10917/', 2)
}
// test();
module.exports = async (type) => {
    return await login(pool, type);
}
