#--------说明-------------------
# 对以下url页面中的评论进行修订，下面同样适用于movie的页面
# 1、http://book.douban.com/subject/1048007/
# 2、http://book.douban.com/subject/1048007/reviews
# 3、http://book.douban.com/subject/1048007/reviews?score=&start=50
#--------------------------------------------------------------------
import douban from '../base/douban.coffee'
# import getDOC from '../base/getDOC.coffee'

if location.host is 'dn382'
  @douban = douban
else
  $ ->
    db = new douban
    if location.href.match /reviews/
      db.addReviewlinks('reviews').addReviewlinksEvent()
    else
      db.addSearchlinks('book')   #增加搜索链接
      console.log db.info
      # getDOC 'http://book.douban.com/subject/1885221/',(doc)->
      #   title = $('h1',doc).text()
      #   console.log '测试3'

