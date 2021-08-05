import PropTypes from 'prop-types'
import styles from "../styles/Footer.module.css";
import {AddRounded} from "@material-ui/icons";

export default function Pages(props) {
    return (
        <div className={styles.scaleContainer} style={{marginLeft: 0}}>
            {props.data.pages.map(page => (
                <div className={styles.pageButton} style={{background: page.default ? undefined : '#fdfdfd'}} onContextMenu={event => event.preventDefault()}>
                    {page.title}
                </div>
            ))
            }
            <button
                className={styles.newPageButton}
                style={{display: props.data.pages.length < 5 ? undefined : 'none'}}
                onClick={() => {
                    let newPages = [...props.data.pages]
                    newPages.push({
                        title: 'Página ' + (props.data.pages.length + 1),
                        nodes: [],
                        links: [],
                        default: false
                    })
                    props.setData({
                        ...props.data,
                        pages: newPages
                    })
                }}>
                <AddRounded/>
            </button>
        </div>
    )
}

Pages.propTypes = {
    data: PropTypes.object,
    setData: PropTypes.func
}