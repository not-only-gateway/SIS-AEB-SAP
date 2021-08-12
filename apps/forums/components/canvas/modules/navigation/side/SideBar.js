import styles from './styles/Menu.module.css'
import PropTypes from "prop-types";
import {useRef, useState} from "react";
import Shapes from "./modules/Shapes";
import NodeTemplate from "../../../templates/NodeTemplate";
import Connections from "./modules/Connections";
import {ExpandLessRounded, MenuOpenRounded, RemoveRounded} from "@material-ui/icons";

export default function SideBar(props) {
    const ref = useRef()
    const [open, setOpen] = useState(false)
    return (
        <div className={styles.container} ref={ref} style={{
            width: open ? '300px' : '40px',
            padding: !open ? 'none' : '0 8px 0 8px',
            justifyContent: !open ? 'center' : undefined,
            justifyItems: !open ? 'center' : undefined
        }}>
            <div className={styles.header} style={{
                justifyContent: !open ? 'center' : undefined,
                justifyItems: !open ? 'center' : undefined,
                background: !open ? 'transparent' : undefined
            }}>
                {open ? 'Formas' : null}
                <button onClick={() => setOpen(!open)} className={styles.extendButton}
                        style={{
                            textOrientation: !open ? 'mixed' : undefined,
                            writingMode: !open ? ' vertical-rl' : undefined
                        }}>
                    {open ? <RemoveRounded/> : 'Formas'}
                </button>
            </div>
            {!open ? null :
                <Shapes
                    data={props.data} setData={props.setState} scale={props.scale}
                    root={props.root} contextMenuRef={props.contextMenuRef}
                />
            }
            {!open ? null :
                <Connections
                    data={props.data} setData={props.setState}
                />
            }
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