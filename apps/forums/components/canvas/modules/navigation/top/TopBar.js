import PropTypes from 'prop-types'
import styles from './styles/Top.module.css'
import {
    AddRounded,
    FormatAlignCenterRounded,
    FormatBoldRounded,
    FormatItalicRounded,
    FormatUnderlinedRounded,
    RemoveRounded
} from "@material-ui/icons";

export default function TopBar(props){
    return(
        <div className={styles.container}>
            <div className={styles.button}>
                <FormatBoldRounded/>
            </div>
            <div className={styles.button}>
                <FormatItalicRounded/>
            </div>
            <div className={styles.button}>
                <FormatUnderlinedRounded/>
            </div>
            <div className={styles.button}>
                <FormatAlignCenterRounded/>
            </div>
            <div className={styles.fontSize}>
                <div className={styles.button}>
                    <AddRounded/>
                </div>
                <input className={styles.fontInput} value={10}/>
                <div className={styles.button}>
                    <RemoveRounded/>
                </div>
            </div>
        </div>
    )
}

TopBar.propTypes={
    data: PropTypes.object,
    setData: PropTypes.func
}