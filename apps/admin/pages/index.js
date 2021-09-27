import React from 'react'
import ManagementPT from "../packages/locales/management/ManagementPT";
import Head from "next/head";
import Selector from "../components/shared/core/inputs/selector/Selector";
import useQuery from "../components/shared/core/shared/hooks/useQuery";
import Host from "../utils/shared/Host";
import Cookies from "universal-cookie/lib";
import PersonKeys from "../packages/KEYS/PersonKeys";
import Form from "../components/shared/core/inputs/form/Form";
import FormRow from "../components/shared/core/inputs/form/FormRow";
import PeopleList from "../components/management/PeopleList";


export default function management() {
    const lang = ManagementPT
    const hook = useQuery({
        url: Host() + 'test/list/person',
        headers: {'authorization': new Cookies().get('jwt')},
        parsePackage: pack => {
            return pack
        },
        fetchSize: 15,
        identificationKey: 'id',
    })
    return (
        <>
            <Head>
                <title>{lang.title}</title>
                <link rel='icon' href={'/LOGO.png'} type='image/x-icon'/>
            </Head>

            <PeopleList
                redirect={id => router.push('/project/?id=' + id, undefined, {shallow: true})}
            />
            <div style={{padding: '10vw'}}>

                <Form handleSubmit={() => null} returnButton={true} title={'Teste de t'} create={false}
                      initialData={null}>
                    {({data, handleChange}) => (
                        <FormRow title={"Teste"}>
                            <Selector
                                hook={hook} keys={PersonKeys}
                                identificationKey={'id'} width={'25%'}
                                handleChange={value => {
                                    handleChange({event: value, key: 'field'})
                                }} value={data.field}
                                placeholder={'Placeholder'} required={true}
                                label={'Teste'} disabled={false}
                                selected={undefined} title={"Title"}
                            />
                        </FormRow>
                    )}
                </Form>
            </div>
        </>
    )

}
