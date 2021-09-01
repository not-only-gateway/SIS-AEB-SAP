import React from 'react'

export default function RenderListField(field, entity) {
    let res = null
    console.log(typeof entity[field.name])
    switch (field.type) {
        case 'string': {
            res = (field.maskStart ? field.maskStart : '') + entity[field.name] + (field.maskEnd ? field.maskEnd : '')
            break
        }
        case 'number': {

            let parts = entity[field.name].toString().split(".")
            parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".")


            res = (field.maskStart ? field.maskStart : '') + (parts.join(".")) + (field.maskEnd ? field.maskEnd : '')
            break
        }
        case 'bool': {
            res = (field.maskStart ? field.maskStart : '') + (entity[field.name] ? 'Sim' : 'Não') + (field.maskEnd ? field.maskEnd : '')
            break
        }
        case 'date': {
            res = (field.maskStart ? field.maskStart : '') + (new Date(entity[field.name]).toLocaleDateString()) + (field.maskEnd ? field.maskEnd : '')
            break
        }
        case 'object': {

            if (entity[field.name] !== null || (entity[field.name] !== null && entity[field.name][field.subfield] === undefined))
                res = (field.maskStart ? field.maskStart : '') + (entity[field.name][field.subfield]) + (field.maskEnd ? field.maskEnd : '')
            else
                res = field.fallback

            break
        }
        default:
            break
    }
    return res
}
