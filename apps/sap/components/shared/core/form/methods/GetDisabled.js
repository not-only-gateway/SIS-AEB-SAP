export default function isDisabled(props) {
    let response = props.dependencies === undefined || props.entity === null || props.entity === undefined || !props.dependencies.changed
    let i
    if (props.dependencies !== undefined && props.entity !== null && props.entity !== undefined && props.dependencies.changed)
        for (i = 0; i < props.dependencies.fields.length; i++)
            if (props.dependencies.fields[i] !== undefined)
                response = (
                    response ||
                    props.entity[props.dependencies.fields[i].name] === null ||
                    props.entity[props.dependencies.fields[i].name] === undefined ||
                    (props.dependencies.fields[i].type === 'string' ?
                        props.entity[props.dependencies.fields[i].name].length === 0
                        :
                        false)
                )

    return response
}