const fileSave = require('file-save')
module.exports = (bookInfo) => {
    return new Promise((re, rj) => {
        let bookName = bookInfo.title, bookContent = bookInfo.bookContent;
        let content = bookContent.map(v => v.title + '\r' + v.text);
        if (content) {
            console.log('获取完成，开始保存！')
            fileSave(`./file/${bookName}.txt`)
                .write(content.join('\r'))
                .end('')
                .finish(() => {
                    console.log('写入完成');
                    re();
                });
        }
    })
}