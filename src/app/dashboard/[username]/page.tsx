'use client'

import useSWR from "swr"
import Image from 'next/image'
import { useEffect, useState } from "react"

import { fetcher, trimString } from "Utils"
import { track, userInfo } from 'types/userTypes'
import { ArtistsArea } from "@components/ArtistsArea/page"

const Dashboard = ({params} : {params: {username: string}}) => {
    const [currentTimeframe, setCurrentTimeframe] = useState<string>("7day")
    const [isNowPlaying, setIsNowPLaying] = useState<boolean>(false)

    const [recentTrack, setRecentTrack] = useState<track>(({
        album: "",
        artist: "",
        title: "",
        url: "",
        image: ""
    }))

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

    const { data: userTrackData, error: userTrackError, isLoading: userTrackLoading } = useSWR(`/api/users/getrecenttracks/${username}`, fetcher, {
        onErrorRetry: (err) => {
            if (err.status === 500) 
                return
        }
    })

    const getTimeframeButtonStyle = (timeframe:string) => {
        return currentTimeframe === timeframe 
            ? 'p-1 border-solid border-2 text-black bg-white'  
            : 'p-1 border-solid border-2 text-white bg-slate-950' 
    } 

    useEffect(() => {
        console.log(userInfoData, error)
        console.log(userTrackData)
        if(userInfoData) {
            setUserInfo({
                username: userInfoData.user.name, 
                numArtists: userInfoData.user.artist_count,
                profilePic: userInfoData.user.image[3]['#text']
            })
        }

        if (userTrackData) {
            const track = userTrackData.recenttracks.track[0]
            setRecentTrack({
                album: track.album["#text"],
                artist: track.artist['#text'],
                title: track.name,
                url: track.url,
                image: track.image[3]['#text']
            })
            track['@attr'] && setIsNowPLaying(track['@attr'].nowplaying)

            //console.log(track['@attr'].nowplaying)
        }
    }, [userInfoData, userTrackData])

    if (isLoading || userTrackLoading) {
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

    if (!isLoading && !userTrackLoading) {
        const defaultProfilePic = "/empty_profile.webp"
        const defaultSongPic = "/empty_song.webp"
        const artistURL = recentTrack.url.substring(0, recentTrack.url.lastIndexOf("/") - 1)

        return (
            <div className='mt-4 grid h-screen grid-rows-6 grid-flow-col'>
                { /* Profile Header */}
                <div className='p-2 row-span-1 border-solid border-2'>
                    <div className='grid h-full gap-4 grid-cols-12'> 
                        <div className='col-start-2 col-end-4 border-solid border-2 flex justify-end'>
                            <div className='h-full w-1/2 relative'>
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
                            <div className='h-full grid grid-cols-3'>
                                <div className='flex justify-end col-span-2'>
                                    <div className='mr-3 h-full grid grid-rows-3'>
                                        <span className='mt-auto ml-auto row-span-1'> {isNowPlaying ? "Currently Listening To..." : 'Last Listened To...'}  </span>
                                        <a href={recentTrack.url} className='mt-auto ml-auto row-span-1 h-fit hover:underline font-bold text-lg text-main-red float-right'>{trimString(30, recentTrack.title)} </a> 
                                        <a href={artistURL} className='ml-auto hover:underline text-md text-main-red'>{trimString(30, recentTrack.artist)}  </a>
                                    </div> 
                                </div>
                                <div className='col-span-1'>
                                    <div className='h-full w-2/3 relative'>
                                        <Image
                                            src={recentTrack.image ? recentTrack.image : defaultSongPic}
                                            alt='Track Picture'
                                            fill
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        />
                                    </div>
                                </div>
                            </div>
                            
                            
                        </div>
                    </div>
                </div>
                {/* Graph area */}
                <div className='row-span-5 p-4'>
                    <div className='grid gap-5 grid-cols-1 justify center m-auto'> 
                        <div className='col-span-1 flex items-center justify-center text-white ml-12 mr-12'> 
                            <div className='border-solid border-2 rounded-lg p-6'>
                                <div className='flex items-center justify-center mb-2 text-xs'> 
                                    <div>
                                        <button onClick={() => setCurrentTimeframe('7day')} className={getTimeframeButtonStyle('7day') + ' rounded-l-md'}>Week</button>
                                        <button onClick={() => setCurrentTimeframe('1month')} className={getTimeframeButtonStyle('1month')}>Month</button>
                                        <button onClick={() => setCurrentTimeframe('12month')} className={getTimeframeButtonStyle('12month')}>Year</button>
                                        <button onClick={() => setCurrentTimeframe('overall')} className={getTimeframeButtonStyle('overall') + ' rounded-r-md'}>Overall</button>
                                    </div>
                            </div>
                            <span className='flex items-center justify-center '> Top Artists </span>
                            {/* Timeframe Selection */}
                            
                                <ArtistsArea width={800} height={288} username={username} timeframe={currentTimeframe}/> 
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        )
    }
}

export default Dashboard