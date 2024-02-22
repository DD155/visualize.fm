import { ArtistFreqData } from "./ArtistFreqData"
import { fetcher } from "../Utils"
import { useState } from "react"
import useSWR from "swr"

interface ArtistHistogramProps {
    username: string,
    artists: [],
    artist: string,
    width: number,
    height: number,
}

export const ArtistFreqHistogram = ({width, height, username, artists, artist} : ArtistHistogramProps) => {
    const COUNT = 52
    const [currentFreqArtist, setCurrentFreqArtist] = useState<string>(artist)
    const { data: userInfoData, error, isLoading } = useSWR(`/api/users/getWeeklyChartList/${username}`, fetcher, {
        onErrorRetry: (err) => {
            if (err.status === 500) 
                return
        }
    })

    if (isLoading) {
        // safelisted classes
        const widthStyle = `w-[${width}px]`
        const heightStyle = `h-[${height}px]`

        return (
        <div className={`${heightStyle} ${widthStyle} flex justify-center items-center`}>
            <svg className="animate-spin ml-3 mr-3 h-8 w-8 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
        </div>
        )    
    }

    if (!isLoading && artists) {
        const charts = userInfoData.weeklychartlist.chart

        return (
            <div>
                <span className='flex items-center justify-center mb-3'> Scrobble Frequency (Year) - {currentFreqArtist}</span>
                <div className='flex items-center justify-center text-sm '> 
                    <div className="text-black">
                        <select className='p-1' onChange={(e) => setCurrentFreqArtist(e.target.value)}>
                            {artists.map((x:any) => <option key={x.name} value={x.name}>{x.name} </option>)}
                        </select>
                    </div>
                </div>
                <ArtistFreqData 
                    username={username} 
                    artist={currentFreqArtist} 
                    timeframes={charts} 
                    count={COUNT}/>
            </div>
        )
    }
}