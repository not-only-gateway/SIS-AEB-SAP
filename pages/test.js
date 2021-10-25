import Button from "../components/core/inputs/button/Button";
import React, {useState} from "react";
import TextField from "../components/core/inputs/text/TextField";
import DropDownField from "../components/core/inputs/dropdown/DropDownField";

export default function test() {
    const [c, sc] = useState()
    return (
        <div>

            <div style={{padding: '0 10%'}}>
                <Button>
                    Default
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
                    handleChange={e => sc(e.target.value)}
                    disabled={false}
                    width={'100%'} value={c}
                />
                <TextField
                    label={'Input '}
                    placeholder={'Input'}
                    handleChange={e => sc(e.target.value)}
                    disabled={false} size={'small'}
                    width={'100%'} value={c}
                />
                <TextField
                    label={'Input secondary'}
                    placeholder={'Input secondary'}
                    colorVariant={'secondary'}
                    handleChange={e => sc(e.target.value)}
                    disabled={false}
                    width={'100%'} value={c}
                />
                <TextField
                    label={'Input disabled'}
                    placeholder={'Input disabled'}
                    handleChange={e => sc(e.target.value)}
                    disabled={true}
                    width={'100%'}
                />
                <DropDownField
                    label={'Test'} placeholder={'Test'}
                    choices={[{key: 'cafe', value: 'CAFE'}, {key: 'cafe', value: 'CAFE'}, {
                        key: 'cafe',
                        value: 'CAFE'
                    }]}/>
                <DropDownField
                    label={'Test'} placeholder={'Test'} colorVariant={'secondary'}
                    choices={[{key: 'cafe', value: 'CAFE'}, {key: 'cafe', value: 'CAFE'}, {
                        key: 'cafe',
                        value: 'CAFE'
                    }]}/>
                <DropDownField
                    label={'Test'} placeholder={'Test'} disabled={true}
                    choices={[{key: 'cafe', value: 'CAFE'}, {key: 'cafe', value: 'CAFE'}, {
                        key: 'cafe',
                        value: 'CAFE'
                    }]}/>
                <DropDownField
                    label={'Test'} placeholder={'Test'}
                    choices={[{key: 'cafe', value: 'CAFE'}, {key: 'cafe', value: 'CAFE'}, {
                        key: 'cafe',
                        value: 'CAFE'
                    }]}
                    disabled={false} size={'small'}
                />

            </div>
        </div>
    )
}