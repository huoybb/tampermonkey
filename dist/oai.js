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
/******/ 	return __webpack_require__(__webpack_require__.s = 9);
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

/***/ 10:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base_coffee__ = __webpack_require__(0);
var oai;



oai = class oai extends __WEBPACK_IMPORTED_MODULE_0__base_coffee__["a" /* default */] {
  getAccessNumber() {
    var myregexp, mytext;
    mytext = $('p').filter(function() {
      return $(this).text().match(/Accession Number/);
    });
    myregexp = /Accession Number\s*:\s*([A-Z0-9]+)/m;
    return myregexp.exec(mytext.text())[1];
  }

  getURL() {
    var accessNumber;
    accessNumber = this.getAccessNumber();
    return 'http://mydocuments/standards/addWebData/DoDFile/' + accessNumber;
  }

  addLink() {
    return this.createAlink(' 我的标准库', this.getURL()).appendTo($('p')[1]);
  }

};

/* harmony default export */ __webpack_exports__["a"] = (oai);


/***/ }),

/***/ 9:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base_oai_coffee__ = __webpack_require__(10);


$(function() {
  var o;
  o = new __WEBPACK_IMPORTED_MODULE_0__base_oai_coffee__["a" /* default */];
  return o.addLink();
});


/***/ })

/******/ });