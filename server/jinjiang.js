module.exports = (page) => {
    return new Promise(async (re, rj) => {
        let title = await page.$eval('#oneboolt span[itemprop="articleSection"]', e => e.innerText);
        let newBookList = await page.$$eval('#oneboolt a[itemprop="url"]', e => {
            let newBookList = [];
            let bookList = e.filter(e => e.localName == "a" && e.id.indexOf('button') == -1)
            for (let i = 0; i < bookList.length; i++) {
                let {href, innerText} = bookList[i];
                if (href && innerText) {
                    newBookList.push({url: href, title: innerText});
                }
            }
            return newBookList
        });
        let bookInfo = {title, list: []}
        bookInfo['list'] = newBookList;
        re(bookInfo)
    })
}