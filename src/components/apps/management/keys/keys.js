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
        key: 'require_auth',
        label: 'Requer autenticação',
        type: 'bool',
        visible: true
    },
    {
        key: 'service',
        label: 'Serviço',
        type: 'object',
        subfieldKey: 'denomination',
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

export const endpointPrivilegeKeys = [
    {
        key: 'endpoint',
        label: 'Endpoint',
        type: 'string'
    },
    {
        key: 'privilege',
        label: 'Privilégio',
        type: 'object',
        subfieldKey: 'denomination',
        subType: 'string',
        visible: true
    },
    {
        key: 'method',
        label: 'Método',
        type: 'number',
        visible: true,
        getColor: (type) => {
            switch (type) {
                case 'POST':
                    return '#fec02b'
                case 'PUT':
                    return '#57a2ed'
                case 'PATCH':
                    return '#5f5f5f'
                case 'GET':
                    return '#20c060'
                case 'DELETE':
                    return '#ed4136'
                default:
                    return undefined
            }
        }
    },
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

export const eventKeys = [
    {
        key: 'id',
        label: 'ID',
        type: 'number',
        visible: true
    },
    {
        key: 'method',
        label: 'Método',
        type: 'number',
        visible: 'true',
        getColor: (type) => {
            switch (type) {
                case 'POST':
                    return '#fec02b'
                case 'PUT':
                    return '#57a2ed'
                case 'PATCH':
                    return '#5f5f5f'
                case 'GET':
                    return '#20c060'
                case 'DELETE':
                    return '#ed4136'
                default:
                    return undefined
            }
        }
    },
    {
        key: 'url',
        label: 'URL',
        type: 'string',
        visible: true
    },
    {
        key: 'service',
        label: 'Serviço',
        type: 'object',
        subfieldKey: 'name'
    },
    {
        key: 'status_code',
        label: 'Status HTTP',
        type: 'number',
        visible: true,
        getColor: (type) => {
            switch (true) {
                case type < 300:
                    return '#20c060'
                case type >= 300 && type < 400:
                    return '#fec02b'
                case type >= 400:
                    return '#ed4136'
                default:
                    return undefined
            }
        }
    },
    {
        key: 'request_package_size',
        label: 'Pacote entrada',
        type: 'number',
        maskEnd: 'bytes'
    },
    {
        key: 'response_package_size',
        label: 'Pacote saida',
        type: 'number',
        maskEnd: 'bytes'
    }
]