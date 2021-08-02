import styles from '../../styles/Menu.module.css'
import {
    ArrowBackIos,
    ControlCameraRounded,
    DragIndicatorRounded,
    MoreVertRounded,
    VisibilityRounded
} from "@material-ui/icons";
import Tabs from "./misc/Tabs";
import PropTypes from "prop-types";
import {useEffect, useRef, useState} from "react";
import nodeStyles from '../../styles/NodeOverview.module.css'
import MoveNewElement from "../../methods/move/MoveNewElement";
import Shapes from "./misc/Shapes";
import MoveOptions from "../../methods/move/MoveOptions";
import DragHandleRoundedIcon from '@material-ui/icons/DragHandleRounded';

export default function Options(props) {
    const [openTab, setOpenTab] = useState(0)
    const [reduced, setReduced] = useState(false)
    const ref = useRef()
    useEffect(() => {
        if (ref.current !== undefined && ref.current !== null) {
            const frame = document.getElementById('frame')
            if (frame !== null) {
                ref.current.style.height = 'calc(100vh - ' + (frame.offsetTop + 60) + 'px)'
                ref.current.style.top = '50px'
                ref.current.style.left = '10px'
            }
        }
    }, [])
    return (
        <div className={nodeStyles.container} style={{
            width: '350px',
            resize: reduced ? 'none' : 'both',
            height: reduced ? '35px' : 'auto',
            padding: reduced ? '0' : undefined
        }} ref={ref}>
            <div className={nodeStyles.dragHeader} onMouseDown={event => {
                if (typeof event.target.className !== 'object' && event.target.className !== 'NodeOverview_closeButtonContainer__2RYF9')
                    MoveOptions({
                        reference: ref.current,
                        root: props.root,
                        event: event,

                    })
            }}>
                <button className={nodeStyles.closeButtonContainer} onClick={() => {
                    setReduced(false)
                    const frame = document.getElementById('frame')
                    ref.current.style.top = '50px'
                    ref.current.style.left = '10px'
                    if (frame !== null)
                        ref.current.style.height = 'calc(100vh - ' + (frame.offsetTop + 60) + 'px)'


                }}>
                    <DragHandleRoundedIcon style={{
                        fontSize: '1.2rem',
                        transition: '150ms linear'
                    }}/>
                </button>
                Opções
                <button className={nodeStyles.closeButtonContainer} onClick={() => setReduced(!reduced)}>
                    <ArrowBackIos style={{
                        fontSize: '1.2rem',
                        transform: reduced ? 'translateY(-.3rem) rotate(-90deg)' : 'translateY(.3rem) rotate(90deg)',
                        transition: '150ms linear'
                    }}/>
                </button>
            </div>

            {reduced ? null :
                <Tabs
                    buttons={[
                        {
                            key: 0,
                            value: 'Ações',
                            content: (
                                <Shapes onDragStart={type => MoveNewElement({...props, ...{type: type}})}
                                        data={props.data} setData={props.setState}/>
                            )
                        },
                        {
                            key: 1,
                            value: 'Ajuda',
                            content: (
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
                        }

                    ]}
                    setOpenTab={setOpenTab}
                    openTab={openTab}/>
            }
        </div>
    )
}
Options.propTypes = {
    data: PropTypes.object,
    setState: PropTypes.func,
    root: PropTypes.object,
}