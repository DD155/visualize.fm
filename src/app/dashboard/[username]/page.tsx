'use client'

import useSWR from "swr"
import Image from 'next/image'
import { useEffect, useState } from "react"

import { fetcher } from "Utils"
import { userInfo } from 'types/userTypes'
import { ArtistsArea } from "@components/ArtistsArea/page"

const Dashboard = ({params} : {params: {username: string}}) => {
    const [currentTimeframe, setCurrentTimeframe] = useState<string>("7day")

    const [userInfo, setUserInfo] = useState<userInfo>({
        username: "", 
        numArtists: 0,
        profilePic: ""
    })
    
    const username:string = params.username ? params.username : ""
    const { data: userInfoData, error, isLoading } = useSWR(`/api/users/getInfo/${username}`, fetcher, {
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

    if (!isLoading) 
        console.log(userInfoData.user.image[3]['#text'])
        return (
            <div className='grid h-screen grid-rows-6 grid-flow-col'>
                { /* Profile Header */}
                <div className='p-2 row-span-1 border-solid border-2'>
                    <div className='grid h-full gap-4 grid-cols-12'> 
                        <div className='col-start-2 col-end-4 border-solid border-2 flex justify-center'>
                            <div className='h-full w-1/2 relative'>
                                <Image
                                    src={userInfo.profilePic}
                                    alt='Profile Picture'
                                    layout='fill'
                                    objectFit='cover' 
                                    className='rounded-full'
                                />
                            </div>
                            
                        </div>
                        <div className='col-span-4 border-solid border-2'>
                            <p className='h-full text-white text-4xl flex items-center'> {userInfo.username}</p>
                        </div>
                    </div>
                </div>
                {/* Graph area */}
                <div className='row-span-2 p-4'>
                    <div className='grid h-full gap-5 grid-cols-2'> 
                        <div className='col-span-1 border-solid border-2 rounded-lg flex items-center justify-center text-white ml-12 mr-12'> 
                        <div className='mt-5 mb-5 ml-6'>
                            <div className='flex items-center justify-center mb-2 text-xs'> 
                                <div>
                                    <button onClick={() => setCurrentTimeframe('7day')} className='p-1 border-solid border-2 rounded-l-md'>Week</button>
                                    <button onClick={() => setCurrentTimeframe('1month')} className='p-1 border-solid border-2'>Month</button>
                                    <button onClick={() => setCurrentTimeframe('12month')} className='p-1 border-solid border-2'>Year</button>
                                    <button onClick={() => setCurrentTimeframe('overall')} className='p-1 border-solid border-2 rounded-r-md'>Overall</button>
                                </div>
                           </div>
                           <span className='flex items-center justify-center'> Top Artists </span>
                           {/* Timeframe Selection */}
                           
                            <ArtistsArea username={username} timeframe={currentTimeframe}/> 
                        </div>
                                
                        </div>
                        <div className='col-span-1 border-solid border-2 flex items-center justify-center text-white'> 
                            <ArtistsArea username={username} timeframe={currentTimeframe}/> 
                        </div>
                    </div>
                </div>
                
            </div>
        )
}

export default Dashboard