import React from 'react';
import styles from './styles/Navigation.module.css'
import PropTypes from 'prop-types'

import NavigationProfile from './templates/NavigationProfile'
import NavigationButton from './templates/NavigationButton'
import NavigationPT from './locales/NavigationPT'
import NavigationApps from './templates/NavigationApps'


export default function Navigation(props) {

  const lang = NavigationPT

  return (
    <div className={[styles.navigationContainer, props.loading ? styles.loading : ''].join(' ')}>
      <div className={styles.container}>

        <img
          style={{height: '50px'}}
          src={props.logo} alt={'logo'}/>
        {props.appName}
      </div>


      <div className={styles.container} style={{justifyContent: 'flex-end', gap: '16px'}}>
        <div style={{width: 'fit-content', height: '100%'}}>
          {props.buttons.map(button => (
            <React.fragment key={button.link}>


            <NavigationButton
              linkPath={button.link}
              linkQuery={button.linkProps}
              highlight={props.path === button.link}
              icon={
                button.icon
              }
            />
            </React.fragment>
          ))}
        </div>
        <NavigationApps lang={lang} buttons={props.apps} centered={props.profile !== null && props.profile !== undefined}/>

        {props.profile !== null && props.profile !== undefined ?
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
  appName: PropTypes.string,
  logo: PropTypes.any,
  profile: PropTypes.object,
  accessProfile: PropTypes.object,
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
      link: PropTypes.string
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
