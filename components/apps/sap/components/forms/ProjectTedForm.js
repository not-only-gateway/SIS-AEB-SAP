import React, {useMemo} from "react";
import Form from "../../../../core/inputs/form/Form";
import PropTypes from "prop-types";
import EntitiesPT from "../../locales/EntitiesPT";
import associativeKeys from "../../keys/associativeKeys";
import useQuery from "../../../../core/visualization/hooks/useQuery";
import getQuery from "../../utils/getQuery";
import submit from "../../utils/submit";
import FormRow from "../../../../core/inputs/form/FormRow";
import FormTemplate from "../../templates/FormTemplate";
import Selector from "../../../../core/inputs/selector/Selector";


export default function ProjectTedForm(props) {

    const lang = EntitiesPT

    const typeHook = useQuery(getQuery(
        'project_ted_free',
        undefined,
        [{
            key: 'ted',
            type: 'object',
            value: props.ted?.id,
            different_from: true
        }]))
    const initialData = useMemo(() => {
        return {
            ...props.data,
            infrastructure: props.infrastructure?.id
        }
    }, [props.infrastructure])
    return (
        <FormTemplate
            keys={associativeKeys.classification}
            endpoint={'classification'} noDraft={true}
            initialData={initialData}
        >
            {({setOpen, formHook, asDraft, asHistory}) => (
                <Form
                    hook={formHook} submitLabel={'Vincular'}
                    create={props.create}
                    title={'Vincular projeto / atividade'}

                    returnButton={true}
                    handleSubmit={(data, clearState) =>
                        submit({
                            suffix: 'project_ted',
                            data: {
                                ...data,
                                ted: props.ted.id
                            },
                            create: props.create,
                        }).then(res => {
                            if (props.create && res.success) {
                                props.handleClose()
                                clearState()
                            }
                        })}
                    handleClose={() => props.handleClose()}>
                    {(data, handleChange) => (
                        <FormRow>
                            <Selector
                                hook={typeHook}
                                placeholder={'Projeto / atividade'}
                                label={'Projeto / atividade'}
                                handleChange={e => handleChange({event: e, key: 'activity_project'})}
                                value={data.activity_project} width={'100%'} required={true}
                                keys={associativeKeys.projectTed.filter(e => e.key !== 'ted')}
                            />
                        </FormRow>
                    )}
                </Form>
            )}
        </FormTemplate>
    )

}

ProjectTedForm.propTypes = {
    handleClose: PropTypes.func,
    ted: PropTypes.object,
}
