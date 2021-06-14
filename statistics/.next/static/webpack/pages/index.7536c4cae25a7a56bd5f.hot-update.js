/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("pages/index",{

/***/ "./pages/index.js":
/*!************************!*\
  !*** ./pages/index.js ***!
  \************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ Home; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/head */ \"./node_modules/next/head.js\");\n/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_head__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/image */ \"./node_modules/next/image.js\");\n/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_image__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _packages_locales_HomePT__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../packages/locales/HomePT */ \"./packages/locales/HomePT.js\");\n/* harmony import */ var _components_shared_Tabs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/shared/Tabs */ \"./components/shared/Tabs.js\");\n/* harmony import */ var _components_shared_HeaderLayout__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../components/shared/HeaderLayout */ \"./components/shared/HeaderLayout.js\");\n/* harmony import */ var _components_shared_TabContent__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../components/shared/TabContent */ \"./components/shared/TabContent.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_7__);\n/* harmony import */ var _components_home_Status__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../components/home/Status */ \"./components/home/Status.js\");\n/* harmony import */ var _components_home_Overview__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../components/home/Overview */ \"./components/home/Overview.js\");\n/* harmony import */ var _components_home_Usage__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../components/home/Usage */ \"./components/home/Usage.js\");\n/* module decorator */ module = __webpack_require__.hmd(module);\n\n\nvar _jsxFileName = \"/opt/desenv/SIS-AEB-FRONTEND/statistics/pages/index.js\",\n    _s = $RefreshSig$();\n\n\n\n\n\n\n\n\n\n\n\n\n\nfunction Home() {\n  _s();\n\n  var lang = _packages_locales_HomePT__WEBPACK_IMPORTED_MODULE_3__.default;\n\n  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_7__.useState)(0),\n      openTab = _useState[0],\n      setOpenTab = _useState[1];\n\n  function getTitle() {\n    var value = null;\n\n    switch (openTab) {\n      case 0:\n        {\n          value = lang.status;\n          break;\n        }\n\n      case 1:\n        {\n          value = lang.overview;\n          break;\n        }\n\n      case 2:\n        {\n          value = lang.usage;\n          break;\n        }\n\n      default:\n        break;\n    }\n\n    return value;\n  }\n\n  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n    style: {\n      display: 'flex'\n    },\n    children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_shared_Tabs__WEBPACK_IMPORTED_MODULE_4__.default, {\n      buttons: [{\n        key: 0,\n        value: lang.status\n      }, {\n        key: 1,\n        value: lang.overview\n      }, {\n        key: 2,\n        value: lang.usage\n      }],\n      setOpenTab: setOpenTab,\n      openTab: openTab\n    }, void 0, false, {\n      fileName: _jsxFileName,\n      lineNumber: 41,\n      columnNumber: 13\n    }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n      style: {\n        width: 'calc(100% - 220px)',\n        marginLeft: 'auto',\n        overflowY: 'hidden'\n      },\n      children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_shared_HeaderLayout__WEBPACK_IMPORTED_MODULE_5__.default, {\n        width: '95%',\n        title: lang.title,\n        pageTitle: getTitle()\n      }, void 0, false, {\n        fileName: _jsxFileName,\n        lineNumber: 62,\n        columnNumber: 17\n      }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_shared_TabContent__WEBPACK_IMPORTED_MODULE_6__.default, {\n        openTab: openTab,\n        tabs: [{\n          buttonKey: 0,\n          value: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_home_Status__WEBPACK_IMPORTED_MODULE_8__.default, {}, void 0, false, {\n            fileName: _jsxFileName,\n            lineNumber: 77,\n            columnNumber: 36\n          }, this)\n        }, {\n          buttonKey: 1,\n          value: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_home_Overview__WEBPACK_IMPORTED_MODULE_9__.default, {}, void 0, false, {\n            fileName: _jsxFileName,\n            lineNumber: 81,\n            columnNumber: 36\n          }, this)\n        }, {\n          buttonKey: 2,\n          value: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_home_Usage__WEBPACK_IMPORTED_MODULE_10__.default, {}, void 0, false, {\n            fileName: _jsxFileName,\n            lineNumber: 85,\n            columnNumber: 36\n          }, this)\n        }]\n      }, void 0, false, {\n        fileName: _jsxFileName,\n        lineNumber: 71,\n        columnNumber: 17\n      }, this)]\n    }, void 0, true, {\n      fileName: _jsxFileName,\n      lineNumber: 61,\n      columnNumber: 13\n    }, this)]\n  }, void 0, true, {\n    fileName: _jsxFileName,\n    lineNumber: 39,\n    columnNumber: 9\n  }, this);\n}\n\n_s(Home, \"N8UvEzdUy6Tylqd/E+YndHP2Ouo=\");\n\n_c = Home;\n\nvar _c;\n\n$RefreshReg$(_c, \"Home\");\n\n;\n    var _a, _b;\n    // Legacy CSS implementations will `eval` browser code in a Node.js context\n    // to extract CSS. For backwards compatibility, we need to check we're in a\n    // browser context before continuing.\n    if (typeof self !== 'undefined' &&\n        // AMP / No-JS mode does not inject these helpers:\n        '$RefreshHelpers$' in self) {\n        var currentExports = module.__proto__.exports;\n        var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n        // This cannot happen in MainTemplate because the exports mismatch between\n        // templating and execution.\n        self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n        // A module can be accepted automatically based on its exports, e.g. when\n        // it is a Refresh Boundary.\n        if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n            // Save the previous exports on update so we can compare the boundary\n            // signatures.\n            module.hot.dispose(function (data) {\n                data.prevExports = currentExports;\n            });\n            // Unconditionally accept an update to this module, we'll check if it's\n            // still a Refresh Boundary later.\n            module.hot.accept();\n            // This field is set when the previous version of this module was a\n            // Refresh Boundary, letting us know we need to check for invalidation or\n            // enqueue an update.\n            if (prevExports !== null) {\n                // A boundary can become ineligible if its exports are incompatible\n                // with the previous exports.\n                //\n                // For example, if you add/remove/change exports, we'll want to\n                // re-execute the importing modules, and force those components to\n                // re-render. Similarly, if you convert a class component to a\n                // function, we want to invalidate the boundary.\n                if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                    module.hot.invalidate();\n                }\n                else {\n                    self.$RefreshHelpers$.scheduleUpdate();\n                }\n            }\n        }\n        else {\n            // Since we just executed the code for the module, it's possible that the\n            // new exports made it ineligible for being a boundary.\n            // We only care about the case when we were _previously_ a boundary,\n            // because we already accepted this update (accidental side effect).\n            var isNoLongerABoundary = prevExports !== null;\n            if (isNoLongerABoundary) {\n                module.hot.invalidate();\n            }\n        }\n    }\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vcGFnZXMvaW5kZXguanM/NDRkOCJdLCJuYW1lcyI6WyJIb21lIiwibGFuZyIsIkhvbWVQVCIsInVzZVN0YXRlIiwib3BlblRhYiIsInNldE9wZW5UYWIiLCJnZXRUaXRsZSIsInZhbHVlIiwic3RhdHVzIiwib3ZlcnZpZXciLCJ1c2FnZSIsImRpc3BsYXkiLCJrZXkiLCJ3aWR0aCIsIm1hcmdpbkxlZnQiLCJvdmVyZmxvd1kiLCJ0aXRsZSIsImJ1dHRvbktleSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVlLFNBQVNBLElBQVQsR0FBZ0I7QUFBQTs7QUFDM0IsTUFBTUMsSUFBSSxHQUFHQyw2REFBYjs7QUFEMkIsa0JBRUdDLCtDQUFRLENBQUMsQ0FBRCxDQUZYO0FBQUEsTUFFcEJDLE9BRm9CO0FBQUEsTUFFWEMsVUFGVzs7QUFJM0IsV0FBU0MsUUFBVCxHQUFtQjtBQUNmLFFBQUlDLEtBQUssR0FBRyxJQUFaOztBQUNBLFlBQVFILE9BQVI7QUFDSSxXQUFLLENBQUw7QUFBUTtBQUNKRyxlQUFLLEdBQUdOLElBQUksQ0FBQ08sTUFBYjtBQUNBO0FBQ0g7O0FBQ0QsV0FBSyxDQUFMO0FBQVE7QUFDSkQsZUFBSyxHQUFHTixJQUFJLENBQUNRLFFBQWI7QUFDQTtBQUNIOztBQUNELFdBQUssQ0FBTDtBQUFRO0FBQ0pGLGVBQUssR0FBR04sSUFBSSxDQUFDUyxLQUFiO0FBQ0E7QUFDSDs7QUFDRDtBQUNJO0FBZFI7O0FBZ0JBLFdBQU9ILEtBQVA7QUFDSDs7QUFDRCxzQkFDSTtBQUFLLFNBQUssRUFBRTtBQUFDSSxhQUFPLEVBQUU7QUFBVixLQUFaO0FBQUEsNEJBRUksOERBQUMsNERBQUQ7QUFDSSxhQUFPLEVBQUUsQ0FDTDtBQUNJQyxXQUFHLEVBQUUsQ0FEVDtBQUVJTCxhQUFLLEVBQUVOLElBQUksQ0FBQ087QUFGaEIsT0FESyxFQUtMO0FBQ0lJLFdBQUcsRUFBRSxDQURUO0FBRUlMLGFBQUssRUFBRU4sSUFBSSxDQUFDUTtBQUZoQixPQUxLLEVBU0w7QUFDSUcsV0FBRyxFQUFFLENBRFQ7QUFFSUwsYUFBSyxFQUFFTixJQUFJLENBQUNTO0FBRmhCLE9BVEssQ0FEYjtBQWdCSSxnQkFBVSxFQUFFTCxVQWhCaEI7QUFpQkksYUFBTyxFQUFFRDtBQWpCYjtBQUFBO0FBQUE7QUFBQTtBQUFBLFlBRkosZUFzQkk7QUFBSyxXQUFLLEVBQUU7QUFBQ1MsYUFBSyxFQUFFLG9CQUFSO0FBQThCQyxrQkFBVSxFQUFFLE1BQTFDO0FBQWtEQyxpQkFBUyxFQUFFO0FBQTdELE9BQVo7QUFBQSw4QkFDSSw4REFBQyxvRUFBRDtBQUNJLGFBQUssRUFBRSxLQURYO0FBRUksYUFBSyxFQUNEZCxJQUFJLENBQUNlLEtBSGI7QUFLSSxpQkFBUyxFQUNMVixRQUFRO0FBTmhCO0FBQUE7QUFBQTtBQUFBO0FBQUEsY0FESixlQVVJLDhEQUFDLGtFQUFEO0FBQ0ksZUFBTyxFQUFFRixPQURiO0FBR0ksWUFBSSxFQUFFLENBQ0Y7QUFDSWEsbUJBQVMsRUFBRSxDQURmO0FBRUlWLGVBQUssZUFBRSw4REFBQyw0REFBRDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBRlgsU0FERSxFQUtGO0FBQ0lVLG1CQUFTLEVBQUUsQ0FEZjtBQUVJVixlQUFLLGVBQUUsOERBQUMsOERBQUQ7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUZYLFNBTEUsRUFTRjtBQUNJVSxtQkFBUyxFQUFFLENBRGY7QUFFSVYsZUFBSyxlQUFFLDhEQUFDLDREQUFEO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFGWCxTQVRFO0FBSFY7QUFBQTtBQUFBO0FBQUE7QUFBQSxjQVZKO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxZQXRCSjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsVUFESjtBQXVESDs7R0EvRXVCUCxJOztLQUFBQSxJIiwiZmlsZSI6Ii4vcGFnZXMvaW5kZXguanMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgSGVhZCBmcm9tICduZXh0L2hlYWQnXG5pbXBvcnQgSW1hZ2UgZnJvbSAnbmV4dC9pbWFnZSdcbmltcG9ydCBzaGFyZWQgZnJvbSAnLi4vc3R5bGVzL1NoYXJlZC5tb2R1bGUuY3NzJ1xuaW1wb3J0IEhvbWVQVCBmcm9tIFwiLi4vcGFja2FnZXMvbG9jYWxlcy9Ib21lUFRcIjtcbmltcG9ydCBUYWJzIGZyb20gJy4uL2NvbXBvbmVudHMvc2hhcmVkL1RhYnMnXG5pbXBvcnQgSGVhZGVyTGF5b3V0IGZyb20gXCIuLi9jb21wb25lbnRzL3NoYXJlZC9IZWFkZXJMYXlvdXRcIjtcbmltcG9ydCBUYWJDb250ZW50IGZyb20gXCIuLi9jb21wb25lbnRzL3NoYXJlZC9UYWJDb250ZW50XCI7XG5pbXBvcnQge3VzZVN0YXRlfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBTdGF0dXMgZnJvbSBcIi4uL2NvbXBvbmVudHMvaG9tZS9TdGF0dXNcIjtcbmltcG9ydCBPdmVydmlldyBmcm9tIFwiLi4vY29tcG9uZW50cy9ob21lL092ZXJ2aWV3XCI7XG5pbXBvcnQgVXNhZ2UgZnJvbSBcIi4uL2NvbXBvbmVudHMvaG9tZS9Vc2FnZVwiO1xuaW1wb3J0IHticm93bn0gZnJvbSBcIkBtYXRlcmlhbC11aS9jb3JlL2NvbG9yc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBIb21lKCkge1xuICAgIGNvbnN0IGxhbmcgPSBIb21lUFRcbiAgICBjb25zdCBbb3BlblRhYiwgc2V0T3BlblRhYl0gPSB1c2VTdGF0ZSgwKVxuXG4gICAgZnVuY3Rpb24gZ2V0VGl0bGUoKXtcbiAgICAgICAgbGV0IHZhbHVlID0gbnVsbFxuICAgICAgICBzd2l0Y2ggKG9wZW5UYWIpIHtcbiAgICAgICAgICAgIGNhc2UgMDoge1xuICAgICAgICAgICAgICAgIHZhbHVlID0gbGFuZy5zdGF0dXNcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2FzZSAxOiB7XG4gICAgICAgICAgICAgICAgdmFsdWUgPSBsYW5nLm92ZXJ2aWV3XG4gICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhc2UgMjoge1xuICAgICAgICAgICAgICAgIHZhbHVlID0gbGFuZy51c2FnZVxuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHZhbHVlXG4gICAgfVxuICAgIHJldHVybiAoXG4gICAgICAgIDxkaXYgc3R5bGU9e3tkaXNwbGF5OiAnZmxleCd9fT5cblxuICAgICAgICAgICAgPFRhYnNcbiAgICAgICAgICAgICAgICBidXR0b25zPXtbXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGtleTogMCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBsYW5nLnN0YXR1c1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBrZXk6IDEsXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogbGFuZy5vdmVydmlld1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBrZXk6IDIsXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogbGFuZy51c2FnZVxuICAgICAgICAgICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAgICAgXX1cbiAgICAgICAgICAgICAgICBzZXRPcGVuVGFiPXtzZXRPcGVuVGFifVxuICAgICAgICAgICAgICAgIG9wZW5UYWI9e29wZW5UYWJ9XG4gICAgICAgICAgICAvPlxuXG4gICAgICAgICAgICA8ZGl2IHN0eWxlPXt7d2lkdGg6ICdjYWxjKDEwMCUgLSAyMjBweCknLCBtYXJnaW5MZWZ0OiAnYXV0bycsIG92ZXJmbG93WTogJ2hpZGRlbid9fT5cbiAgICAgICAgICAgICAgICA8SGVhZGVyTGF5b3V0XG4gICAgICAgICAgICAgICAgICAgIHdpZHRoPXsnOTUlJ31cbiAgICAgICAgICAgICAgICAgICAgdGl0bGU9e1xuICAgICAgICAgICAgICAgICAgICAgICAgbGFuZy50aXRsZVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHBhZ2VUaXRsZT17XG4gICAgICAgICAgICAgICAgICAgICAgICBnZXRUaXRsZSgpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDxUYWJDb250ZW50XG4gICAgICAgICAgICAgICAgICAgIG9wZW5UYWI9e29wZW5UYWJ9XG5cbiAgICAgICAgICAgICAgICAgICAgdGFicz17W1xuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ1dHRvbktleTogMCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogPFN0YXR1cy8+XG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ1dHRvbktleTogMSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogPE92ZXJ2aWV3Lz5cbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnV0dG9uS2V5OiAyLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiA8VXNhZ2UvPlxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgXX1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgKVxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./pages/index.js\n");

/***/ })

});