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
            },
            shape: 'rect',
        },

        {
            id: 4,
            title: 'Cafe',
            description: 'Teste',
            color: '#0095ff',
            placement: {
                x: 400,
                y: 400
            },
            shape: 'circle',
        }
    ],
    groups: [
        {  placement: {
                x: 200,
                y: 600
            },
            nodes: [
                {
                    id: 5,
                    title: 'Cafe',
                    description: 'Teste',
                    color: 'pink',

                    shape: 'circle',
                },
                {
                    id: 6,
                    title: 'Cafe',
                    description: 'Teste',
                    color: '#ccc',

                    shape: 'circle',
                }
            ]
        }
    ],
    links: [
        {
            denomination: 'Cafe',
            type: 'strong',
            parent: 3,
            child: 2
        },
        {
            denomination: 'Cafe',
            type: 'strong',
            parent: 3,
            child: 1
        },
        {
            denomination: 'Cafe',
            type: 'weak',
            parent: 3,
            child: 4
        },
    ]
}