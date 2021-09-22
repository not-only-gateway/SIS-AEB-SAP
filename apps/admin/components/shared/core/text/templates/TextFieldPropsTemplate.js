import PropTypes from "prop-types";
import React from "react";

export default {
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
    variant: PropTypes.oneOf([
        'default',
        'area'
    ]),
    type: PropTypes.string,
    currencyMask: PropTypes.bool,
    maskStart: PropTypes.string
}
