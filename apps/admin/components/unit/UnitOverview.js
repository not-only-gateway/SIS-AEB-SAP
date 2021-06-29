export default [
    {
        field: 'acronym',
        type: 'string',
        label: 'Sigla'
    },
    {
        field: 'name',
        type: 'string',
        label: 'Nome'
    },
    {
        field: 'is_decentralized ',
        type: 'bool',
        label: 'É descentralizada'
    },
    {
        field: 'sphere',
        type: 'string',
        label: 'Esfera'
    },
    {
        field: 'power',
        type: 'string',
        label: 'Poder'
    },
    {
        field: 'legal_nature',
        type: 'string',
        label: 'Natureza jurídica'
    },
    {
        field: 'change_type',
        type: 'string',
        label: 'Tipo de alteração'
    },
    {
        field: 'category',
        type: 'string',
        label: 'Categoria'
    },
    {
        field: 'competence',
        type: 'string',
        label: 'Competência'
    },
    {
        field: 'finality',
        type: 'string',
        label: 'Finalidade'
    },
    {
        field: 'mission',
        type: 'string',
        label: 'Missão'
    },

    {
        field: 'strategic_objective',
        type: 'string',
        label: 'Objetivo estratégico'
    },

    {
        field: 'standardization',
        type: 'string',
        label: 'Normatização'
    },

    {
        field: 'parent_unit',
        type: 'object',
        renderObjectField: entity => {
            let res = null

            if (entity !== null && entity !== undefined)
                res = entity.acronym
            return res
        },
        label: 'Unidade pai'
    },
    {
        field: 'parent_entity',
        type: 'object',
        renderObjectField: entity => {
            let res = null

            if (entity !== null && entity !== undefined)
                res = entity.acronym
            return res
        },
        label: 'Entidade pai'
    },
]