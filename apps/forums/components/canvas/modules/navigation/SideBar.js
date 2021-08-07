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
import NodeTemplate from "../../templates/NodeTemplate";

export default function SideBar(props) {
    const [openTab, setOpenTab] = useState(0)
    const [reduced, setReduced] = useState(true)
    const ref = useRef()
    const contentRef = useRef()
    const [exitAnimation, setExitAnimation] = useState(undefined)
    const render = () => {
        let response = null
        if (!reduced)
            switch (openTab) {
                case 0: {
                    response = (
                        <Shapes
                            data={props.data} setData={props.setState} scale={props.scale} root={props.root}
                            contextMenuRef={props.contextMenuRef}
                        />
                    )
                    break
                }
                case 1: {
                    response = (
                        <>
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
                        </>
                    )
                    break
                }
            }
        return response
    }


    return (
        <div className={styles.container} style={{
            width: '60px'
        }} ref={ref}>
            <div className={styles.buttons}>
                <button
                    className={styles.button}
                    style={{
                        color: openTab === 0 && !reduced ? '#0095ff' : undefined,
                        background: openTab === 0 && !reduced ? '#E8F0FE' : undefined,
                        boxShadow: openTab === 0 && !reduced ? 'rgba(0, 0, 0, 0.05) 0px 1px 2px 0px' : undefined
                    }}
                    onClick={() => {
                        if (!reduced) {
                            setExitAnimation(styles.exitAnim)
                            contentRef.current.addEventListener('animationend', () => {
                                setReduced(true)
                            }, {
                                once: true
                            })
                        } else {
                            setExitAnimation(undefined)
                            setReduced(false)
                        }

                        setOpenTab(0)
                    }}>

                    <ExtensionRounded/>
                </button>
                <button
                    className={styles.button}
                    style={{
                        color: openTab === 1 && !reduced ? '#0095ff' : undefined,
                        background: openTab === 1 && !reduced ? '#E8F0FE' : undefined
                    }}
                    onClick={() => {
                        if (!reduced) {
                            setExitAnimation(styles.exitAnim)
                            contentRef.current.addEventListener('animationend', () => {
                                setExitAnimation(undefined)
                                setReduced(true)
                            }, {
                                once: true
                            })
                        } else {
                            setExitAnimation(undefined)
                            setReduced(false)
                        }
                        setOpenTab(1)
                    }}>
                    <HelpRounded/>
                </button>

            </div>
            {!reduced ?
                <div className={[exitAnimation !== undefined ? exitAnimation : ' ', styles.content].join(' ')} ref={contentRef}>
                    {render()}
                </div>
                :
                null
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