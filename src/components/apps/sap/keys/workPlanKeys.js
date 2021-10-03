export default {
    action: [
        {key: 'id', type: 'number', label: 'ID', visible: false},
        {key: 'detailing', type: 'string', label: 'Detalhamento', visible: true},
        {key: 'accomplished', type: 'string', label: 'Realizado', visible: true},
    ],
    activity: [
        {key: 'id', type: 'number', label: 'ID', visible: false},
        {key: 'stage', type: 'string', label: 'Etapa', visible: true},
        {key: 'description', type: 'string', label: 'Descrição', visible: true},
        {key: 'representation', type: 'string', label: 'Representação', visible: true},
    ],
    execution: [
        {key: 'id', type: 'number', label: 'ID', visible: false},
        {key: 'current_execution', type: 'string', label: 'Execução atual', visible: true, maskEnd: '%'},
        {key: 'committed', type: 'number', label: 'Empenhado', visible: true, maskStart: 'R$'},
        {key: 'liquidated', type: 'number', label: 'Liquidado', visible: true, maskStart: 'R$'},
        {key: 'paid', type: 'number', label: 'Pago', visible: true, maskStart: 'R$'},
        {key: 'execution_date', type: 'date', label: 'Data da execução', visible: true},
        {key: 'description', type: 'string', label: 'Descrição', visible: true},
        {key: 'difficulties', type: 'string', label: 'Dificuldades', visible: false},
        {key: 'measures_taken', type: 'string', label: 'Medidas tomadas', visible: false}
    ],
    financialDisbursement: [
        {key: 'id', type: 'number', label: 'ID', visible: false},
        {key: 'year', type: 'string', label: 'Ano', visible: true},
        {key: 'month', type: 'string', label: 'Mês', visible: true},
        {key: 'value', type: 'number', label: 'Valor', visible: true, maskStart: 'R$'}
    ],
    followup: [
        {key: 'id', type: 'number', label: 'ID', visible: false},
        {key: 'description', type: 'string', label: 'Descrição', visible: true},
        {key: 'accomplished', type: 'bool', label: 'Entregue', visible: true},
    ],
    goal: [
        {key: 'id', type: 'number', label: 'ID', visible: false},
        {key: 'goal_number', type: 'string', label: 'Número', visible: true},
        {key: 'detailing', type: 'string', label: 'Detalhamento', visible: true},
        {key: 'unit_of_measurement', type: 'string', label: 'Unidade de medida', visible: true},
        {key: 'value', type: 'number', label: 'Valor', visible: true, maskStart: 'R$'},
        {key: 'initial_situation', type: 'string', label: 'Situação inicial', visible: true},
        {key: 'final_situation', type: 'string', label: 'Situação final', visible: true}
    ],
    permanentGoods: [
        {key: 'id', type: 'number', label: 'ID', visible: false},
        {key: 'description', type: 'string', label: 'Descrição'},
        {key: 'quantity', type: 'number', label: 'Quantidade', visible: true},
        {key: 'unit_of_measurement', type: 'string', label: 'Unidade de medida', visible: true},
        {key: 'unit_price', type: 'number', label: 'Preço unitário', visible: true, maskStart: 'R$'},
        {key: 'total_value', type: 'number', label: 'Valor', visible: true, maskStart: 'R$'},
        {key: 'acquisition_date', type: 'date', label: 'Data de aquisição', visible: true},
        {key: 'invoice', type: 'string', label: 'Nota fiscal', visible: true},
    ],
    note: [
        {key: 'id', type: 'number', label: 'ID', visible: false},
        {key: 'number', type: 'number', label: 'Número', visible: true},
        {key: 'value', type: 'number', label: 'Valor', visible: true, maskStart: 'R$'}
    ],
    operation: [
        {key: 'id', type: 'number', label: 'ID', visible: false},
        {key: 'phase', type: 'string', label: 'Fase', visible: true},
        {key: 'detailing', type: 'string', label: 'Detalhamento', visible: true},
        {key: 'stage_representation', type: 'string', label: 'Representação da etapa', visible: true, maskEnd: '%'},
        {key: 'indicator_planned', type: 'string', label: 'Indicador planejado', visible: true},
        {key: 'initial_situation', type: 'string', label: 'Situação inicial', visible: true},
        {key: 'start_date', type: 'date', label: 'Data inicial', visible: true},
        {key: 'end_date', type: 'date', label: 'Data final', visible: true},
        {key: 'estimated_cost', type: 'number', label: 'Custo estimado', visible: true, maskStart: 'R$'},
        {key: 'version', type: 'string', label: 'Versão', visible: true}
    ],
    resource: [
        {key: 'id', type: 'number', label: 'ID', visible: false},
        {key: 'indirect_cost', type: 'bool', label: 'Custos indiretos', visible: true},
        {key: 'value', type: 'number', label: 'Valor', visible: true, maskStart: 'R$'},
        {key: 'nature_of_expense', type: 'object', label: 'Natureza de despesa', visible: true, subfieldKey: 'nature_of_expense'},
    ],
    status: [
        {key: 'id', type: 'number', label: 'ID', visible: false},
        {key: 'update_date', type: 'date', label: 'Data de atualização', visible: true},
        {key: 'status', type: 'string', label: 'Status', visible: true},
        {key: 'difficulties', type: 'string', label: 'Dificuldades', visible: false},

    ],
    workPlan: [
        {key: 'id', type: 'number', label: 'ID', visible: false},
        {key: 'responsible', type: 'object', label: 'Responsável', visible: true, subfieldKey: 'acronym'},
        {key: 'object', type: 'string', label: 'Objeto', visible: true},
        {key: 'additive', type: 'string', label: 'Termo aditivo', visible: true},
        {key: 'email', type: 'string', label: 'Email', visible: true},
        {key: 'phone', type: 'string', label: 'Telefone', visible: true},
        {key: 'infrastructure', type: 'object', label: 'Infraestrutura', visible: true, subfieldKey: 'name'},
        {key: 'ways_of_execution', type: 'string', label: 'Formas de execução', visible: true},
        {key: 'sub_decentralization', type: 'bool', label: 'Sub-descentralização', visible: true},
        {key: 'justification', type: 'string', label: 'Justificativa', visible: true},
        {key: 'indirect_costs', type: 'bool', label: 'Custos indiretos', visible: true},
        {key: 'detailing_of_indirect_costs', type: 'string', label: 'Detalhamento dos custos indiretos'},
        {key: 'budget_plan', type: 'object', label: 'Plano orçamentário', visible: true, subfieldKey: 'number'},
        {key: 'responsible_execution', type: 'string', label: 'Responsável pela execução', visible: true},
        {key: 'func', type: 'string', label: 'Função', visible: true}
    ],
}