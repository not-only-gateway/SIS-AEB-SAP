import React, {useState} from 'react';
import styles from './styles/Navigation.module.css'
import PropTypes from 'prop-types'
import NavigationProfile from './templates/NavigationProfile'
import NavigationPT from './locales/NavigationPT'
import NavigationApps from './templates/NavigationApps'
import {MenuRounded} from "@material-ui/icons";
import NavigationTabs from "./templates/NavigationTabs";
import SearchBar from "./templates/SearchBar";
import Loading from "./Loading";


export default function Navigation(props) {
  const lang = NavigationPT
  const [modal, setModal] = useState(false)

  return (

    <div className={styles.navigationContainer}>
      <Loading loading={props.loading}/>
      <div className={styles.logoContainer} style={{color: '#666666', fontWeight: 600, fontSize: '16px'}}>
        <NavigationTabs open={modal} setOpen={setModal} buttons={props.buttons} path={props.path}/>
        <button className={styles.appsButtonContainer} onClick={() => setModal(true)}>
          <MenuRounded/>
        </button>
        <img
          style={{height: '37px'}}
          src={props.logo} alt={'logo'}/>

        {props.appName}
      </div>
      <div className={styles.logoContainer}
           style={{alignContent: 'center', display: props.searchBar ? undefined : 'none'}}>
        <SearchBar lang={lang} applySearch={props.applySearch} setSearchInput={props.setSearchInput}
                   searchInput={props.searchInput}
        />
      </div>
      <div className={styles.logoContainer} style={{justifyContent: 'flex-end', gap: '8px'}}>
        <NavigationApps lang={lang} buttons={props.apps}
                        centered={props.profile !== null && props.profile !== undefined}/>

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
            lang={lang}/>
          :
          null
        }
      </div>

    </div>

  )

}

Navigation.propTypes = {
  applySearch: PropTypes.func,
  searchBar: PropTypes.bool,
  setSearchInput: PropTypes.func,
  searchInput: PropTypes.string,
  path: PropTypes.string,
  appName: PropTypes.string,
  logo: PropTypes.any,
  profile: PropTypes.object,
  accessProfile: PropTypes.object,
  loading: PropTypes.bool,
  buttons: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      icon: PropTypes.any,
      link: PropTypes.string,
      linkProps: PropTypes.any
    })
  ),
  apps: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      icon: PropTypes.any,
      link: PropTypes.string
    })
  ),
  profileButtons: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      icon: PropTypes.any,
      link: PropTypes.string,
      linkProps: PropTypes.any
    })
  )
}
