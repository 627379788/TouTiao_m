// 注意postcss-pxtorem版本必须5.1.1
module.exports = {
    plugins: {
        // vue-cli脚手架已经声明了
        // 'autoprefixer': {
        //     browsers: ['Android >= 4.0', 'iOS >= 8']
        // },
        'postcss-pxtorem': {
            // rootValue 可以设置为数字以及函数
            // 根据接收的参数判断是否是vant组件返回rootValue基准值
            rootValue({ file }) {
                return file.indexOf('vant') !== -1 ? 37.5 : 70
            },
            // 转换的类型 *表示所有
            propList: ['*']
        }
    }
}