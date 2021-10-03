export default {
    ted: [
        {key: 'id', type: 'number', label: 'ID', visible: true},
        {key: 'number', type: 'string', label: 'Número', visible: true},
        {key: 'process', type: 'string', label: 'Processo', visible: true},
        {key: 'year', type: 'number', label: 'Ano', visible: true},
        {key: 'status', type: 'string', label: 'Status', visible: true},
        {key: 'start_date', type: 'date', label: 'Data de inicio', visible: true},
        {key: 'end_date', type: 'date', label: 'Data de termino', visible: true},
        {key: 'responsible', type: 'object', label: 'Responsável', visible: true, subfieldKey: 'acronym'},
        {key: 'global_value', type: 'number', label: 'Valor Global', visible: true,  maskStart: 'R$'},
        {key: 'action', type: 'object', label: 'Ação', visible: false, subfieldKey: 'number'},
        {key: 'object', type: 'string', label: 'Objeto', visible: false},
        {key: 'object_summary', type: 'string', label: 'Objeto resumido', visible: false},
        {key: 'justification', type: 'string', label: 'Justificativa', visible: false},
        {key: 'summary_justification', type: 'string', label: 'Justificativa resumida', visible: false},
        {key: 'programmatic_functional_classification', type: 'string', label: 'Classificação funcional programática', visible: false},
        {key: 'ownership_destination_assets', type: 'string', label: 'Titularidade e destinação dos bens', visible: false},
        {key: 'remaining_assets', type: 'string', label: 'Bens remanescentes', visible: false},
        {key: 'decentralized_unit', type: 'object', label: 'Unidade descentralizada', visible: true, subfieldKey: 'name'}
    ]
}