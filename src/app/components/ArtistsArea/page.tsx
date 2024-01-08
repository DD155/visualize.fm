import { BarChart } from "@components/BarChart/page"
import { fetcher } from "Utils" 
import { useEffect, useState } from "react"
import useSWR from "swr"

interface ArtistsAreaProps {
    username: string,
    timeframe: string
}

export const ArtistsArea = ({username, timeframe} : ArtistsAreaProps) => {
    // const [artistInfo, setArtistInfo] = useState<ArtistData[]>([])

    const { data: artistData, error, isLoading } = useSWR(`/api/users/getTopArtists/${username}/period=${timeframe}`, fetcher, {
        onErrorRetry: (err) => {
            if (err.status === 500) 
                return
        }
    })

    // useEffect(() => {
    //     //console.log(artistInfo, error)
    //     if(!isLoading) {
    //         setArtistInfo(artistData.topartists.artist)
    //     }
    // }, [artistInfo])
    
    // if (isLoading) {
    //     return (
    //     <div className='h-screen flex justify-center items-center'>
    //         <p className='animate-text bg-gradient-to-r from-white via-red-200 to-main-red bg-clip-text text-transparent  text-4xl'> Visualizing your music... </p>
    //         <svg className="animate-spin ml-3 mr-3 h-8 w-8 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    //             <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    //             <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    //         </svg>
    //     </div>
    //     )    
    // }

    if (!isLoading) {
        const artistsArr = artistData.topartists.artist
        //setArtistInfo(artistData.topartists.artist)
        // console.log(artistInfo)
        return (
            <BarChart data={artistsArr.slice(0, 10)} />
        )
        
    }

    return (
        <div>
            
        </div>
    )
}