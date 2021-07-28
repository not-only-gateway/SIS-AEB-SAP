import NodeContextMenu from "./NodeContextMenu";
import styles from "../../styles/Node.module.css";
import NodePropsTemplate from "../../templates/NodePropsTemplate";
import Node from "./Node";
import PropTypes from 'prop-types'


export default function NodeContentWrapper(props){

    return(
        <div className={styles.nodeShapeContainer}
            onMouseDown={event => {
                if (event.button === 0 && props.toBeLinked !== null && props.toBeLinked.id !== props.node.id)
                    props.handleLink(props.node.id, undefined)
                if (typeof event === 'object' && event.button === 0 && typeof event.target.className !== 'object' && (props.toBeLinked === null || props.node.id !== props.toBeLinked.id)) {
                    props.setSelected(props.node.id)
                    props.move({
                        node: props.node,
                        event: event
                    })
                }
            }}
            onDoubleClick={() => {
                props.openOverview()
            }}
            onContextMenu={e => {
                if (props.toBeLinked === null)
                    props.setOpenContext(
                        <NodeContextMenu
                            handleClose={() => props.setOpenContext(null, null, null)}
                            entity={props.node}
                            handleDelete={() => props.handleDelete(props.index, props.node.id)}
                            show={props.openOverview}
                            handleLink={type => props.handleLink(props.node.id, type)}
                        />,
                        (e.clientX),
                        (e.clientY - 40)
                    )
            }}
        >
            {props.children}
        </div>
    )
}

NodeContentWrapper.propTypes = {...NodePropsTemplate, ...{reference: PropTypes.object}}