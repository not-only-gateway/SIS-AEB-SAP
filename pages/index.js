import Layout from "../components/layout/Layout";
import React from "react";
import {useRouter} from "next/router";
import shared from "../styles/Shared.module.css";
import styles from '../styles/Index.module.css'
import Persona from "../components/layout/PersonaLayout";
import Head from "next/head";
import {Button, IconButton, InputBase, Paper} from "@material-ui/core";
import {searchFieldStyle} from "../styles/bar/BarMaterialStyles";
import {InfoRounded, SearchRounded} from "@material-ui/icons";

export default function Index() {
  const router = useRouter()
  const { locale } = router

  return (
      <div>
        <Head>
          <title>Ramais</title>
        </Head>
        <Layout>
          {props => (
              <div className={shared.content_container} style={{backgroundColor: props.dark ? '#303741' : 'white'}}>
                  <div className={styles.header_container}>
                      <div className={shared.title_container}>
                          <h2>Ramais</h2>
                          <InfoRounded style={{color: !props.dark ? '#777777' : '#ededed', fontSize: '1.8rem'}}/>
                      </div>
                      <div className={styles.paper_container}>
                          <Paper component="form" style={{...searchFieldStyle, ...{backgroundColor: props.dark ? '#272e38' : '#f4f8fb', boxShadow: 'rgba(0, 0, 0, 0.05) 0 1px 2px 0'}}}>
                              <IconButton aria-label="search">
                                  <SearchRounded style={{color: props.dark ? 'white' : null}}/>
                              </IconButton>
                              <InputBase
                                  style={{width: '93%', color: (props.dark ? 'white' : null)}}
                                  placeholder={'Search'}
                                  // onChange={event => this.setState({searchInput:event.target.value })}
                                  // onKeyDown={key => (key.key === "Enter"? this.setState({redirect: true}): console.log("."))}
                              />
                          </Paper>
                      </div>
                  </div>
                  <div className={shared.unity_collaborators_container} >
                      <div>
                          <Persona
                              pic={'https://rollingstone.uol.com.br/media/_versions/marcos_jeeves_teaser_reprod_widemd.jpg'}
                              name={'Gustavo Micael Barbosa Roque'}
                              admin={false}
                              email={' gustavo.roque@aeb.gov.br'}
                              phone={'123123-1231'}
                              id={1}
                              dark={props.dark}
                              birth={(new Date()).getTime()}
                          />
                          <Persona
                              pic={'https://i.kym-cdn.com/entries/icons/original/000/026/152/gigachad.jpg'}
                              name={'Romulo!'}
                              admin={false}
                              email={'romulo.doboxe@aeb.gov.br'}
                              phone={'42069-6969'}
                              id={2}
                              dark={props.dark}
                              birth={1}
                          />

                      </div>
                  </div>

              </div>
          )
          }

        </Layout>
      </div>
  )
}


// {
//     "unities": [
//         {
//             "ID": 1
//             "name": "DPOA",
//             "collaborators": [
//                 {
//                     "name": "gustavo"
//                 },
//                 {
//                     "name": "arthur"
//                 }
//             ]
//         },
//         {
//             "ID": 2
//             "name": "CTIC",
//             "collaborators": [
//                 {
//                     "name": "jean"
//                 },
//                 {
//                     "name": "neil"
//                 }
//             ]
//         }
//     ]
// }