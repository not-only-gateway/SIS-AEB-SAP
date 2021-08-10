import styles from '../../styles/Menu.module.css'
import PropTypes from "prop-types";
import {useRef} from "react";
import Shapes from "./misc/customization/Shapes";
import NodeTemplate from "../../templates/NodeTemplate";
import Connections from "./misc/customization/Connections";

export default function SideBar(props) {
    const ref = useRef()

    return (
        <div className={styles.container} ref={ref}>
                <div className={styles.header}>
                    Formas
                </div>
            <Shapes
                data={props.data} setData={props.setState} scale={props.scale}
                root={props.root} contextMenuRef={props.contextMenuRef}
            />
            <Connections
                data={props.data} setData={props.setState}
            />
        </div>
    )
}
SideBar.propTypes = {
    data: PropTypes.object,
    setState: PropTypes.func,
    root: PropTypes.object,
    contextMenuRef: PropTypes.object,
    selectedNode: NodeTemplate,
    setSelectedNode: PropTypes.func
}