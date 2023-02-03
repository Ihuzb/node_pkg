module.exports = {
    urlType: (url) => {
        let urlReg = new RegExp(/(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/);
        if (urlReg.test(url)) {
            if (url.indexOf('qqxsnew.net') > -1) {
                return 2
            } else if (url.indexOf('jjwxc.net') > -1) {
                return 1
            }
        } else {
            return 0
        }

    }
}