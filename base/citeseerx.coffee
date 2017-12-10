import base from './base.coffee'

class citeseerx extends base
    getSourceId: ->
        mytext = location.href
        myregexp = /http:\/\/citeseerx\.ist\.psu\.edu\/viewdoc\/summary\?doi=([0-9.]+)/mg
        result = myregexp.exec(mytext)
        {id:result[1]}
    getURL: ->
        data = @getSourceId()
        'http://mydocuments/standards/addWebData/Citeseerx/'+data.id
    addLink: ->@createAlink(' 下载',@getURL()).appendTo($('h2'))

export default citeseerx