import Layout from "../components/layout/Layout";
import React from "react";
import {useRouter} from "next/router";
import shared from "../styles/Shared.module.css";
// import personaLayout from "../components/PersonaLayout";
import Persona from "../components/layout/PersonaLayout";
import Head from "next/head";
import {Button} from "@material-ui/core";

export default function Index() {
  const router = useRouter()
  const { locale } = router
  function renderModal(){
    alert("CLICKED MODAL")
  }
  return (
      <div>
        <Head>
          <title>Ramais</title>
        </Head>
        <Layout>
          {props => (
              <div className={shared.content_container} style={{backgroundColor: props.dark ? '#303741' : 'white'}}>
                  <fieldset style={{width: '97%', display: 'grid', justifyContent: 'center', borderRadius: '8px', border : (props.dark ? '#262d37 3px solid':'#f4f8fb 3px solid')}}>
                      <legend><Button style={{color: (props.dark ? 'white': 'black'), fontSize: '1.08rem', fontWeight: 450}}>ctic</Button></legend>
                      <div style={{marginTop: '-3vh'}}>
                          <Persona
                              pic={'https://rollingstone.uol.com.br/media/_versions/marcos_jeeves_teaser_reprod_widemd.jpg'}
                              name={'Gustavo Micael Barbosa Roque'}
                              admin={false}
                              email={' gustavo.roque@aeb.gov.br'}
                              phone={'123123-1231'}
                              renderModal={renderModal}
                              id={1}
                              dark={props.dark}
                              birth={1616246020664}
                          />
                          <Persona
                              pic={'https://i.kym-cdn.com/entries/icons/original/000/026/152/gigachad.jpg'}
                              name={'Romulo!'}
                              admin={false}
                              email={'romulo.doboxe@aeb.gov.br'}
                              phone={'42069-6969'}
                              renderModal={renderModal}
                              id={2}
                              dark={props.dark}
                              birth={1}
                          />
                      </div>
                  </fieldset>
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