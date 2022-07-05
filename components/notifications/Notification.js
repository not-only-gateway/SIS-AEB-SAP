import React, {useEffect, useRef, useState} from "react";
import styles from "./styles/Notification.module.css";
import PropTypes from 'prop-types'
import {Dropdown, request, ToolTip} from "mfc-core";
import Cookies from "universal-cookie/lib";

export default function Notification(props) {
    const [notifications, setNotifications] = useState([])
    const fetchData = () => {
        request({
            method: 'get',
            url: props.host + '/notify/list/notification',
            headers: {'authorization': (new Cookies()).get('jwt')}
        }).then(r => {
            console.log(r)
            setNotifications(r.data? r.data.map(n => {
                return {label: n.title, disabled: true, icon: <span className={'material-icons-round'}>history</span>}
            }) : [])
        })
    }
    const handleClick = () => {
        let newNotifications = []
        notifications.forEach(e => {
            newNotifications.push({
                ...e,
                seen: true
            })
        })
        if(newNotifications !== notifications)
            setNotifications(newNotifications)
    }
    useEffect(() => {
 //       fetchData()
//      setTimeout(fetchData, 60000)
    }, [])

    useEffect(() => {
        ref.current?.addEventListener('click', handleClick)
        return () => {
            ref.current?.removeEventListener('click', handleClick)
        }
    }, [notifications])

    const ref = useRef()

    return (
        <span ref={ref}>
            <Dropdown
                align={"top"} justify={'start'}
                className={styles.buttonContainer}
                variant={'minimal-horizontal'}
                options={notifications?.length > 0 ? notifications : [
                    {
                        icon: <span className="material-icons-round">folder</span>,
                        disabled: true,
                        label: 'Nenhuma notificação'
                    }
                ]}
                styles={{
                    paddingLeft: '2px',
                    paddingRight: '2px',
                }}
            >
                {notifications.filter(e => !e.seen).length > 0 ? <span className={styles.indicator}/> : null}
                <span className="material-icons-round">notifications</span>
                <ToolTip content={'Notificações'} align={"middle"} justify={'end'}/>
            </Dropdown>
        </span>
    )
}

Notification.propTypes = {
    host: PropTypes.string
}
