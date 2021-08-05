import styles from '../../styles/Menu.module.css'
import {
    ArrowBackIos,
    ControlCameraRounded,
    DragIndicatorRounded, ExtensionRounded, HelpRounded,
    MoreVertRounded,
    VisibilityRounded
} from "@material-ui/icons";
import Tabs from "./misc/Tabs";
import PropTypes from "prop-types";
import {useEffect, useRef, useState} from "react";
import Shapes from "./misc/Shapes";
import MoveOptions from "../../methods/move/MoveOptions";
import DragHandleRoundedIcon from '@material-ui/icons/DragHandleRounded';

export default function SideBar(props) {
    const [openTab, setOpenTab] = useState(0)
    const [reduced, setReduced] = useState(true)
    const ref = useRef()
    useEffect(() => {
        if (props.root !== undefined)
            props.root.style.width = `calc(100% - ${reduced ? 45 : 280}px)`
    }, [reduced])

    const render = () => {
        let response = null
        if (!reduced)
            switch (openTab) {
                case 0: {
                    response = (
                        <Shapes
                            onDragStart={type => MoveNewElement({...props, ...{type: type}})}
                            data={props.data} setData={props.setState} scale={props.scale} root={props.root}
                            contextMenuRef={props.contextMenuRef}
                        />
                    )
                    break
                }
                case 1: {
                    response = (
                        <div className={styles.options}>
                            <div className={styles.helpContainer}>
                                <VisibilityRounded style={{transform: 'rotate(180deg)'}}/>
                                Clique duplo para abrir overview.
                            </div>
                            <div className={styles.helpContainer}>
                                <DragIndicatorRounded/>
                                Clique e segure para mover módulo.
                            </div>
                            <div className={styles.helpContainer}>
                                <MoreVertRounded/>
                                Botão direito para menu de contexto.
                            </div>
                            <div className={styles.helpContainer}>
                                <ControlCameraRounded/>
                                Botão direito e segure para mover canvas.
                            </div>
                        </div>
                    )
                    break
                }
            }
        return response
    }


    return (
        <div className={styles.container} style={{
            width: reduced ? '45px' : '280px',
            borderRight: reduced ? undefined : '#ecedf2 1px solid'
        }} ref={ref}>
            <div className={styles.buttons}>
                <button
                    className={styles.button}
                    style={{
                        color: openTab === 0 && !reduced ? '#0095ff' : undefined,
                        background: openTab === 0 && !reduced ? '#E8F0FE' : undefined
                    }}
                    onClick={() => {
                        setReduced(!reduced)
                        setOpenTab(0)
                    }}>

                    <ExtensionRounded style={{
                        fontSize: '1.3rem'
                    }}/>
                </button>
                <button
                    className={styles.button}
                    style={{
                        color: openTab === 1 && !reduced ? '#0095ff' : undefined,
                        background: openTab === 1 && !reduced ? '#E8F0FE' : undefined
                    }}
                    onClick={() => {
                        setReduced(!reduced)
                        setOpenTab(1)
                    }}>
                    <HelpRounded style={{fontSize: '1.3rem'}}/>
                </button>
            </div>
            {render()}
        </div>
    )
}
SideBar.propTypes = {
    data: PropTypes.object,
    setState: PropTypes.func,
    root: PropTypes.object,
    contextMenuRef: PropTypes.object
}