'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var PropTypes = require('prop-types');
var Head = require('next/head');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var PropTypes__default = /*#__PURE__*/_interopDefaultLegacy(PropTypes);
var Head__default = /*#__PURE__*/_interopDefaultLegacy(Head);

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

var css_248z = ".Header-module_HeaderLayout__1csS4 {\n  display: grid;\n  justify-items: center;\n  align-content: space-between;\n  margin: auto;\n  height: auto;\n  flex-direction: column;\n  transition: all 300ms ease-in-out;\n\n}\n\n.Header-module_firstRowContainer__3TvY8 {\n  width: 100%;\n  margin-top: 15px;\n  height: auto;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n\n.Header-module_titleContainer__1_vnZ {\n  height: 100%;\n  gap: .4rem;\n\n  display: grid;\n  align-items: center;\n  justify-content: flex-start;\n}\n";
var styles = {"HeaderLayout":"Header-module_HeaderLayout__1csS4","firstRowContainer":"Header-module_firstRowContainer__3TvY8","titleContainer":"Header-module_titleContainer__1_vnZ"};
styleInject(css_248z);

function HeaderLayout(props) {
  return /*#__PURE__*/React__default['default'].createElement("div", {
    style: {
      position: 'sticky',
      top: 0,
      background: 'white',
      transition: '300ms ease-in-out',
      zIndex: '50'
    }
  }, /*#__PURE__*/React__default['default'].createElement(Head__default['default'], null, /*#__PURE__*/React__default['default'].createElement("title", null, props.pageTitle), /*#__PURE__*/React__default['default'].createElement("link", {
    rel: "icon",
    href: '/LOGO.png',
    type: "image/x-icon"
  })), /*#__PURE__*/React__default['default'].createElement("div", {
    className: styles.HeaderLayout,
    style: {
      width: props.width
    }
  }, /*#__PURE__*/React__default['default'].createElement("div", {
    className: styles.firstRowContainer
  }, /*#__PURE__*/React__default['default'].createElement("div", {
    className: styles.titleContainer,
    style: {
      width: typeof props.title === 'string' ? 'initial' : '100%'
    }
  }, typeof props.title === 'string' ? /*#__PURE__*/React__default['default'].createElement("h2", {
    style: {
      marginBottom: 'unset',
      marginTop: 'unset'
    }
  }, props.title) : /*#__PURE__*/React__default['default'].createElement("div", {
    style: {
      width: '100%'
    }
  }, props.title), props.information !== undefined ? /*#__PURE__*/React__default['default'].createElement("h5", {
    style: {
      color: '#555555',
      marginBottom: '8px'
    }
  }, props.information) : null), props.searchComponent !== undefined ? props.searchComponent : null), props.activeFiltersComponent !== undefined ? props.activeFiltersComponent : null, props.tabs !== undefined ? props.tabs : null));
}
HeaderLayout.propTypes = {
  title: PropTypes__default['default'].any,
  searchComponent: PropTypes__default['default'].object,
  tabs: PropTypes__default['default'].object,
  pageTitle: PropTypes__default['default'].string,
  information: PropTypes__default['default'].string,
  activeFiltersComponent: PropTypes__default['default'].object,
  width: PropTypes__default['default'].string
};

exports.Header = HeaderLayout;
