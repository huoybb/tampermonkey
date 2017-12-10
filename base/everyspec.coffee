import base from './base.coffee'
import base64encode from './base64encode.coffee'

class everyspec extends base
  getURL: (url)->
    url = url || location.href
    "http://mydocuments/standards/addWebData/EverySpec/#{base64encode(url)}"

export default everyspec