import PropTypes from "prop-types";
import EntityTemplate from "./EntityTemplate";
import Canvas from "../modules/canvas/Canvas";
import React from "react";

export default {
    show: PropTypes.func,
    edit: PropTypes.func,
    triggerLink: PropTypes.func,
    options: PropTypes.shape({
        edit: PropTypes.bool,
        move: PropTypes.bool,
        show: PropTypes.bool
    }),

    entities: PropTypes.arrayOf(
        EntityTemplate
    ),
    triggerUpdate: PropTypes.func,
    handleDelete: PropTypes.func,

    handleCreate: PropTypes.func,

    root: PropTypes.object,
    canvasRoot: PropTypes.object,
    handleChange: PropTypes.func,
    handlePrint: PropTypes.func,
    setOpenMenu: PropTypes.func,
    openMenu: PropTypes.number,

    scrollableDivID: PropTypes.any
}