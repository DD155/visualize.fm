'use client'

import useSWR from 'swr'
import { useSearchParams } from "next/navigation"
import { useEffect } from "react"


const VisualizePage = () => {
    const url = process.env.NEXT_PUBLIC_API_URL // https://ws.audioscrobbler.com/2.0/
    const searchParams = useSearchParams()
    const username:string = searchParams.get("username") ? searchParams.get("username") as string : "" // null check
    //const [userInfo, setUserInfo] = useState<>()
        
    // fetchers for my API
    const userInfoFetcher = async (url: string) => {
        const res = await fetch(url)
        if (!res.ok) {
            throw Error("Request unsuccessful")
        }
        const data = await res.json()
        return data
    }

    const { data, error, isLoading } = useSWR(`/api/users/getInfo/${username}`, userInfoFetcher)

    // end data retrieval

    // useEffect(() => {
    //     console.log(username)
    // }, [])

    if (error) {
        return (<>
            <p> Request failed </p>
        </>)
    }

    if (isLoading) return <p> Data loading </p>
    
    return <>
        <p> Username: {data.user.name}</p>
        <p> Total artists: {data.user.artist_count} </p>
    </>
}

export default VisualizePage