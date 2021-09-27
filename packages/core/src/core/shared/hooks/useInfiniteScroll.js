import React, {useCallback, useRef} from "react";

export default function useInfiniteScroll(setCurrentPage, currentPage, loading, hasMore) {
    const observer = useRef()
    return useCallback(node => {
        if (loading) return
        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                setCurrentPage(currentPage + 1)
            }
        })
        if (node) observer.current.observe(node)
    }, [loading, hasMore])
}
