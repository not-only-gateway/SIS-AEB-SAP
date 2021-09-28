import PropTypes from 'prop-types'
import React, {useMemo} from "react";
import {CloseRounded, DescriptionRounded, ImageRounded, LanguageRounded, PictureAsPdfRounded} from "@material-ui/icons";
import styles from "../styles/File.module.css";

export default function File(props) {
    // const [hover, setHover] = useState(false)
    const icon = useMemo(() => {
        let icon
        switch (props.type) {
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
    }, [props.type])
    return (
        <div className={styles.fileContainer}>

            <div onClick={() => props.handleDelete(props.index)} className={styles.removeButton}>
                <CloseRounded style={{fontSize: '1rem'}}/>
            </div>
            {icon}
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
