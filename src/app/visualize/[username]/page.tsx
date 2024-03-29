'use client'

import useSWR from 'swr'
import useSWRImmutable from 'swr/immutable'

import { userInfo } from '_types/userTypes'
import { fetcher } from "../../../Utils" 
import { useEffect, useState } from "react"
import { useRouter } from 'next/navigation'


const VisualizePage = ({params} : {params: {username: string}}) => {
    const router = useRouter()
    //const searchParams = useSearchParams()
    const username:string = params.username ? params.username : "" // null check

    const [isSummarySelected, setIsSummarySelected] = useState<boolean>(false)
    const [userInfo, setUserInfo] = useState<userInfo>({
        username: "", 
        numArtists: 0,
        profilePic: ""
    })

    // Get the user data using SWR and make sure it doesn't revalidate + when error received
    const { data: userInfoData, error, isLoading } = useSWRImmutable(`/api/users/getInfo/${username}`, fetcher, {
        onErrorRetry: (err) => {
            if (err.status === 500) 
                return
        }
    })

    // styles 
    const colorFade = "transition ease-in delay-100 text-white hover:text-main-red duration-200 underline underline-offset-6 cursor-pointer"

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
        <div className='h-screen flex justify-center items-center'>
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
        { /* Initial greeting message before summary is selected for display */}    
            <p className='text-center text-white text-3xl'> 
                <span className='animate-fade'>
                    Welcome <span className='text-main-red'>{userInfo.username}</span>, to your personalized 
                    <span className='animate-text bg-gradient-to-r from-white via-red-200 to-main-red bg-clip-text text-transparent'> Visualization </span>
                </span>
                <br /> <br />
                <span className='opacity-0 animate-fade fill-forwards animation-delay-[2000ms]'>
                    Continue to your <span onClick = {() => router.push(`/summary/${username}`)} className={colorFade}>Summary</span>
                    &nbsp;or check out your&nbsp; 
                    <span onClick = {() => router.push(`/dashboard/${username}`)} className={colorFade}>Dashboard</span>
                </span>
            </p>
        </div>
    )
}

export default VisualizePage