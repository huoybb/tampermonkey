import base from './base.coffee'

class veryzhun extends base
  getURL: (url)->
    url =  url || location.href
    url = @getHotelDownloadUrl(url)
    url
#    url.replace(/(https:\/\/www.youtube.com)(.+)/mg, "http://www.ssyoutube.com$2");
#    url = 'http://en.savefrom.net/#url=' + url

  addLink: (url)-> @createAlink(' 下载',@getURL(url)).appendTo($('.tit span b'))

  getHotelDownloadUrl:(url)->'http://mytraveler/getPlaneInfo/' + @getKey(url)
#  需要从url中将关键词抽取出来
  getKey:(url)->url.replace(/http:\/\/www.variflight.com\/schedule\/(.+)$/img, "$1");

export default veryzhun


