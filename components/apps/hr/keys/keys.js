import getQuery from "../queries/getQuery";


const QUERIES = {
    unit: {...getQuery('_unit'), ...{keys: [{key: 'acronym', type: 'string', label: 'Acrônomo', visible: true}]}},
    commissioned: {
        ...getQuery('commissioned'), ...{
            keys: [{
                key: 'name',
                type: 'string',
                label: 'Nome',
                visible: true
            }]
        }
    },
    collaborator: {
        ...getQuery('collaborator'), ...{
            keys: [{
                key: 'name',
                type: 'string',
                label: 'Nome',
                visible: true
            }]
        }
    },

}

export const personKeys = [
    {key: 'id', type: 'number', label: 'ID', visible: false},
    {key: 'name', type: 'string', label: 'Nome', visible: true},
    {key: 'registration', type: 'string', label: 'Matrícula', visible: true},
    {key: 'extension', type: 'string', label: 'Ramal', visible: true},
    {key: 'email', type: 'string', label: 'Email', visible: true},

    {key: 'birth', type: 'date', label: 'Data de nascimento', visible: true},
    {
        key: 'unit',
        type: 'object',
        label: 'Lotação',
        subfieldKey: 'acronym',
        subType: 'string',
        query: QUERIES.unit,
        visible: true,
        object_identifier: 'acronym'
    },
]

export const vacancyKeys = [
    {
        key: 'unit',
        type: 'object',
        label: 'Lotação',
        subfieldKey: 'acronym',
        subType: 'string',
        query: QUERIES.unit,
        visible: true,
        object_identifier: 'acronym'
    },
    {
        key: 'commissioned',
        type: 'object',
        label: 'Cargo',
        subfieldKey: 'name',
        subType: 'string',
        query: QUERIES.commissioned,
        visible: true
    },
    {
        key: 'holder',
        type: 'object',
        label: 'Titular',
        subfieldKey: 'name',
        subType: 'string',
        query: QUERIES.collaborator,
        visible: true
    },

    {
        key: 'substitute',
        type: 'object',
        label: 'Substituto',
        subfieldKey: 'name',
        subType: 'string',
        query: QUERIES.collaborator,
        visible: true
    },
]

export const unitKeys = [
    {key: 'acronym', type: 'string', label: 'Sigla', visible: true},
    {key: 'name', type: 'string', label: 'Nome', visible: true},
]
export const commissionedKeys = [

    {key: 'name', type: 'string', label: 'Nome', visible: true},
    {key: 'level', type: 'string', label: 'Nível', visible: true},
    {key: 'classification', type: 'string', label: 'Classe', visible: true},
]


