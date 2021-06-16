import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import InputMask from 'react-input-mask';
import { VisibilityOffRounded, VisibilityRounded, CloseRounded, CloudUploadRounded, ArrowDropDownRounded, DeleteForeverRounded, ListRounded, AddRounded } from '@material-ui/icons';
import { Modal } from '@material-ui/core';

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

var css_248z = "/*TEXT FIELD*/\n\n.Input-module_visibilityContainer__dLrc_ {\n    margin-left: auto;\n    cursor: pointer;\n    color: #555555;\n}\n\n.Input-module_visibilityContainer__dLrc_:hover {\n    color: #0095ff\n}\n\n.Input-module_fieldsContainer__iM9Q7 {\n    display: flex;\n    align-items: center;\n    gap: 10px;\n    height: 56px;\n\n}\n\n.Input-module_inputContainer__2h9z6 {\n    border-radius: 5px;\n    border: #ecedf2 1px solid;\n    box-shadow: unset;\n    transition: 250ms ease-in-out;\n    background: #f4f5fa;\n    width: 100%;\n    font-family: 'Roboto' !important;\n    height: 56px;\n\n    outline: none;\n    padding: 5px;\n    font-size: 1rem;\n\n    color: #555555;\n}\n\n.Input-module_selectContainer__12gH0 {\n    font-family: 'Roboto' !important;\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n    border: #ecedf2 1px solid;\n\n    box-shadow: unset;\n    transition: 250ms ease-in-out;\n    background: #f4f5fa;\n    width: 100%;\n    outline: none;\n    padding: 5px;\n    font-size: 1rem;\n    color: #555555;\n    cursor: pointer;\n    height: 40px;\n}\n\n.Input-module_dropDownContainer__3Rz2x {\n    display: grid;\n    gap: 8px;\n    height: auto;\n    position: relative;\n}\n\n.Input-module_dropDownChoicesContainer__kWPp2 {\n    display: grid;\n\n    background-color: white;\n\n    border-radius: 5px;\n    position: absolute;\n    z-index: 5;\n\n    box-shadow: 0 0 10px 2px rgba(0, 0, 0, .2);\n\n    padding: 5px;\n\n    top: -20%;\n    width: 100%;\n    max-height: 250px;\n    overflow: auto;\n}\n\n.Input-module_dropDownChoicesContainer__kWPp2 > button {\n    width: 100%;\n}\n\n.Input-module_labelContainer__6xKf5 {\n    /*animation: slideUp ease-in-out 250ms both;*/\n    transition: visibility 300ms ease-in-out;\n    color: #262626;\n    font-size: .9rem;\n    margin-top: auto;\n    overflow: hidden;\n\n    text-transform: capitalize;\n\n}\n\n.Input-module_alertLabel__3IRsW {\n    margin-left: auto;\n    font-weight: 550;\n    font-size: .8rem;\n}\n\n/*TEXT FIELD*/\n\n\n/*IMAGE FIELD*/\n.Input-module_uploadFormContainer__1Q3GZ {\n    border-radius: 5px;\n    border: #ecedf2 1px solid;\n\n    transition: 250ms ease-in-out;\n    background: white;\n    width: 45px;\n    height: 45px;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    outline: none;\n\n    font-size: 1rem;\n    color: #555555;\n\n    cursor: pointer;\n}\n\n.Input-module_imageFieldContainer__21M-f {\n\n    height: 56px;\n\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n\n    padding: 4px;\n\n    border: #ecedf2 1px solid;\n    border-radius: 5px;\n    background: white;\n\n    overflow: hidden;\n\n    transition: 300ms ease-in-out;\n}\n\n\n.Input-module_selectContainer__12gH0:hover, .Input-module_selectContainer__12gH0:focus, .Input-module_selectContainer__12gH0:focus-visible, .Input-module_selectContainer__12gH0:focus-within, .Input-module_imageFieldContainer__21M-f:hover, .Input-module_imageFieldContainer__21M-f:focus, .Input-module_imageFieldContainer__21M-f:focus-visible, .Input-module_imageFieldContainer__21M-f:focus-within, .Input-module_inputContainer__2h9z6:hover, .Input-module_inputContainer__2h9z6:focus, .Input-module_inputContainer__2h9z6:focus-visible, .Input-module_inputContainer__2h9z6:focus-within  {\n    color: #262626;\n    box-shadow: 0 0 2px 1px #0095ff;\n    border: #0095ff 1px solid;\n    background: #E8F0FE;\n}\n\n\n.Input-module_modalContainer__1a6KS {\n    background: white;\n    border-radius: 8px;\n    width: clamp(500px, 75%, 1000px);\n    height: fit-content;\n\n    display: grid;\n\n    grid-template-rows: calc(100% - 64px) 64px;\n\n    overflow: hidden;\n\n    position: relative;\n    max-height: 80%;\n}\n\n.Input-module_modalContainer__1a6KS > div {\n    /*height: 100%;*/\n    width: 100%;\n}\n\n.Input-module_modalFooter__12Fir {\n    grid-row: 2;\n    background: #f4f5fa;\n    display: flex;\n    justify-content: flex-end;\n    align-items: center;\n\n    border-radius: 0 0 8px 8px;\n    padding: 24px 32px 24px 32px;\n    gap: 16px;\n    border-top: #ecedf2 1px solid;\n\n}\n\n.Input-module_modalContent__2A-bl {\n    grid-row: 1;\n    width: 100%;\n\n    overflow: auto;\n    padding: 32px clamp(32px, 10%, 64px);\n}\n\n.Input-module_rowContainer__2kCPs {\n    font-family: 'Roboto' !important;\n    background: #f4f5fa;\n    border: #ecedf2 1px solid;\n\n    transition: 300ms ease-in-out;\n\n    width: 100%;\n    height: 56px;\n\n    padding: 8px;\n\n    border-radius: 8px;\n\n    display: flex;\n\n    align-items: center;\n    justify-content: flex-start;\n\n    cursor: pointer;\n    outline: none;\n}\n\n.Input-module_rowContainer__2kCPs:hover {\n    /*border-color: #0095ff;*/\n    box-shadow: 0 0 4px 2px #0095ff;\n}\n";
var styles = {"visibilityContainer":"Input-module_visibilityContainer__dLrc_","fieldsContainer":"Input-module_fieldsContainer__iM9Q7","inputContainer":"Input-module_inputContainer__2h9z6","selectContainer":"Input-module_selectContainer__12gH0","dropDownContainer":"Input-module_dropDownContainer__3Rz2x","dropDownChoicesContainer":"Input-module_dropDownChoicesContainer__kWPp2","labelContainer":"Input-module_labelContainer__6xKf5","alertLabel":"Input-module_alertLabel__3IRsW","uploadFormContainer":"Input-module_uploadFormContainer__1Q3GZ","imageFieldContainer":"Input-module_imageFieldContainer__21M-f","modalContainer":"Input-module_modalContainer__1a6KS","modalFooter":"Input-module_modalFooter__12Fir","modalContent":"Input-module_modalContent__2A-bl","rowContainer":"Input-module_rowContainer__2kCPs"};
styleInject(css_248z);

var LocalePT = {
  required: 'Este campo é obrigatório.'
};

function DateField(props) {
  var lang = LocalePT;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: props.width,
      height: '100px',
      display: 'grid',
      alignItems: props.value ? 'unset' : 'flex-start',
      gap: '4px'
    }
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: 'input-' + props.label + '-date',
    className: styles.labelContainer
  }, props.label), /*#__PURE__*/React.createElement("div", {
    className: styles.fieldsContainer
  }, /*#__PURE__*/React.createElement("input", {
    disabled: props.disabled,
    id: 'input-' + props.label + '-date',
    style: {
      height: '56px',
      fontWeight: 500,
      fontSize: '1rem',
      fontFamily: '\'Source Sans Pro\', sans-serif',
      cursor: props.disabled ? 'initial' : 'text'
    },
    className: styles.inputContainer,
    value: props.value,
    type: 'date',
    onChange: props.handleChange,
    maxLength: props.maxLength
  })), /*#__PURE__*/React.createElement("label", {
    htmlFor: 'input-' + props.label + '-date',
    className: styles.alertLabel,
    style: {
      color: props.value === null || !props.value ? '#ff5555' : '#262626',
      visibility: props.required ? 'visible' : 'hidden'
    }
  }, lang.required));
}
DateField.propTypes = {
  width: PropTypes.string,
  label: PropTypes.string,
  handleChange: PropTypes.func,
  value: PropTypes.number,
  required: PropTypes.bool,
  locale: PropTypes.string,
  disabled: PropTypes.bool,
  dark: PropTypes.bool
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

function TextField(props) {
  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      visible = _useState2[0],
      setVisible = _useState2[1];

  var lang = LocalePT;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: props.width,
      height: props.variant === 'small' ? '86px' : '100px',
      display: 'grid',
      alignItems: props.value ? 'unset' : 'flex-start',
      gap: '4px'
    }
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: props.label + 'text_field',
    className: styles.labelContainer,
    style: {
      visibility: props.value !== undefined && props.value !== null && props.value.length > 0 || props.type === 'time' ? 'visible' : 'hidden',
      opacity: props.value !== undefined && props.value !== null && props.value.length > 0 || props.type === 'time' ? '1' : '0',
      transition: 'visibility 0.2s ease,opacity 0.2s ease'
    }
  }, props.label), props.phoneMask ? /*#__PURE__*/React.createElement(InputMask, {
    mask: '(99) 9999-9999',
    value: props.value,
    onChange: props.handleChange
  }, function (event) {
    return /*#__PURE__*/React.createElement("input", {
      disabled: props.disabled,
      id: props.label + 'text_field',
      placeholder: props.placeholder,
      className: styles.inputContainer,
      value: event.value,
      onChange: event.onChange,
      maxLength: props.maxLength
    });
  }) : /*#__PURE__*/React.createElement("div", {
    className: styles.fieldsContainer
  }, /*#__PURE__*/React.createElement("input", {
    disabled: props.disabled,
    id: props.label + 'text_field',
    placeholder: props.placeholder,
    value: props.value,
    className: styles.inputContainer,
    type: props.passwordMask && !visible ? 'password' : props.type ? props.type : 'text',
    onChange: props.handleChange,
    maxLength: props.maxLength
  }), props.passwordMask ? !visible ? /*#__PURE__*/React.createElement(VisibilityOffRounded, {
    htmlFor: props.label + 'text_field',
    style: {
      transition: '300ms ease-in-out'
    },
    onClick: function onClick() {
      return setVisible(true);
    },
    className: styles.visibilityContainer
  }) : /*#__PURE__*/React.createElement(VisibilityRounded, {
    htmlFor: props.label + 'text_field',
    style: {
      transition: '300ms ease-in-out'
    },
    className: styles.visibilityContainer,
    onClick: function onClick() {
      return setVisible(false);
    }
  }) : null), /*#__PURE__*/React.createElement("label", {
    htmlFor: props.label + 'text_field',
    className: styles.alertLabel,
    style: {
      color: props.value === null || !props.value || props.value.length === 0 ? '#ff5555' : '#262626',
      visibility: props.required ? 'visible' : 'hidden'
    }
  }, lang.required));
}
TextField.propTypes = {
  width: PropTypes.string,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  handleChange: PropTypes.func,
  value: PropTypes.string,
  required: PropTypes.bool,
  locale: PropTypes.string,
  passwordMask: PropTypes.bool,
  phoneMask: PropTypes.bool,
  maxLength: PropTypes.number,
  disabled: PropTypes.bool,
  variant: PropTypes.oneOf(['default', 'small']),
  type: PropTypes.string
};

function ImageField(props) {
  var lang = LocalePT;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: props.width,
      marginBottom: 'auto',
      height: '100px',
      display: "grid",
      gap: '4px',
      alignItems: props.initialImage ? 'unset' : 'flex-end'
    }
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: 'upload-image',
    className: styles.labelContainer,
    style: {
      visibility: props.initialImage && props.initialImage.name ? 'visible' : 'hidden',
      opacity: props.initialImage ? '1' : '0',
      transition: 'visibility 0.2s ease,opacity 0.2s ease'
    }
  }, props.label), /*#__PURE__*/React.createElement("form", {
    className: styles.imageFieldContainer
  }, props.initialImage && props.initialImage.name ? /*#__PURE__*/React.createElement("p", {
    className: styles.labelContainer,
    style: {
      color: '#262626',
      margin: 'unset',
      overflowX: 'hidden',
      width: '75%',
      wordBreak: 'keep-all',
      whiteSpace: 'nowrap'
    }
  }, props.initialImage.name) : /*#__PURE__*/React.createElement("p", {
    className: styles.labelContainer,
    style: {
      color: '#555555',
      margin: 'unset'
    }
  }, " ", props.label), props.initialImage ? /*#__PURE__*/React.createElement("div", {
    className: styles.uploadFormContainer,
    style: {
      cursor: 'pointer'
    },
    onClick: function onClick() {
      props.setImage(null);
      props.setChanged(true);
    }
  }, /*#__PURE__*/React.createElement(CloseRounded, null)) : /*#__PURE__*/React.createElement("label", {
    htmlFor: "upload-image",
    className: styles.uploadFormContainer,
    onChange: function onChange(event) {
      props.setImage(event);
      props.setChanged(true);
    }
  }, /*#__PURE__*/React.createElement(CloudUploadRounded, null)), /*#__PURE__*/React.createElement("input", {
    id: "upload-image",
    type: "file",
    style: {
      display: 'none'
    },
    disabled: props.disabled,
    onChange: function onChange(event) {
      props.setImage(event);
      props.setChanged(true);
    }
  })), /*#__PURE__*/React.createElement("label", {
    htmlFor: 'input',
    className: styles.alertLabel,
    style: {
      color: props.value === null || !props.value || props.value.length === 0 ? '#ff5555' : '#262626',
      visibility: props.required ? 'visible' : 'hidden'
    }
  }, lang.required));
}
ImageField.propTypes = {
  setImage: PropTypes.func,
  initialImage: PropTypes.any,
  size: PropTypes.string,
  label: PropTypes.string,
  base64: PropTypes.bool,
  setChanged: PropTypes.func,
  width: PropTypes.string,
  required: PropTypes.bool,
  disabled: PropTypes.bool
};

function Button(props) {
  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2);
      _useState2[0];
      var setFocused = _useState2[1];

  var _useState3 = useState(false),
      _useState4 = _slicedToArray(_useState3, 2),
      hovered = _useState4[0],
      setHovered = _useState4[1];

  function getBorder() {
    var response = '5px';

    switch (props.variant) {
      case 'rounded':
        {
          response = '32px';
          break;
        }

      case 'circular':
        {
          response = '50%';
          break;
        }

      case 'custom':
        {
          response = props.borderRadius;
          break;
        }
    }

    return response;
  }

  return /*#__PURE__*/React.createElement("button", {
    onMouseDown: function onMouseDown() {
      return setFocused(true);
    },
    onMouseUp: function onMouseUp() {
      return setFocused(false);
    },
    onMouseEnter: function onMouseEnter() {
      return setHovered(true);
    },
    onMouseLeave: function onMouseLeave() {
      setFocused(false);
      setHovered(false);
    },
    key: props.buttonKey,
    style: {
      width: props.width,
      backgroundColor: props.backgroundColor && !props.disabled ? props.backgroundColor : props.disabled ? 'rgba(0,0,0,0.1)' : 'unset',
      color: !props.disabled ? props.hoverHighlight && hovered ? props.colorVariant === 'secondary' ? '#ff4940' : '#0095ff' : props.fontColor : '#555555',
      borderRadius: getBorder(),
      boxShadow: props.boxShadow,
      padding: props.padding ? props.padding : '8px',
      height: 'auto',
      fontFamily: '\'Roboto\' !important',
      outline: 'none',
      border: props.border,
      // fontSize: '.9rem',
      transition: '200ms ease-in-out',
      cursor: props.disabled ? 'initial' : 'pointer',
      display: 'flex',
      justifyContent: props.justification ? props.justification : 'center'
    },
    disabled: props.disabled,
    onClick: function onClick() {
      if (props.handleClick !== undefined) props.handleClick();
    }
  }, props.content);
}
Button.propTypes = {
  handleClick: PropTypes.func,
  disabled: PropTypes.bool,
  content: PropTypes.any,
  backgroundColor: PropTypes.any,
  fontColor: PropTypes.any,
  padding: PropTypes.string,
  variant: PropTypes.oneOf(['rounded', 'default', 'circle', 'custom']),
  border: PropTypes.string,
  boxShadow: PropTypes.any,
  width: PropTypes.string,
  hoverHighlight: PropTypes.bool,
  justification: PropTypes.string,
  colorVariant: PropTypes.oneOf(['default', 'secondary']),
  borderRadius: PropTypes.any,
  buttonKey: PropTypes.any
};

function DropDownField(props) {
  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      open = _useState2[0],
      setOpen = _useState2[1];

  var _useState3 = useState(undefined),
      _useState4 = _slicedToArray(_useState3, 2),
      value = _useState4[0],
      setValue = _useState4[1];

  var lang = LocalePT;
  useEffect(function () {
    var filtered = props.choices.filter(function (element) {
      if (element.key === props.value) return element;
    });
    if (filtered.length > 0) setValue(filtered[0].value);
  }, [props.value]);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: props.width,
      height: '100px',
      display: 'grid',
      alignItems: props.value ? 'unset' : 'flex-start',
      gap: '4px'
    }
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: 'dropdown-' + props.label,
    className: styles.labelContainer,
    style: {
      visibility: props.value !== undefined && props.value !== null ? 'visible' : 'hidden',
      opacity: props.value !== undefined && props.value !== null ? '1' : '0',
      transition: 'visibility 0.2s ease,opacity 0.2s ease'
    }
  }, props.label), /*#__PURE__*/React.createElement("div", {
    className: styles.dropDownContainer,
    onBlur: function onBlur(event) {
      if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
    }
  }, /*#__PURE__*/React.createElement("button", {
    id: 'dropdown-' + props.label,
    disabled: props.disabled,
    style: {
      height: '56px',
      borderRadius: '5px'
    },
    className: styles.selectContainer,
    onClick: function onClick() {
      return setOpen(!open);
    }
  }, value ? value : props.placeholder, /*#__PURE__*/React.createElement(ArrowDropDownRounded, {
    style: {
      transform: open ? 'unset' : 'rotate(180deg)'
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: styles.dropDownChoicesContainer,
    style: {
      display: open ? 'initial' : 'none'
    }
  }, open ? props.choices.map(function (choice, index) {
    return /*#__PURE__*/React.createElement(Button, {
      key: index + '-choice-button',
      width: '100%',
      paddingType: "default",
      justification: 'flex-start',
      handleClick: function handleClick() {
        props.handleChange(choice.key);
        setOpen(false);
      },
      content: choice.value,
      backgroundColor: choice.key === props.value ? '#0095ff' : 'transparent',
      fontColor: choice.key === props.value ? 'white' : '#262626',
      border: 'transparent 1px solid',
      elevation: false,
      hoverHighlight: choice.key !== props.value
    });
  }) : null)), /*#__PURE__*/React.createElement("label", {
    htmlFor: 'dropdown-' + props.label,
    className: styles.alertLabel,
    style: {
      color: props.value === null || props.value === undefined ? '#ff5555' : '#262626',
      visibility: props.required && !open ? 'visible' : 'hidden'
    }
  }, lang.required));
}
DropDownField.propTypes = {
  width: PropTypes.string,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  choices: PropTypes.array,
  handleChange: PropTypes.func,
  value: PropTypes.any,
  required: PropTypes.bool,
  locale: PropTypes.string,
  disabled: PropTypes.bool,
  dark: PropTypes.bool
};

var SelectorsPT = {
  close: 'Fechar',
  search: 'Pesquisar',
  required: 'Este campo é obrigatório.'
};

function Selector(props) {
  var _props$selected4, _props$selected5;

  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      modal = _useState2[0],
      setModal = _useState2[1];

  var _useState3 = useState(''),
      _useState4 = _slicedToArray(_useState3, 2),
      search = _useState4[0],
      setSearch = _useState4[1];

  var lang = SelectorsPT;

  function renderModal() {
    return /*#__PURE__*/React.createElement(Modal, {
      open: modal,
      onClose: function onClose() {
        return setModal(false);
      },
      style: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: styles.modalContainer,
      style: {
        height: 'clamp(500px, 75%, 1000px',
        alignContent: 'flex-start'
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: styles.modalContent
    }, /*#__PURE__*/React.createElement("h3", {
      style: {
        marginTop: 0,
        marginBottom: '16px'
      }
    }, props.label), props.selected !== undefined && props.selected !== null && props.selected.key !== null && props.selected.key !== undefined ? /*#__PURE__*/React.createElement(Button, {
      content: props.required ? /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h5", {
        style: {
          marginTop: 0,
          marginBottom: 0
        }
      }, props.selected.value)) : /*#__PURE__*/React.createElement("div", {
        style: {
          display: 'flex',
          gap: '32px',
          alignItems: 'center'
        }
      }, /*#__PURE__*/React.createElement("h5", {
        style: {
          marginTop: 0,
          marginBottom: 0
        }
      }, props.selected.value), /*#__PURE__*/React.createElement(DeleteForeverRounded, null)),
      hoverHighlight: true,
      colorVariant: 'secondary',
      variant: 'default',
      border: 'unset',
      width: 'fit-content',
      backgroundColor: '#f4f5fa',
      handleClick: function handleClick() {
        if (props.setChanged) props.setChanged(true);
        props.handleChange(undefined);
      },
      padding: props.required ? '8px 32px 8px 32px' : '8px',
      disabled: props.required,
      fontColor: '#555555'
    }) : null, /*#__PURE__*/React.createElement(TextField, {
      variant: 'small',
      placeholder: lang.search,
      label: lang.search,
      handleChange: function handleChange(event) {
        setSearch(event.target.value);
      },
      locale: props.locale,
      value: search,
      required: false,
      width: '100%',
      maxLength: undefined
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gap: '8px'
      }
    }, props.data.map(function (data) {
      var _props$selected2, _props$selected3;

      return search.length === 0 || search.length > 0 && data.value.toLowerCase().match(search.toLowerCase()) ? /*#__PURE__*/React.createElement("div", {
        key: data.key + '-' + data.value
      }, /*#__PURE__*/React.createElement("button", {
        onClick: function onClick() {
          var _props$selected;

          if (((_props$selected = props.selected) === null || _props$selected === void 0 ? void 0 : _props$selected.key) === data.key) props.handleChange(undefined);else {
            if (props.setChanged) props.setChanged(true);
            props.handleChange(data);
            setModal(false);
          }
        },
        className: styles.rowContainer,
        style: {
          backgroundColor: data.key === ((_props$selected2 = props.selected) === null || _props$selected2 === void 0 ? void 0 : _props$selected2.key) ? '#0095ff' : undefined,
          color: data.key === ((_props$selected3 = props.selected) === null || _props$selected3 === void 0 ? void 0 : _props$selected3.key) ? 'white' : undefined,
          outline: 'none'
        }
      }, data.value)) : null;
    }))), /*#__PURE__*/React.createElement("div", {
      className: styles.modalFooter
    }, /*#__PURE__*/React.createElement(Button, {
      width: 'fit-content',
      border: '#ecedf2 .7px solid',
      variant: 'rounded',
      content: lang.close,
      handleClick: function handleClick() {
        return setModal(false);
      },
      backgroundColor: 'white',
      hoverHighlight: true,
      colorVariant: 'secondary',
      elevation: true,
      fontColor: '#262626',
      padding: '8px 32px 8px 32px'
    }))));
  }

  return /*#__PURE__*/React.createElement(React.Fragment, null, renderModal(), /*#__PURE__*/React.createElement("div", {
    key: props.label + '-selector',
    style: {
      width: props.width,
      height: '100px',
      display: 'grid',
      alignItems: props.value ? 'unset' : 'flex-start',
      gap: '4px'
    }
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: 'select-' + props.label,
    className: styles.labelContainer,
    style: {
      visibility: props.selected !== undefined && props.selected !== null && props.selected.key !== null && props.selected.key !== undefined ? 'visible' : 'hidden',
      opacity: props.selected !== undefined && props.selected !== null && props.selected.key !== null && props.selected.key !== undefined ? '1' : '0',
      transition: 'visibility 0.2s ease,opacity 0.2s ease'
    }
  }, props.label), /*#__PURE__*/React.createElement("div", {
    className: styles.dropDownContainer
  }, /*#__PURE__*/React.createElement("button", {
    id: 'select-' + props.label,
    disabled: props.disabled,
    style: {
      height: '56px',
      borderRadius: '5px',
      cursor: props.disabled ? 'unset' : 'pointer'
    },
    className: styles.selectContainer,
    onClick: function onClick() {
      return setModal(true);
    }
  }, props.selected !== undefined && props.selected !== null && props.selected.key !== null && props.selected.key !== undefined ? /*#__PURE__*/React.createElement(React.Fragment, null, props.selected.value, /*#__PURE__*/React.createElement(ListRounded, {
    style: {
      color: 'rgba(0,0,0,.6)'
    }
  })) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("p", {
    style: {
      color: 'rgba(0,0,0,.55)'
    }
  }, props.label), /*#__PURE__*/React.createElement(AddRounded, {
    style: {
      visibility: props.disabled ? 'hidden' : 'visible',
      color: 'rgba(0,0,0,.6)'
    }
  })))), /*#__PURE__*/React.createElement("label", {
    htmlFor: 'select-' + props.label,
    className: styles.alertLabel,
    style: {
      color: ((_props$selected4 = props.selected) === null || _props$selected4 === void 0 ? void 0 : _props$selected4.key) === null || !((_props$selected5 = props.selected) !== null && _props$selected5 !== void 0 && _props$selected5.key) ? '#ff5555' : '#262626',
      visibility: props.required ? 'visible' : 'hidden'
    }
  }, lang.required)));
}
Selector.propTypes = {
  data: PropTypes.array,
  handleChange: PropTypes.func,
  selected: PropTypes.any,
  label: PropTypes.string,
  width: PropTypes.string,
  required: PropTypes.bool,
  setChanged: PropTypes.func,
  disabled: PropTypes.bool,
  dark: PropTypes.bool
};

export { Button, DateField, DropDownField, ImageField, Selector, TextField };
