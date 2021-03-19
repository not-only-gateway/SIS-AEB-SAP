import Layout from "../components/Layout";
import React from "react";
import {useRouter} from "next/router";
import shared from "../styles/Shared.module.css";
// import personaLayout from "../components/PersonaLayout";
import Persona from "../components/PersonaLayout";

export default function Timeline() {
  const router = useRouter()
  const { locale } = router
  function renderModal(){
    alert("CLICKED MODAL")
  }
  return (
    <Layout>
        {props => (
            <div className={shared.content_container} style={{backgroundColor: props.dark ? '#303741' : 'white'}}>
                <Persona
                    pic={null}
                    name={'Gustavo Micael Barbosa Roque'}
                    admin={false}
                    email={' gustavo.roque@aeb.gov.br'}
                    phone={'123123-1231'}
                    renderModal={renderModal}
                    id={1}
                    dark={props.dark}
                />
            </div>
        )
        }

    </Layout>
  )
}
