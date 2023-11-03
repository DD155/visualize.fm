'use client'

import useSWR from 'swr'
import { userInfo } from 'types/userTypes'
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import Image from 'next/image'

// interface userInfo {
//     username: string,
//     numArtists: number,
//     profilePic: string,
// }

const VisualizePage = () => {
    const searchParams = useSearchParams()
    const username:string = searchParams.get("username") ? searchParams.get("username") as string : "" // null check
    const [userInfo, setUserInfo] = useState<userInfo>({
        username: "", 
        numArtists: 0,
        profilePic: ""
    })
        
    // fetchers for my API
    const fetcher = async (url: string) => {
        const res = await fetch(url)
        if (!res.ok) {
            throw Error("Request unsuccessful")
        }
        const data = await res.json()
        return data
    }

    const { data: userInfoData, error, isLoading } = useSWR(`/api/users/getInfo/${username}`, fetcher)

    useEffect(() => {
        if(userInfoData)
            setUserInfo({
                username: userInfoData.user.name, 
                numArtists: userInfoData.user.artist_count,
                profilePic: userInfoData.user.image[3]['#text']
            })
    }, [userInfoData])

    if (error) {
        return (<>
            <p> Request failed </p>
        </>)
    }

    if (isLoading) return <p> Data loading </p>    

    return <>
        {userInfo.profilePic && 
        <Image 
            src={userInfo.profilePic} 
            alt ="Profile picture"
            width={150}
            height={150}
        /> }
        <p> Username: {userInfo.username}</p>
        <p> Total artists: {userInfo.numArtists} </p>

    </>
}

export default VisualizePage