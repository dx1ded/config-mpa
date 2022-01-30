/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/gulp-avif-css/plugin.js":
/*!**********************************************!*\
  !*** ./node_modules/gulp-avif-css/plugin.js ***!
  \**********************************************/
/***/ (() => {

const detect=function(A=[]){var t=[{type:"webp",url:"data:image/webp;base64,UklGRhwAAABXRUJQVlA4TBAAAAAvAAAAEAfQpv5HmQMR0f8A"},{type:"avif",url:"data:image/avif;base64,AAAAHGZ0eXBtaWYxAAAAAG1pZjFhdmlmbWlhZgAAAPFtZXRhAAAAAAAAACFoZGxyAAAAAAAAAABwaWN0AAAAAAAAAAAAAAAAAAAAAA5waXRtAAAAAAABAAAAHmlsb2MAAAAABEAAAQABAAAAAAEVAAEAAAAeAAAAKGlpbmYAAAAAAAEAAAAaaW5mZQIAAAAAAQAAYXYwMUltYWdlAAAAAHBpcHJwAAAAUWlwY28AAAAUaXNwZQAAAAAAAAABAAAAAQAAABBwYXNwAAAAAQAAAAEAAAAVYXYxQ4EgAAAKBzgABpAQ0AIAAAAQcGl4aQAAAAADCAgIAAAAF2lwbWEAAAAAAAAAAQABBAECg4QAAAAmbWRhdAoHOAAGkBDQAjITFkAAAEgAAAB5TNw9UxdXU6F6oA == "}].concat(A),e={},o=[],a=document.querySelector('html');return t.map(((A,t)=>{!function(A){let t=new Image;t.src=A.url,t.onerror=function(t){var s=new Set(a.getAttribute("class")?a.getAttribute("class").split(" "):[]);o.push(new Promise((function(t,o){e[A.type.toLowerCase()]=!1,t({[A.type.toLowerCase()]:!1})}))),s.add("no-"+A.type.toLowerCase()),a.setAttribute("class",[...s].join(" ")),console.log(A.type.toUpperCase()+" not supported in this browser",t)},t.onload=function(t){var s=new Set(a.getAttribute("class")?a.getAttribute("class").split(" "):[]);o.push(new Promise((function(t,o){e[A.type.toLowerCase()]=!0,t({[A.type.toLowerCase()]:!0})}))),s.add(A.type.toLowerCase()),a.setAttribute("class",[...s].join(" ")),console.log(A.type.toUpperCase()+" supported in this browser")}}(A)})),Promise.all(o).then((function(){return e}))};detect()


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!***********************************!*\
  !*** ./src/scripts/_imageTest.js ***!
  \***********************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var gulp_avif_css_plugin__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! gulp-avif-css/plugin */ "./node_modules/gulp-avif-css/plugin.js");
/* harmony import */ var gulp_avif_css_plugin__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(gulp_avif_css_plugin__WEBPACK_IMPORTED_MODULE_0__);

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiX2ltYWdlVGVzdC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSw0QkFBNEIsUUFBUSxpQ0FBaUMseURBQXlELEVBQUUsaUNBQWlDLHVhQUF1YSxnQkFBZ0IsdUNBQXVDLHNCQUFzQixhQUFhLGdCQUFnQixrQ0FBa0MsNkVBQTZFLGtDQUFrQyw4QkFBOEIsMEJBQTBCLEVBQUUsb0pBQW9KLHNCQUFzQiw2RUFBNkUsa0NBQWtDLDhCQUE4QiwwQkFBMEIsRUFBRSx5SUFBeUksSUFBSSxtQ0FBbUMsU0FBUyxJQUFJOzs7Ozs7O1VDQTc0QztVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsaUNBQWlDLFdBQVc7V0FDNUM7V0FDQTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RCIsInNvdXJjZXMiOlsid2VicGFjazovL3Byb2plY3QtbmFtZS8uL25vZGVfbW9kdWxlcy9ndWxwLWF2aWYtY3NzL3BsdWdpbi5qcyIsIndlYnBhY2s6Ly9wcm9qZWN0LW5hbWUvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vcHJvamVjdC1uYW1lL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL3Byb2plY3QtbmFtZS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vcHJvamVjdC1uYW1lL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vcHJvamVjdC1uYW1lL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vcHJvamVjdC1uYW1lLy4vc3JjL3NjcmlwdHMvX2ltYWdlVGVzdC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBkZXRlY3Q9ZnVuY3Rpb24oQT1bXSl7dmFyIHQ9W3t0eXBlOlwid2VicFwiLHVybDpcImRhdGE6aW1hZ2Uvd2VicDtiYXNlNjQsVWtsR1Jod0FBQUJYUlVKUVZsQTRUQkFBQUFBdkFBQUFFQWZRcHY1SG1RTVIwZjhBXCJ9LHt0eXBlOlwiYXZpZlwiLHVybDpcImRhdGE6aW1hZ2UvYXZpZjtiYXNlNjQsQUFBQUhHWjBlWEJ0YVdZeEFBQUFBRzFwWmpGaGRtbG1iV2xoWmdBQUFQRnRaWFJoQUFBQUFBQUFBQ0ZvWkd4eUFBQUFBQUFBQUFCd2FXTjBBQUFBQUFBQUFBQUFBQUFBQUFBQUFBNXdhWFJ0QUFBQUFBQUJBQUFBSG1sc2IyTUFBQUFBQkVBQUFRQUJBQUFBQUFFVkFBRUFBQUFlQUFBQUtHbHBibVlBQUFBQUFBRUFBQUFhYVc1bVpRSUFBQUFBQVFBQVlYWXdNVWx0WVdkbEFBQUFBSEJwY0hKd0FBQUFVV2x3WTI4QUFBQVVhWE53WlFBQUFBQUFBQUFCQUFBQUFRQUFBQkJ3WVhOd0FBQUFBUUFBQUFFQUFBQVZZWFl4UTRFZ0FBQUtCemdBQnBBUTBBSUFBQUFRY0dsNGFRQUFBQUFEQ0FnSUFBQUFGMmx3YldFQUFBQUFBQUFBQVFBQkJBRUNnNFFBQUFBbWJXUmhkQW9IT0FBR2tCRFFBaklURmtBQUFFZ0FBQUI1VE53OVV4ZFhVNkY2b0EgPT0gXCJ9XS5jb25jYXQoQSksZT17fSxvPVtdLGE9ZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaHRtbCcpO3JldHVybiB0Lm1hcCgoKEEsdCk9PnshZnVuY3Rpb24oQSl7bGV0IHQ9bmV3IEltYWdlO3Quc3JjPUEudXJsLHQub25lcnJvcj1mdW5jdGlvbih0KXt2YXIgcz1uZXcgU2V0KGEuZ2V0QXR0cmlidXRlKFwiY2xhc3NcIik/YS5nZXRBdHRyaWJ1dGUoXCJjbGFzc1wiKS5zcGxpdChcIiBcIik6W10pO28ucHVzaChuZXcgUHJvbWlzZSgoZnVuY3Rpb24odCxvKXtlW0EudHlwZS50b0xvd2VyQ2FzZSgpXT0hMSx0KHtbQS50eXBlLnRvTG93ZXJDYXNlKCldOiExfSl9KSkpLHMuYWRkKFwibm8tXCIrQS50eXBlLnRvTG93ZXJDYXNlKCkpLGEuc2V0QXR0cmlidXRlKFwiY2xhc3NcIixbLi4uc10uam9pbihcIiBcIikpLGNvbnNvbGUubG9nKEEudHlwZS50b1VwcGVyQ2FzZSgpK1wiIG5vdCBzdXBwb3J0ZWQgaW4gdGhpcyBicm93c2VyXCIsdCl9LHQub25sb2FkPWZ1bmN0aW9uKHQpe3ZhciBzPW5ldyBTZXQoYS5nZXRBdHRyaWJ1dGUoXCJjbGFzc1wiKT9hLmdldEF0dHJpYnV0ZShcImNsYXNzXCIpLnNwbGl0KFwiIFwiKTpbXSk7by5wdXNoKG5ldyBQcm9taXNlKChmdW5jdGlvbih0LG8pe2VbQS50eXBlLnRvTG93ZXJDYXNlKCldPSEwLHQoe1tBLnR5cGUudG9Mb3dlckNhc2UoKV06ITB9KX0pKSkscy5hZGQoQS50eXBlLnRvTG93ZXJDYXNlKCkpLGEuc2V0QXR0cmlidXRlKFwiY2xhc3NcIixbLi4uc10uam9pbihcIiBcIikpLGNvbnNvbGUubG9nKEEudHlwZS50b1VwcGVyQ2FzZSgpK1wiIHN1cHBvcnRlZCBpbiB0aGlzIGJyb3dzZXJcIil9fShBKX0pKSxQcm9taXNlLmFsbChvKS50aGVuKChmdW5jdGlvbigpe3JldHVybiBlfSkpfTtkZXRlY3QoKVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCAnZ3VscC1hdmlmLWNzcy9wbHVnaW4nXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=