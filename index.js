const login = require('./server_bin/index')
const {urlType} = require('./public/public')
const get_content = require('./server/get_content')
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
})
let question = () => {
    return new Promise((re, rj) => {
        readline.question(`\n1:晋江平台
               \r2:通用平台
               \r0:退出
               \n功能选择:`,
            async type => {
                switch (type) {
                    case '1' :
                    case '2':
                        let text = type == '1' ? '晋江' : '通用'
                        console.log(`\n${text}平台打开中...`);
                        await login(type);
                        console.log(`${text}平台准备完成！！`);
                        await urlInfo(type);
                        re(type)
                        break;
                    case '0':
                        readline.close();
                        break;
                    default:
                        console.log('没有找到命令');
                        await question();
                        break;
                }
            });
    })
}
let urlInfo = (type) => {
    return new Promise((re, rj) => {
        readline.question(`\n0:退出当前
        \r输入文章地址：`,
            async url => {
                if (url == 0) {
                    await question();
                } else if (url) {
                    let urlTypeInfo = urlType(url);
                    if (urlTypeInfo == 0) {
                        console.log('地址错误请重新输入！！');
                        await urlInfo(type);
                    } else if (urlTypeInfo != type) {
                        console.log('地址与所选平台不符合，请重新输入！！');
                        await urlInfo(type);
                    } else if (urlTypeInfo == type) {
                        await get_content(url, type);
                        await urlInfo(type);
                    }
                } else {
                    await question();
                }
            });
    })
}
question().then(res => {

})
//close事件监听
readline.on('close', function () {
    console.log('\n----end----');
    process.exit(0);
});
