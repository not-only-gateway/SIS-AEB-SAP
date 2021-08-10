import styles from "../../../styles/Node.module.css";
import NodePropsTemplate from "../../../templates/NodePropsTemplate";
import PropTypes from 'prop-types'


export default function Wrapper(props) {

    return (
        <div className={styles.nodeShapeContainer} id={props.node.id + '-*wrapper'}
             onMouseDown={event => {
                 if (typeof event === 'object' && event.button === 0 && typeof event.target.className !== 'object' && (props.toBeLinked === null || props.node.id !== props.toBeLinked.id)) {

                     props.setSelected(props.node)
                     props.move({
                         node: props.node,
                         event: event
                     })
                 }
             }}
             onClick={() => {
                 props.setSelected(props.node)
             }}
             onDoubleClick={() => {
                 props.openOverview()
             }}
             onContextMenu={e => {
                 // if (props.toBeLinked === null && !props.asStep)
                 // props.setOpenContext(
                 //     <ContextMenu
                 //         handleClose={() => props.setOpenContext(null, null, null)}
                 //         entity={props.node}
                 //         handleDelete={() => props.handleDelete(props.index, props.node.id)}
                 //         show={props.openOverview}
                 //         handleLink={type => props.handleLink(props.node.id, type)}
                 //     />,
                 //     (e.clientX),
                 //     (e.clientY - 40)
                 // )
             }}
        >
            {props.children}
        </div>
    )
}

Wrapper.propTypes = {...NodePropsTemplate, ...{reference: PropTypes.object}}