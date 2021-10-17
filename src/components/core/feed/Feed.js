import PropTypes from "prop-types";
import styles from './styles/Feed.module.css'
import FeedCard from "./FeedCard";
import React from "react";

export default function Feed(props) {
    return (
        <div style={{width: props.width}}>
            <div className={styles.title}>
                {props.title}
                <div className={styles.titleDivider}/>
            </div>
            <div className={styles.wrapper}>

                {props.data.filter((_, i) => i % 2).map((entry, i) => (
                    <FeedCard
                        onClick={() => props.onCardClick(entry)}
                        description={entry[props.keys.description]}
                        title={entry[props.keys.title]} index={i}
                        image={entry[props.keys.image]}
                    />
                ))}
            </div>
        </div>
    )
}

Feed.propTypes = {
    onCardClick: PropTypes.func,
    keys: PropTypes.shape({
        title: PropTypes.string,
        image: PropTypes.string,
        description: PropTypes.string
    }),
    title: PropTypes.string,
    width: PropTypes.string
}