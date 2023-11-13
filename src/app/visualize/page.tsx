'use client'

import useSWR from 'swr'
import useSWRImmutable from 'swr/immutable'

import { userInfo } from 'types/userTypes'
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import Image from 'next/image'

const colorFade = (startColor:string, endColor:string) => {
    return `transition ease-in delay-100 ${startColor} hover:${endColor} duration-200`
}

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

    // Get the user data using SWR and make sure it doesn't revalidate + when error received
    const { data: userInfoData, error, isLoading } = useSWRImmutable(`/api/users/getInfo/${username}`, fetcher, {
        onErrorRetry: (err) => {
            if (err.status === 500) 
                return
        }
    })

    useEffect(() => {
        console.log(userInfoData, error)
        if(userInfoData) {
            setUserInfo({
                username: userInfoData.user.name, 
                numArtists: userInfoData.user.artist_count,
                profilePic: userInfoData.user.image[3]['#text']
            })
        }
    }, [userInfoData])

    if (isLoading) {
        return (
        <div className='h-screen flex justify-center items-center '>
            <p className='animate-text bg-gradient-to-r from-white via-red-200 to-main-red bg-clip-text text-transparent  text-4xl'> Visualizing your music... </p>
            <svg className="animate-spin ml-3 mr-3 h-8 w-8 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
        </div>
        )    
    }

    if (error) {
        return (<>
        <div className='h-screen flex justify-center items-center'>
            <span className='text-main-red text-4xl'>Error:&nbsp;</span><span className='text-white text-4xl'>User not found...</span>
        </div>
        </>)
    }


    return (
        <div className='h-screen flex justify-center items-center'>
            <p className='text-center text-white text-3xl'> 
                <span className='animate-fade'>
                    Welcome <span className='text-main-red'>{userInfo.username}</span>, to your personalized 
                    <span className='animate-text bg-gradient-to-r from-white via-red-200 to-main-red bg-clip-text text-transparent'> Visualization </span>
                </span>
                <br /> <br />
                <span className='opacity-0 animate-fade fill-forwards animation-delay-[2000ms]'>
                    Continue to your <span className={`${colorFade("text-white", "text-main-red")} underline underline-offset-6`}>Summary</span>
                    &nbsp;or check out your&nbsp; 
                    <span className={`transition ease-in delay-100 text-white hover:text-main-red duration-200 underline underline-offset-6`}>Dashboard</span>
                </span>
            </p>
        </div>
    )
    {/*}
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
    */}
}

export default VisualizePage