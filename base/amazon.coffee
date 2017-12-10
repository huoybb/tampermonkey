import base from './base.coffee'

class amazon  extends base
    addLink: (url)-> @createAlink(' 豆瓣',@getURL(url)).appendTo($('h1'))
    getURL: (url)->
        ISBN = $('#isbn_feature_div .a-row').first().find('span').last().text()
        $.trim('https://book.douban.com/isbn/'+ISBN.replace(/-|\s+/g,''))

export default amazon