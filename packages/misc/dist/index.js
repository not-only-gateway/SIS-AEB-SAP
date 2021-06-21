'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var PropTypes = require('prop-types');
var core = require('@material-ui/core');
var icons = require('@material-ui/icons');
var axios = require('axios');
var InfiniteScroll = require('react-infinite-scroll-component');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var PropTypes__default = /*#__PURE__*/_interopDefaultLegacy(PropTypes);
var axios__default = /*#__PURE__*/_interopDefaultLegacy(axios);
var InfiniteScroll__default = /*#__PURE__*/_interopDefaultLegacy(InfiniteScroll);

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z$6 = ".Filter-module_overflowEllipsis__2j9yZ {\n  white-space: nowrap;\n  text-overflow: ellipsis;\n  overflow: hidden;\n}\n\n/*DISPLAY*/\n.Filter-module_displayWarp__2Yykw {\n  display: inline-flex;\n  flex-flow: row wrap;\n  gap: 16px;\n}\n\n\n\n.Filter-module_displayInlineStart__1EhJ6 {\n  display: flex;\n  align-items: center;\n  justify-content: flex-start;\n\n}\n\n.Filter-module_displayInlineEnd__FDMeQ {\n  display: flex;\n  align-items: center;\n  justify-content: flex-end;\n}\n\n.Filter-module_displayInlineSpaced__1MjuV {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n\n}\n\n\n.Filter-module_maxWidth__2bpRr > * {\n  width: 100%;\n}\n\n.Filter-module_filterContainer__2_m7s {\n  background-color: #f4f5fa;\n  width: clamp(50px, calc(25% - 12px), 150px);\n  border-radius: 32px;\n\n  border: #ecedf2 .7px solid;\n  height: 37px;\n  font-size: .8rem;\n  text-transform: uppercase;\n  font-weight: 550;\n\n  padding: 0 0 0 8px;\n\n  align-items: center;\n  justify-content: space-between;\n}\n";
var styles$5 = {"overflowEllipsis":"Filter-module_overflowEllipsis__2j9yZ","displayWarp":"Filter-module_displayWarp__2Yykw","displayInlineStart":"Filter-module_displayInlineStart__1EhJ6","displayInlineEnd":"Filter-module_displayInlineEnd__FDMeQ","displayInlineSpaced":"Filter-module_displayInlineSpaced__1MjuV","maxWidth":"Filter-module_maxWidth__2bpRr","filterContainer":"Filter-module_filterContainer__2_m7s"};
styleInject(css_248z$6);

function Filters(props) {
  return /*#__PURE__*/React__default['default'].createElement("div", {
    className: styles$5.displayWarp,
    style: {
      gap: '16px',
      width: '100%',
      height: 'auto',
      paddingBottom: '8px',
      paddingTop: '8px'
    }
  }, props.activeFilters.map(function (filter, index) {
    if (filter.value !== null) return /*#__PURE__*/React__default['default'].createElement("div", {
      key: filter.key + '-filter-' + index,
      className: styles$5.filterContainer,
      style: {
        display: props.changed ? 'none' : 'flex'
      }
    }, /*#__PURE__*/React__default['default'].createElement("span", {
      className: styles$5.overflowEllipsis,
      style: {
        color: '#262626',
        maxWidth: '78%'
      }
    }, filter.value), /*#__PURE__*/React__default['default'].createElement(core.IconButton, {
      disabled: filter.disabled,
      style: {
        padding: '8px',
        visibility: filter.disabled ? 'hidden' : 'visible'
      },
      onClick: function onClick() {
        if (filter.type !== 'text') {
          props.handleChange({
            name: filter.key,
            value: undefined
          });
          props.applyChanges();
        } else {
          props.handleChange({
            name: filter.key,
            value: ''
          });
          props.applyChanges();
        }
      }
    }, /*#__PURE__*/React__default['default'].createElement(icons.ClearRounded, {
      style: {
        fontSize: '1.3rem',
        color: '#777777'
      }
    })));else return null;
  }));
}
Filters.propTypes = {
  activeFilters: PropTypes__default['default'].array,
  active: PropTypes__default['default'].bool,
  handleChange: PropTypes__default['default'].func,
  applyChanges: PropTypes__default['default'].func
};

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}

function _iterableToArrayLimit(arr, i) {
  var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;

  var _s, _e;

  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

var css_248z$5 = ".Search-module_rowContainer__16M_B {\n  display: flex;\n\n  width: 100%;\n\n  justify-content: space-around;\n  align-items: center;\n  border-radius: 8px;\n\n  background: #f4f5fa;\n  margin-left: auto;\n\n}\n\n.Search-module_displayInlineCenter__1oW_E {\n  display: flex;\n  justify-content: center;\n  justify-items: center;\n  align-items: center;\n}\n";
var styles$4 = {"rowContainer":"Search-module_rowContainer__16M_B","displayInlineCenter":"Search-module_displayInlineCenter__1oW_E"};
styleInject(css_248z$5);

function SearchBox(props) {
  var _useState = React.useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      focused = _useState2[0],
      setFocused = _useState2[1];

  var _useState3 = React.useState(false),
      _useState4 = _slicedToArray(_useState3, 2),
      hovered = _useState4[0],
      setHovered = _useState4[1];

  var _useState5 = React.useState(false),
      _useState6 = _slicedToArray(_useState5, 2),
      searchHovered = _useState6[0],
      setSearchHovered = _useState6[1];

  var _useState7 = React.useState(false),
      _useState8 = _slicedToArray(_useState7, 2),
      closeHovered = _useState8[0],
      setCloseHovered = _useState8[1];

  React.useEffect(function () {
    if (props.searchInput.length === 0) props.applyChanges();
  }, [props.searchInput]);
  return /*#__PURE__*/React__default['default'].createElement("div", {
    style: {
      height: '56px',
      width: '50%',
      margin: 'auto'
    }
  }, /*#__PURE__*/React__default['default'].createElement(core.Paper, {
    component: "form",
    onMouseEnter: function onMouseEnter() {
      return setHovered(true);
    },
    onMouseLeave: function onMouseLeave() {
      return setHovered(false);
    },
    className: styles$4.rowContainer,
    style: {
      boxShadow: hovered || focused ? '0 0 4px 2px #0095ff' : 'unset'
    }
  }, /*#__PURE__*/React__default['default'].createElement(core.ButtonBase, {
    onMouseEnter: function onMouseEnter() {
      return setSearchHovered(true);
    },
    onMouseLeave: function onMouseLeave() {
      return setSearchHovered(false);
    },
    onClick: function onClick() {
      return props.applyChanges();
    },
    style: {
      width: '40px',
      height: '100%'
    },
    className: styles$4.displayInlineCenter
  }, /*#__PURE__*/React__default['default'].createElement(icons.SearchRounded, {
    style: {
      color: searchHovered ? '#0095ff' : '#777777',
      transition: '300ms ease-in-out'
    }
  })), /*#__PURE__*/React__default['default'].createElement(core.InputBase, {
    style: {
      width: 'calc(100% - 10px)',
      marginLeft: '10px'
    },
    placeholder: props.searchLocale,
    value: props.searchInput,
    onKeyDown: function onKeyDown(key) {
      if (key.key === 'Enter') {
        props.applyChanges();
        key.preventDefault();
      }
    },
    onFocus: function onFocus() {
      return setFocused(true);
    },
    onBlur: function onBlur() {
      return setFocused(false);
    },
    onChange: function onChange(event) {
      props.setSearchInput(event.target.value);
    }
  }), /*#__PURE__*/React__default['default'].createElement(core.ButtonBase, {
    onMouseEnter: function onMouseEnter() {
      return setCloseHovered(true);
    },
    onMouseLeave: function onMouseLeave() {
      return setCloseHovered(false);
    },
    style: {
      width: '56px',
      height: '100%'
    },
    className: styles$4.displayInlineCenter,
    onClick: function onClick() {
      props.setSearchInput('');
    }
  }, /*#__PURE__*/React__default['default'].createElement(icons.CloseRounded, {
    style: {
      color: closeHovered ? '#ff5555' : '#777777',
      display: 'initial'
    }
  }))));
}
SearchBox.propTypes = {
  searchLocale: PropTypes__default['default'].string,
  setSearchInput: PropTypes__default['default'].func,
  searchInput: PropTypes__default['default'].string,
  applyChanges: PropTypes__default['default'].func
};

var css_248z$4 = ".Canvas-module_fadeIn__3pjmb {\n  animation: Canvas-module_fadeIn__3pjmb ease-in-out 250ms forwards;\n}\n\n\n@keyframes Canvas-module_fadeIn__3pjmb {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 100%;\n  }\n\n}\n\n.Canvas-module_zoomContainer__3B_AN {\n  position: fixed;\n  bottom: 50px;\n  right: 50px;\n  height: 140px;\n\n  display: grid;\n\n  justify-items: center;\n  align-content: space-between;\n}\n\n.Canvas-module_zoomLevelContainer__2OYNK {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n\n  color: #555555;\n  padding: 5px;\n  border-radius: 8px;\n  border: #ecedf2 1px solid;\n}\n\n.Canvas-module_buttonContainer__2dF5d {\n  outline: none;\n  border: #ecedf2 1px solid;\n  display: flex;\n  align-items: center;\n  justify-items: center;\n  justify-content: center;\n  padding: 16px;\n\n  height: 50px;\n  width: 50px;\n  border-radius: 50%;\n  color: white;\n\n\n  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;\n}\n\n\n.Canvas-module_nav__3_fH6 {\n  margin: 20px auto;\n  width: 455px;\n  min-height: auto;\n}\n\n.Canvas-module_nav__3_fH6 ul {\n  position: relative;\n  padding-top: 35px;\n}\n\n.Canvas-module_nav__3_fH6 li {\n  position: relative;\n  padding: 35px 3px 0 3px;\n  float: left;\n  transition: 200ms ease-in-out;\n  text-align: center;\n  list-style-type: none;\n}\n\n.Canvas-module_nav__3_fH6 li::before, .Canvas-module_nav__3_fH6 li::after{\n  content: '';\n  position: absolute;\n  top: 0;\n  right: 50%;\n  width: 50%;\n  height: 35px;\n  transition: 200ms ease-in-out;\n  border-top: 1px solid #ccc;\n}\n\n.Canvas-module_nav__3_fH6 li::after{\n  left: 50%;\n  right: auto;\n  transition: 200ms ease-in-out;\n  border-left: 1px solid #ccc;\n}\n\n.Canvas-module_nav__3_fH6 li:only-child::after, .Canvas-module_nav__3_fH6 li:only-child::before {\n  content: '';\n  display: none;\n}\n\n.Canvas-module_nav__3_fH6 li:only-child{ padding-top: 0;}\n.Canvas-module_nav__3_fH6 li:first-child::before, .Canvas-module_nav__3_fH6 li:last-child::after{\n  border: 0 none;\n}\n\n.Canvas-module_nav__3_fH6 li:last-child::before{\n  border-right: 1px solid #ccc;\n  border-radius: 0 5px 0 0;\n}\n\n.Canvas-module_nav__3_fH6 li:first-child::after{\n  border-radius: 5px 0 0 0;\n}\n.Canvas-module_nav__3_fH6 ul ul::before{\n  content: '';\n  position: absolute;\n  top: 0;\n  left: 50%;\n  border-left: 1px solid #ccc;\n  width: 0;\n  height: 35px;\n\n}\n\n.Canvas-module_nav__3_fH6 li span{\n  display: inline-block;\n  /*padding: 5px 10px;*/\n\n  cursor: pointer;\n\n  background: #f4f5fa;\n  border:  #ecedf2 1px solid;\n  border-radius: 8px;\n\n\n  /*border: 1px solid #ccc;*/\n\n  transition: 200ms ease-in-out;\n}\n\n.Canvas-module_nav__3_fH6 li span:hover, .Canvas-module_nav__3_fH6 li a:hover+ul li a{\n\n\n  box-shadow: 0 0 4px 2px #0095ff;\n\n}\n.Canvas-module_nav__3_fH6 li span:hover+ul li::after,\n.Canvas-module_nav__3_fH6 li span:hover+ul li::before,\n.Canvas-module_nav__3_fH6 li span:hover+ul::before,\n.Canvas-module_nav__3_fH6 li span:hover+ul ul::before{\n  content: '';\n  border-color: #0095ff;\n}\n";
var styles$3 = {"fadeIn":"Canvas-module_fadeIn__3pjmb","zoomContainer":"Canvas-module_zoomContainer__3B_AN","zoomLevelContainer":"Canvas-module_zoomLevelContainer__2OYNK","buttonContainer":"Canvas-module_buttonContainer__2dF5d","nav":"Canvas-module_nav__3_fH6"};
styleInject(css_248z$4);

function TreeNode(props) {
  var _useState = React.useState([]),
      _useState2 = _slicedToArray(_useState, 2),
      dependents = _useState2[0],
      setDependents = _useState2[1];

  var _useState3 = React.useState(false),
      _useState4 = _slicedToArray(_useState3, 2),
      hovered = _useState4[0],
      setHovered = _useState4[1];

  var _useState5 = React.useState(null),
      _useState6 = _slicedToArray(_useState5, 2),
      content = _useState6[0],
      setContent = _useState6[1];

  React.useEffect(function () {
    props.fetchDependents(props.subjectID).then(function (res) {
      setDependents(res);
    });
    setContent(props.getContent(props.content));
  }, []);
  return /*#__PURE__*/React__default['default'].createElement("li", {
    key: 'subject-layout-' + props.subjectID + props.type
  }, /*#__PURE__*/React__default['default'].createElement("span", {
    onMouseEnter: function onMouseEnter() {
      return setHovered(true);
    },
    onMouseLeave: function onMouseLeave() {
      return setHovered(false);
    },
    style: {
      width: 'clamp(150px, 150px, 200px)',
      height: props.maxHeight,
      border: hovered || props.hoveredParent ? '#0095ff .7px solid' : '#ecedf2 .7px solid',
      boxSizing: 'border-box',
      cursor: props.disabled ? 'unset' : 'pointer'
    },
    className: styles$3.fadeIn
  }, content), dependents.length > 0 ? /*#__PURE__*/React__default['default'].createElement("ul", null, dependents.map(function (subject) {
    return /*#__PURE__*/React__default['default'].createElement(TreeNode, {
      redirect: props.redirect,
      subjectID: subject.id,
      disabled: props.disabled,
      content: subject,
      fetchDependents: props.fetchDependents,
      getContent: props.getContent,
      maxHeight: props.maxHeight,
      hoveredParent: props.hoveredParent ? props.hoveredParent : hovered
    });
  })) : null);
}
TreeNode.propTypes = {
  getContent: PropTypes__default['default'].func,
  fetchDependents: PropTypes__default['default'].func,
  redirect: PropTypes__default['default'].func,
  subjectID: PropTypes__default['default'].number,
  content: PropTypes__default['default'].any,
  hoveredParent: PropTypes__default['default'].bool,
  disabled: PropTypes__default['default'].bool,
  maxHeight: PropTypes__default['default'].string
};

function Canvas(props) {
  var _useState = React.useState(1),
      _useState2 = _slicedToArray(_useState, 2),
      zoom = _useState2[0],
      setZoom = _useState2[1];

  return /*#__PURE__*/React__default['default'].createElement("div", {
    style: {
      position: 'relative',
      width: '100%',
      height: 'auto',
      minHeight: '100%'
    }
  }, /*#__PURE__*/React__default['default'].createElement("div", {
    style: {
      zoom: zoom,
      transition: '.2s',
      '-moz-transform': 'scale(' + zoom + ')',
      marginTop: zoom > 1 ? 'calc(8.3% * ' + (zoom - .25) + ')' : null
    }
  }, /*#__PURE__*/React__default['default'].createElement("span", {
    className: styles$3.nav,
    style: {
      width: '100%',
      display: 'flex',
      placeContent: 'center'
    }
  }, /*#__PURE__*/React__default['default'].createElement("ul", {
    key: props.subject.id
  }, /*#__PURE__*/React__default['default'].createElement(TreeNode, {
    subjectID: props.subject,
    disabled: props.disabled,
    getContent: props.getContent,
    maxHeight: props.maxHeight,
    fetchDependents: props.fetchDependents,
    content: props.subject,
    redirect: props.redirect,
    hoveredParent: false
  })))), /*#__PURE__*/React__default['default'].createElement("div", {
    className: styles$3.zoomContainer
  }, /*#__PURE__*/React__default['default'].createElement("span", {
    className: styles$3.zoomLevelContainer
  }, zoom, " : 1"), /*#__PURE__*/React__default['default'].createElement("button", {
    disabled: zoom === 2,
    onClick: function onClick() {
      return setZoom(zoom + 0.25);
    },
    className: styles$3.buttonContainer,
    style: {
      cursor: zoom === 2 ? undefined : 'pointer',
      boxShadow: zoom === 2 ? 'none' : undefined
    }
  }, /*#__PURE__*/React__default['default'].createElement(icons.AddRounded, null)), /*#__PURE__*/React__default['default'].createElement("button", {
    disabled: zoom === 0.5,
    onClick: function onClick() {
      return setZoom(zoom - 0.25);
    },
    className: styles$3.buttonContainer,
    style: {
      cursor: zoom === 0.5 ? undefined : 'pointer',
      boxShadow: zoom === 0.5 ? 'none' : undefined
    }
  }, /*#__PURE__*/React__default['default'].createElement(icons.RemoveRounded, null))));
}
Canvas.propTypes = {
  subject: PropTypes__default['default'].object,
  maxHeight: PropTypes__default['default'].any,
  disabled: PropTypes__default['default'].bool,
  fetchDependents: PropTypes__default['default'].func,
  getContent: PropTypes__default['default'].func,
  redirect: PropTypes__default['default'].func
};

var css_248z$3 = ".Tab-module_tabsContainer__18VKu {\n\n    height: 60px;\n    width: fit-content;\n\n    margin: auto;\n\n    border-bottom: #e0e0e0 1px solid;\n\n    display: flex;\n    align-items: flex-end;\n    gap: 16px;\n    justify-content: center;\n\n    background: white;\n    transition: 300ms ease-in-out;\n}\n\n\n.Tab-module_tabButtonContainer__2HC5B {\n    cursor: pointer;\n\n    font-family: 'Roboto' !important;\n    outline: none;\n\n    transition: 300ms ease-in-out;\n\n    box-shadow: none;\n    padding: 12px;\n    text-align: center;\n\n    border-top-left-radius: 8px;\n    border-top-right-radius: 8px;\n\n    border: none;\n    background: transparent;\n}\n.Tab-module_tabButtonContainer__2HC5B:hover{\n    background: #E8F0FE;\n\n}";
var styles$2 = {"tabsContainer":"Tab-module_tabsContainer__18VKu","tabButtonContainer":"Tab-module_tabButtonContainer__2HC5B"};
styleInject(css_248z$3);

var css_248z$2 = "\n.Animations-module_slideUpAnimation__3i0Sl {\n    animation: Animations-module_slideUp__1RZPp ease-in-out 250ms forwards;\n}\n\n.Animations-module_fadeIn__11vPQ {\n    position: relative;\n    animation: Animations-module_fadeIn__11vPQ ease-in-out 250ms forwards;\n\n}\n\n.Animations-module_fadeOutAnimation__1s3jt {\n    position: relative;\n    animation: Animations-module_fadeOut__2bXQx ease-in-out 250ms forwards;\n\n}\n\n.Animations-module_slideDownAnimation__6RJAK {\n    animation: Animations-module_slideDown__3Pia1 ease-in-out 250ms forwards;\n}\n\n@keyframes Animations-module_slideDown__3Pia1 {\n    0% {\n        opacity: 0;\n        transform: translateY(-10%);\n    }\n    100% {\n        opacity: 1;\n        transform: translateY(0%);\n    }\n}\n\n\n@keyframes Animations-module_fadeOut__2bXQx {\n\n    0% {\n        opacity: 1;\n        height: inherit;\n    }\n    50% {\n        opacity: .5;\n        height: inherit;\n    }\n    90% {\n        opacity: .1;\n        height: inherit;\n    }\n    100% {\n        opacity: 0;\n        display: none;\n        height: 0;\n        z-index: -1;\n    }\n}\n\n@keyframes Animations-module_fadeIn__11vPQ {\n    from {\n        opacity: 0;\n    }\n    to {\n        opacity: 100%;\n    }\n\n}\n\n@keyframes Animations-module_slideUp__1RZPp {\n    from {\n        opacity: 0;\n        transform: translateY(50%);\n    }\n    to {\n        opacity: 100%;\n        transform: translateY(0%);\n    }\n\n}\n";
var animations = {"slideUpAnimation":"Animations-module_slideUpAnimation__3i0Sl","slideUp":"Animations-module_slideUp__1RZPp","fadeIn":"Animations-module_fadeIn__11vPQ","fadeOutAnimation":"Animations-module_fadeOutAnimation__1s3jt","fadeOut":"Animations-module_fadeOut__2bXQx","slideDownAnimation":"Animations-module_slideDownAnimation__6RJAK","slideDown":"Animations-module_slideDown__3Pia1"};
styleInject(css_248z$2);

function Tabs(props) {
  return /*#__PURE__*/React__default['default'].createElement("div", {
    className: styles$2.tabsContainer
  }, props.buttons.map(function (button) {
    return button !== null ? /*#__PURE__*/React__default['default'].createElement("button", {
      key: button.key + ' - ' + button.value,
      onClick: function onClick() {
        return props.setOpenTab(button.key);
      },
      disabled: button.disabled,
      className: [styles$2.tabButtonContainer, animations.fadeIn].join(' '),
      style: {
        borderBottom: props.openTab === button.key ? '#0095ff 2.5px solid' : 'white 2.5px solid',
        color: props.openTab === button.key ? '#0095ff' : undefined
      }
    }, button.value) : null;
  }));
}
Tabs.proptypes = {
  buttons: PropTypes__default['default'].arrayOf(PropTypes__default['default'].shape({
    key: PropTypes__default['default'].number,
    value: PropTypes__default['default'].any
  })),
  setOpenTab: PropTypes__default['default'].func,
  openTab: PropTypes__default['default'].number
};

function TabContent(props) {
  var _useState = React.useState(''),
      _useState2 = _slicedToArray(_useState, 2),
      style = _useState2[0],
      setStyle = _useState2[1];

  var _useState3 = React.useState(false),
      _useState4 = _slicedToArray(_useState3, 2),
      isInRender = _useState4[0],
      setIsInRender = _useState4[1];

  React.useEffect(function () {
    if (isInRender && props.openTab !== props.tab.buttonKey) {
      setStyle(animations.fadeOutAnimation);
      var elementFound = document.querySelector('#content-' + props.tab.buttonKey + '\\:tab');

      if (elementFound !== null && style === animations.fadeOutAnimation) {
        elementFound.addEventListener('animationend', function () {
          setIsInRender(false);
          props.setRendering(null);
        });
      }
    } else if (!isInRender && props.openTab === props.tab.buttonKey && props.rendering === null) {
      props.setRendering(props.tab.buttonKey);
      setIsInRender(true);
      setStyle(animations.fadeIn);
    }
  });
  if (isInRender) return /*#__PURE__*/React__default['default'].createElement("div", {
    key: props.tab.buttonKey + '-' + props.tab.value,
    id: 'content-' + props.tab.buttonKey + ':tab',
    className: style
  }, props.tab.value);else return null;
}
TabContent.propTypes = {
  tab: PropTypes__default['default'].object,
  rendering: PropTypes__default['default'].any,
  setRendering: PropTypes__default['default'].func,
  openTab: PropTypes__default['default'].any
};

function RenderTabs(props) {
  var _useState = React.useState(null),
      _useState2 = _slicedToArray(_useState, 2),
      rendering = _useState2[0],
      setRendering = _useState2[1];

  var _useState3 = React.useState(false),
      _useState4 = _slicedToArray(_useState3, 2),
      mounted = _useState4[0],
      setMounted = _useState4[1];

  React.useEffect(function () {
    setMounted(true);
  });
  return /*#__PURE__*/React__default['default'].createElement("div", {
    style: {
      display: mounted ? undefined : 'none'
    }
  }, props.tabs.map(function (tab) {
    return /*#__PURE__*/React__default['default'].createElement(TabContent, {
      tab: tab,
      setRendering: setRendering,
      rendering: rendering,
      openTab: props.openTab
    });
  }));
}
RenderTabs.propTypes = {
  tabs: PropTypes__default['default'].arrayOf(PropTypes__default['default'].shape({
    buttonKey: PropTypes__default['default'].number,
    value: PropTypes__default['default'].any
  })),
  openTab: PropTypes__default['default'].any,
  noContainer: PropTypes__default['default'].bool
};

function Fetch(_x) {
  return _Fetch.apply(this, arguments);
}

function _Fetch() {
  _Fetch = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(props) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return axios__default['default']({
              method: 'get',
              url: props.fetchUrl,
              headers: {
                'authorization': props.fetchToken
              },
              params: {
                max_id: props.maxID,
                searchInput: props.searchInput && props.searchInput.length > 0 ? props.searchInput : null
              }
            }).then(function (res) {
              if (props.maxID === null) props.setData(res.data);else props.setData([].concat(_toConsumableArray(props.data), _toConsumableArray(res.data)));
              if (res.data.length > 0) props.setMaxID(res.data[res.data.length - 1].id);
              props.setLastFetchedSize(res.data.length);
            })["catch"](function (error) {
              console.log(error);
            });

          case 2:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _Fetch.apply(this, arguments);
}

fetch.propTypes = {
  data: PropTypes__default['default'].array,
  setData: PropTypes__default['default'].func,
  setLastFetchedSize: PropTypes__default['default'].func,
  searchInput: PropTypes__default['default'].string,
  maxID: PropTypes__default['default'].number,
  setMaxID: PropTypes__default['default'].func,
  host: PropTypes__default['default'].string,
  fetchUrl: PropTypes__default['default'].string,
  fetchToken: PropTypes__default['default'].string
};

var css_248z$1 = "\r\n\r\n.List-module_rowContainer__19RRd {\r\n    font-family: 'Roboto' !important;\r\n    border: #e0e0e0 1px solid;\r\n    background: transparent;\r\n\r\n    width: 100%;\r\n    height: 56px;\r\n\r\n    padding: 8px;\r\n    border-radius: 8px;\r\n\r\n    display: flex;\r\n    align-items: center;\r\n    justify-content: flex-start;\r\n\r\n    cursor: pointer;\r\n    outline: none;\r\n\r\n    transition: 300ms ease-in-out;\r\n}\r\n\r\n.List-module_rowContainer__19RRd:hover {\r\n    /*box-shadow: 0 0 4px 2px #0095ff;*/\r\n    text-decoration: underline;\r\n}\r\n\r\n\r\n.List-module_fadeIn__fy89i {\r\n    position: relative;\r\n    animation: List-module_fadeIn__fy89i ease-in-out 150ms forwards;\r\n\r\n}\r\n\r\n.List-module_fadeOutAnimation__2W-VR {\r\n    position: relative;\r\n    animation: List-module_fadeOut__-Ptse ease-in-out 150ms forwards;\r\n\r\n}\r\n@keyframes List-module_fadeOut__-Ptse {\r\n\r\n    0% {\r\n        opacity: 1;\r\n        height: inherit;\r\n    }\r\n    50% {\r\n        opacity: .5;\r\n        height: inherit;\r\n    }\r\n    90% {\r\n        opacity: .1;\r\n        height: inherit;\r\n    }\r\n    100% {\r\n        opacity: 0;\r\n        display: none;\r\n        height: 0;\r\n        z-index: -1;\r\n    }\r\n}\r\n\r\n\r\n@keyframes List-module_fadeIn__fy89i {\r\n    from {\r\n        opacity: 0;\r\n    }\r\n    to {\r\n        opacity: 100%;\r\n    }\r\n\r\n}\r\n";
var styles$1 = {"rowContainer":"List-module_rowContainer__19RRd","fadeIn":"List-module_fadeIn__fy89i","fadeOutAnimation":"List-module_fadeOutAnimation__2W-VR","fadeOut":"List-module_fadeOut__-Ptse"};
styleInject(css_248z$1);

function ListContent(props) {
  return /*#__PURE__*/React__default['default'].createElement("button", {
    className: [styles$1.rowContainer, styles$1.fadeIn].join(' '),
    onClick: function onClick() {
      props.setEntity();
      props.clickEvent();
    },
    key: props.index + '-list'
  }, /*#__PURE__*/React__default['default'].createElement(icons.AddRounded, {
    style: {
      color: 'black',
      display: !props.create ? 'none' : undefined
    }
  }), props.create ? props.lang.create : /*#__PURE__*/React__default['default'].createElement("div", {
    style: {
      display: 'flex',
      gap: '16px'
    }
  }, /*#__PURE__*/React__default['default'].createElement("h5", {
    style: {
      color: '#555555',
      marginBottom: 0,
      marginTop: 0
    }
  }, props.entity[props.primaryLabel]), props.secondaryLabel !== undefined && props.secondaryLabel !== null ? /*#__PURE__*/React__default['default'].createElement("h5", {
    style: {
      color: '#555555',
      marginBottom: 0,
      marginTop: 0
    }
  }, props.entity[props.secondaryLabel]) : null));
}
ListContent.propTypes = {
  entity: PropTypes__default['default'].any,
  create: PropTypes__default['default'].bool,
  lang: PropTypes__default['default'].object,
  clickEvent: PropTypes__default['default'].func,
  primaryLabel: PropTypes__default['default'].string,
  secondaryLabel: PropTypes__default['default'].string,
  index: PropTypes__default['default'].number
};

var ListsPT = {
  create: 'Criar',
  end: 'Você chegou ao fim'
};

var css_248z = ".Loader-module_loader__372Ft{\n  width: 100%;\n  height: 60px;\n\n  animation: Loader-module_pulse__2_rYl 2s ease-in-out infinite;\n}\n\n@keyframes Loader-module_pulse__2_rYl {\n  0% {\n    background-color: rgba(244, 245, 250, 1);\n  }\n  50% {\n    background-color: rgba(244, 245, 250, .4);\n  }\n  100% {\n    background-color: rgba(244, 245, 250, .7);\n  }\n}\n";
var styles = {"loader":"Loader-module_loader__372Ft","pulse":"Loader-module_pulse__2_rYl"};
styleInject(css_248z);

function Loader() {
  return /*#__PURE__*/React__default['default'].createElement("div", {
    className: styles.loader
  });
}

function List(props) {
  var _useState = React.useState([]),
      _useState2 = _slicedToArray(_useState, 2),
      data = _useState2[0],
      setData = _useState2[1];

  var _useState3 = React.useState(null),
      _useState4 = _slicedToArray(_useState3, 2),
      maxID = _useState4[0],
      setMaxID = _useState4[1];

  var _useState5 = React.useState(null),
      _useState6 = _slicedToArray(_useState5, 2),
      lastFetchedSize = _useState6[0],
      setLastFetchedSize = _useState6[1];

  var lang = ListsPT;
  React.useEffect(function () {
    Fetch({
      setLastFetchedSize: setLastFetchedSize,
      setData: setData,
      data: data,
      maxID: maxID,
      searchInput: props.searchInput,
      setMaxID: setMaxID,
      fetchToken: props.fetchToken,
      fetchUrl: props.fetchUrl
    });
  }, []);
  return /*#__PURE__*/React__default['default'].createElement("div", {
    style: {
      display: 'grid',
      marginTop: '10px',
      width: '100%',
      gap: '16px'
    }
  }, props.createOption ? /*#__PURE__*/React__default['default'].createElement(ListContent, {
    create: true,
    lang: lang,
    setEntity: function setEntity() {
      return props.setEntity(null);
    },
    clickEvent: function clickEvent() {
      return props.clickEvent(true);
    },
    entity: null
  }) : null, /*#__PURE__*/React__default['default'].createElement(InfiniteScroll__default['default'], {
    dataLength: data.length,
    next: function next() {
      return Fetch({
        setLastFetchedSize: setLastFetchedSize,
        setData: setData,
        data: data,
        maxID: maxID,
        searchInput: props.searchInput,
        setMaxID: setMaxID,
        fetchToken: props.fetchToken,
        fetchUrl: props.fetchUrl
      });
    },
    hasMore: lastFetchedSize === 15,
    inverse: false,
    scrollableTarget: "scrollableDiv",
    loader: /*#__PURE__*/React__default['default'].createElement(Loader, null),
    style: {
      overflow: 'visible'
    },
    endMessage: /*#__PURE__*/React__default['default'].createElement("div", {
      style: {
        width: '100%'
      }
    }, /*#__PURE__*/React__default['default'].createElement("h5", {
      style: {
        textAlign: 'center',
        color: '#555555'
      }
    }, lang.end))
  }, data.map(function (entity, index) {
    return /*#__PURE__*/React__default['default'].createElement(ListContent, {
      create: false,
      lang: lang,
      entity: entity,
      index: index,
      setEntity: function setEntity() {
        return props.setEntity(entity);
      },
      secondaryLabel: props.secondaryLabel,
      primaryLabel: props.primaryLabel,
      clickEvent: function clickEvent() {
        return props.clickEvent(true);
      }
    });
  })));
}
List.propTypes = {
  primaryLabel: PropTypes__default['default'].string,
  secondaryLabel: PropTypes__default['default'].string,
  setEntity: PropTypes__default['default'].any,
  createOption: PropTypes__default['default'].bool,
  clickEvent: PropTypes__default['default'].func,
  searchInput: PropTypes__default['default'].string,
  fetchUrl: PropTypes__default['default'].string,
  fetchToken: PropTypes__default['default'].string
};

exports.Canvas = Canvas;
exports.Filters = Filters;
exports.List = List;
exports.Loader = Loader;
exports.RenderTabs = RenderTabs;
exports.SearchBox = SearchBox;
exports.Tabs = Tabs;
