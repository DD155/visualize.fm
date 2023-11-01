'use client'

import useSWR from 'swr'
import { useSearchParams } from "next/navigation"
import { useEffect } from "react"


const VisualizePage = () => {
    const url = process.env.NEXT_PUBLIC_API_URL // https://ws.audioscrobbler.com/2.0/
    const searchParams = useSearchParams()
    const username:string = searchParams.get("username") ? searchParams.get("username") as string : "" // null check
    //const [userInfo, setUserInfo] = useState<>()
    
    // fetcher for last fm endpoint https://ws.audioscrobbler.com/2.0/
    const userFetcher = async ([url, user]:string[]) => 
        await fetch(`${url}&user=${user}&api_key=${process.env.LFM_API}&format=json`)
            .then((res) => res.json())
    

    const { data, error, isLoading } = useSWR([`${url}?method=user.getinfo`, username], userFetcher)

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