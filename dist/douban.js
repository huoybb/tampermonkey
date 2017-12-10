/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var base;

base = class base {
  createAlink(title, url, attr = null) {
    var link;
    link = $('<a>').html(title).attr({
      href: url,
      target: "_blank"
    });
    if (attr !== null) {
      link.attr(attr);
    }
    return link;
  }

  addLink(url) {
    return this.createAlink(' 下载', this.getURL(url)).appendTo($('h1'));
  }

  add(url = null) {
    url = url || location.href;
    return this.addLink(url);
  }

  // 这个函数需要继承者覆盖，怎么来实现这个呢？
  getURL(url) {
    return url || location.href;
  }

  appendLinks(appendTo, items) {
    var i, index, item, len;
    for (index = i = 0, len = items.length; i < len; index = ++i) {
      item = items[index];
      this.createAlink(item.html, item.href).appendTo(appendTo);
      if (index !== items.length - 1) {
        appendTo.append(' / ');
      }
    }
    return appendTo;
  }

};

/* harmony default export */ __webpack_exports__["a"] = (base);


/***/ }),

/***/ 2:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base_douban_coffee__ = __webpack_require__(21);
//--------说明-------------------
// 对以下url页面中的评论进行修订，下面同样适用于movie的页面
// 1、http://book.douban.com/subject/1048007/
// 2、http://book.douban.com/subject/1048007/reviews
// 3、http://book.douban.com/subject/1048007/reviews?score=&start=50
//--------------------------------------------------------------------


// import getDOC from '../base/getDOC.coffee'
if (location.host === 'dn382') {
  this.douban = __WEBPACK_IMPORTED_MODULE_0__base_douban_coffee__["a" /* default */];
} else {
  $(function() {
    var db;
    db = new __WEBPACK_IMPORTED_MODULE_0__base_douban_coffee__["a" /* default */];
    if (location.href.match(/reviews/)) {
      return db.addReviewlinks('reviews').addReviewlinksEvent();
    } else {
      db.addSearchlinks('book'); //增加搜索链接
      return console.log(db.info);
    }
  });
}

// getDOC 'http://book.douban.com/subject/1885221/',(doc)->
//   title = $('h1',doc).text()
//   console.log '测试3'


/***/ }),

/***/ 21:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__isbn_coffee__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__base_coffee__ = __webpack_require__(0);
var dics, douban;





dics = {
  book: {
    'ISBN': 'ISBN',
    // '作品名':'title'
    '作者': 'writer',
    '出版社': 'publisher',
    '原作名': 'original_title',
    '定价': 'price',
    '装帧': 'binding',
    '页数': 'pages',
    '出版年': 'year_published',
    '副标题': 'subtitle',
    '丛书': 'series',
    '译者': 'translator'
  },
  music: {
    '表演者': 'artist',
    '专辑类型': 'album_type',
    '介质': 'media',
    '发行时间': 'year_published',
    '出版者': 'publisher',
    '唱片数': 'media_nums',
    '条型码': 'barcode'
  }
};

douban = class douban extends __WEBPACK_IMPORTED_MODULE_1__base_coffee__["a" /* default */] {
  getbookinfo() {
    var content, dic, field, getinfofrombookinof, i, info, item, j, len, rbooks, result, revbooks, tags, temp;
    // 图书基本信息，从#info中获取
    dic = location.href.match(/music.douban.com/) ? dics.music : dics.book;
    result = {};
    info = $('#info').prop('innerHTML').split('<br>');
    // console.log info 
    for (i = j = 0, len = info.length; j < len; i = ++j) {
      item = info[i];
      // console.log $.trim(item) 
      // 第一次抽取
      field = $.trim($(item.replace(/^.*?(<span.*:<\/span>).*?$/, '$1')).text());
      content = $.trim(item.replace(/(<span.*:<\/span>)/, ''));
      // console.log field,content
      // 修订 出现链接的时候
      if (field.match(/^.+:.+$/m)) {
        temp = field.split(':');
        field = $.trim(temp[0]);
        content = $.trim(temp[1]);
      } else {
        field = field.replace(/(.+):/, '$1');
      }
      if (content.match(/.+\/.+/)) {
        // 修订 当出现多个作者的时候
        content = content.replace(/\s+\/\s+/g, ' / ');
      }
      // 修订在音乐中，出现链接的情况
      if (field.match(/.+\s+.+/m)) {
        temp = field.replace(/\s+/, ':').split(':');
        field = $.trim(temp[0]);
        content = $.trim(temp[1]);
      }
      if (dic[field] != null) {
        // console.log field
        result[dic[field]] = content.replace('&nbsp;', '');
      }
    }
    
    // console.log result[i]
    // console.log result
    // 图书书名
    result['title'] = $.trim($('h1').first().text());
    // 目前豆瓣上对本书的评分
    result['rating'] = $.trim($('.rating_wrap strong.rating_num').html());
    // 目前豆瓣上对本书打的标签
    tags = $.trim($('#db-tags-section>div.indent>span').text()).split(/\s+/);
    if (tags.length > 1 || tags[0] !== '') {
      result['tags'] = tags;
    }
    //从图书链接获取相关信息,内嵌的一个函数
    getinfofrombookinof = function(booklinks, attributes = {}) {
      var attr, book, books, index, k, len1;
      attr = {
        html: 'title',
        id: 'doubanid'
      };
      $.extend(attr, attributes);
      books = [];
      for (index = k = 0, len1 = booklinks.length; k < len1; index = ++k) {
        book = booklinks[index];
        books[index] = {};
        books[index][attr['html']] = $.trim($(book).html());
        books[index][attr['id']] = $(book).attr('href').replace(/.*?([0-9]+)\//, '$1');
      }
      return books;
    };
    // 相关图书
    // console.log result
    rbooks = getinfofrombookinof($('#db-rec-section dd a'));
    if (rbooks.length > 0) {
      result['relatedbooks'] = rbooks;
    }
    // 本书的其他版本
    revbooks = getinfofrombookinof($('div.aside a').filter(function() {
      return $(this).attr('href').match(/book.douban.com\/subject\/[0-9]+\/$/);
    }), {
      html: 'publisher'
    });
    if (revbooks.length > 0) {
      result['revisions'] = revbooks;
    }
    result['doubanid'] = location.href.replace(/^.+\/([0-9]+)\//, '$1');
    // console.log result
    return result;
  }

  addReviewlinks(page) {
    var doubanid, index, j, len, review, reviewid, reviews, url;
    reviews = page === 'book' ? $('#reviews h3') : $('h3');
    for (index = j = 0, len = reviews.length; j < len; index = ++j) {
      review = reviews[index];
      [reviewid] = $('a', review).attr('href').match(/[0-9]+/);
      [doubanid] = location.href.match(/[0-9]+/);
      url = 'http://dn382/ZF1.5/book/doubanaddreview/doubanid/' + doubanid + '/review/' + reviewid;
      this.createAlink('-V', url, {
        class: 'd2blink'
      }).appendTo($(review));
    }
    return this;
  }

  addReviewlinksEvent() {
    $('a.d2blink').click(function() {
      var url;
      $(this).html('--下载中！');
      url = $(this).attr('href') + '?callback=?'; //这里出现了问题，估计需要继续修改一下
      $.getJSON(url, (data) => {
        var text;
        if (data.status === 'OK') {
          text = '---下载完毕';
        } else {
          text = '---下载失败';
        }
        return $(this).html(text);
      });
      return false;
    });
    return this;
  }

  addSearchlinks() {
    // link = @appendLinks @getlinkarray(),$('<div id="slinks">').append($('<span>').attr(class:"pl").html('下载:'))
    $('#info').append(this.appendLinks($('<div id="slinks"> <span class="pl">下载:</span></div>'), this.getlinkarray()));
    return this;
  }

  getlinkarray() {
    var $data, keyword1, keyword2;
    if (this.info == null) {
      this.info = this.getbookinfo();
    }
    keyword1 = this.info['title'];
    if (location.href.match(/movie.douban.com/)) {
      keyword1 = keyword1.replace(/[\u4e00-\u9fa5]+/g, '').replace(/\s+/g, ' ').trim();
    }
    keyword2 = encodeURIComponent(keyword1);
    if (location.href.match(/movie.douban.com/)) {
      keyword2 = keyword2.replace(/\(/g, '').replace(/\)/g, '');
    }
    $data = [
      {
        html: "Google",
        href: "https://www.google.com.hk/search?ie=UTF-8&q=" + keyword1 + " 下载 pdf"
      },
      {
        html: '百度',
        href: `http://www.baidu.com/s?wd=${keyword1 + " " + this.info['writer'] + " pdf 下载"}&rsv_spt=1&issp=1&f=8&rsv_bp=0&rsv_idx=2&ie=utf-8&tn=baiduhome_pg&rsv_enter=1&rsv_sug3=8&rsv_sug4=931&rsv_sug1=6&rsv_sug2=0&inputT=3551`
      },
      {
        html: '盘多多',
        href: 'http://www.panduoduo.net/s/name/' + keyword1
      },
      {
        // { html:'特百度',href:'http://www.tebaidu.com/search.asp?wd='+keyword1+'&so_md5key=483bce3f32dc1a3f949af6c0ca6b6ac2'}
        html: "VeryCD",
        href: "http://www.verycd.com/search/folders/" + keyword2
      }
    ];
    // { html: "新浪爱问",href:"http://ishare.iask.sina.com.cn/search.php?key="+keyword2+"&from=index&format="}
    if (location.href.match(/book.douban.com/)) {
      $data = $data.concat([
        {
          html: 'Amazon',
          href: `http://www.amazon.com/dp/${Object(__WEBPACK_IMPORTED_MODULE_0__isbn_coffee__["a" /* isbn13to10 */])(this.info.ISBN)}`
        },
        {
          html: '深圳文献馆',
          href: 'http://book.szdnet.org.cn/search?Field=1&channel=search&sw=' + keyword2 + '&edtype=&ecode=utf-8'
        },
        {
          html: "我的图书",
          href: "http://dn382/ZF1.5/book/doubanid/id/" + this.info.doubanid
        }
      ]);
    }
    if (location.href.match(/movie.douban.com/)) {
      $data = $data.concat([
        {
          html: "我的电影",
          href: "http://myphalcon2/movies/getdoubanmovie/" + this.info.doubanid
        }
      ]);
    }
    return $data;
  }

};

/* harmony default export */ __webpack_exports__["a"] = (douban);


/***/ }),

/***/ 22:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export isbn10to13 */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return isbn13to10; });
var isbn10to13, isbn13to10, mod10, mod13;

mod10 = function(n) {
  var chars, digit, i, key, len, total, value;
  n = n.replace(/-/, '');
  chars = n.split('');
  // console.log chars
  total = 0;
  for (key = i = 0, len = chars.length; i < len; key = ++i) {
    value = chars[key];
    total += parseInt(value) * (10 - key);
  }
  digit = (11 - total % 11) % 11;
  if (digit === 10) {
    return 'X';
  } else {
    return digit;
  }
};

mod13 = function(n) {
  var chars, even, i, key, len, odd, total, value;
  n = n.replace(/-/, '');
  chars = n.split('');
  even = [];
  odd = [];
  for (key = i = 0, len = chars.length; i < len; key = ++i) {
    value = chars[key];
    (parseInt(key) % 2 === 1 ? even : odd).push(parseInt(value));
  }
  total = even.reduce(function(x, y) {
    return x + y;
  }) * 3 + odd.reduce(function(x, y) {
    return x + y;
  });
  return ((Math.floor(total / 10) + 1) * 10 - total) % 10;
};

isbn13to10 = function(num) {
  var num9;
  if (num == null) {
    return;
  }
  num = num.replace(/-/, '');
  num9 = num.substr(3, 9);
  return num9 + mod10(num9);
};

isbn10to13 = function(num) {
  var num9;
  if (num == null) {
    return;
  }
  num = num.replace(/-/, '');
  num9 = num.substr(0, 9);
  return '978' + num9 + mod13('978' + num9);
};




/***/ })

/******/ });