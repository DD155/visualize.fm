'use client'

import { useSearchParams } from "next/navigation"
import { useEffect } from "react"

const VisualizePage = () => {
    const searchParams = useSearchParams()
    const username:string = searchParams.get("username") ? searchParams.get("username") as string : "" // null check

    useEffect(() => {
        console.log(username)
    }, [])
}

export default VisualizePage