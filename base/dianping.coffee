import base from './base.coffee'
# 利用继承的关系来简化设计
class dianping extends base
  getURL: (url)->
    url =  super(url)
    'http://mytraveler.zhaobing/getHotelInfo/' + @getKey(url)

  getKey:(url)->url.replace(/.*\/([0-9]+)/img, "$1");

export default dianping