import PropTypes from "prop-types";
import styles from './styles/Card.module.css'
import React from "react";
export default function FeedCard(props){
    return(
        <div className={styles.cardWrapper}>
            <div className={styles.cardImage}>
                <img src={props.image} alt={props.title}/>
            </div>
            <div className={styles.cardTags} style={{display: React.Children.toArray(props.children).length > 0 ? undefined : 'none'}}>
                {props.children}
            </div>
            <div className={styles.cardContent}>
                <div className={styles.header}>
                    {props.title}
                </div>
                <div className={styles.description}>
                    {props.description}
                </div>
            </div>
        </div>
    )
}

FeedCard.propTypes={
    image: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    children: PropTypes.node, // tags,
    onClick: PropTypes.func.isRequired,
    index: PropTypes.number
}