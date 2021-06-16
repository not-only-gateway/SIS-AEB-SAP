import PropTypes from 'prop-types'
import {Avatar} from "@material-ui/core";
import React, {useState} from "react";
import styles from '../styles/Navigation.module.css'
import AnimationFrame from "./AnimationFrame";
import NavigationButton from "./NavigationButton";

export default function NavigationProfile(props) {
  const [open, setOpen] = useState(false)

  return (
    // <Link href={{pathname: '/person', query: {id: props.profile.id}}}>

    <div className={styles.appsContainer} onBlur={event => {
      if (!event.currentTarget.contains(event.relatedTarget))
        setOpen(false)
    }}>

      <button
        className={styles.buttonContainer}

        onClick={() => setOpen(!open)}
        style={{
          backgroundColor: open ? '#0095ff' : undefined,
          justifyContent: 'flex-end',
          alignItems: 'center',

          cursor: 'pointer',
          minWidth: '175px',
          maxWidth: '225px',
          height: '100%',
          gap: '6px',
          paddingRight: 0,
          paddingLeft: '5px'
        }}
      >
        <div style={{
          color: '#f2f2f2',
          fontWeight: '620',
          fontSize: '.85rem',
          transition: '300ms ease-in',
        }}>
          {props.lang.hello}
        </div>

        <div className={styles.overflowEllipsis} style={{
          color: '#f2f2f2',
          maxWidth: '43%',
          fontWeight: '550',
          fontSize: '.85rem',
          transition: '300ms ease-in'
        }}>
          {props.profile.name}
        </div>
        <Avatar style={{width: '44px', height: '44px'}} src={props.profile.image}/>

      </button>
      <AnimationFrame elementKey={'floating-profile'} children={
        <div className={styles.centeredFloatingBox} style={{
          width: '175px', transform: 'translateY(23%)', marginLeft: 'auto',
          marginRight: 'auto',
          left: 0,
          right: 0,
          gap: '8px'
        }}>

          {props.buttons.map(button => (
            <div style={{height: '44px', width: '100%'}}>
              <NavigationButton
                linkPath={button.link}
                linkQuery={button.linkProps}
                highlight={props.path === button.link}
                icon={
                  button.icon
                }
              />
            </div>
          ))}
        </div>
      } render={open} type={"fade"}/>
    </div>
  )
}
NavigationProfile.propTypes = {
  profile: PropTypes.object,
  accessProfile: PropTypes.object,
  lang: PropTypes.object,
  buttons: PropTypes.arrayOf([
    PropTypes.shape({
      name: PropTypes.string,
      icon: PropTypes.any,
      link: PropTypes.string,
      linkProps: PropTypes.any
    })
  ])
}
