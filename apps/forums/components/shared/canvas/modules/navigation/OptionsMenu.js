import styles from '../../styles/Menu.module.css'
import {
    AddRounded,
    DragIndicatorRounded,
    GetAppRounded, PictureAsPdfRounded,
    PublishRounded,
    SaveRounded,
    SearchRounded
} from "@material-ui/icons";
import Tabs from "./Tabs";
import PropTypes from "prop-types";
import {useEffect, useState} from "react";

export default function OptionsMenu(props) {
    const [openTab, setOpenTab] = useState(0)
    useEffect(() => {
        let dragged

        document.addEventListener("drag", function (event) {
        }, false);

        document.addEventListener("dragstart", function (event) {
            dragged = event.target;
            event.target.style.opacity = 1;
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
            console.log(props.root)
            if (event.target.id === "canvas" && props.root !== undefined) {
                event.target.style.background = "";

                let id = 0

                props.data.nodes.map((elem, index) => {
                    if (elem.id > id)
                        id = elem.id + 1
                })

                const newNodes = [...props.data.nodes, ...[{
                    id: id + 1,
                    title: 'Em branco',
                    description: null,
                    color: '#0095ff',
                    placement: {
                        x: (event.clientX - props.root.offsetLeft + props.overflowRef.scrollLeft),
                        y: (event.clientY - props.root.offsetTop + props.overflowRef.scrollTop)
                    },
                    shape: 'circle',
                    creationDate: (new Date()).getTime()
                }]]


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
    }, [props.root])

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
                                <button className={styles.buttonContainer} disabled={true}>
                                    <PublishRounded/>
                                    Importar
                                </button>
                                <button className={styles.buttonContainer} onClick={() => props.onSave(props.data)}>
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
                        value: 'Outro',
                        content: '1'
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