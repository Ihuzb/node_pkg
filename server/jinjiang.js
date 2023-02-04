const baoyue = require('./baoyue')
module.exports = (page) => {
    return new Promise(async (re, rj) => {
        // 是否有半价按钮，需要去购买确认
        let baoyueUrl = await page.$eval("#oneboolt tr td #button2_by", e => e.attributes.rel.nodeValue);
        if (baoyueUrl) {
            console.log('触发包月操作！！');
            await baoyue(baoyueUrl);
        }
        let title = await page.$eval('#oneboolt span[itemprop="articleSection"]', e => e.innerText);
        let newBookList = await page.$$eval('#oneboolt a[itemprop="url"]', e => {
            let newBookList = [];
            let bookList = e.filter(e => e.localName == "a" && e.id.indexOf('button') == -1)
            for (let i = 0; i < bookList.length; i++) {
                let {href, rel, innerText} = bookList[i];
                if (innerText) {
                    newBookList.push({url: href || rel, title: innerText});
                }
            }
            return newBookList
        });
        let bookInfo = {title, list: []}
        bookInfo['list'] = newBookList;
        re(bookInfo)
    })
}