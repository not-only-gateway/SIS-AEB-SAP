import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { IconButton, Paper, ButtonBase, InputBase } from '@material-ui/core';
import { ClearRounded, SearchRounded, CloseRounded, AddRounded, RemoveRounded } from '@material-ui/icons';

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

var css_248z$5 = ".Header-module_HeaderLayout__1csS4 {\n  display: grid;\n  justify-items: center;\n  align-content: space-between;\n  margin: auto;\n  height: auto;\n  flex-direction: column;\n  transition: all 300ms ease-in-out;\n\n}\n\n.Header-module_firstRowContainer__3TvY8 {\n  width: 100%;\n  margin-top: 15px;\n  height: auto;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n\n.Header-module_titleContainer__1_vnZ {\n  height: 100%;\n  gap: .4rem;\n\n  display: grid;\n  align-items: center;\n  justify-content: flex-start;\n}\n";
var styles$4 = {"HeaderLayout":"Header-module_HeaderLayout__1csS4","firstRowContainer":"Header-module_firstRowContainer__3TvY8","titleContainer":"Header-module_titleContainer__1_vnZ"};
styleInject(css_248z$5);

function HeaderLayout(props) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'sticky',
      top: 0,
      background: 'white',
      transition: '300ms ease-in-out',
      zIndex: '50'
    }
  }, /*#__PURE__*/React.createElement(Head, null, /*#__PURE__*/React.createElement("title", null, props.pageTitle), /*#__PURE__*/React.createElement("link", {
    rel: "icon",
    href: '/LOGO.png',
    type: "image/x-icon"
  })), /*#__PURE__*/React.createElement("div", {
    className: styles$4.HeaderLayout,
    style: {
      width: props.width
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: styles$4.firstRowContainer
  }, /*#__PURE__*/React.createElement("div", {
    className: styles$4.titleContainer,
    style: {
      width: typeof props.title === 'string' ? 'initial' : '100%'
    }
  }, typeof props.title === 'string' ? /*#__PURE__*/React.createElement("h2", {
    style: {
      marginBottom: 'unset',
      marginTop: 'unset'
    }
  }, props.title) : /*#__PURE__*/React.createElement("div", {
    style: {
      width: '100%'
    }
  }, props.title), props.information !== undefined ? /*#__PURE__*/React.createElement("h5", {
    style: {
      color: '#555555',
      marginBottom: '8px'
    }
  }, props.information) : null), props.searchComponent !== undefined ? props.searchComponent : null), props.activeFiltersComponent !== undefined ? props.activeFiltersComponent : null, props.tabs !== undefined ? props.tabs : null));
}
HeaderLayout.propTypes = {
  title: PropTypes.any,
  searchComponent: PropTypes.object,
  tabs: PropTypes.object,
  pageTitle: PropTypes.string,
  information: PropTypes.string,
  activeFiltersComponent: PropTypes.object,
  width: PropTypes.string
};

var css_248z$4 = ".Filter-module_overflowEllipsis__2j9yZ {\n  white-space: nowrap;\n  text-overflow: ellipsis;\n  overflow: hidden;\n}\n\n/*DISPLAY*/\n.Filter-module_displayWarp__2Yykw {\n  display: inline-flex;\n  flex-flow: row wrap;\n  gap: 16px;\n}\n\n\n\n.Filter-module_displayInlineStart__1EhJ6 {\n  display: flex;\n  align-items: center;\n  justify-content: flex-start;\n\n}\n\n.Filter-module_displayInlineEnd__FDMeQ {\n  display: flex;\n  align-items: center;\n  justify-content: flex-end;\n}\n\n.Filter-module_displayInlineSpaced__1MjuV {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n\n}\n\n\n.Filter-module_maxWidth__2bpRr > * {\n  width: 100%;\n}\n\n.Filter-module_filterContainer__2_m7s {\n  background-color: #f4f5fa;\n  width: clamp(50px, calc(25% - 12px), 150px);\n  border-radius: 32px;\n\n  border: #ecedf2 .7px solid;\n  height: 37px;\n  font-size: .8rem;\n  text-transform: uppercase;\n  font-weight: 550;\n\n  padding: 0 0 0 8px;\n\n  align-items: center;\n  justify-content: space-between;\n}\n";
var styles$3 = {"overflowEllipsis":"Filter-module_overflowEllipsis__2j9yZ","displayWarp":"Filter-module_displayWarp__2Yykw","displayInlineStart":"Filter-module_displayInlineStart__1EhJ6","displayInlineEnd":"Filter-module_displayInlineEnd__FDMeQ","displayInlineSpaced":"Filter-module_displayInlineSpaced__1MjuV","maxWidth":"Filter-module_maxWidth__2bpRr","filterContainer":"Filter-module_filterContainer__2_m7s"};
styleInject(css_248z$4);

function Filters(props) {
  return /*#__PURE__*/React.createElement("div", {
    className: styles$3.displayWarp,
    style: {
      gap: '16px',
      width: '100%',
      height: 'auto',
      paddingBottom: '8px',
      paddingTop: '8px'
    }
  }, props.activeFilters.map(function (filter, index) {
    if (filter.value !== null) return /*#__PURE__*/React.createElement("div", {
      key: filter.key + '-filter-' + index,
      className: styles$3.filterContainer,
      style: {
        display: props.changed ? 'none' : 'flex'
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: styles$3.overflowEllipsis,
      style: {
        color: '#262626',
        maxWidth: '78%'
      }
    }, filter.value), /*#__PURE__*/React.createElement(IconButton, {
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
    }, /*#__PURE__*/React.createElement(ClearRounded, {
      style: {
        fontSize: '1.3rem',
        color: '#777777'
      }
    })));else return null;
  }));
}
Filters.propTypes = {
  activeFilters: PropTypes.array,
  active: PropTypes.bool,
  handleChange: PropTypes.func,
  applyChanges: PropTypes.func
};

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
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

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

var css_248z$3 = ".Search-module_rowContainer__16M_B {\n  display: flex;\n\n  width: 100%;\n\n  justify-content: space-around;\n  align-items: center;\n  border-radius: 8px;\n\n  background: #f4f5fa;\n  margin-left: auto;\n\n}\n\n.Search-module_displayInlineCenter__1oW_E {\n  display: flex;\n  justify-content: center;\n  justify-items: center;\n  align-items: center;\n}\n";
var styles$2 = {"rowContainer":"Search-module_rowContainer__16M_B","displayInlineCenter":"Search-module_displayInlineCenter__1oW_E"};
styleInject(css_248z$3);

function SearchBox(props) {
  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      focused = _useState2[0],
      setFocused = _useState2[1];

  var _useState3 = useState(false),
      _useState4 = _slicedToArray(_useState3, 2),
      hovered = _useState4[0],
      setHovered = _useState4[1];

  var _useState5 = useState(false),
      _useState6 = _slicedToArray(_useState5, 2),
      searchHovered = _useState6[0],
      setSearchHovered = _useState6[1];

  var _useState7 = useState(false),
      _useState8 = _slicedToArray(_useState7, 2),
      closeHovered = _useState8[0],
      setCloseHovered = _useState8[1];

  useEffect(function () {
    if (props.searchInput.length === 0) props.applyChanges();
  }, [props.searchInput]);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      height: '56px',
      width: '50%',
      margin: 'auto'
    }
  }, /*#__PURE__*/React.createElement(Paper, {
    component: "form",
    onMouseEnter: function onMouseEnter() {
      return setHovered(true);
    },
    onMouseLeave: function onMouseLeave() {
      return setHovered(false);
    },
    className: styles$2.rowContainer,
    style: {
      boxShadow: hovered || focused ? '0 0 4px 2px #0095ff' : 'unset'
    }
  }, /*#__PURE__*/React.createElement(ButtonBase, {
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
    className: styles$2.displayInlineCenter
  }, /*#__PURE__*/React.createElement(SearchRounded, {
    style: {
      color: searchHovered ? '#0095ff' : '#777777',
      transition: '300ms ease-in-out'
    }
  })), /*#__PURE__*/React.createElement(InputBase, {
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
  }), /*#__PURE__*/React.createElement(ButtonBase, {
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
    className: styles$2.displayInlineCenter,
    onClick: function onClick() {
      props.setSearchInput('');
    }
  }, /*#__PURE__*/React.createElement(CloseRounded, {
    style: {
      color: closeHovered ? '#ff5555' : '#777777',
      display: 'initial'
    }
  }))));
}
SearchBox.propTypes = {
  searchLocale: PropTypes.string,
  setSearchInput: PropTypes.func,
  searchInput: PropTypes.string,
  applyChanges: PropTypes.func
};

var css_248z$2 = ".Canvas-module_fadeIn__3pjmb {\n  animation: Canvas-module_fadeIn__3pjmb ease-in-out 250ms forwards;\n}\n\n\n@keyframes Canvas-module_fadeIn__3pjmb {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 100%;\n  }\n\n}\n\n.Canvas-module_zoomContainer__3B_AN {\n  position: fixed;\n  bottom: 50px;\n  right: 50px;\n  height: 140px;\n\n  display: grid;\n\n  justify-items: center;\n  align-content: space-between;\n}\n\n.Canvas-module_zoomLevelContainer__2OYNK {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n\n  color: #555555;\n  padding: 5px;\n  border-radius: 8px;\n  border: #ecedf2 1px solid;\n}\n\n.Canvas-module_buttonContainer__2dF5d {\n  outline: none;\n  border: #ecedf2 1px solid;\n  display: flex;\n  align-items: center;\n  justify-items: center;\n  justify-content: center;\n  padding: 16px;\n\n  height: 50px;\n  width: 50px;\n  border-radius: 50%;\n  color: white;\n\n\n  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;\n}\n\n\n.Canvas-module_nav__3_fH6 {\n  margin: 20px auto;\n  width: 455px;\n  min-height: auto;\n}\n\n.Canvas-module_nav__3_fH6 ul {\n  position: relative;\n  padding-top: 35px;\n}\n\n.Canvas-module_nav__3_fH6 li {\n  position: relative;\n  padding: 35px 3px 0 3px;\n  float: left;\n  transition: 200ms ease-in-out;\n  text-align: center;\n  list-style-type: none;\n}\n\n.Canvas-module_nav__3_fH6 li::before, .Canvas-module_nav__3_fH6 li::after{\n  content: '';\n  position: absolute;\n  top: 0;\n  right: 50%;\n  width: 50%;\n  height: 35px;\n  transition: 200ms ease-in-out;\n  border-top: 1px solid #ccc;\n}\n\n.Canvas-module_nav__3_fH6 li::after{\n  left: 50%;\n  right: auto;\n  transition: 200ms ease-in-out;\n  border-left: 1px solid #ccc;\n}\n\n.Canvas-module_nav__3_fH6 li:only-child::after, .Canvas-module_nav__3_fH6 li:only-child::before {\n  content: '';\n  display: none;\n}\n\n.Canvas-module_nav__3_fH6 li:only-child{ padding-top: 0;}\n.Canvas-module_nav__3_fH6 li:first-child::before, .Canvas-module_nav__3_fH6 li:last-child::after{\n  border: 0 none;\n}\n\n.Canvas-module_nav__3_fH6 li:last-child::before{\n  border-right: 1px solid #ccc;\n  border-radius: 0 5px 0 0;\n}\n\n.Canvas-module_nav__3_fH6 li:first-child::after{\n  border-radius: 5px 0 0 0;\n}\n.Canvas-module_nav__3_fH6 ul ul::before{\n  content: '';\n  position: absolute;\n  top: 0;\n  left: 50%;\n  border-left: 1px solid #ccc;\n  width: 0;\n  height: 35px;\n\n}\n\n.Canvas-module_nav__3_fH6 li span{\n  display: inline-block;\n  /*padding: 5px 10px;*/\n\n  cursor: pointer;\n\n  background: #f4f5fa;\n  border:  #ecedf2 1px solid;\n  border-radius: 8px;\n\n\n  /*border: 1px solid #ccc;*/\n\n  transition: 200ms ease-in-out;\n}\n\n.Canvas-module_nav__3_fH6 li span:hover, .Canvas-module_nav__3_fH6 li a:hover+ul li a{\n\n\n  box-shadow: 0 0 4px 2px #0095ff;\n\n}\n.Canvas-module_nav__3_fH6 li span:hover+ul li::after,\n.Canvas-module_nav__3_fH6 li span:hover+ul li::before,\n.Canvas-module_nav__3_fH6 li span:hover+ul::before,\n.Canvas-module_nav__3_fH6 li span:hover+ul ul::before{\n  content: '';\n  border-color: #0095ff;\n}\n";
var styles$1 = {"fadeIn":"Canvas-module_fadeIn__3pjmb","zoomContainer":"Canvas-module_zoomContainer__3B_AN","zoomLevelContainer":"Canvas-module_zoomLevelContainer__2OYNK","buttonContainer":"Canvas-module_buttonContainer__2dF5d","nav":"Canvas-module_nav__3_fH6"};
styleInject(css_248z$2);

function TreeNode(props) {
  var _useState = useState([]),
      _useState2 = _slicedToArray(_useState, 2),
      dependents = _useState2[0],
      setDependents = _useState2[1];

  var _useState3 = useState(false),
      _useState4 = _slicedToArray(_useState3, 2),
      hovered = _useState4[0],
      setHovered = _useState4[1];

  var _useState5 = useState(null),
      _useState6 = _slicedToArray(_useState5, 2),
      content = _useState6[0],
      setContent = _useState6[1];

  useEffect(function () {
    props.fetchDependents(props.subjectID).then(function (res) {
      setDependents(res);
    });
    setContent(props.getContent(props.content));
  }, []);
  return /*#__PURE__*/React.createElement("li", {
    key: 'subject-layout-' + props.subjectID + props.type
  }, /*#__PURE__*/React.createElement("span", {
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
    className: styles$1.fadeIn
  }, content), dependents.length > 0 ? /*#__PURE__*/React.createElement("ul", null, dependents.map(function (subject) {
    return /*#__PURE__*/React.createElement(TreeNode, {
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
  getContent: PropTypes.func,
  fetchDependents: PropTypes.func,
  redirect: PropTypes.func,
  subjectID: PropTypes.number,
  content: PropTypes.any,
  hoveredParent: PropTypes.bool,
  disabled: PropTypes.bool,
  maxHeight: PropTypes.string
};

function Canvas(props) {
  var _useState = useState(1),
      _useState2 = _slicedToArray(_useState, 2),
      zoom = _useState2[0],
      setZoom = _useState2[1];

  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      width: '100%',
      height: 'auto',
      minHeight: '100%'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      zoom: zoom,
      transition: '.2s',
      '-moz-transform': 'scale(' + zoom + ')',
      marginTop: zoom > 1 ? 'calc(8.3% * ' + (zoom - .25) + ')' : null
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: styles$1.nav,
    style: {
      width: '100%',
      display: 'flex',
      placeContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("ul", {
    key: props.subject.id
  }, /*#__PURE__*/React.createElement(TreeNode, {
    subjectID: props.subject,
    disabled: props.disabled,
    getContent: props.getContent,
    maxHeight: props.maxHeight,
    fetchDependents: props.fetchDependents,
    content: props.subject,
    redirect: props.redirect,
    hoveredParent: false
  })))), /*#__PURE__*/React.createElement("div", {
    className: styles$1.zoomContainer
  }, /*#__PURE__*/React.createElement("span", {
    className: styles$1.zoomLevelContainer
  }, zoom, " : 1"), /*#__PURE__*/React.createElement("button", {
    disabled: zoom === 2,
    onClick: function onClick() {
      return setZoom(zoom + 0.25);
    },
    className: styles$1.buttonContainer,
    style: {
      cursor: zoom === 2 ? undefined : 'pointer',
      boxShadow: zoom === 2 ? 'none' : undefined
    }
  }, /*#__PURE__*/React.createElement(AddRounded, null)), /*#__PURE__*/React.createElement("button", {
    disabled: zoom === 0.5,
    onClick: function onClick() {
      return setZoom(zoom - 0.25);
    },
    className: styles$1.buttonContainer,
    style: {
      cursor: zoom === 0.5 ? undefined : 'pointer',
      boxShadow: zoom === 0.5 ? 'none' : undefined
    }
  }, /*#__PURE__*/React.createElement(RemoveRounded, null))));
}
Canvas.propTypes = {
  subject: PropTypes.object,
  maxHeight: PropTypes.any,
  disabled: PropTypes.bool,
  fetchDependents: PropTypes.func,
  getContent: PropTypes.func,
  redirect: PropTypes.func
};

var css_248z$1 = "\n\n.Tab-module_tabsContainer__18VKu {\n  position: sticky;\n  top: 0;\n  height: calc(100vh - 60px);\n  display: grid;\n  align-content: flex-start;\n  border-right: #ecedf2 1px solid;\n  transition: 300ms ease-in-out;\n  width: 220px;\n  padding-top: 32px;\n  gap: 16px;\n}\n\n\n.Tab-module_tabButtonContainer__2HC5B {\n  cursor: pointer;\n\n  outline: none;\n  border-top: none;\n  border-bottom: none;\n  border-right: none;\n  border-left: none;\n  background-color: transparent;\n\n  box-shadow: none;\n  padding: 8px 8px 8px 24px;\n  text-align: left;\n}\n";
var styles = {"tabsContainer":"Tab-module_tabsContainer__18VKu","tabButtonContainer":"Tab-module_tabButtonContainer__2HC5B"};
styleInject(css_248z$1);

var css_248z = "\n.Animations-module_slideUpAnimation__3i0Sl {\n    animation: Animations-module_slideUp__1RZPp ease-in-out 250ms forwards;\n}\n\n.Animations-module_fadeIn__11vPQ {\n    position: relative;\n    animation: Animations-module_fadeIn__11vPQ ease-in-out 250ms forwards;\n\n}\n\n.Animations-module_fadeOutAnimation__1s3jt {\n    position: relative;\n    animation: Animations-module_fadeOut__2bXQx ease-in-out 250ms forwards;\n\n}\n\n.Animations-module_slideDownAnimation__6RJAK {\n    animation: Animations-module_slideDown__3Pia1 ease-in-out 250ms forwards;\n}\n\n@keyframes Animations-module_slideDown__3Pia1 {\n    0% {\n        opacity: 0;\n        transform: translateY(-10%);\n    }\n    100% {\n        opacity: 1;\n        transform: translateY(0%);\n    }\n}\n\n\n@keyframes Animations-module_fadeOut__2bXQx {\n\n    0% {\n        opacity: 1;\n        height: inherit;\n    }\n    50% {\n        opacity: .5;\n        height: inherit;\n    }\n    90% {\n        opacity: .1;\n        height: inherit;\n    }\n    100% {\n        opacity: 0;\n        display: none;\n        height: 0;\n        z-index: -1;\n    }\n}\n\n@keyframes Animations-module_fadeIn__11vPQ {\n    from {\n        opacity: 0;\n    }\n    to {\n        opacity: 100%;\n    }\n\n}\n\n@keyframes Animations-module_slideUp__1RZPp {\n    from {\n        opacity: 0;\n        transform: translateY(50%);\n    }\n    to {\n        opacity: 100%;\n        transform: translateY(0%);\n    }\n\n}\n";
var animations = {"slideUpAnimation":"Animations-module_slideUpAnimation__3i0Sl","slideUp":"Animations-module_slideUp__1RZPp","fadeIn":"Animations-module_fadeIn__11vPQ","fadeOutAnimation":"Animations-module_fadeOutAnimation__1s3jt","fadeOut":"Animations-module_fadeOut__2bXQx","slideDownAnimation":"Animations-module_slideDownAnimation__6RJAK","slideDown":"Animations-module_slideDown__3Pia1"};
styleInject(css_248z);

function Tabs(props) {
  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2);
      _useState2[0];
      _useState2[1];

  return /*#__PURE__*/React.createElement("div", {
    className: styles.tabsContainer
  }, props.buttons.map(function (button) {
    return button !== null ? /*#__PURE__*/React.createElement("button", {
      key: button.key + ' - ' + button.value,
      onClick: function onClick() {
        return props.setOpenTab(button.key);
      },
      disabled: button.disabled,
      className: [styles.tabButtonContainer, animations.slideUpAnimation].join(' '),
      style: {
        borderLeft: props.openTab === button.key ? '#0095ff 3px solid' : 'transparent 3px solid',
        color: props.openTab === button.key ? '#0095ff' : undefined
      }
    }, button.value) : null;
  }));
}
Tabs.proptypes = {
  buttons: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.number,
    value: PropTypes.any
  })),
  setOpenTab: PropTypes.func,
  openTab: PropTypes.number
};

function TabContent(props) {
  var _useState = useState(''),
      _useState2 = _slicedToArray(_useState, 2),
      style = _useState2[0],
      setStyle = _useState2[1];

  var _useState3 = useState(false),
      _useState4 = _slicedToArray(_useState3, 2),
      isInRender = _useState4[0],
      setIsInRender = _useState4[1];

  useEffect(function () {
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
  if (isInRender) return /*#__PURE__*/React.createElement("div", {
    key: props.tab.buttonKey + '-' + props.tab.value,
    id: 'content-' + props.tab.buttonKey + ':tab',
    className: style
  }, props.tab.value);else return null;
}
TabContent.propTypes = {
  tab: PropTypes.object,
  rendering: PropTypes.any,
  setRendering: PropTypes.func,
  openTab: PropTypes.any
};

function RenderTabs(props) {
  var _useState = useState(null),
      _useState2 = _slicedToArray(_useState, 2),
      rendering = _useState2[0],
      setRendering = _useState2[1];

  var _useState3 = useState(false),
      _useState4 = _slicedToArray(_useState3, 2),
      mounted = _useState4[0],
      setMounted = _useState4[1];

  useEffect(function () {
    setMounted(true);
  });
  if (mounted) return /*#__PURE__*/React.createElement(React.Fragment, null, props.tabs.map(function (tab) {
    return /*#__PURE__*/React.createElement(TabContent, {
      tab: tab,
      setRendering: setRendering,
      rendering: rendering,
      openTab: props.openTab
    });
  }));else return /*#__PURE__*/React.createElement(React.Fragment, null);
}
RenderTabs.propTypes = {
  tabs: PropTypes.arrayOf(PropTypes.shape({
    buttonKey: PropTypes.number,
    value: PropTypes.any
  })),
  openTab: PropTypes.any,
  noContainer: PropTypes.bool
};

export { Canvas, Filters, HeaderLayout as Header, RenderTabs, SearchBox, Tabs };
