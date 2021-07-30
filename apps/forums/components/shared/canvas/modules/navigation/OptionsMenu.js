import styles from '../../styles/Menu.module.css'
import {
    ControlCameraRounded,
    DragIndicatorRounded,
    FileCopyRounded, KeyboardArrowRight, KeyboardArrowRightRounded,
    LocalLibraryRounded, MenuRounded,
    MoreVertRounded,
    PictureAsPdfRounded,
    PublishRounded,
    SaveAltRounded,
    VisibilityRounded
} from "@material-ui/icons";
import Tabs from "./Tabs";
import PropTypes from "prop-types";
import {useState} from "react";
import HandleDownload from "../../methods/handles/HandleDownload";
import HandleUpload from "../../methods/handles/HandleUpload";

import MoveNewElement from "../../methods/move/MoveNewElement";
import Shapes from "../misc/Shapes";

export default function OptionsMenu(props) {
    const [openTab, setOpenTab] = useState(0)
    const menu = (
        <div className={styles.options}>
            <input type="file" id="upload_file_input" style={{display: 'none'}} multiple={false}
                   onChange={event => HandleUpload({
                       file: event,
                       setData: props.setState,
                   })}
                   accept={'.canvas'}/>

            <button
                onClick={() => {
                    const input = document.getElementById('upload_file_input')
                    if (input !== null)
                        input.click()
                }} id="upload_file"
                className={styles.buttonContainer}>
                <PublishRounded/>
                {props.reduced ? null : 'Importar modelo (.canvas)'}
            </button>

            <div className={styles.optionsDivider}/>
            <button
                className={styles.buttonContainer}
                disabled={true}>
                <LocalLibraryRounded/>
                {props.reduced ? null : 'Salvar base de conhecimento'}

            </button>
            <button
                className={styles.buttonContainer}
                onClick={() => {
                    HandleDownload({
                        handleDownload: props.onSave,
                        data: props.data,
                        root: props.root
                    })
                }} disabled={props.data.nodes.length === 0}>
                <SaveAltRounded/>
                {props.reduced ? null : 'Baixar modelo'}

            </button>
            <div className={styles.optionsDivider}/>
            <button className={styles.buttonContainer} onClick={() => props.handlePrint()}
                    disabled={props.data.nodes.length === 0}>
                <PictureAsPdfRounded/>
                {props.reduced ? null : 'Exportar PDF'}

            </button>
            <button className={styles.buttonContainer}
                    onClick={() => HandleDownload({
                        handleDownload: props.onSave,
                        data: props.data,
                        root: props.root,
                        asJson: true
                    })} disabled={props.data.nodes.length === 0}>
                <FileCopyRounded/>
                {props.reduced ? null : 'Exportar JSON'}

            </button>
        </div>
    )
    return (
        <div className={styles.menuContainer}
             style={{width: props.reduced ? '80px' : '400px', padding: props.reduced ? '8px' : undefined, justifyContent: props.reduced ? 'center': undefined}}
             onContextMenu={event => event.preventDefault()}>
            <div style={{display: 'flex', alignItems: 'center', width: '100%', gap: '16px'}}>

                <input className={[styles.textField, styles.header].join(' ')}
                       value={props.data.subject} style={{display: props.reduced ? 'none' : undefined}}
                       onChange={event => props.setState({...props.data, subject: event.target.value})}/>
                <button onClick={() => props.setReduced(!props.reduced)} className={styles.extendButton} style={{height: !props.reduced ? '100%' : undefined, width: props.reduced ? undefined : '30px'}}>
                    <KeyboardArrowRightRounded style={{transform: !props.reduced ? 'rotate(180deg)' : undefined}}/>
                </button>
            </div>


            {props.reduced ? menu :
                <Tabs
                    buttons={[
                        {
                            key: 0,
                            value: 'Controle',
                            content: menu
                        },
                        {
                            key: 1,
                            value: 'Ações',
                            content: (
                                <Shapes onDragStart={type => MoveNewElement({...props, ...{type: type}})}
                                        data={props.data} setData={props.setState}/>
                            )
                        },
                        {
                            key: 2,
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
OptionsMenu.propTypes = {
    data: PropTypes.object,
    setState: PropTypes.func,
    renderNodes: PropTypes.func,
    root: PropTypes.object,
    onSave: PropTypes.func,
    handlePrint: PropTypes.func,
    reduced: PropTypes.bool,
    setReduced: PropTypes.func
}