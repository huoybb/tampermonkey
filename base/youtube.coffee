import base from './base.coffee'
class youtube extends base
  getURL: (url)->
    url =  url || location.href
    url = @getMovieDownloadUrl(url) if @isMoviePage(url)
    url = @getListDownloadUrl(url) if @isListPage(url)
    url
#    url.replace(/(https:\/\/www.youtube.com)(.+)/mg, "http://www.ssyoutube.com$2");
#    url = 'http://en.savefrom.net/#url=' + url
  add:(url = null)->
    url = url || location.href
    @addListMovies() if @isListPage(url)
    return @addLink(url)
  addListMovies:->
    $('.pl-video-title a.pl-video-title-link').each (index,link)=>
      @createAlink(' 下载',@getMovieWithListDownloadUrl($(link).attr('href'))).appendTo($(link).parent())

  getMovieKey:(url)-> url.replace(/.+v=([^&]+).*/img, "$1")
  getListKey: (url)-> url.replace(/^[\s\S]+list=([^&]+)[\s\S]*$/img, "$1")
  getIndexKey: (url)-> url.replace(/^[\s\S]+index=([^&]+)[\s\S]*$/img, "$1")
  isMoviePage: (url)-> /https:\/\/www.youtube.com\/watch.+/im.test(url)
  isListPage:(url)-> /https:\/\/www.youtube.com\/playlist.+/im.test(url)
  getMovieDownloadUrl:(url)->'http://mytube/getYoutube/' + @getMovieKey(url)
  getMovieWithListDownloadUrl:(url)->'http://mytube/getYoutubeWithList/' + @getMovieKey(url) + '/' +@getListKey(url) + '/' + @getIndexKey(url)
  getListDownloadUrl:(url)->'http://mytube/getYoutubeList/' + @getListKey(url)

export default youtube