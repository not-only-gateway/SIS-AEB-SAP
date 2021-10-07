export const serviceKeys = [
    {
        key: 'denomination',
        label: 'Nome',
        type: 'string',
        visible: true
    },
    {
        key: 'host',
        label: 'Host',
        type: 'string',
        visible: true
    },
    {
        key: 'description',
        label: 'Descrição',
        type: 'string',
        visible: false
    }
]

export const endpointKeys = [
    {
        key: 'id',
        label: 'id',
        type: 'number'
    },
    {
        key: 'url',
        label: 'URL',
        type: 'string',
        visible: true
    },
    {
        key: 'methods',
        label: 'Método HTTP',
        type: 'array',
        visible: true
    },
    {
        key: 'require_auth',
        label: 'Requer autenticação',
        type: 'bool',
        visible: true
    },
    {
        key: 'service',
        label: 'Serviço',
        type: 'object',
        subfieldKey: 'name',
        visible: true
    }
]


export const entityKeys = [
    {
        key: 'denomination',
        label: 'Denominação',
        type: 'string',
        visible: true
    },
    {
        key: 'description',
        label: 'Descrição',
        type: 'string',
        visible: true
    },
    {
        key: 'identification_key',
        label: 'Chave de identificação',
        type: 'string',
        visible: true
    }
]

export const accessProfileKeys = [
    {
        key: 'id',
        label: 'id',
        type: 'number',
        visible: true
    },
    {
        key: 'denomination',
        label: 'Denominação',
        type: 'string',
        visible: true
    }
]

export const permissionKeys = [
    {
        key: 'id',
        label: 'id',
        type: 'number',
        visible: true
    },
    {
        key: 'denomination',
        label: 'Denominação',
        type: 'string',
        visible: true
    },
    {
        key: 'description',
        label: 'Descrição',
        type: 'string'
    }
]