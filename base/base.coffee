class base
  createAlink:(title,url,attr=null)->
    link = $('<a>')
      .html(title)
      .attr {
      href:url
      target:"_blank"
    }
    link.attr attr if attr isnt null
    link
  addLink: (url)-> @createAlink(' 下载',@getURL(url)).appendTo($('h1'))
  add:(url = null)->
    url = url || location.href
    return @addLink(url)
  # 这个函数需要继承者覆盖，怎么来实现这个呢？
  getURL: (url)-> url || location.href
  appendLinks:(appendTo,items)->
    for item,index in items
      @createAlink(item.html,item.href).appendTo(appendTo)
      appendTo.append ' / ' if index isnt items.length-1 
    appendTo
    
export default base