import Button from "../components/core/inputs/button/Button";
import React, {useState} from "react";
import TextField from "../components/core/inputs/text/TextField";
import DropDownField from "../components/core/inputs/dropdown/DropDownField";
import MultiSelectField from "../components/core/inputs/multiselect/MultiSelectField";
import {useQuery} from "mfc-core";
import getQuery from "../components/apps/sap/queries/getQuery";
import Selector from "../components/core/inputs/selector/Selector";
import associativeKeys from "../components/apps/sap/keys/associativeKeys";
import InfrastructureForm from "../components/apps/sap/components/forms/InfrastructureForm";
import FileField from "../components/core/inputs/file/FileField";
import DateField from "../components/core/inputs/date/DateField";

export default function test() {
    const [c, sc] = useState()
    const infrastructureHook = useQuery(getQuery('infrastructure'))

    return (
        <div>

            <div style={{padding: '0 10%'}}>
                <Button>
                    Default
                </Button>
                <Button variant={'outlined'} color={"secondary"}>
                    Outlined
                </Button>
                <Button disabled={true}>
                    Default disabled
                </Button>
                <Button color={"secondary"} highlight={true}>
                    Default secondary
                </Button>
                <Button variant={'minimal'}>
                    Minimal
                </Button>
                <Button variant={'minimal'} disabled={true}>
                    Minimal disabled
                </Button>
                <Button variant={'minimal'} color={"secondary"} highlight={true}>
                    Minimal secondary
                </Button>
                <Button variant={'filled'}>
                    Filled
                </Button>
                <Button variant={'filled'} disabled={true}>
                    Filled disabled
                </Button>
                <Button variant={'filled'} color={"secondary"} highlight={true}>
                    Filled secondary
                </Button>


                <TextField
                    label={'Input '}
                    placeholder={'Input'}
                    handleChange={e => {
                        console.log(e.target.value)
                        sc(e.target.value)
                    }}
                    disabled={false} type={'number'}

                    width={'100%'} value={c}
                />



                <DropDownField
                    label={'Test'} placeholder={'Test'}
                    choices={[{key: 'cafe', value: 'CAFE'}, {key: 'cafe', value: 'CAFE'}, {
                        key: 'cafe',
                        value: 'CAFE'
                    }]}
                    handleChange={() => null}/>

                <MultiSelectField
                    label={'Test'} placeholder={'Test'}
                    choices={[{key: 'cafe', value: 'CAFE'}, {key: 'cafe', value: 'CAFE'}, {
                        key: 'cafe',
                        value: 'CAFE'
                    }]} handleChange={() => null}
                    disabled={false} size={'small'}
                />
                <Selector
                    hook={infrastructureHook} keys={associativeKeys.infrastructure}
                    width={'calc(33.333% - 21.5px)'}
                    required={true}
                    value={null}
                    title={'Infraestrutura'}
                    placeholder={'Infraestrutura'}
                    handleChange={entity => null}
                 />
                <FileField/>
                <DateField handleChange={e => sc(e)}/>
            </div>
        </div>
    )
}