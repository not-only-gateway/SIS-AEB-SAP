import styles from '../../styles/Menu.module.css'
import {
    ControlCameraRounded,
    DragIndicatorRounded,
    FileCopyRounded,
    LocalLibraryRounded,
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
    return (
        <div className={styles.menuContainer} style={{width: props.reduced ? '80px' : '400px'}} onContextMenu={event => event.preventDefault()}>
            <input className={[styles.textField, styles.header].join(' ')}
                   placeholder={'Pesquisar'}
                   value={props.data.subject}
                   onChange={event => props.setState({...props.data, subject: event.target.value})}/>

            <Tabs
                buttons={[
                    {
                        key: 0,
                        value: 'Controle',
                        content: (
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
                                    }} id="upload_file" className={styles.buttonContainer}>
                                    <PublishRounded/>
                                    Importar modelo (.canvas)
                                </button>
                                <div className={styles.optionsDivider}>
                                    Salvar
                                    <div className={styles.divider}/>
                                </div>
                                <button
                                    className={styles.buttonContainer}
                                    disabled={true}>
                                    <LocalLibraryRounded/>
                                    Salvar base de conhecimento
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
                                    Baixar modelo
                                </button>
                                <div className={styles.optionsDivider}>
                                    Exportar
                                    <div className={styles.divider}/>
                                </div>
                                <button className={styles.buttonContainer} onClick={() => props.handlePrint()}
                                        disabled={props.data.nodes.length === 0}>
                                    <PictureAsPdfRounded/>
                                    Exportar PDF
                                </button>
                                <button className={styles.buttonContainer}
                                        onClick={() => HandleDownload({
                                            handleDownload: props.onSave,
                                            data: props.data,
                                            root: props.root,
                                            asJson: true
                                        })} disabled={props.data.nodes.length === 0}>
                                    <FileCopyRounded/>
                                    Exportar JSON
                                </button>
                            </div>
                        )
                    },
                    {
                        key: 1,
                        value: 'Ações',
                        content: (
                            <Shapes onDragStart={type => MoveNewElement({...props, ...{type: type}})}
                                    data={props.data} setData={props.setState} />
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