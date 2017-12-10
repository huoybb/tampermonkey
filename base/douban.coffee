import { isbn10to13, isbn13to10 } from './isbn.coffee'
import base from './base.coffee'

dics = {
  book:{
    'ISBN':'ISBN'
    # '作品名':'title'
    '作者':'writer'
    '出版社':'publisher'
    '原作名':'original_title'
    '定价':'price'
    '装帧':'binding'
    '页数':'pages'
    '出版年':'year_published'
    '副标题':'subtitle'
    '丛书':'series'
    '译者':'translator'
    },
  music:{
    '表演者':'artist'
    '专辑类型':'album_type'
    '介质':'media'
    '发行时间':'year_published'
    '出版者':'publisher'
    '唱片数':'media_nums'
    '条型码':'barcode'    
  }
}

class douban extends base
  getbookinfo:->
    # 图书基本信息，从#info中获取
    dic = if location.href.match /music.douban.com/ then dics.music else dics.book
    
    result = {}
    info = $('#info').prop('innerHTML').split('<br>')
    # console.log info 
    
    for item,i in info
      # console.log $.trim(item) 
      # 第一次抽取
      field = $.trim($(item.replace(/^.*?(<span.*:<\/span>).*?$/,'$1')).text())
      content = $.trim(item.replace(/(<span.*:<\/span>)/,''))
      # console.log field,content
      # 修订 出现链接的时候
      if field.match /^.+:.+$/m
        temp = field.split(':')
        field = $.trim(temp[0])
        content = $.trim(temp[1])
      else 
        field = field.replace /(.+):/,'$1'
      # 修订 当出现多个作者的时候
      content = content.replace /\s+\/\s+/g,' / ' if content.match /.+\/.+/

      # 修订在音乐中，出现链接的情况
      if field.match /.+\s+.+/m
        temp = field.replace(/\s+/,':').split(':')
        field = $.trim(temp[0])
        content = $.trim(temp[1])
      # console.log field

      result[dic[field]] = content.replace('&nbsp;','') if dic[field]?   

      # console.log result[i]
    # console.log result
    # 图书书名
    result['title'] = $.trim($('h1').first().text())
    # 目前豆瓣上对本书的评分
    result['rating'] = $.trim($('.rating_wrap strong.rating_num').html())
    # 目前豆瓣上对本书打的标签
    tags = $.trim($('#db-tags-section>div.indent>span').text()).split(/\s+/)
    result['tags'] = tags if tags.length > 1 or tags[0] isnt ''

    #从图书链接获取相关信息,内嵌的一个函数
    getinfofrombookinof = (booklinks,attributes={})->
      attr = {html:'title',id:'doubanid'}
      $.extend(attr,attributes)
      books = []
      for book,index in booklinks
        books[index]={}
        books[index][attr['html']]=$.trim($(book).html())
        books[index][attr['id']] = $(book).attr('href').replace(/.*?([0-9]+)\//,'$1')
      books
    # 相关图书
    # console.log result
    rbooks = getinfofrombookinof($('#db-rec-section dd a')) 
    result['relatedbooks'] = rbooks if rbooks.length > 0
    # 本书的其他版本
    revbooks = getinfofrombookinof($('div.aside a').filter(-> $(this).attr('href').match(/book.douban.com\/subject\/[0-9]+\/$/)),{html:'publisher'})
    result['revisions'] = revbooks if revbooks.length>0
    result['doubanid'] = location.href.replace(/^.+\/([0-9]+)\//,'$1')
    # console.log result
    result
  addReviewlinks:(page)->
    reviews = if page is 'book' then $('#reviews h3') else $('h3')
    
    for review,index in  reviews
      [reviewid] = $('a',review).attr('href').match /[0-9]+/
      [doubanid] = location.href.match(/[0-9]+/)
      url = 'http://dn382/ZF1.5/book/doubanaddreview/doubanid/'+doubanid+'/review/'+reviewid
      @createAlink('-V',url,{class:'d2blink'}).appendTo($(review))
    @
  addReviewlinksEvent:->
    $('a.d2blink').click ->
      $(this).html('--下载中！')
      url = $(this).attr('href')+'?callback=?' #这里出现了问题，估计需要继续修改一下
      $.getJSON url,(data)=>
        if data.status is 'OK'
          text = '---下载完毕'
        else
          text = '---下载失败'
        $(this).html(text)
      false  
    @
  addSearchlinks:->
    # link = @appendLinks @getlinkarray(),$('<div id="slinks">').append($('<span>').attr(class:"pl").html('下载:'))
    $('#info').append @appendLinks $('<div id="slinks"> <span class="pl">下载:</span></div>'),@getlinkarray()
    @
  getlinkarray:->
    @info ?= @getbookinfo()
    keyword1 = @info['title']
    keyword1 = keyword1.replace(/[\u4e00-\u9fa5]+/g, '').replace(/\s+/g,' ').trim() if location.href.match /movie.douban.com/
    keyword2 = encodeURIComponent( keyword1 )
    keyword2 = keyword2.replace(/\(/g,'').replace(/\)/g,'') if location.href.match /movie.douban.com/
    $data = [
      { html: "Google", href: "https://www.google.com.hk/search?ie=UTF-8&q="+keyword1+" 下载 pdf" }
      { html:'百度',href:"http://www.baidu.com/s?wd=#{keyword1+" "+@info['writer']+" pdf 下载"}&rsv_spt=1&issp=1&f=8&rsv_bp=0&rsv_idx=2&ie=utf-8&tn=baiduhome_pg&rsv_enter=1&rsv_sug3=8&rsv_sug4=931&rsv_sug1=6&rsv_sug2=0&inputT=3551" }
      { html:'盘多多',href:'http://www.panduoduo.net/s/name/'+keyword1}
      # { html:'特百度',href:'http://www.tebaidu.com/search.asp?wd='+keyword1+'&so_md5key=483bce3f32dc1a3f949af6c0ca6b6ac2'}
      { html: "VeryCD", href: "http://www.verycd.com/search/folders/" + keyword2 }
      # { html: "新浪爱问",href:"http://ishare.iask.sina.com.cn/search.php?key="+keyword2+"&from=index&format="}
    ]
    if location.href.match /book.douban.com/
      $data = $data.concat [
        { html:'Amazon',href:"http://www.amazon.com/dp/#{isbn13to10(@info.ISBN)}"}
        { html:'深圳文献馆',href:'http://book.szdnet.org.cn/search?Field=1&channel=search&sw='+keyword2+'&edtype=&ecode=utf-8'}
        { html: "我的图书",href:"http://dn382/ZF1.5/book/doubanid/id/"+@info.doubanid}
      ]
    if location.href.match /movie.douban.com/
      $data = $data.concat [
        { html: "我的电影",href:"http://myphalcon2/movies/getdoubanmovie/"+@info.doubanid}
      ]
    $data

export default douban