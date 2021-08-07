import PropTypes from 'prop-types'
import styles from './styles/Navigation.module.css'

import HandleUpload from "../../methods/handles/HandleUpload";
import {LocalLibraryRounded, PictureAsPdfRounded, PublishRounded, SaveAltRounded} from "@material-ui/icons";
import HandleDownload from "../../methods/handles/HandleDownload";

export default function Header(props) {

    return (
        <div className={styles.navigation}>
            <div className={styles.column}>
                <input className={styles.textField}
                       value={props.data.subject}
                       onChange={event => props.setData({...props.data, subject: event.target.value})}/>
                <button
                    className={styles.buttonContainer}
                    onClick={() => {
                        HandleDownload({
                            handleDownload: props.onSave,
                            data: props.data,
                            root: props.root,
                            asJson: true
                        })
                    }} disabled={props.data.nodes.length === 0}>
                    <SaveAltRounded/>
                    Baixar modelo

                </button>
            </div>
            <div className={styles.column} style={{justifyContent: 'flex-end'}}>
                <input type="file" id="upload_file_input" style={{display: 'none'}} multiple={false}
                       onChange={event => HandleUpload({
                           file: event,
                           setData: props.setData,
                       })}
                       accept={'.json'}/>

                <button
                    onClick={() => {
                        const input = document.getElementById('upload_file_input')
                        if (input !== null)
                            input.click()
                    }} id="upload_file"
                    className={styles.buttonContainer}>
                    <PublishRounded/>
                    Importar modelo
                </button>

                <div className={styles.optionsDivider}/>
                <button
                    className={styles.buttonContainer}
                    disabled={true}>
                    <LocalLibraryRounded/>
                    Salvar base de conhecimento

                </button>

                <div className={styles.optionsDivider}/>
                <button className={styles.buttonContainer} onClick={() => props.handlePrint()}
                        disabled={props.data.nodes.length === 0}>
                    <PictureAsPdfRounded/>
                    Exportar PDF

                </button>
            </div>
        </div>
    )
}
Header.propTypes = {
    data: PropTypes.object,
    setData: PropTypes.func,

    root: PropTypes.object,
    onSave: PropTypes.func,
    handlePrint: PropTypes.func,
    reduced: PropTypes.bool,
    setReduced: PropTypes.func
}