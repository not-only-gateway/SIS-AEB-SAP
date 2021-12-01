import {List, Switcher, useQuery} from "mfc-core";
import {useState} from "react";

import {publishKeys} from "../../keys/keys";
import {DeleteRounded} from "@material-ui/icons";
import deleteEntry from "../../utils/delete";
import getQuery from "../../utils/getQuery";
import PublishForm from "../forms/PublishForm";

export default function PublishList(props) {
    const hook = useQuery(getQuery('publish'))
    const [openEntity, setOpenEntity] = useState(undefined)
    return (
        <Switcher openChild={openEntity ? 0 : 1} styles={{width: '100%', height: '100%'}}>
            <PublishForm
                initialData={openEntity ? openEntity : {}}
                handleClose={() => {
                    setOpenEntity(undefined)
                    hook.clean()
                }}
            />
            <List
                keys={publishKeys}
                hook={hook} createOption={true}
                controlButtons={[
                    {
                        label: 'Deletar',
                        icon: <DeleteRounded/>,
                        onClick: data => {
                            deleteEntry({
                                prefix: 'gateway',
                                suffix: 'publish',
                                pk: data.id,
                            }).then(() => hook.clean())
                        }
                    }
                ]}
                onRowClick={row => null}
                onCreate={() => setOpenEntity({})}
                title={'Entidades'}
            />

        </Switcher>
    )
}