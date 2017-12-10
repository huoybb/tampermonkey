
# 这个需要tempermonkey中开启GM_xmlhttpRequest
# 获取远程网页的内容，用了jQuery的Deferred，后面使用的时候使用一个promise	
getDOC = (url,data)->
	deferred = $.Deferred()
	obj = 
		method:if data? then 'POST' else 'GET'
		url:url
		headers:
			'User-agent':window.navigator.userAgent
			'Content-type':if data? then 'application/x-www-form-urlencoded' else null
		onload:(responseDetail)->
			doc = ''
			if responseDetail.status is 200
				# for firefox
				doc = new DOMParser().parseFromString(responseDetail.responseText,'text/html')
				# for Chrome
				if doc is undefined
					doc = document.implementation.createHTMLDocument("")
					doc.querySelector('html').innerHTML = responseText
			else deferred.reject(responseDetail.status)
			deferred.resolve(doc)
	GM_xmlhttpRequest obj
	deferred.promise()
wait = (timeout)->
	deferred = $.Deferred()
	setTimeout(deferred.resolve,timeout)
	deferred.promise()

export default getDOC