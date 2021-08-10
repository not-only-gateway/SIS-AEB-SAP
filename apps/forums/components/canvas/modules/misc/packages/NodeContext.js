import {
    CropRounded,
    DeleteRounded,
    EditRounded,
    FileCopyRounded,
    ZoomInRounded,
    ZoomOutRounded
} from "@material-ui/icons";

export default [
    {
        label: 'Editar',
        icon: <EditRounded/>,
        onClick: (props) => null
    },
    {
        label: 'Recortar',
        icon: <CropRounded/>,
        onClick: (props) => null
    },
    {
        label: 'Copiar',
        icon: <FileCopyRounded/>,
        onClick: (props) => null
    },
    {
        label: 'Deletar',
        icon: <DeleteRounded/>,
        onClick: (props) => null,
        getDisabled: toBePasted => {
            return toBePasted === null || toBePasted === undefined
        }
    },
]