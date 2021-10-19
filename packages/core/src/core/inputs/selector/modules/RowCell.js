import useField from "../../../shared/hooks/useField";
import PropTypes from 'prop-types'
import React from "react";

export default function RowCell(props){
    return useField(props.field, props.data)
}
RowCell.propTypes={
    data: PropTypes.object,
    field: PropTypes.object
}
