import React, {useState} from "react";
import styles from "../styles/Navigation.module.css";
import {AppsRounded, ExtensionRounded, TimelineRounded} from "@material-ui/icons";
import AnimationFrame from "./AnimationFrame";
import PropTypes from 'prop-types'

export default function NavigationApps(props) {
  const [open, setOpen] = useState(false)

  return (
    <div className={styles.appsContainer} onBlur={event => {
      if (!event.currentTarget.contains(event.relatedTarget))
        setOpen(false)
    }}>
      <button
        className={styles.buttonContainer}

        onClick={() => setOpen(!open)}
        style={{
          backgroundColor: open ? '#0095ff' : null,
          color: 'white'
        }}>

        <AppsRounded/>
      </button>
      <AnimationFrame elementKey={'floating'} children={
        <div className={styles.floatingBoxContainer}>
          {props.apps.map(button => (
            <button
              className={styles.buttonContainer}

              onClick={() => window.open(button.link)}
              style={{
                display: 'grid',
                justifyItems: 'center',
                justifyContent: 'center',
                height: '80px',
                width: "auto"
              }}
            >

              {button.icon}

              <div style={{
                fontSize: '.9rem',
              }}> {button.name}</div>

            </button>
          ))}
        </div>
      } render={open} type={"fade"}/>
    </div>
  )
}
NavigationApps.propTypes = {
  lang: PropTypes.object,
  apps: PropTypes.arrayOf([
    PropTypes.shape({
      name: PropTypes.string,
      icon: PropTypes.any,
      link: PropTypes.string,
    })
  ]),
}
