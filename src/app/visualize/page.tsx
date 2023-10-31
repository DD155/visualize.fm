'use client'

import { useParams, useSearchParams } from "next/navigation"
import { useEffect } from "react"

const VisualizePage = () => {
    const searchParams = useSearchParams()
    const username = searchParams.get("username")

    useEffect(() => {
        console.log(username)
    }, [])
}

export default VisualizePage