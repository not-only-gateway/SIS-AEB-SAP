import {v4 as uuid4} from 'uuid';

export default {
    id: uuid4().toString(),
    subject: 'Sem título',
    nodes: [],
    links: [],
    dimensions: {},
    connectionType: 'strong-path',
    steps: []
}