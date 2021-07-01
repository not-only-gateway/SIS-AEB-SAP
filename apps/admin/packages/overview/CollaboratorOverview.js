import React from "react";

export default [
    {
        field: 'registration',
        type: 'string',
        label: 'Matrícula'
    },
    {
        field: 'corporate_email',
        type: 'string',
        label: 'Email corporativo'
    },
    {
        field: 'extension',
        type: 'string',
        label: 'Ramal'
    },
    {
        field: 'alternative_phone',
        type: 'string',
        label: 'Telefone alternativo'
    },
    {
        field: 'home_office',
        type: 'bool',
        label: 'Homeoffice'
    },
    {
        field: 'occupancy',
        type: 'object',
        renderObjectField: entity => {
            let res = null

            if (entity !== null && entity !== undefined)
                res = entity.denomination
            return res
        },
        label: 'Vínculo contratual/Lotação'
    },
    {
        field: 'main_commissioned_linkage',
        type: 'object',
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


                            {entity.unit_role.role.denomination}
                        <div style={{borderRight: '#e0e0e0 1px solid', width: '1px', height: '20px'}}/>
                            {entity.unit_role.unit.acronym}

                    </div>
                )
            return res
        },
        label: 'Vínculo comissionado'
    },

    {
        field: 'access_profile',
        type: 'object',
        renderObjectField: entity => {
            let res = null

            if (entity !== null && entity !== undefined)
                res = entity.denomination
            return res
        },
        label: 'Perfil de acesso'
    },
]

