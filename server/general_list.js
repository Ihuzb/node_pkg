const async = require('async');
const general_text = require('./general_text')
module.exports = (bookInfo, type) => {
    return new Promise((re, rj) => {
        if (bookInfo.list) {
            console.log(`开始获取《${bookInfo.title}》内容！！共${bookInfo.list.length}章`);
            async.mapLimit(bookInfo.list, 20, async (item) => {
                let {url, title} = item;
                let text = await general_text(url, type);
                console.log(`${title}完成！`)
                return {title, text}
            }, (err, result) => {
                console.log(`共${bookInfo.list.length}章，实际${result.filter(v => v).length}章`)
                re(result);
            })
        }
    })
}

