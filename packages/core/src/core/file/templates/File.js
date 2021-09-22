import PropTypes from 'prop-types'
import React, {useRef, useState} from "react";
import {
    CloseRounded,
    DeleteForeverRounded,
    DescriptionRounded,
    ImageRounded,
    LanguageRounded,
    PictureAsPdfRounded
} from "@material-ui/icons";
import styles from "../styles/File.module.css";

export default function File(props) {
    const [hover, setHover] = useState(false)
    const getIcon = (type) => {
        let icon
        switch (type) {
            case 'pdf': {
                icon = <PictureAsPdfRounded style={{fontSize: '65px'}}/>
                break
            }
            case 'png': {
                icon = <ImageRounded style={{fontSize: '65px'}}/>
                break
            }
            case 'jpeg': {
                icon = <ImageRounded style={{fontSize: '65px'}}/>
                break
            }
            case 'jpg': {
                icon = <ImageRounded style={{fontSize: '65px'}}/>
                break
            }
            case 'html': {
                icon = <LanguageRounded style={{fontSize: '65px'}}/>
                break
            }

            default : {
                icon = <DescriptionRounded style={{fontSize: '65px'}}/>
                break
            }

        }
        return icon
    }
    return (
        <div className={styles.fileContainer}>

            <div onClick={() => props.handleDelete(props.index)} className={styles.removeButton}>
                <CloseRounded style={{fontSize: '1rem'}}/>
            </div>
            {getIcon(props.type)}
            <div className={styles.fileLabel}>
                {props.name.split('.')[0]}
            </div>

        </div>
    )
}

File.propTypes = {
    name: PropTypes.string,
    type: PropTypes.string,
    index: PropTypes.number,
    handleDelete: PropTypes.func
}