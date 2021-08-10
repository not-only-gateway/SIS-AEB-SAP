import styles from "../styles/Footer.module.css";
import {useRef, useState} from "react";
import PropTypes from "prop-types";
import {ArrowBackRounded} from "@material-ui/icons";

export default function PageField(props) {
    const ref = useRef()
    const [focused, setFocused] = useState(false)
    const [openContext, setOpenContext] = useState(false)
    const [event, setEvent] = useState({})
    return (
        <div style={{position: 'relative', display: 'flex'}}>

            {/*{openContext ?*/}
            {/*    <Context*/}
            {/*        buttons={[*/}
            {/*            {label: 'Renomear', onClick: () => ref.current.focus(), icon: <EditRounded style={{fontSize: '1.2rem'}}/>},*/}
            {/*            {label: 'Duplicar', onClick: () => null, icon: <FileCopyRounded style={{fontSize: '1.2rem'}}/>},*/}
            {/*            {label: 'Excluir', onClick: () => null, icon: <DeleteForeverRounded style={{fontSize: '1.2rem'}}/>}*/}
            {/*        ]}*/}
            {/*        contextMenuRef={props.contextMenuRef}*/}
            {/*        render={openContext}*/}
            {/*        placement={event}*/}
            {/*        handleClose={() => {*/}
            {/*            setEvent({})*/}
            {/*            setOpenContext(false)*/}
            {/*        }}*/}
            {/*    />*/}
            {/*    :*/}
            {/*    null*/}
            {/*}*/}


            <input
                className={[styles.pageButton, props.page.default ? styles.mainPage : ''].join(' ')}
                onContextMenu={event => {
                    event.preventDefault()
                    setOpenContext(true)
                }} value={props.page.title}
                style={{background: focused ? '#E8F0FE' : undefined, cursor: focused ? 'text' : 'pointer'}}
                onClick={() => {
                    if (!focused)
                        ref.current.blur()
                }}
                ref={ref}
                onDoubleClick={() => {
                    ref.current.focus()
                    setFocused(true)
                }} onBlur={() => setFocused(false)}/>
            <button onClick={e => {
                setOpenContext(!openContext)
                setEvent(e)
            }}>
                <ArrowBackRounded/>
            </button>
        </div>
    )
}
PageField.propTypes = {
    page: PropTypes.func,
    contextMenuRef: PropTypes.object
}