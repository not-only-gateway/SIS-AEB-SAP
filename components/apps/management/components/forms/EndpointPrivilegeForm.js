import useData from "../../../../core/inputs/form/useData";
import Form from "../../../../core/inputs/form/Form";
import submit from "../../utils/submit";
import FormRow from "../../../../core/inputs/form/FormRow";
import PropTypes from "prop-types";
import DropDownField from "../../../../core/inputs/dropdown/DropDownField";
import {useQuery} from "mfc-core";
import {permission_query} from "../../queries/queries";
import {permissionKeys} from "../../keys/keys";
import Selector from "../../../../core/inputs/selector/Selector";
import {useMemo} from "react";

export default function EndpointPrivilegeForm(props) {

    const permissionHook = useQuery(permission_query)
    const initialData = useMemo(() => {
        return {
            ...props.initialData,
            endpoint: props.endpoint
        }
    }, [])

    const formHook = useData(initialData)
    return (
        <Form
            hook={formHook}
            title={'Vincular privilégio'}
            handleClose={() => props.handleClose()}
            returnButton={true}
            handleSubmit={(data, clearState) => {
                submit({
                    suffix: 'endpoint/privilege',
                    create: true,
                    data: {
                        ...data,
                        privilege: data.privilege.id
                    },
                    prefix: 'gateway'
                }).then((res) => {
                    if (res.success)
                        props.handleClose()
                })
            }}
            create={true}

        >
            {(data, handleChange) => (
                <FormRow>

                    <DropDownField
                        placeholder={'Método HTTP'} value={data.method}
                        label={'Método HTTP'} disabled={false} asArray={true}
                        choices={[
                            {key: 'POST', value: 'POST', color: '#fec02b'},
                            {key: 'GET', value: 'GET', color: '#20c060'},
                            {key: 'PUT', value: 'PUT', color: '#57a2ed'},
                            {key: 'DELETE', value: 'DELETE', color: '#ed4136'},
                            {key: 'PATCH', value: 'PATCH', color: '#5f5f5f'}
                        ]}
                        handleChange={e => handleChange({event: e, key: 'method'})}
                        required={true} width={'calc(50% - 16px)'}
                    />
                    <Selector
                        hook={permissionHook}
                        keys={permissionKeys}
                        label={'Privilégio'} placeholder={'Privilégio'}
                        value={data.privilege} width={'calc(50% - 16px)'}
                        required={true}
                        handleChange={e => handleChange({event: e, key: 'privilege'})}/>
                </FormRow>

            )}
        </Form>
    )
}

EndpointPrivilegeForm.propTypes = {
    initialData: PropTypes.object,
    handleClose: PropTypes.func,
    endpoint: PropTypes.string
}