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
            id: '1',
            title: 'Cafe',
            description: 'Teste',
            color: 'red',
            body: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
            placement: {
                x: 100,
                y: 100
            },
            creationDate: 0
        },
        {
            id: '3',
            title: 'Cafe',
            description: 'Teste',
            color: 'blue',
            body: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
            placement: {
                x: 300,
                y: 300
            },
            creationDate: 0
        },
        {
            id: '2',
            title: 'Cafe',
            description: 'Teste',
            color: 'green',
            placement: {
                x: 200,
                y: 200
            },
            body: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
            shape: 'rect',
            creationDate: 0
        },

        {
            id: '4',
            title: 'Cafe',
            description: 'Teste',
            body: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
            color: '#0095ff',
            placement: {
                x: 400,
                y: 400
            },
            shape: 'circle',
            creationDate: 0
        }
    ],
    groups: [
        {
            placement: {
                x: 200,
                y: 600
            },
            nodes: [
                {
                    id: '5',
                    title: 'Cafe',
                    description: 'Teste',
                    color: 'pink',
                    body: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
                    shape: 'circle',
                    creationDate: 0
                },
                {
                    id: '6',
                    title: 'Cafe',
                    description: 'Teste',
                    color: '#ccc',
                    body: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
                    shape: 'circle',
                    creationDate: 0
                }
            ]
        }
    ],
    links: [
        {
            denomination: 'Cafe',
            type: 'strong',
            parent: '3',
            child: '2'
        },
        {
            denomination: 'Cafe',
            type: 'strong',
            parent: '3',
            child: '1'
        },
        {
            denomination: 'Cafe',
            type: 'weak',
            parent: '3',
            child: '4'
        },
    ]
}
