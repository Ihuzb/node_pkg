module.exports = (page) => {
    return new Promise(async (re, rj) => {
        let title = await page.$eval('#info h1', e => e.innerText);
        let newBookList = await page.$eval("#list dl", async e => {
            let dt = 0, newBookList = [];
            let bookList = e.children;
            console.log(e.children);
            for (let i = 0; i < bookList.length; i++) {
                console.log(bookList[i], 123)
                if (bookList[i].nodeName == "DT") {
                    dt++;
                } else if (dt == 2) {
                    let {children} = bookList[i];
                    newBookList.push({url: children[0].href, title: children[0].innerText});
                }
            }
            return newBookList
        });
        let bookInfo = {title, list: []}
        bookInfo['list'] = newBookList;
        re(bookInfo)
    })
}