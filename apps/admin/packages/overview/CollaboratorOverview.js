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

