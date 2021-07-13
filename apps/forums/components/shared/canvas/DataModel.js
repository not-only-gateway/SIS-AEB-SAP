export default {
    id: 1,
    subject: 'Title',
    description: 'Cafe',
    dimensions: {
        width: '100%',
        height: '100%'
    },
    nodes: [
        {
            id: 1,
            title: 'Cafe',
            description: 'Teste',
            color: 'red',
            placement: {
                x: 100,
                y: 100
            }
        },
        {
            id: 3,
            title: 'Cafe',
            description: 'Teste',
            color: 'blue',
            placement: {
                x: 300,
                y: 300
            }
        },
        {
            id: 2,
            title: 'Cafe',
            description: 'Teste',
            color: 'green',
            placement: {
                x: 200,
                y: 200
            }
        },

        {
            id: 4,
            title: 'Cafe',
            description: 'Teste',
            color: '#0095ff',
            placement: {
                x: 400,
                y: 400
            }
        }
    ],
    groups: [
        {
            id: 1,
            nodes: [
                1,
                2,
                3]
        },
        {
            id: 2,
            nodes: [
                4,
                5,
                6
            ]
        },
        {
            id: 3,
            nodes: [
                7,
                8,
                9
            ]
        }
    ],
    links: [
        {
            denomination: 'Cafe',
            type: 'Strong',
            parent: 3,
            child: 2
        },
        {
            denomination: 'Cafe',
            type: 'Strong',
            parent: 3,
            child: 1
        },
        {
            denomination: 'Cafe',
            type: 'Strong',
            parent: 3,
            child: 4
        },
    ]
}