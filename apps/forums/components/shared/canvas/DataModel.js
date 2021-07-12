export default {
    id: 1,
    subject: 'Title',
    description: 'Cafe',
    dimensions: {
      width: 100,
      height: 100
    },
    nodes: [
        {
            id: 4,
            title: 'Cafe',
            description: 'Teste',
            color: '#0095ff',
            placement: {
                x: 100,
                y: 100
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
            child: 3
        },
        {
            denomination: 'Cafe',
            type: 'Strong',
            parent: 3,
            child: 5
        },
    ]
}