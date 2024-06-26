'use client'

import useSWR from "swr"
import Image from 'next/image'
import { createContext, useEffect, useState } from "react"

import { fetchers, trimString } from "../../../Utils"
import { track, userInfo } from '_types/userTypes'
import { ArtistsArea } from "../../../components/ArtistsArea"
import { ArtistFreqHistogram } from "../../../components/ArtistFreqHistogram"
import { NowPlaying } from "@components/NowPlaying"
import { GenreArea } from "@components/GenreArea"


const Dashboard = ({params} : {params: {username: string}}) => {
    const [areGraphsLoading, setAreGraphsLoading] = useState<boolean>(false)

    const [userInfo, setUserInfo] = useState<userInfo>({
        username: "", 
        numArtists: 0,
        profilePic: ""
    })
    
    const username:string = params.username ? params.username : ""

    const useMultipleRequests = (urls: string[]) =>  {
        const { data, error } = useSWR(urls, fetchers)
        return {
          data: data,
          isError: !!error,
          isLoading: !data && !error
        }
    }

    const urls:string[] = [
        `/api/users/getInfo/${username}`,
        `/api/users/getTopArtists/${username}/period=7day`,
        `/api/users/getTopArtists/${username}/period=1month`,
        `/api/users/getTopArtists/${username}/period=12month`,
        `/api/users/getTopArtists/${username}/period=overall`,
    ]
    const { data, isError, isLoading } = useMultipleRequests(urls)

    useEffect(() => {
        if(data) {
            setUserInfo({
                username: data[0].user.name, 
                numArtists: data[0].user.artist_count,
                profilePic: data[0].user.image[3]['#text']
            })
        }
    }, [data])

    if (isError) {
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

    if (!isLoading && data) {
        const defaultProfilePic = "/empty_profile.webp"
        const topArtistArrays = [
            data[1].topartists.artist.slice(0, 10), 
            data[2].topartists.artist.slice(0, 10), 
            data[3].topartists.artist.slice(0, 10), 
            data[4].topartists.artist.slice(0, 10)
        ]

        const topArtistArrays2 = [
            data[1].topartists.artist.slice(0, 25), 
            data[2].topartists.artist.slice(0, 25), 
            data[3].topartists.artist.slice(0, 25), 
            data[4].topartists.artist.slice(0, 25)
        ]
        //console.log(data)

        return (
            <div className='mt-4 grid h-screen grid-rows-6 grid-flow-col'>
                { /* Profile Header */}
                <div className='p-2 row-span-1 border-solid border-2'>
                    <div className='grid h-full gap-4 grid-cols-12'> 
                        <div className='col-start-3 col-end-4 border-solid border-2 flex justify-end'>
                            <div className='h-full w-full relative'>
                                <Image
                                    src={userInfo.profilePic ? userInfo.profilePic : defaultProfilePic}
                                    alt='Profile Picture'
                                    fill
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                />
                            </div>
                        </div>
                        <div className='col-span-4 border-solid border-2'>
                            <p className='font-bold h-full text-white text-4xl flex items-end'> {userInfo.username}</p>
                        </div>
                        <div className='col-start-8 col-span-4 border-solid border-2 text-sm text-white'>
                            <NowPlaying username={username}/>
                        </div>
                    </div>
                </div>
                {/* Graph area */}
                <div className='row-span-5 p-4'>
                    <div className='grid gap-5 grid-cols-1 justify center m-auto'> 
                        <div className='col-span-1 flex items-center justify-center text-white ml-12 mr-12'> 
                            <ArtistsArea 
                            width={800} 
                            height={288} 
                            data={topArtistArrays}
                            /> 
                        </div>
                        <div className='col-span-1 flex items-center justify-center text-white ml-12 mr-12'>
                            <div className='border-solid border-2 rounded-lg p-5'>
                                <ArtistFreqHistogram 
                                    width={800} 
                                    height={288} 
                                    username={username} 
                                    artists={data[4].topartists.artist} 
                                    artist={data[4].topartists.artist[0].name} 
                                />
                            </div>
                        </div>
                        <div className='col-span-1 flex items-center justify-center text-white ml-12 mr-12'>
                            <GenreArea width={800} height={288} data={topArtistArrays2}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Dashboard