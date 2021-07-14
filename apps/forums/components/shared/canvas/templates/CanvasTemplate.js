import PropTypes from "prop-types";
import NodeTemplate from "./NodeTemplate";
import React from "react";
import LinkTemplate from "./LinkTemplate";

export default {
    onSave: PropTypes.func,
    options: PropTypes.shape({
        edit: PropTypes.bool,
        move: PropTypes.bool,
        show: PropTypes.bool
    }),

    data: PropTypes.shape({
        id: PropTypes.number,
        subject: PropTypes.string,
        description: PropTypes.string,
        dimensions: PropTypes.shape({
            width: PropTypes.number,
            height: PropTypes.number
        }),
        nodes: PropTypes.arrayOf(
            NodeTemplate
        ),

        groups: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.number,
                nodes: PropTypes.arrayOf(
                    PropTypes.number
                )
            })
        ),
        links: PropTypes.arrayOf(
            LinkTemplate
        )
    }),
}