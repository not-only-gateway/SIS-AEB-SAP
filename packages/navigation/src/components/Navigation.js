import React from 'react'
import {AppsRounded, ExitToApp, HomeRounded, MenuOpenRounded, PersonAddRounded, TuneRounded} from '@material-ui/icons';
import styles from './Navigation.module.css'
import PropTypes from 'prop-types'

import NavigationProfile from "./NavigationProfile";
import NavigationButton from "./NavigationButton";
import NavigationPT from "./NavigationPT";
import NavigationApps from "./NavigationApps";


export default function Navigation(props) {

  const lang = NavigationPT

  return (
    <div className={[styles.navigationContainer, props.loading ? styles.loading : ''].join(' ')}>
      <div className={styles.container}>

        <img
          style={{height: '50px'}}
          src={'/dark.png'} alt={'logo'}/>
      </div>


      <div className={styles.container} style={{justifyContent: "flex-end", gap: '16px'}}>
        <div style={{width: 'fit-content', height: '100%'}}>
          {props.buttons.map(button => (
            <NavigationButton
              linkPath={button.link}
              linkQuery={button.linkProps}
              highlight={props.path === button.link}
              icon={
                button.icon
              }
            />
          ))}
        </div>
        <NavigationApps lang={lang} buttons={props.apps}/>

        {props.profile !== null ?
          <NavigationProfile
            buttons={props.profileButtons}
            profile={{
            id: props.profile.id,
            image: props.profile.image,
            corporate_email: props.profile.corporate_email,
            name: props.profile.name
          }} reduced={props.reduced}
                             setReduced={props.setReduced} accessProfile={props.accessProfile}
                             locale={{
                               profile: lang.profile,
                               signout: lang.signout,
                               signin: lang.signin
                             }}/>
          :
          null
        }
      </div>

    </div>
  )

}

Navigation.propTypes = {
  path: PropTypes.string,
  query: PropTypes.object,
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
  ]),
  apps: PropTypes.arrayOf([
    PropTypes.shape({
      name: PropTypes.string,
      icon: PropTypes.any,
      link: PropTypes.string,
    })
  ]),
  profileButtons: PropTypes.arrayOf([
    PropTypes.shape({
      name: PropTypes.string,
      icon: PropTypes.any,
      link: PropTypes.string,
      linkProps: PropTypes.any
    })
  ])
}
