import React from "react";

export default [
    {
        field: 'unit_role',
        type: 'object',
        label: 'Vaga',
        renderObjectField: entity => {
            let res = null
            if (entity !== null && entity !== undefined)
                res = (
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '8px',
                        width: '100%'
                    }}>
                        {entity.role.denomination}
                        <div style={{borderRight: '#e0e0e0 1px solid', width: '1px', height: '20px'}}/>
                        {entity.unit.acronym}
                    </div>
                )
            return res
        },
    },
    {
        field: 'legal_document',
        type: 'string',
        label: 'Documento legal'
    },
    {
        field: 'substitute',
        type: 'bool',
        label: 'Substituto'
    },
    {
        field: 'origin',
        type: 'string',
        label: 'Origem'
    },
    {
        field: 'official_publication_date',
        type: 'date',
        label: 'Data de publicação oficial'
    },
    {
        field: 'admission_date',
        type: 'date',
        label: 'Data de admissão'
    },
]