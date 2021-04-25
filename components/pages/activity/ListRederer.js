import PropTypes from 'prop-types'
import React from "react";
import styles from "../../../styles/activity/Activity.module.css";
import ActivityComponent from "./Activity";

export default function ActivityListRenderer(props) {
    function sorter() {
        let response = [...props.data]
        switch (props.sorterMethod) {
            case 'id': {
                response.sort((a, b) => (a.activity.id - b.activity.id))
                break
            }
            case 'creation': {
                response.sort((a, b) => (a.activity.time_of_creation - b.activity.time_of_creation))
                break
            }
            default:
                break
        }
        return response
    }

    return(
        <div className={styles.activitiesContainer}>
            {(sorter()).map((data, index) => (
                    <div key={data.activity.id+'-container-'+index}>
                        <ActivityComponent lang={props.lang} dark={false} activity={data.activity}
                                           accessLog={data.access_log} index={index} pagesFetched={props.pagesFetched}
                        />
                    </div>
                )
            )}
        </div>
    )
}
ActivityListRenderer.propTypes = {
    data: PropTypes.array,
    sorterMethod: PropTypes.string,
    pagesFetched: PropTypes.number,
    lang: PropTypes.object
}