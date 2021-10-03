export default {
    action: [
        {key: 'id', type: 'number', label: 'ID', visible: false},
        {key: 'number', type: 'number', label: 'Número', visible: true},
        {key: 'detailing', type: 'string', label: 'Detalhamento', visible: true}
    ],
    budgetPlan: [
        {key: 'id', type: 'number', label: 'ID', visible: false},
        {key: 'action', type: 'object', label: 'Ação', visible: true, subfieldKey: 'number'},
        {key: 'number', type: 'number', label: 'Número', visible: true},
        {key: 'detailing', type: 'string', label: 'Detalhamento', visible: true}
    ],
    classification: [
        {key: 'id', type: 'number', label: 'ID', visible: false},
        {key: 'classification', type: 'string', label: 'Classificação', visible: true},
        {key: 'type', type: 'object', label: 'Tipo', visible: true, subfieldKey: 'type'}
    ],
    components: [
        {key: 'id', type: 'number', label: 'ID', visible: false},
        {key: 'situation', type: 'string', label: 'Situação', visible: true},
        {key: 'classification', type: 'object', label: 'Classificação', visible: true, subfieldKey: 'classification'},
        {key: 'infrastructure', type: 'object', label: 'Infraestrutura', visible: true, subfieldKey: 'name'}
    ],
    decentralizedUnit: [
        {key: 'id', type: 'number', label: 'ID', visible: false},
        {key: 'name', type: 'string', label: 'Nome', visible: true},
        {key: 'competent_authority', type: 'string', label: 'Autoridade competente', visible: true},
        {key: 'cpf', type: 'string', label: 'CPF', visible: true},
        {key: 'identification', type: 'string', label: 'Identificação', visible: true},
        {key: 'ugi', type: 'string', label: 'UGI', visible: true},
        {key: 'uge', type: 'string', label: 'UGE', visible: true},
        {key: 'cnpj', type: 'string', label: 'CNPJ', visible: true},
        {key: 'ug', type: 'string', label: 'UG', visible: true},
        {key: 'responsible', type: 'object', label: 'Responsável', visible: true, subfieldKey: 'acronym'}
    ],
    infrastructure: [
        {key: 'id', type: 'number', label: 'ID', visible: false},
        {key: 'name', type: 'string', label: 'Nome', visible: true},
        {key: 'type', type: 'object', label: 'Tipo', visible: true},
    ],
    natureOfExpense: [
        {key: 'id', type: 'number', label: 'ID', visible: false},
        {key: 'gnd', type: 'string', label: 'GND', visible: true},
        {key: 'nature_of_expense', type: 'string', label: 'Natureza de despesa', visible: true},
        {key: 'description', type: 'string', label: 'Descrição', visible: true}
    ],
    type: [
        {key: 'id', type: 'number', label: 'ID', visible: false},
        {key: 'type', type: 'string', label: 'Tipo', visible: true}
    ]
}