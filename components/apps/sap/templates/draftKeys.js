export default [
    {
        label: 'ID',
        key: 'id',
        type: 'number',
        visible: true,
    },
    {
        label: 'endpoint',
        key: 'endpoint',
        type: 'object',
        visible: true,
        subfieldKey: 'url',
        subtype: 'string'
    },
    {
        label: 'Formulário',
        key: 'endpoint',
        type: 'object',
        visible: true,
        subfieldKey: 'denomination',
        subtype: 'string'
    },
    {
        label: 'Descrição do formulário',
        key: 'endpoint',
        type: 'object',
        visible: true,
        subfieldKey: 'description',
        subtype: 'string'
    },
]