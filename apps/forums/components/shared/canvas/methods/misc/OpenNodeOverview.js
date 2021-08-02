import ReactDOM from "react-dom";
import Overview from "../../modules/node/misc/Overview";
import React from "react";
import CanvasTemplate from "../../templates/CanvasPropsTemplate";
import PropTypes from "prop-types";

export default function OpenNodeOverview(props){
    if (props.openNodeOverview !== props.node.id) {
        const nodeEl = document.getElementById(props.openNodeOverview + '-node')
        if (nodeEl !== null)
            nodeEl.style.border = 'transparent 2px solid'
    }
    props.setOpenNodeOverview(props.node.id)
    if (props.contextMenuRef.firstChild)
        ReactDOM.unmountComponentAtNode(props.contextMenuRef)

    const nodeEl = document.getElementById(props.node.id + '-node')
    if (nodeEl !== null) {
        nodeEl.style.border = props.node.color + ' 2px solid'

        props.setSelectedNode(null)
        ReactDOM.render(
            <Overview
                node={props.node} setState={props.setData} data={props.data}
                contextMenuRef={props.contextMenuRef}
                root={props.root} nodeIndex={props.index}
                handleClose={() => {
                    props.setSelectedNode(props.node.id)
                    if (nodeEl !== null)
                        nodeEl.style.border = 'transparent 2px solid'
                    props.setOpenNodeOverview(false)
                    props.contextMenuRef.style.right = 'unset'

                    ReactDOM.unmountComponentAtNode(props.contextMenuRef)
                }}
            />,
            props.contextMenuRef
        )

        props.contextMenuRef.style.top = (nodeEl.getBBox().y - props.root.scrollTop) + 'px'
        props.contextMenuRef.style.left = (nodeEl.getBBox().x - props.root.scrollLeft +nodeEl.firstChild.getBBox().width)+ 'px'
    }
}

OpenNodeOverview.propTypes = {
    ...CanvasTemplate,
    ...{
        contextMenuRef: PropTypes.object,
        root: PropTypes.object,
        scale: PropTypes.number,
        index: PropTypes.number,
        setData: PropTypes.func,
        data: PropTypes.object,
        setOpenNodeOverview: PropTypes.func,
        openNodeOverview: PropTypes.any,
        setSelectedNode: PropTypes.func,
        selectedNode: PropTypes.any,
        node: PropTypes.object,
        toBeLinked: PropTypes.object,
        setToBeLinked: PropTypes.func,
        asStep: PropTypes.bool,
        nodesRef: PropTypes.object
    }
}