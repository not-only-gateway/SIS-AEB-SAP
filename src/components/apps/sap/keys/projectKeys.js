import getQuery from "../queries/getQuery";

export default {
    project: [
        {key: 'id', type: 'number', label: 'ID'},
        {key: 'name', type: 'string', label: 'Nome', visible: true},
        {key: 'sponsor', type: 'string', label: 'Patrocinador'},
        {key: 'estimated_value', type: 'number', label: 'Custo estimado', visible: true, maskStart: 'R$'},
        {key: 'description', type: 'string', label: 'Descrição', visible: true},
        {key: 'manager', type: 'string', label: 'Gerente'},
        {key: 'public_sector_team', type: 'string', label: 'Equipe do setor público'},
        {key: 'private_sector_team', type: 'string', label: 'Equipe do setor privado'},
        {key: 'objectives', type: 'string', label: 'Objetivos'},
        {key: 'stakeholders', type: 'string', label: 'Stakeholders'},
        {key: 'scope', type: 'string', label: 'Escopo'},
        {key: 'critical_factors', type: 'string', label: 'Fatores críticos'},
        {key: 'type', type: 'string', label: 'Tipo', visible: true},
        {key: 'responsible', type: 'object', label: 'Responsável', subfieldKey: 'acronym', subType: 'string', query: getQuery('unit')},
        {key: 'lessons_learned', type: 'string', label: 'Lições aprendidas'}
    ],
    risks: [
        {key: 'id', type: 'number', label: 'ID', visible: false},
        {key: 'description', type: 'string', label: 'Descrição', visible: true},
        {key: 'analysis', type: 'string', label: 'Análise', visible: true, getColor: field => {
                let res = undefined
                switch (field.toLowerCase()) {
                    case 'baixo': {
                        res = '#00F400'
                        break
                    }
                    case 'moderado': {
                        res = '#FFBA3E'
                        break
                    }
                    case 'alto': {
                        res = '#ff5555'
                        break
                    }
                    default:
                        break
                }
                return res
            }}
    ],
    goal: [
        {key: 'id', type: 'number', label: 'ID', visible: false},
        {key: 'description', type: 'string', label: 'Descrição', visible: true},
        {key: 'deadline', type: 'date', label: 'Prazo final', visible: true},
        {
            key: 'status',
            type: 'string',
            label: 'Status',
            visible: true,
            getColor: field => {
                let res = undefined
                switch (field.toLowerCase()) {
                    case 'a iniciar': {
                        res = '#A300F5'
                        break
                    }
                    case 'em andamento': {
                        res = '#00F400'
                        break
                    }
                    case 'pausado': {
                        res = '#FFBA3E'
                        break
                    }
                    case 'atrasado': {
                        res = '#ff5555'
                        break
                    }
                    case 'finalizado': {
                        res = '#0095ff'
                        break
                    }
                    default:
                        break
                }
                return res
            },
        }
    ]
}