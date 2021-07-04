import PropTypes from 'prop-types'
import {useEffect, useState} from "react";
import Head from "next/head";
import {AddRounded, EditRounded, Forum, PeopleRounded, VisibilityRounded} from "@material-ui/icons";
import ForumRequests from "../../utils/fetch/ForumRequests";
import styles from '../../styles/Subject.module.css'
import UnitPT from "../../packages/locales/unit/UnitPT";
import Chart from "../shared/components/Chart";
import PopOverview from "./PopOverview";
import Node from "../shared/canvas/Node";
import SubmitPop from "../../utils/submit/SubmitPop";


export default function Pops(props) {
    const [pops, setPops] = useState([])
    const lang = UnitPT
    const [currentEntity, setCurrentEntity] = useState(null)
    const [update, setUpdate] = useState(false)
    useEffect(() => {
        ForumRequests.listPops(props.subjectID).then(res => setPops(res))
    }, [])

    return (
        <>
            <Head>
                <title>
                    {lang.title}
                </title>
                <link rel='icon' href={'/LOGO.png'} type='image/x-icon'/>
            </Head>
            <button onClick={() => setUpdate(!update)}>
                update
            </button>
            <Node offsetTop={120} rootElementID={'scrollableDiv'}
                  renderNode={entity => {
                      if (entity !== undefined && !entity.create) {
                          if (entity !== currentEntity)
                              return (
                                  <div style={{
                                      padding: '8px',
                                      borderRadius: '8px',
                                      display: 'flex',
                                      maxWidth: '200px',
                                      height: '73px',
                                      minHeight: '75px',
                                      minWidth: '110px',
                                      alignItems: 'center',

                                      background: 'white',
                                      border: '#e0e0e0 1px solid'
                                  }}>
                                      <div style={{
                                          margin: 'auto', overflow: 'hidden',
                                          whiteSpace: 'nowrap',
                                          textOverflow: 'ellipsis',
                                      }}>
                                          {entity.id}
                                      </div>
                                  </div>
                              )
                          else
                              return (
                                  <PopOverview data={currentEntity} handleClose={() => setCurrentEntity(null)}/>)
                      } else if (entity !== undefined && entity.create) {
                          return (
                              <div style={{
                                  padding: '8px',
                                  borderRadius: '8px',
                                  display: 'flex',
                                  maxWidth: '200px',
                                  height: '73px',
                                  minHeight: '75px',
                                  minWidth: '110px',
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                  background: 'white',
                                  border: '#e0e0e0 1px solid'
                              }}>
                                  <AddRounded/>
                              </div>
                          )
                      } else
                          return null
                  }}
                  getEntityKey={entity => {
                      if (entity !== undefined)
                          return entity.id
                      else
                          return '-1'
                  }}
                  entities={pops}
                  triggerUpdate={update}
                  updateEntity={(entity) => {
                      setUpdate(false)
                      SubmitPop({
                          pk: entity.id,
                          data: entity,
                          setStatus: () => null
                      })
                  }}
                  level={0} getParentKeys={entity => entity.parents}
            />
        </>
    )
}
Pops.propTypes = {
    subjectID: PropTypes.number
}