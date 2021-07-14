import styles from '../../styles/Menu.module.css'
import {
    DragIndicatorRounded,
    MoreVertRounded,
    PictureAsPdfRounded,
    PublishRounded,
    SaveRounded,
    SearchRounded,
    VisibilityRounded
} from "@material-ui/icons";
import Tabs from "./Tabs";
import PropTypes from "prop-types";
import {useEffect, useState} from "react";
import HandleDownload from "../../methods/HandleDownload";
import HandleUpload from "../../methods/HandleUpload";
import {v4 as uuid4} from 'uuid';

export default function OptionsMenu(props) {
    const [openTab, setOpenTab] = useState(0)
    useEffect(() => {
        let dragged
        document.addEventListener("drag", function (event) {
        }, false);

        document.addEventListener("dragstart", function (event) {

            if(event.target.className === 'Menu_buttonContainer__3oHbi') {
                dragged = event.target;
                event.target.style.opacity = 1;
            }
        }, false);

        document.addEventListener("dragend", function (event) {
            // reset the transparency
            event.target.style.opacity = "";
        }, false);

        document.addEventListener('dragover', function (event) {
            event.preventDefault();
        })

        document.addEventListener("drop", function (event) {
            event.preventDefault();
            if (event.target.id === "canvas" && props.root !== undefined) {
                event.target.style.background = "";
                let newNodes = [...props.data.nodes]

                newNodes.push({
                    id: uuid4().toString(),
                    title: 'Em branco',
                    description: null,
                    color: '#0095ff',
                    placement: {
                        x: (event.clientX - props.root.offsetLeft + props.overflowRef.scrollLeft),
                        y: (event.clientY - props.root.offsetTop + props.overflowRef.scrollTop)
                    },
                    shape: 'circle',
                    creationDate: (new Date()).getTime()
                })

                props.setState(({
                    ...props.data,
                    nodes: newNodes
                }))
            }
        }, false);
        return () => {
            document.removeEventListener('drop', () => null)
            document.removeEventListener('dragover', () => null)
            document.removeEventListener('dragend', () => null)
            document.removeEventListener('dragstart', () => null)
            document.removeEventListener('drag', () => null)
        }
    }, [props])

    return (
        <div className={styles.menuContainer}>
            <div className={styles.header}>
                {props.data.subject}
            </div>
            <div className={styles.inputContainer}>
                <button className={styles.searchButton}>
                    <SearchRounded/>
                </button>
                <input className={styles.textField} placeholder={'Pesquisar'}/>
            </div>
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
                                           setData: props.setState
                                       })}
                                       accept={'.json'}/>

                                <button
                                    onClick={() => {
                                        const input = document.getElementById('upload_file_input')
                                        if (input !== null)
                                            input.click()
                                    }} id="upload_file" className={styles.buttonContainer}>
                                    <PublishRounded/>
                                    Importar
                                </button>
                                <button
                                    className={styles.buttonContainer}
                                    onClick={() => HandleDownload({
                                        handleDownload: props.onSave,
                                        data: props.data,
                                        root: props.root
                                    })}>
                                    <SaveRounded/>
                                    Salvar
                                </button>
                                <button className={styles.buttonContainer} onClick={() => props.handlePrint()}>
                                    <PictureAsPdfRounded/>
                                    Exportar PDF
                                </button>
                            </div>
                        )
                    },
                    {
                        key: 1,
                        value: 'Ações',
                        content: (
                            <>
                                <div className={styles.buttonContainer} style={{cursor: 'move', fontSize: '.9rem'}}
                                     draggable={props.root !== undefined ? 'true' : false}>
                                    <DragIndicatorRounded/>
                                    Adicionar módulo
                                </div>
                            </>
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
    overflowRef: PropTypes.object,
    root: PropTypes.object,
    canvasRef: PropTypes.object,
    onSave: PropTypes.func,
    handlePrint: PropTypes.func
}