/**
 * Created by ThinkPad on 2017/5/20.
 */
const path = require('path');

module.exports = {
    entry:{
    	douban:'./src/douban.coffee',
    	amazon:'./src/amazon.coffee',
    	dianping:'./src/dianping.coffee',
    	wanfang:'./src/wanfang.coffee',
        oai:'./src/oai.coffee',
        baiduxueshu:'./src/baiduxueshu.coffee',
        everyspec:'./src/everyspec.coffee',
        citeseerx:'./src/citeseerx.coffee',
        veryzhun:'./src/veryzhun.coffee',
        youtube:'./src/youtube.coffee'
    },
    output:{
        path:__dirname + '/dist',
        filename:'[name].js'
    },
    module:{
    	rules:[
    	 { test:/\.coffee$/, use:'coffeescript-loader' }
    	]
    },
    externals: {
        jquery: 'window.$'
        // GM_xmlhttpRequest:'GM_xmlhttpRequest'
    }
};
