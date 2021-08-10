import {CropRounded, DeleteRounded, EditRounded, FileCopyRounded} from "@material-ui/icons";

export default [
    {
        label: 'Editar',
        icon: <EditRounded/>,
        onClick: (props,event) => {
            props.data.nodes.find((node, i) => {
                if(event.target.id.includes(node.id))
                    props.setNodeOnOverview(node)
            })

        }
    },
    {
        label: 'Recortar',
        icon: <CropRounded/>,
        onClick: (props, event) => {
            let index
            props.data.nodes.find((node, i) => {
                if(event.target.id.includes(node.id)) {
                    props.setCopiedNode(node)
                    index = i
                }
            })

            let newNodes = [...props.data.nodes]

            newNodes.splice(index, 1)

            props.setData({
                ...props.data,
                nodes: newNodes
            })
        }
    },
    {
        label: 'Copiar',
        icon: <FileCopyRounded/>,
        onClick: (props, event) => {
            props.data.nodes.find(node => {
                if(event.target.id.includes(node.id))
                    props.setCopiedNode(node)
            })
        }
    },
    {
        label: 'Deletar',
        icon: <DeleteRounded/>,
        onClick: (props, event) => {
            let index
            props.data.nodes.find((node, i) => {
                if(event.target.id.includes(node.id))
                    index = i
            })

            let newNodes = [...props.data.nodes]

            newNodes[index] = {}

            props.setData({
                ...props.data,
                nodes: newNodes
            })
        }
    },
]