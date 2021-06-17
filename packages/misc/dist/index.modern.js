import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';

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
    className: styles.HeaderLayout,
    style: {
      width: props.width
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.firstRowContainer
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.titleContainer,
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

export { HeaderLayout as Header };
