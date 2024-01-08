'use client'

import useSWR from "swr"
import Image from 'next/image'
import { useEffect, useState } from "react"

import { fetcher } from "Utils"
import { userInfo } from 'types/userTypes'

const Dashboard = ({params} : {params: {username: string}}) => {
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
            <div className='grid h-screen grid-rows-5 grid-flow-col'>
                { /* Profile Header */}
                <div className='p-2 row-span-1 border-solid border-2'>
                    <div className='grid h-full grid-cols-12'> 
                        <div className='col-span-2 border-solid border-2 flex justify-center'>
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
                <div className='row-span-2 border-solid border-2'>
                    <div className='grid h-full grid-cols-3'> 
                        <div className='col-span-2 border-solid border-2'> asd </div>
                    </div>
                </div>
                
            </div>
        )
}

export default Dashboard