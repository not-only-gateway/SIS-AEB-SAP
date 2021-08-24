import PropTypes from 'prop-types'
import React, {useState} from "react";
import animations from "../../../../styles/Animations.module.css";
import handleObjectChange from "../../../../utils/shared/HandleObjectChange";
import List from "../../../shared/misc/list/List";
import Cookies from "universal-cookie/lib";
import Host from "../../../../utils/shared/Host";
import RiskForm from "./RiskForm";
import {RemoveRounded} from "@material-ui/icons";
import ProjectRequests from "../../../../utils/fetch/ProjectRequests";
import Alert from "../../../shared/misc/alert/Alert";

export default function RisksList(props) {
    const [currentEntity, setCurrentEntity] = useState(null)
    const [open, setOpen] = useState(false)
    const [refreshed, setRefreshed] = useState(false)
    const [status, setStatus] = useState({
        type: undefined,
        message: undefined
    })
    return (
        <div style={{width: '100%'}}>
            <Alert
                type={status.type} render={status.type !== undefined}
                handleClose={() => setStatus({type: undefined, message: undefined})}
                message={status.message}
            />
            {!open ? null :
                <div className={animations.fadeIn}>
                    <RiskForm
                        returnToMain={() => {
                            setOpen(false)
                            setRefreshed(false)
                            console.log('settingRefresh')
                        }}
                        handleChange={event => handleObjectChange({
                            event: event,
                            setData: setCurrentEntity
                        })}
                        create={!(currentEntity !== null && currentEntity !== undefined && currentEntity.id !== undefined)}
                        data={currentEntity} project={props.project}/>
                </div>
            }
            <div style={{display: open ? 'none' : undefined}}>
                <List
                    listKey={'project'}
                    createOption={true}
                    fetchToken={(new Cookies()).get('jwt')} fetchUrl={Host() + 'list/risk'}
                    triggerRefresh={!refreshed}
                    setRefreshed={setRefreshed}
                    fields={[
                        {name: 'description', type: 'string',label: 'descrição'},
                        {name: 'analysis', type: 'string', label: 'Análise', getColor: field => {
                            let res = undefined
                                switch (field){
                                    case 'baixo': {
                                        res = '#00F400'
                                        break
                                    }
                                    case 'moderado': {
                                        res = '#FFBA3E'
                                        break
                                    }
                                    case 'alto': {
                                        res = '#ff5555'
                                        break
                                    }
                                    default:
                                        break
                                }
                                return res
                            }}
                    ]}
                    labels={['descrição', 'Análise']}
                    clickEvent={() => setOpen(true)}
                    setEntity={entity => setCurrentEntity(entity)}
                    searchFieldName={'search_input'}
                    title={'Riscos'}
                    scrollableElement={'scrollableDiv'}
                    fetchSize={15}
                    options={[{
                        label: 'Deletar',
                        icon: <RemoveRounded/>,
                        onClick: (entity) => {
                            ProjectRequests.deleteRisk({
                                pk: entity.id,
                                setStatus: setStatus,
                                setRefreshed: setRefreshed
                            })
                        },
                        disabled: false
                    }]}
                    fetchParams={{
                        project: props.project.id
                    }}
          />
            </div>
        </div>
    )
}
RisksList.propTypes = {
    project: PropTypes.object
}