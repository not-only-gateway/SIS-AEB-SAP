import Modal from "../../../misc/modal/Modal";
import PropTypes from 'prop-types'
import keyTemplate from "../../templates/keyTemplate";
import styles from '../../styles/Settings.module.css'
import TextField from "../../../inputs/text/TextField";
import {VisibilityOffRounded, VisibilityRounded} from "@material-ui/icons";
import ToolTip from "../../../misc/tooltip/ToolTip";

export default function Settings(props) {
    return (
        <Modal
            open={props.open}
            handleClose={() => props.setOpen(false)}
            animationStyle={"fade"} blurIntensity={.1}
            wrapperClassName={styles.modal}
        >
            <div className={styles.header}>
                Configurações
            </div>
            {props.keys.map((e, i) => (
                <div className={styles.fieldRow} key={i + '-row-' + JSON.stringify(e.label)}>
                    <div className={styles.fieldLabel}>
                        {e.label}
                    </div>
                    <TextField
                        width={'100%'} size={'small'} noMargin={true}
                        value={e.additionalWidth ? parseInt(e.additionalWidth.replace('%', '')) : ''}
                        maskEnd={'%'} label={'Largura adicional'}
                        placeholder={'Largura adicional'}
                        type={"number"}
                        handleChange={(event) => {
                            console.log(event)
                            props.dispatchKeys({
                                type: props.actions.UPDATE_SIZE,
                                payload: {key: e.key, size: event.target.value + '%'}
                            })
                        }}/>
                    <button
                        className={styles.visibilityButton}
                        onClick={() => props.dispatchKeys({
                            type: props.actions.UPDATE_VISIBILITY,
                            payload: {key: e.key}
                        })}>
                        {e.visible ? <VisibilityRounded/> : <VisibilityOffRounded/>}
                        <ToolTip>
                            {e.visible ? 'Esconder' : 'Mostrar'}
                        </ToolTip>
                    </button>
                </div>
            ))}
        </Modal>
    )
}
Settings.propTypes = {
    open: PropTypes.bool,
    setOpen: PropTypes.func,
    keys: PropTypes.arrayOf(keyTemplate),
    dispatchKeys: PropTypes.func,
    actions: PropTypes.object
}