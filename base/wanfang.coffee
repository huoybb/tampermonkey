import base from './base.coffee'

class wanfang extends base
  getWanfangId: (url)->
    url = url || location.href
    myregexp = /http:\/\/d.wanfangdata.com.cn\/([^\/]+)\/(.+)/mg
    result = myregexp.exec(url)
    {type:result[1],id:result[2]}
  getURL: (url)->
    wanfangId = @getWanfangId(url)
    "http://mydocuments/standards/addWebData/#{wanfangId.type}/#{wanfangId.id}"
  addLink: (url)->
    @createAlink(' 下载',@getURL(url)).appendTo($('.record-action-link'))
  addList:->
    $('div.record-title a.title').each (index,element)=>
      url = $(element).attr('href')
      @createAlink(' 下载',@getURL(url)).appendTo($(element).parent())
  add:->
    url = location.href
    return @addList() if /Paper.aspx\?/mg.test url
    @addLink(url)

export default wanfang