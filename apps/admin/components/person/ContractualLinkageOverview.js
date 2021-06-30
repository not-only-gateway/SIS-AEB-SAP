export default [
    {
        field: 'denomination',
        type: 'string',
        label: 'Denominação'
    },
    {
        field: 'description',
        type: 'string',
        label: 'Descrição'
    },
    {
        field: 'legal_document',
        type: 'string',
        label: 'Documento legal'
    },
    {
        field: 'contract',
        type: 'object',
        label: 'Contrato',
        renderObjectField: entity => {
            let res = null

            if (entity !== null && entity !== undefined)
                res = entity.sei
            return res
        },
    },
    {
        field: 'effective_role',
        type: 'object',
        label: 'Cargo efetivo',
        renderObjectField: entity => {
            let res = null

            if (entity !== null && entity !== undefined)
                res = entity.denomination
            return res
        },
    },
    {
        field: 'entity',
        type: 'object',
        label: 'Entidade',
        renderObjectField: entity => {
            let res = null

            if (entity !== null && entity !== undefined)
                res = entity.acronym
            return res
        },
    },
    {
        field: 'official_publication_date',
        type: 'date',
        label: 'Data de publicação oficial'
    },
    {
        field: 'admission_date',
        type: 'date',
        label: 'Data de admissão'
    },
]