import getQuery from "../utils/getQuery";

export default {
    ted: [
        {key: 'id', type: 'number', label: 'ID'},
        {key: 'number', type: 'string', label: 'Número', visible: true},
        {key: 'process', type: 'string', label: 'Processo', visible: true},
        {key: 'year', type: 'number', label: 'Ano'},
        {key: 'status', type: 'string', label: 'Status'},
        {key: 'start_date', type: 'date', label: 'Data de inicio'},
        {key: 'end_date', type: 'date', label: 'Data de termino'},
        {key: 'responsible', type: 'object', label: 'Responsável', subfieldKey: 'acronym', visible: true, subType: 'string', query: getQuery('unit')},
        {key: 'global_value', type: 'number', label: 'Valor Global',  maskStart: 'R$'},
        {key: 'action', type: 'object', label: 'Ação', subfieldKey: 'number', subType: 'string', query: getQuery('action')},
        {key: 'object', type: 'string', label: 'Objeto'},
        {key: 'object_summary', type: 'string', label: 'Objeto resumido'},
        {key: 'justification', type: 'string', label: 'Justificativa'},
        {key: 'summary_justification', type: 'string', label: 'Justificativa resumida'},
        {key: 'programmatic_functional_classification', type: 'string', label: 'Classificação funcional programática'},
        {key: 'ownership_destination_assets', type: 'string', label: 'Titularidade e destinação dos bens'},
        {key: 'remaining_assets', type: 'string', label: 'Bens remanescentes'},
        {key: 'decentralized_unit', type: 'object', label: 'Unidade descentralizada', subfieldKey: 'name', subType: 'string', query: getQuery('decentralized_unit')}
    ]
}