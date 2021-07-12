import PropTypes from "prop-types";
import styles from '../styles/Frame.module.css'
import {AvatarGroup} from "@material-ui/lab";
import {Avatar} from "@material-ui/core";

export default function Header(props) {
    return (
        <div className={styles.header}>
            <div className={styles.headerContent}>
                <div style={{fontSize: '1.5rem'}}>
                    {props.title}
                </div>
                <div style={{fontSize: '.9rem', color: '#777777'}}>
                    {props.description}
                </div>
            </div>
            <div className={styles.headerContent}>
                <AvatarGroup >
                    {props.contributors.map(entity => (
                        <Avatar src={entity.image}/>
                    ))}
                </AvatarGroup>
            </div>

        </div>
    )
}
Header.propTypes = {

    title: PropTypes.string,
    description: PropTypes.string,
    contributors: PropTypes.arrayOf(
        PropTypes.object
    )

}