import Layout from "../components/Layout";
import React from "react";
import {useRouter} from "next/router";
import shared from "../styles/Shared.module.css";

export default function Timeline() {
  const router = useRouter()
  const { locale } = router
  return (
    <Layout>
        {props => (
            <div className={shared.content_container} style={{backgroundColor: props.dark ? '#303741' : 'white'}}>
                <p>LOGRSDKLasjdldksjasdl</p>
            </div>
        )
        }

    </Layout>
  )
}
