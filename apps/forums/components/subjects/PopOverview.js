import {Modal} from "sis-aeb-misc";
import PropTypes from 'prop-types'
import styles from "../../styles/Subject.module.css";
import {AddRounded, CloseRounded} from "@material-ui/icons";
import UnitPT from "../../packages/locales/SubjectPT";
import {useEffect, useState} from "react";
import ForumRequests from "../../utils/fetch/ForumRequests";

export default function PopOverview(props) {
    const lang = UnitPT
    const [image, setImage] = useState(null)
    useEffect(() => {
        ForumRequests.fetchImage(props.data.image).then(res => setImage(res))
    }, [])

    return (
        <div className={styles.popContainer}>
            <div className={styles.popHeader}>
                <div className={styles.title}>
                    {props.data.title}
                </div>
                <div className={styles.description}>
                    {props.data.description}
                </div>
            </div>
            <div className={styles.popBody}>
                {image !== null ? <img
                    className={styles.popImage}
                    src={"https://store-images.s-microsoft.com/image/apps.12298.14168801781675451.d3cfd5f0-ae04-41c0-ad46-77e552fdd79c.d786d022-14f7-4a9e-b3c1-8b44ad30d48f?mode=scale&q=90&h=720&w=1280&format=jpg"}
                    alt={'image'}/> : null}
                <p style={{maxWidth: '484px'}}>
                    {props.data.body}
                </p>
            </div>

            <button className={styles.closeButton} onClick={() => props.handleClose()}>
                <CloseRounded/>
                {lang.close}
            </button>

        </div>

    )
}
PopOverview.propTypes = {
    handleClose: PropTypes.func,
    data: PropTypes.object
}