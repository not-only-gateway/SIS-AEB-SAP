import React, {useMemo} from 'react'

export default function useField(field, entity) {

    return useMemo(() => {
        if(entity[field.key] !== undefined && entity[field.key] !== null)
            switch (field.type) {
                case 'string':
                    return (field.maskStart ? field.maskStart : '') + entity[field.key] + (field.maskEnd ? field.maskEnd : '')
                case 'number': {
                    let parts = entity[field.key].toString().split(".")
                    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".")

                    return (field.maskStart ? field.maskStart : '') + (parts.join(".")) + (field.maskEnd ? field.maskEnd : '')
                }
                case 'bool':
                    return (field.maskStart ? field.maskStart : '') + (entity[field.key] ? 'Sim' : 'Não') + (field.maskEnd ? field.maskEnd : '')
                case 'date':
                    return (field.maskStart ? field.maskStart : '') + (new Date(entity[field.key]).toLocaleDateString()) + (field.maskEnd ? field.maskEnd : '')
                case 'object': {
                    if (entity[field.key] !== null || (entity[field.key] !== null && entity[field.key][field.subfieldKey] === undefined))
                        return (field.maskStart ? field.maskStart : '') + (entity[field.key][field.subfieldKey]) + (field.maskEnd ? field.maskEnd : '')
                    else
                        return field.fallback
                }
                case 'array': {
                    let value = ''
                    entity[field.key].forEach((e, i) => {
                        if (i > 0)
                            value = value + '-' + e
                        else
                            value = e
                    })
                    return value
                }
                default:
                    return entity[field.key]
            }
        else
            return 'Em branco'
    }, [field.type, entity])
}
