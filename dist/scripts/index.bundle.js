webpackJsonp([0],[
/* 0 */,
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_jquery__);

//закрытие модального окна
__WEBPACK_IMPORTED_MODULE_0_jquery___default()('.s-form-modal_close, .overlay').click(function () {
    __WEBPACK_IMPORTED_MODULE_0_jquery___default()('.s-form-modal, .popup-done, .overlay').css({'opacity': '0', 'visibility': 'hidden'});
    __WEBPACK_IMPORTED_MODULE_0_jquery___default()('.s-form-modal > .form-modal textarea').val('');

});
//показ модального окна
__WEBPACK_IMPORTED_MODULE_0_jquery___default()('.btn_main').click(function (e) {
    e.preventDefault();
    __WEBPACK_IMPORTED_MODULE_0_jquery___default()('.s-form-modal, .overlay').css({'opacity': '1', 'visibility': 'visible'});
});





/***/ }),
/* 2 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(2);




__webpack_require__(1);

/***/ })
],[3]);
//# sourceMappingURL=index.bundle.js.map