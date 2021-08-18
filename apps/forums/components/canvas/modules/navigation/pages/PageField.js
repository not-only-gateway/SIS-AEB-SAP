import styles from "./styles/Pages.module.css";
import PropTypes from "prop-types";

export default function PageField(props) {

    return (
        <button
            disabled={props.page.default}
            className={[styles.pageButton, props.page.default ? styles.mainPage : ''].join(' ')}
            onClick={() => {
                props.setAsDefault()
            }}>
            {props.page.title}
        </button>
    )
}
PageField.propTypes = {
    page: PropTypes.object,
    contextMenuRef: PropTypes.object,
    setAsDefault: PropTypes.func
}