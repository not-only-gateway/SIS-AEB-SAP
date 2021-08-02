import {v4 as uuid4} from 'uuid';

export default {
    id: uuid4().toString(),
    subject: 'Sem título',
    nodes: [],
    links: [],
    dimensions: {
        width: 10000,
        height: 10000
    },
    connectionType: 'strong-path'
}