function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var PropTypes = _interopDefault(require('prop-types'));
var InputMask = _interopDefault(require('react-input-mask'));
var utils = require('@material-ui/core/utils');
var core = require('@material-ui/core');

function DateField(props) {
  function getLang(locale) {
    var response = 'This field is required.';
    if (locale === 'pt') response = 'Este campo é obrigatório.';
    return response;
  }

  return /*#__PURE__*/React__default.createElement("div", {
    style: {
      width: props.width,
      height: '100px',
      display: 'grid',
      alignItems: props.value ? 'unset' : 'flex-start',
      gap: '4px'
    }
  }, /*#__PURE__*/React__default.createElement("label", {
    htmlFor: 'input-' + props.label + '-date',
    className: '.labelContainer'
  }, props.label), /*#__PURE__*/React__default.createElement("div", {
    className: '.fieldsContainer'
  }, /*#__PURE__*/React__default.createElement("input", {
    disabled: props.disabled,
    id: 'input-' + props.label + '-date',
    style: {
      height: '56px',
      fontWeight: 500,
      fontSize: '1rem',
      fontFamily: '\'Source Sans Pro\', sans-serif',
      cursor: props.disabled ? 'initial' : 'text'
    },
    className: '.inputContainer',
    value: props.value,
    type: 'date',
    onChange: props.handleChange,
    maxLength: props.maxLength
  })), /*#__PURE__*/React__default.createElement("label", {
    htmlFor: 'input-' + props.label + '-date',
    className: '.alertLabel',
    style: {
      color: props.value === null || !props.value ? '#ff5555' : '#262626',
      visibility: props.required ? 'visible' : 'hidden'
    }
  }, getLang(props.locale)));
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

var AddRounded = utils.createSvgIcon( /*#__PURE__*/React.createElement("path", {
  d: "M18 13h-5v5c0 .55-.45 1-1 1s-1-.45-1-1v-5H6c-.55 0-1-.45-1-1s.45-1 1-1h5V6c0-.55.45-1 1-1s1 .45 1 1v5h5c.55 0 1 .45 1 1s-.45 1-1 1z"
}), 'AddRounded');

var ArrowDropDownRounded = utils.createSvgIcon( /*#__PURE__*/React.createElement("path", {
  d: "M8.71 11.71l2.59 2.59c.39.39 1.02.39 1.41 0l2.59-2.59c.63-.63.18-1.71-.71-1.71H9.41c-.89 0-1.33 1.08-.7 1.71z"
}), 'ArrowDropDownRounded');

var CloseRounded = utils.createSvgIcon( /*#__PURE__*/React.createElement("path", {
  d: "M18.3 5.71a.9959.9959 0 00-1.41 0L12 10.59 7.11 5.7a.9959.9959 0 00-1.41 0c-.39.39-.39 1.02 0 1.41L10.59 12 5.7 16.89c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0L12 13.41l4.89 4.89c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z"
}), 'CloseRounded');

var CloudUploadRounded = utils.createSvgIcon( /*#__PURE__*/React.createElement("path", {
  d: "M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM14 13v4h-4v-4H7l4.65-4.65c.2-.2.51-.2.71 0L17 13h-3z"
}), 'CloudUploadRounded');

var DeleteForeverRounded = utils.createSvgIcon( /*#__PURE__*/React.createElement("path", {
  d: "M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v10zm3.17-7.83c.39-.39 1.02-.39 1.41 0L12 12.59l1.42-1.42c.39-.39 1.02-.39 1.41 0 .39.39.39 1.02 0 1.41L13.41 14l1.42 1.42c.39.39.39 1.02 0 1.41-.39.39-1.02.39-1.41 0L12 15.41l-1.42 1.42c-.39.39-1.02.39-1.41 0a.9959.9959 0 010-1.41L10.59 14l-1.42-1.42c-.39-.38-.39-1.02 0-1.41zM15.5 4l-.71-.71c-.18-.18-.44-.29-.7-.29H9.91c-.26 0-.52.11-.7.29L8.5 4H6c-.55 0-1 .45-1 1s.45 1 1 1h12c.55 0 1-.45 1-1s-.45-1-1-1h-2.5z"
}), 'DeleteForeverRounded');

var ListRounded = utils.createSvgIcon( /*#__PURE__*/React.createElement("path", {
  d: "M4 13c.55 0 1-.45 1-1s-.45-1-1-1-1 .45-1 1 .45 1 1 1zm0 4c.55 0 1-.45 1-1s-.45-1-1-1-1 .45-1 1 .45 1 1 1zm0-8c.55 0 1-.45 1-1s-.45-1-1-1-1 .45-1 1 .45 1 1 1zm4 4h12c.55 0 1-.45 1-1s-.45-1-1-1H8c-.55 0-1 .45-1 1s.45 1 1 1zm0 4h12c.55 0 1-.45 1-1s-.45-1-1-1H8c-.55 0-1 .45-1 1s.45 1 1 1zM7 8c0 .55.45 1 1 1h12c.55 0 1-.45 1-1s-.45-1-1-1H8c-.55 0-1 .45-1 1zm-3 5c.55 0 1-.45 1-1s-.45-1-1-1-1 .45-1 1 .45 1 1 1zm0 4c.55 0 1-.45 1-1s-.45-1-1-1-1 .45-1 1 .45 1 1 1zm0-8c.55 0 1-.45 1-1s-.45-1-1-1-1 .45-1 1 .45 1 1 1zm4 4h12c.55 0 1-.45 1-1s-.45-1-1-1H8c-.55 0-1 .45-1 1s.45 1 1 1zm0 4h12c.55 0 1-.45 1-1s-.45-1-1-1H8c-.55 0-1 .45-1 1s.45 1 1 1zM7 8c0 .55.45 1 1 1h12c.55 0 1-.45 1-1s-.45-1-1-1H8c-.55 0-1 .45-1 1z"
}), 'ListRounded');

var VisibilityOffRounded = utils.createSvgIcon( /*#__PURE__*/React.createElement("path", {
  d: "M12 6.5c2.76 0 5 2.24 5 5 0 .51-.1 1-.24 1.46l3.06 3.06c1.39-1.23 2.49-2.77 3.18-4.53C21.27 7.11 17 4 12 4c-1.27 0-2.49.2-3.64.57l2.17 2.17c.47-.14.96-.24 1.47-.24zM2.71 3.16c-.39.39-.39 1.02 0 1.41l1.97 1.97C3.06 7.83 1.77 9.53 1 11.5 2.73 15.89 7 19 12 19c1.52 0 2.97-.3 4.31-.82l2.72 2.72c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L4.13 3.16c-.39-.39-1.03-.39-1.42 0zM12 16.5c-2.76 0-5-2.24-5-5 0-.77.18-1.5.49-2.14l1.57 1.57c-.03.18-.06.37-.06.57 0 1.66 1.34 3 3 3 .2 0 .38-.03.57-.07L14.14 16c-.65.32-1.37.5-2.14.5zm2.97-5.33c-.15-1.4-1.25-2.49-2.64-2.64l2.64 2.64z"
}), 'VisibilityOffRounded');

var VisibilityRounded = utils.createSvgIcon( /*#__PURE__*/React.createElement("path", {
  d: "M12 4C7 4 2.73 7.11 1 11.5 2.73 15.89 7 19 12 19s9.27-3.11 11-7.5C21.27 7.11 17 4 12 4zm0 12.5c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"
}), 'VisibilityRounded');

function TextField(props) {
  var _useState = React.useState(false),
      visible = _useState[0],
      setVisible = _useState[1];

  function getLang(locale) {
    var response = 'This field is required.';
    if (locale === 'pt') response = 'Este campo é obrigatório.';
    return response;
  }

  return /*#__PURE__*/React__default.createElement("div", {
    style: {
      width: props.width,
      height: props.variant === 'small' ? '86px' : '100px',
      display: 'grid',
      alignItems: props.value ? 'unset' : 'flex-start',
      gap: '4px'
    }
  }, /*#__PURE__*/React__default.createElement("label", {
    htmlFor: props.label + 'text_field',
    className: '.labelContainer',
    style: {
      visibility: props.value !== undefined && props.value !== null && props.value.length > 0 || props.type === 'time' ? 'visible' : 'hidden',
      opacity: props.value !== undefined && props.value !== null && props.value.length > 0 || props.type === 'time' ? '1' : '0',
      transition: 'visibility 0.2s ease,opacity 0.2s ease'
    }
  }, props.label), props.phoneMask ? /*#__PURE__*/React__default.createElement(InputMask, {
    mask: '(99) 9999-9999',
    value: props.value,
    onChange: props.handleChange
  }, function (event) {
    return /*#__PURE__*/React__default.createElement("input", {
      disabled: props.disabled,
      id: props.label + 'text_field',
      placeholder: props.placeholder,
      className: '.inputContainer',
      value: event.value,
      onChange: event.onChange,
      maxLength: props.maxLength
    });
  }) : /*#__PURE__*/React__default.createElement("div", {
    className: '.fieldsContainer'
  }, /*#__PURE__*/React__default.createElement("input", {
    disabled: props.disabled,
    id: props.label + 'text_field',
    placeholder: props.placeholder,
    className: '.inputContainer',
    value: props.value,
    style: {
      height: props.variant === 'small' ? '40px' : undefined
    },
    type: props.passwordMask && !visible ? 'password' : props.type ? props.type : 'text',
    onChange: props.handleChange,
    maxLength: props.maxLength
  }), props.passwordMask ? !visible ? /*#__PURE__*/React__default.createElement(VisibilityOffRounded, {
    htmlFor: props.label + 'text_field',
    style: {
      transition: '300ms ease-in-out'
    },
    onClick: function onClick() {
      return setVisible(true);
    },
    className: '.visibilityContainer'
  }) : /*#__PURE__*/React__default.createElement(VisibilityRounded, {
    htmlFor: props.label + 'text_field',
    style: {
      transition: '300ms ease-in-out'
    },
    className: '.visibilityContainer',
    onClick: function onClick() {
      return setVisible(false);
    }
  }) : null), /*#__PURE__*/React__default.createElement("label", {
    htmlFor: props.label + 'text_field',
    className: '.alertLabel',
    style: {
      color: props.value === null || !props.value || props.value.length === 0 ? '#ff5555' : '#262626',
      visibility: props.required ? 'visible' : 'hidden'
    }
  }, getLang(props.locale)));
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
  function getLang(locale) {
    var response = 'This field is required.';
    if (locale === 'pt') response = 'Este campo é obrigatório.';
    return response;
  }

  return /*#__PURE__*/React__default.createElement("div", {
    style: {
      width: props.width,
      marginBottom: 'auto',
      height: '100px',
      display: "grid",
      gap: '4px',
      alignItems: props.initialImage ? 'unset' : 'flex-end'
    }
  }, /*#__PURE__*/React__default.createElement("label", {
    htmlFor: 'upload-image',
    className: '.labelContainer',
    style: {
      visibility: props.initialImage && props.initialImage.name ? 'visible' : 'hidden',
      opacity: props.initialImage ? '1' : '0',
      transition: 'visibility 0.2s ease,opacity 0.2s ease'
    }
  }, props.label), /*#__PURE__*/React__default.createElement("form", {
    className: '.imageFieldContainer, .highlight'
  }, props.initialImage && props.initialImage.name ? /*#__PURE__*/React__default.createElement("p", {
    className: '.labelContainer',
    style: {
      color: '#262626',
      margin: 'unset',
      overflowX: 'hidden',
      width: '75%',
      wordBreak: 'keep-all',
      whiteSpace: 'nowrap'
    }
  }, props.initialImage.name) : /*#__PURE__*/React__default.createElement("p", {
    className: '.labelContainer',
    style: {
      color: '#555555',
      margin: 'unset'
    }
  }, " ", props.label), props.initialImage ? /*#__PURE__*/React__default.createElement("div", {
    className: '.uploadFormContainer',
    style: {
      cursor: 'pointer'
    },
    onClick: function onClick() {
      props.setImage(null);
      props.setChanged(true);
    }
  }, /*#__PURE__*/React__default.createElement(CloseRounded, null)) : /*#__PURE__*/React__default.createElement("label", {
    htmlFor: "upload-image",
    className: '.uploadFormContainer',
    onChange: function onChange(event) {
      props.setImage(event);
      props.setChanged(true);
    }
  }, /*#__PURE__*/React__default.createElement(CloudUploadRounded, null)), /*#__PURE__*/React__default.createElement("input", {
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
  })), /*#__PURE__*/React__default.createElement("label", {
    htmlFor: 'input',
    className: '.alertLabel',
    style: {
      color: props.value === null || !props.value || props.value.length === 0 ? '#ff5555' : '#262626',
      visibility: props.required ? 'visible' : 'hidden'
    }
  }, getLang(props.locale)));
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
  var _useState = React.useState(false),
      setFocused = _useState[1];

  var _useState2 = React.useState(false),
      hovered = _useState2[0],
      setHovered = _useState2[1];

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

  return /*#__PURE__*/React__default.createElement("button", {
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
  var _useState = React.useState(false),
      open = _useState[0],
      setOpen = _useState[1];

  var _useState2 = React.useState(undefined),
      value = _useState2[0],
      setValue = _useState2[1];

  function getLang(locale) {
    var response = 'This field is required.';
    if (locale === 'pt') response = 'Este campo é obrigatório.';
    return response;
  }

  React.useEffect(function () {
    var filtered = props.choices.filter(function (element) {
      if (element.key === props.value) return element;
    });
    if (filtered.length > 0) setValue(filtered[0].value);
  }, [props.value]);
  return /*#__PURE__*/React__default.createElement("div", {
    style: {
      width: props.width,
      height: '100px',
      display: 'grid',
      alignItems: props.value ? 'unset' : 'flex-start',
      gap: '4px'
    }
  }, /*#__PURE__*/React__default.createElement("label", {
    htmlFor: 'dropdown-' + props.label,
    className: '.labelContainer',
    style: {
      visibility: props.value !== undefined && props.value !== null ? 'visible' : 'hidden',
      opacity: props.value !== undefined && props.value !== null ? '1' : '0',
      transition: 'visibility 0.2s ease,opacity 0.2s ease'
    }
  }, props.label), /*#__PURE__*/React__default.createElement("div", {
    className: '.dropDownContainer',
    onBlur: function onBlur(event) {
      if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
    }
  }, /*#__PURE__*/React__default.createElement("button", {
    id: 'dropdown-' + props.label,
    disabled: props.disabled,
    style: {
      height: '56px',
      borderRadius: '5px'
    },
    className: '.selectContainer',
    onClick: function onClick() {
      return setOpen(!open);
    }
  }, value ? value : props.placeholder, /*#__PURE__*/React__default.createElement(ArrowDropDownRounded, {
    style: {
      transform: open ? 'unset' : 'rotate(180deg)'
    }
  })), /*#__PURE__*/React__default.createElement("div", {
    className: '.dropDownChoicesContainer',
    style: {
      display: open ? 'initial' : 'none'
    }
  }, open ? props.choices.map(function (choice, index) {
    return /*#__PURE__*/React__default.createElement(Button, {
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
  }) : null)), /*#__PURE__*/React__default.createElement("label", {
    htmlFor: 'dropdown-' + props.label,
    className: '.alertLabel',
    style: {
      color: props.value === null || props.value === undefined ? '#ff5555' : '#262626',
      visibility: props.required && !open ? 'visible' : 'hidden'
    }
  }, getLang(props.locale)));
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

  var _useState = React.useState(false),
      modal = _useState[0],
      setModal = _useState[1];

  var _useState2 = React.useState(''),
      search = _useState2[0],
      setSearch = _useState2[1];

  var lang = SelectorsPT;

  function renderModal() {
    return /*#__PURE__*/React__default.createElement(core.Modal, {
      open: modal,
      onClose: function onClose() {
        return setModal(false);
      },
      style: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }
    }, /*#__PURE__*/React__default.createElement("div", {
      className: '.modalContainer',
      style: {
        height: 'clamp(500px, 75%, 1000px',
        alignContent: 'flex-start'
      }
    }, /*#__PURE__*/React__default.createElement("div", {
      className: '.modalContent'
    }, /*#__PURE__*/React__default.createElement("h3", {
      style: {
        marginTop: 0,
        marginBottom: '16px'
      }
    }, props.label), props.selected !== undefined && props.selected !== null && props.selected.key !== null && props.selected.key !== undefined ? /*#__PURE__*/React__default.createElement(Button, {
      content: props.required ? /*#__PURE__*/React__default.createElement("div", null, /*#__PURE__*/React__default.createElement("h5", {
        style: {
          marginTop: 0,
          marginBottom: 0
        }
      }, props.selected.value)) : /*#__PURE__*/React__default.createElement("div", {
        style: {
          display: 'flex',
          gap: '32px',
          alignItems: 'center'
        }
      }, /*#__PURE__*/React__default.createElement("h5", {
        style: {
          marginTop: 0,
          marginBottom: 0
        }
      }, props.selected.value), /*#__PURE__*/React__default.createElement(DeleteForeverRounded, null)),
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
    }) : null, /*#__PURE__*/React__default.createElement(TextField, {
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
    }), /*#__PURE__*/React__default.createElement("div", {
      style: {
        display: 'grid',
        gap: '8px'
      }
    }, props.data.map(function (data) {
      var _props$selected2, _props$selected3;

      return search.length === 0 || search.length > 0 && data.value.toLowerCase().match(search.toLowerCase()) ? /*#__PURE__*/React__default.createElement("div", {
        key: data.key + '-' + data.value
      }, /*#__PURE__*/React__default.createElement("button", {
        onClick: function onClick() {
          var _props$selected;

          if (((_props$selected = props.selected) === null || _props$selected === void 0 ? void 0 : _props$selected.key) === data.key) props.handleChange(undefined);else {
            if (props.setChanged) props.setChanged(true);
            props.handleChange(data);
            setModal(false);
          }
        },
        className: '.rowContainer',
        style: {
          backgroundColor: data.key === ((_props$selected2 = props.selected) === null || _props$selected2 === void 0 ? void 0 : _props$selected2.key) ? '#0095ff' : undefined,
          color: data.key === ((_props$selected3 = props.selected) === null || _props$selected3 === void 0 ? void 0 : _props$selected3.key) ? 'white' : undefined,
          outline: 'none'
        }
      }, data.value)) : null;
    }))), /*#__PURE__*/React__default.createElement("div", {
      className: '.modalFooter'
    }, /*#__PURE__*/React__default.createElement(Button, {
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

  return /*#__PURE__*/React__default.createElement(Fragment, null, renderModal(), /*#__PURE__*/React__default.createElement("div", {
    key: props.label + '-selector',
    style: {
      width: props.width,
      height: '100px',
      display: 'grid',
      alignItems: props.value ? 'unset' : 'flex-start',
      gap: '4px'
    }
  }, /*#__PURE__*/React__default.createElement("label", {
    htmlFor: 'select-' + props.label,
    className: '.labelContainer',
    style: {
      visibility: props.selected !== undefined && props.selected !== null && props.selected.key !== null && props.selected.key !== undefined ? 'visible' : 'hidden',
      opacity: props.selected !== undefined && props.selected !== null && props.selected.key !== null && props.selected.key !== undefined ? '1' : '0',
      transition: 'visibility 0.2s ease,opacity 0.2s ease'
    }
  }, props.label), /*#__PURE__*/React__default.createElement("div", {
    className: '.dropDownContainer'
  }, /*#__PURE__*/React__default.createElement("button", {
    id: 'select-' + props.label,
    disabled: props.disabled,
    style: {
      height: '56px',
      borderRadius: '5px',
      cursor: props.disabled ? 'unset' : 'pointer'
    },
    className: '.selectContainer',
    onClick: function onClick() {
      return setModal(true);
    }
  }, props.selected !== undefined && props.selected !== null && props.selected.key !== null && props.selected.key !== undefined ? /*#__PURE__*/React__default.createElement(Fragment, null, props.selected.value, /*#__PURE__*/React__default.createElement(ListRounded, {
    style: {
      color: 'rgba(0,0,0,.6)'
    }
  })) : /*#__PURE__*/React__default.createElement(Fragment, null, /*#__PURE__*/React__default.createElement("p", {
    style: {
      color: 'rgba(0,0,0,.55)'
    }
  }, props.label), /*#__PURE__*/React__default.createElement(AddRounded, {
    style: {
      visibility: props.disabled ? 'hidden' : 'visible',
      color: 'rgba(0,0,0,.6)'
    }
  })))), /*#__PURE__*/React__default.createElement("label", {
    htmlFor: 'select-' + props.label,
    className: '.alertLabel',
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

var inputs = function inputs() {
  return {
    DateField: DateField,
    TextField: TextField,
    ImageField: ImageField,
    DropDownField: DropDownField,
    Button: Button,
    Selector: Selector
  };
};

exports.inputs = inputs;
//# sourceMappingURL=index.js.map
