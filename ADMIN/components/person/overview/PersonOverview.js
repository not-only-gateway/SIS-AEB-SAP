import PropTypes from 'prop-types'
import styles from '../../../styles/Person.module.css'
import {Avatar} from "@material-ui/core";
import ImageHost from "../../../utils/shared/ImageHost";
import {useEffect, useState} from "react";

import PersonOverviewPT from "../../../packages/page locales/person/PersonOverviewPT";

export default function PersonOverview(props) {
    const lang = PersonOverviewPT

    return (
        <div className={styles.overviewContainer}>
            <div className={styles.overviewRow}>
                <p style={{fontWeight: 600, fontSize: '.9rem'}}>{lang.image}</p>
                <Avatar src={ImageHost() + props.data.image} variant={'rounded'}/>
            </div>
            <div className={styles.overviewRow}>
                <p style={{fontWeight: 600, fontSize: '.9rem'}}>{lang.name}</p>
                <p style={{fontSize: '.9rem'}}>
                    {props.data.name}
                </p>
            </div>

            <div className={styles.overviewRow}>
                <p style={{fontWeight: 600, fontSize: '.9rem'}}>{lang.birth}</p>
                <p style={{fontSize: '.9rem'}}>

                    {new Date(props.data.birth).getDate()}
                </p>
            </div>
            <div className={styles.overviewRow}>
                <p style={{fontWeight: 600, fontSize: '.9rem'}}>{lang.disabled}</p>
                <p style={{fontSize: '.9rem'}}>
                    {props.data.disabled_person != null ? lang.getDisabledPerson(props.data.disabled_person) : lang.unset}
                </p>
            </div>
            <div className={styles.overviewRow}>
                <p style={{fontWeight: 600, fontSize: '.9rem'}}>{lang.gender}</p>
                <p style={{fontSize: '.9rem', textTransform: 'capitalize'}}>
                    {props.data.gender != null ? props.data.gender : lang.unset}
                </p>
            </div>
            <div className={styles.overviewRow}>
                <p style={{fontWeight: 600, fontSize: '.9rem'}}>{lang.education}</p>
                <p style={{fontSize: '.9rem', textTransform: 'capitalize'}}>
                    {props.data.education != null ? props.data.education : lang.unset}

                </p>
            </div>
            <div className={styles.overviewRow}>
                <p style={{fontWeight: 600, fontSize: '.9rem'}}>{lang.marital}</p>

                <p style={{fontSize: '.9rem', textTransform: 'capitalize'}}>
                    {props.data.marital_status != null ? props.data.marital_status : lang.unset}

                </p>
            </div>

            <div className={styles.overviewRow}>
                <p style={{fontWeight: 600, fontSize: '.9rem'}}>{lang.father}</p>
                <p style={{fontSize: '.9rem'}}>
                    {props.data.father != null ? props.data.father : lang.unset}

                </p>
            </div>
            <div className={styles.overviewRow}>
                <p style={{fontWeight: 600, fontSize: '.9rem'}}>{lang.mother}</p>
                <p style={{fontSize: '.9rem'}}>
                    {props.data.mother != null ? props.data.mother : lang.unset}

                </p>
            </div>

            <div className={styles.overviewRow}>
                <p style={{fontWeight: 600, fontSize: '.9rem'}}>{lang.birthPlace}</p>
                <p style={{fontSize: '.9rem', textTransform: 'capitalize'}}>
                    {props.data.birth_place != null ? props.data.birth_place : lang.unset}
                </p>
            </div>
            <div className={styles.overviewRow}>
                <p style={{fontWeight: 600, fontSize: '.9rem'}}>{lang.nationality}</p>
                <p style={{fontSize: '.9rem', textTransform: 'capitalize'}}>
                    {props.data.nationality != null ? props.data.nationality : lang.unset}
                </p>
            </div>
        </div>
    )

}

PersonOverview.propTypes = {
    data: PropTypes.object
}