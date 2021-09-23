import React, {useMemo} from 'react'

export default function useCellWidth(width){
    return useMemo(() => {
        if (width === undefined || isNaN(width))
            return 'auto'
        else
            return width + 'px'
    }, [width])
}