import React, {useRef, useState} from "react";
import Cookies from "universal-cookie/lib";
import Host from "../../utils/shared/Host";
import PropTypes from "prop-types";
import animations from "../../styles/Animations.module.css";
// import ProjectForm from "./ProjectForm";
import {
    ArrowForwardRounded,
    DeleteRounded,
    GetAppRounded,
    OpenInBrowserRounded, OpenInNewRounded,
    PublishRounded
} from "@material-ui/icons";
import PersonRequests from "../../utils/requests/PersonRequests";
import HandleUpload from "../../utils/shared/HandleUpload";
import HandleDownload from "../../utils/shared/HandleDownload";

import useList from "../shared/core/REACT_LIST/hook/useList";
import List from "../shared/core/REACT_LIST/List";

export default function PeopleList(props) {
    const listState = useList({
        url: Host() + 'test/list/person',
        headers: {'authorization': new Cookies().get('jwt')},
        parsePackage: pack => {
            return pack
        },
        fetchSize: 15,
        identificationKey: 'id',
        keys: [{key: 'name', label: 'Nome'}, {key: 'birth', label: 'Data nascimento'}],
        controlButtons: [
            {
                icon: <OpenInNewRounded/>,
                label: 'Abrir',
                onClick: (cell) => console.log(cell)
            }
        ]
    })
    const [open, setOpen] = useState(false)
    const [refreshed, setRefreshed] = useState(false)
    const ref = useRef()

    return (
        <>

            <List useList={listState}/>

            {/*<div style={{display: open ? 'none' : undefined}}>*/}
            {/*    <List*/}
            {/*        listKey={'person'}*/}
            {/*        createOption={true}*/}
            {/*        fetchToken={(new Cookies()).get('jwt')} fetchUrl={Host() + 'list/person'}*/}
            {/*        triggerRefresh={!refreshed}*/}
            {/*        setRefreshed={setRefreshed}*/}
            {/*        controlOptions={[*/}
            {/*            {*/}
            {/*                label: 'Importar',*/}
            {/*                icon: <PublishRounded/>,*/}
            {/*                onClick: (d) => {*/}
            {/*                    ref.current.click()*/}
            {/*                },*/}
            {/*                disabled: false*/}
            {/*            },*/}
            {/*        ]}*/}
            {/*        options={[{*/}
            {/*            label: 'Abrir',*/}
            {/*            icon: <ArrowForwardRounded/>,*/}
            {/*            onClick: (entity) => {*/}
            {/*                props.redirect(entity.id)*/}
            {/*            },*/}
            {/*            disabled: false*/}
            {/*        },*/}
            {/*            {*/}
            {/*                label: 'Deletar',*/}
            {/*                icon: <DeleteRounded/>,*/}
            {/*                onClick: (entity) => {*/}
            {/*                    PersonRequests.deletePerson({*/}
            {/*                        pk: entity.id,*/}
            {/*                        setRefreshed: setRefreshed*/}
            {/*                    })*/}
            {/*                },*/}
            {/*                disabled: false,*/}
            {/*                color: '#ff5555'*/}
            {/*            },*/}
            {/*            {*/}
            {/*                label: 'Baixar dados',*/}
            {/*                icon: <GetAppRounded/>,*/}
            {/*                onClick: (entity) => {*/}
            {/*                    HandleDownload(entity, entity.id)*/}
            {/*                },*/}
            {/*                disabled: false*/}
            {/*            }]}*/}
            {/*        fields={[*/}
            {/*            {name: 'name', type: 'string'},*/}
            {/*            // {name: 'description', type: 'string'},*/}
            {/*            // {name: 'estimated_value', type: 'number', maskStart: 'R$ '},*/}
            {/*            // {name: 'type', type: 'string', capitalize: true},*/}
            {/*        ]}*/}
            {/*        labels={['nome']}*/}
            {/*        clickEvent={() => null}*/}
            {/*        setEntity={entity => {*/}
            {/*            if (entity === null || entity === undefined) {*/}
            {/*                setOpen(true)*/}
            {/*                props.setOpen(true)*/}
            {/*            } else*/}
            {/*                props.redirect(entity.id)*/}
            {/*        }} searchFieldName={'search_input'} title={'Colaboradores e pessoas'}*/}

            {/*    />*/}
            {/*</div>*/}
        </>
    )
}

PeopleList.propTypes = {
    redirect: PropTypes.func
}