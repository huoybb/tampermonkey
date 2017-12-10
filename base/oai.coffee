import base from './base.coffee'
class oai extends base
  getAccessNumber: ->
    mytext = $('p').filter(->$(this).text().match(/Accession Number/))
    myregexp = /Accession Number\s*:\s*([A-Z0-9]+)/m
    myregexp.exec(mytext.text())[1]
  getURL: ->
    accessNumber = @getAccessNumber()
    'http://mydocuments/standards/addWebData/DoDFile/'+accessNumber
  addLink: ->
    @createAlink(' 我的标准库',@getURL()).appendTo($('p')[1])

export default oai