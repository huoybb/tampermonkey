import base from './base.coffee'
import base64encode from './base64encode.coffee'

class baiduxueshu  extends base
  getURL: (url)->
    url = url || location.href
    "http://mydocuments/standards/addWebData/baiduxueshu/#{base64encode(url)}"
  addLink: ->
    @createAlink(' 下载',@getURL()).appendTo($('h3').first())

export default baiduxueshu