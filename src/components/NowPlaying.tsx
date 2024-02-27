'use client'

import { useEffect, useState } from "react"
import useSWR from "swr"
import { fetcher, trimString } from "../Utils"
import { track } from "_types/userTypes"
import Image from 'next/image'

export const NowPlaying = ({username} : {username: string}) => {
    const [isNowPlaying, setIsNowPLaying] = useState<boolean>(false)

    const [recentTrack, setRecentTrack] = useState<track>(({
        album: "",
        artist: "",
        title: "",
        url: "",
        image: ""
    }))

    const { data, error, isLoading } = useSWR(`/api/users/getrecenttracks/${username}`, fetcher, {
        onErrorRetry: (err) => {
            if (err.status === 500) 
                return
        }
    })

    useEffect(() => {
        if(data) {
            const track = data.recenttracks.track[0]
            setRecentTrack({
                album: track.album["#text"],
                artist: track.artist['#text'],
                title: track.name,
                url: track.url,
                image: track.image[3]['#text']
            })
            track['@attr'] && setIsNowPLaying(track['@attr'].nowplaying)
        }
    }, [data])

    if (!isLoading) {
        const artistURL = recentTrack.url.substring(0, recentTrack.url.lastIndexOf("/") - 1)
        const defaultSongPic = "/empty_song.webp"

        return (
            <div className='h-full grid grid-cols-3'>
                <div className='flex justify-end col-span-2'>
                    <div className='mr-3 h-full grid grid-rows-3'>
                        <span className='mt-auto ml-auto row-span-1'>
                            {isNowPlaying ? "Currently Listening To..." : 'Last Listened To...'}  
                        </span>
                        <a href={recentTrack.url} className='mt-auto ml-auto row-span-1 h-fit hover:underline font-bold text-lg text-main-red float-right'>
                            {trimString(25, recentTrack.title)} 
                        </a> 
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
        )
    }
}